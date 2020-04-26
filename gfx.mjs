import { Shaders } from './shaders.mjs';

let gl = null;

// format structure: { uint8_t bytes; uint8_t size; uint8_t isFloat; uint8_t isDepth; };
function formatToBytes(gl, format) {
	return 0xff & format;
}
function formatToSize(gl, format) {
	return (0xff00 & format) >>> 8;
}
function formatToGl(gl, format) {
	let isDepth = 0xff000000 & format;
	if (isDepth) { return gl.DEPTH_COMPONENT; }
	switch(formatToSize(gl, format)) {
		case 1: return gl.RED;
		case 2: return gl.RG;
		case 3: return gl.RGB;
		case 4: return gl.RGBA;
		default: return 0;
	}
}
function formatToGlType(gl, format) {
	let isFloat = 0xff0000 & format;
	let size = formatToSize(gl, format);
	let bytes = formatToBytes(gl, format);
	switch(bytes / size) {
		case 1: return gl.UNSIGNED_BYTE;
		case 2: return gl.UNSIGNED_SHORT;
		case 4: return isFloat ? gl.FLOAT : gl.UNSIGNED_INT;
		default: return 0;
	}
}

const Comp_Never = 0;
const Comp_Less = 1;
const Comp_Equal = 2;
const Comp_LessOrEqual = 3;
const Comp_Greater = 4;
const Comp_NotEqual = 5;
const Comp_GreaterOrEqual = 6;
const Comp_Always = 7;
function compToGl(gl, comp) {
	switch(comp) {
		case Comp_Never: return gl.NEVER;
		case Comp_Less: return gl.LESS;
		case Comp_Equal: return gl.EQUAL;
		case Comp_LessOrEqual: return gl.LEQUAL;
		case Comp_Greater: return gl.GREATER;
		case Comp_NotEqual: return gl.NOTEQUAL;
		case Comp_GreaterOrEqual: return gl.GEQUAL;
		case Comp_Always: return gl.ALWAYS;
		default: return 0;
	}
}

const Blend_None = 0;
const Blend_Alpha = 1;
const Blend_Premult = 2;
function blendToGlSrc(gl, blend) {
	switch(blend) {
		case Blend_None: return gl.ONE;
		case Blend_Alpha: return gl.SRC_ALPHA;
		case Blend_Premult: return gl.ONE;
		default: return 0;
	}
}
function blendToGlDst(gl, blend) {
	switch(blend) {
		case Blend_None: return gl.ZERO;
		case Blend_Alpha: return gl.ONE_MINUS_SRC_ALPHA;
		case Blend_Premult: return gl.ONE_MINUS_SRC_ALPHA;
		default: return 0;
	}
}

const Triangles = 0;
const Lines = 1;
function primitiveToGl(gl, primitive) {
	switch(primitive) {
		case Triangles: return gl.TRIANGLES;
		case Lines: return gl.LINES;
		default: return 0;
	}
}

// BufferAccess
const Static = 0;
const Dynamic = 1;
// BufferUsage
const Uniform = 0;
const Index = 1;
const Vertex = 2;

const ClampNearest = 0;
const ClampLinear = 1;
const RepeatNearest = 2;
const RepeatLinear = 3;
const Sampler_None = -1;

const BindPoint_None = 0;
const BindPoint_Uniform = 1;
const BindPoint_Texture = 0xffffffff;

class RenderTarget {
	constructor(gl, colorGlTex, depthGlTex, isPresentationFramebuffer) {
		this.colorTex = colorGlTex;
		this.depthTex = depthGlTex;
		this.fb = isPresentationFramebuffer ? null : gl.createFramebuffer();
		if (!this.fb) {
			return;
		}

		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
		if (this.colorTex) {
			gl.bindTexture(gl.TEXTURE_2D, this.colorTex);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.colorTex, 0);
		}
		if (this.depthTex) {
			gl.bindTexture(gl.TEXTURE_2D, this.depthTex);
			gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTex, 0);
		}
 
		let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
		if (status !== gl.FRAMEBUFFER_COMPLETE) {
			throw 'The created frame buffer is invalid: '+Object.keys(gl.__proto__).filter(k => gl[k] === status);
		}
 
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	bind(gl) {
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.fb);
	}
}

class Shader {
	constructor(gl, vert, frag, vertexLayout, bindGroupLayouts) {
		this.vertFile = vert;
		this.fragFile = frag;
		this.vertexLayout = vertexLayout;
		this.bindGroupLayouts = bindGroupLayouts;
		this.vertShader = Shader.compileShader(gl, Shaders[this.vertFile], gl.VERTEX_SHADER);
		this.fragShader = Shader.compileShader(gl, Shaders[this.fragFile], gl.FRAGMENT_SHADER);
		this.program = Shader.createProgram(gl, this.vertShader, this.fragShader);
		this.findAttribsAndBindPoints();
	}

	findAttribsAndBindPoints() {
		this.vertexAttribs = [];
		let offset = 0;
		for (let i = 0; i < this.vertexLayout.attribs.length; i++) {
			let format = this.vertexLayout.attribs[i];
			let index = gl.getAttribLocation(this.program, `in_${i}_`);
			let size = formatToSize(gl, format);
			let type = formatToGlType(gl, format);
			let bytes = formatToBytes(gl, format);
			let normalized = bytes / size <= 2.0; //@HACK: Anything greater than 16-bits is non-normalized
			let stride = this.vertexLayout.stride;
			this.vertexAttribs[i] = { index, size, type, normalized, stride, offset };
			offset += bytes;
			//@TODO: Test for attributes that are compiled out!
		}

		this.bindPointSets = [];
		this.textureCount = 0;
		for (let set = 0; set < this.bindGroupLayouts.length; set++) {
			let bindGroupLayout = this.bindGroupLayouts[set];
			let bindPoints = [];
			for (let binding = 0; binding < bindGroupLayout.length; binding++) {
				let { type, size } = bindGroupLayout[binding];
				let location = gl.getUniformLocation(this.program, `b_s${set}b${binding}_`);
				if (!location) { continue; }
				let textureSlot = type == BindPoint_Texture ? this.textureCount : -1;
				if (textureSlot >= 0) { ++this.textureCount; }
				bindPoints.push({ binding, location, type, size, textureSlot });
			}
			this.bindPointSets[set] = bindPoints;
		}
	}

	hotLoad(vertSrc, fragSrc) {
		gl.deleteProgram(this.program);
		if (vertSrc) {
			gl.deleteShader(this.vertShader);
			this.vertShader = Shader.compileShader(gl, vertSrc, gl.VERTEX_SHADER);
		}
		if (fragSrc) {
			gl.deleteShader(this.fragShader);
			this.fragShader = Shader.compileShader(gl, fragSrc, gl.FRAGMENT_SHADER);
		}
		this.program = Shader.createProgram(gl, this.vertShader, this.fragShader);
		//@HACK: How do we handle potentially new bind group layouts?
		this.findAttribsAndBindPoints();
	}

	bind(gl) {
		gl.useProgram(this.program);
		for (let i = 0; i < this.vertexAttribs.length; i++) {
			gl.enableVertexAttribArray(this.vertexAttribs[i].index);
		}
	}

	unbind(gl) {
		for (let i = 0; i < this.vertexAttribs.length; i++) {
			gl.disableVertexAttribArray(this.vertexAttribs[i].index);
		}
		for (let i = 0; i < this.textureCount; i++) {
			gl.activeTexture(gl.TEXTURE0 + i);
			gl.bindTexture(gl.TEXTURE_2D, null);
		}
	}

	bindAttribs(gl, offset) {
		for (let i = 0; i < this.vertexAttribs.length; i++) {
			let va = this.vertexAttribs[i];
			gl.vertexAttribPointer(va.index, va.size, va.type, va.normalized, va.stride, va.offset + offset);
		}
	}

	setBindGroup(gl, wasmBuffer, index, bindGroup, textures) {
		let bindPoints = this.bindPointSets[index];
		for (let i = 0; i < bindPoints.length; i++) {
			let bp = bindPoints[i];
			const { data0, data1, type } = bindGroup[bp.binding];
			if (bp.type != type) {
				throw `Invalid bind group at index ${index} for current shader`;
			}
			if (bp.type == BindPoint_Uniform) {
				let uniformOffset = data0;
				let uniformSize = data1;
				if (uniformSize != bp.size) {
					throw `Uniform buffer at (set: ${index}, binding: ${bp.binding}) invalid size. Given ${uniformSize}, expected ${bp.size}`;
				}
				let value = new Float32Array(wasmBuffer, uniformOffset, uniformSize / 4);
				gl.uniform4fv(bp.location, value);
			} else if (bp.type == BindPoint_Texture) {
				let textureId = data0;
				let samplerId = data1;
				let tex = textures[textureId];
				gl.activeTexture(gl.TEXTURE0 + bp.textureSlot);
				gl.bindTexture(gl.TEXTURE_2D, tex.glTex);
				gl.uniform1i(bp.location, bp.textureSlot);
				if (tex.samplerId != samplerId) {
					tex.samplerId = samplerId;
					if (samplerId == ClampNearest || samplerId == ClampLinear) {
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
					} else {
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
					}
					if (samplerId == ClampNearest || samplerId == RepeatNearest) {
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
					} else {
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, tex.maxMip > 0 ? gl.LINEAR_MIPMAP_LINEAR : gl.LINEAR);
						gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					}
				}
			}
		}
	}

	static compileShader(gl, shaderSource, shaderType) {
		let shader = gl.createShader(shaderType);
		gl.shaderSource(shader, shaderSource);
		gl.compileShader(shader);
		let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
		if (!success) {
			throw 'Could not compile shader:'+gl.getShaderInfoLog(shader);
		}
		return shader;
	}

	static createProgram(gl, vertexShader, fragmentShader) {
		let program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		let success = gl.getProgramParameter(program, gl.LINK_STATUS);
		if (!success) {
			throw ('Program filed to link:'+gl.getProgramInfoLog(program));
		}
		return program;
	}
}

class Pipeline {
	constructor(gl, rt, depthFunc, blendFunc, shader, primitive) {
		this.rt = rt;
		this.depthFunc = compToGl(gl, depthFunc);
		this.blendSrc = blendToGlSrc(gl, blendFunc);
		this.blendDst = blendToGlDst(gl, blendFunc);
		this.shader = shader;
		this.primitive = primitiveToGl(gl, primitive);
	}

	bind(gl) {
		if (this.rt.depthTex || !this.rt.fb) { // If our render target doesn't have a frame buffer, we're rendering to the default frame buffer, which does have a depth buffer
			gl.enable(gl.DEPTH_TEST);
		} else {
			gl.disable(gl.DEPTH_TEST);
		}

		gl.depthFunc(this.depthFunc);

		if (this.blendSrc == gl.ONE && this.blendDst == gl.ZERO) {
			gl.disable(gl.BLEND);
		} else {
			gl.enable(gl.BLEND);
			gl.blendFunc(this.blendSrc, this.blendDst);
		}

		this.shader.bind(gl);
	}

	unbind(gl) {
		this.shader.unbind(gl);
	}
}

class Gfx {
	constructor(parentElement) {
		this.bufs = [];
		this.bufferIdx = 0; // Keeps track of which of our triple buffered buffer we're actually using
		this.renderTargets = [];
		this.textures = [ {} ]; // The first index is the null texture
		this.bindGroupLayouts = [];
		this.pipelines = [];
		this.boundPl = null;

		this.bindGroups = [];
		this.resetBindGroupsIndex = 0;

		this.viewportWidth = 100.0;
		this.viewportHeight = 100.0;
		this.ppi = 96.0;

		this.canvas = document.createElement('canvas');
		parentElement.appendChild(this.canvas);
		gl = this.canvas.getContext('webgl', {
			alpha: false,
			desynchronized: true,
			preserveDrawingBuffer: true
			// antialias: Boolean that indicates whether or not to perform anti-aliasing.
			// depth: Boolean that indicates that the drawing buffer has a depth buffer of at least 16 bits.
		});
		this.OES_element_index_uint = gl.getExtension('OES_element_index_uint');
		if (!this.OES_element_index_uint) {
			console.error('OES_element_index_uint extension is required, but not supported by this platform');
		}
		this.WEBGL_depth_texture = gl.getExtension('WEBGL_depth_texture');
		if (!this.WEBGL_depth_texture) {
			console.error('WEBGL_depth_texture extension is required, but not supported by this platform');
		}

		this.resize();
	}

	allocBuffer(access, usage, size) {
		//@TODO: Early out if usage == Uniform?
		let glTarget = usage == Index ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
		let buf = { access, usage, size, glTarget, glBufs: [] };

		if (access == Dynamic) {
			for (let i = 0; i < 3; i++) {
				buf.glBufs[i] = gl.createBuffer();
				gl.bindBuffer(glTarget, buf.glBufs[i]);
				gl.bufferData(glTarget, size, gl.DYNAMIC_DRAW);
			}
		} else {
			buf.glBufs[0] = gl.createBuffer();
			gl.bindBuffer(glTarget, buf.glBufs[0]);
			gl.bufferData(glTarget, size, gl.STATIC_DRAW);
		}

		this.bufs.push(buf);
	}

	allocTexture(gfxFormat, width, height) {
		let format = formatToGl(gl, gfxFormat);
		let type = formatToGlType(gl, gfxFormat);
		let glTex = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, glTex);
		gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.textures.push({ glTex, format, type, width, height, maxMip: 0, samplerId: Sampler_None });
		return this.textures.length - 1;
	}

	allocRenderTarget(colorTexId, depthTexId, isPresentationFramebuffer) {
		let colorGlTex = colorTexId ? this.textures[colorTexId].glTex : null;
		let depthGlTex = depthTexId ? this.textures[depthTexId].glTex : null;
		if (!colorGlTex && !depthGlTex && !isPresentationFramebuffer) { throw 'Render target must have at least one color or depth attachment'; }
		// Let OpenGL cover the other possible errors ...
		this.renderTargets.push(new RenderTarget(gl, colorGlTex, depthGlTex, isPresentationFramebuffer));
	}

	allocBindGroupLayout(HEAPU8, bindPointLayoutsOffset, bindPointCount) {
		let data = new Uint32Array(new Uint32Array(HEAPU8.buffer, HEAPU8.byteOffset + bindPointLayoutsOffset, bindPointCount));
		let bindGroupLayout = [];
		for (let i = 0; i < bindPointCount; i++) {
			let type = (data[i] == BindPoint_None || data[i] == BindPoint_Texture) ? data[i] : BindPoint_Uniform;
			let size = type == BindPoint_Uniform ? data[i] : 0;
			bindGroupLayout[i] = { type, size };
		}
		this.bindGroupLayouts.push(bindGroupLayout);
	}

	allocPipeline(HEAPU8, rtId, depthOp, blend, primitive, vlOffset, bglIdsOffset) {
		//@HACK: Where will this shader metadata actually come from?
		let verts = ['./shaders/shadow.vert', './shaders/test-geo.vert', './shaders/color.vert', './shaders/color.vert'];
		let frags = ['./shaders/shadow.frag', './shaders/test-geo.frag', './shaders/red.frag',   './shaders/green.frag'];
		let i = this.pipelines.length;

		let vlData = new Uint32Array(HEAPU8.buffer, HEAPU8.byteOffset + vlOffset, 10);
		let attribs = new Uint32Array(HEAPU8.buffer, HEAPU8.byteOffset + vlOffset, vlData[8]);
		let vl = { attribs, stride: vlData[9] };

		let bgData = new Uint32Array(HEAPU8.buffer, HEAPU8.byteOffset + bglIdsOffset, 5);
		let bgls = [];
		for (let j = 0; j < bgData[4]; j++) {
			bgls[j] = this.bindGroupLayouts[bgData[j]];
		}

		let sh = new Shader(gl, verts[i], frags[i], vl, bgls);

		this.pipelines.push(new Pipeline(gl, this.renderTargets[rtId], depthOp, blend, sh, primitive));
	}

	transfer(HEAPU8, bufferId, bufferOffset, data, size) {
		let buf = this.bufs[bufferId];
		gl.bindBuffer(buf.glTarget, buf.glBufs[this.bufferIdx]);
		gl.bufferSubData(buf.glTarget, bufferOffset, HEAPU8.subarray(data, data + size));
	}

	updateTexture(HEAPU8, textureId, dataOffset) {
		let tex = this.textures[textureId];
		let data = new Uint8Array(HEAPU8.buffer, HEAPU8.byteOffset + dataOffset, 4 * tex.width * tex.height); //@TODO: Support other types ...
		gl.bindTexture(gl.TEXTURE_2D, tex.glTex);
		gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, tex.width, tex.height, tex.format, tex.type, data);
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	beginRenderPass(rtId, clearColor, clearDepth, r, g, b, a, depth) {
		this.renderTargets[rtId].bind(gl);
		let clearBits = 0;
		if (clearColor) {
			clearBits |= gl.COLOR_BUFFER_BIT;
			gl.clearColor(r, g, b, a);
		}
		if (clearDepth) {
			clearBits |= gl.DEPTH_BUFFER_BIT;
			gl.clearDepth(depth);
		}
		if (clearBits) {
			gl.clear(clearBits);
		}
	}

	viewport(x, y, width, height) {
		gl.viewport(x, y, width, height);
	}

	setPipeline(plId) {
		if (this.boundPl) {
			this.boundPl.unbind(gl);
		}
		this.boundPl = this.pipelines[plId];
		this.boundPl.bind(gl);
		this.resetBindGroupsIndex = 0;
	}

	setVertexBuffer(bufferId, offset) {
		let buf = this.bufs[bufferId];
		gl.bindBuffer(gl.ARRAY_BUFFER, buf.glBufs[this.bufferIdx]);
		this.boundPl.shader.bindAttribs(gl, offset);
	}

	setIndexBuffer(bufferId) {
		let buf = this.bufs[bufferId];
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buf.glBufs[this.bufferIdx]);
	}

	setBindGroup(HEAPU8, index, bindGroupOffset) {
		let bgData = new Uint32Array(HEAPU8.buffer, HEAPU8.byteOffset + bindGroupOffset, 49);
		let bindGroup = [];
		for (let i = 0; i < bgData[48]; i++) {
			bindGroup[i] = { data0: bgData[3 * i + 0], data1: bgData[3 * i + 1], type: bgData[3 * i + 2] };
		}
		this.bindGroups[index] = bindGroup;
		if (this.resetBindGroupsIndex > index) { this.resetBindGroupsIndex = index; }
	}

	draw(HEAPU8, count, firstIndex) {
		let shader = this.boundPl.shader;
		while (this.resetBindGroupsIndex < shader.bindGroupLayouts.length) {
			let bindGroup = this.bindGroups[this.resetBindGroupsIndex];
			if (bindGroup) {
				shader.setBindGroup(gl, HEAPU8.buffer, this.resetBindGroupsIndex, bindGroup, this.textures);
			}
			++this.resetBindGroupsIndex;
		}
		gl.drawElements(this.boundPl.primitive, count, gl.UNSIGNED_INT, 4 * firstIndex);
	}

	endFrame() {
		this.bufferIdx = this.bufferIdx < 2 ? this.bufferIdx + 1 : 0;
	}

	resize() {
		let canvas = this.canvas;

		let wx = window.innerWidth;
		let wy = window.innerHeight;

		// Experiment with different viewport dims
		const targetMin = 360.0;
		let minDim = Math.min(wx, wy);
		let maxDim = Math.max(wx, wy);
		// Estimate PPI, based on the very loose 96 PPI for CSS pixels
		this.ppi = 96.0 * targetMin / minDim;
		minDim = Math.max(10.0, minDim);
		maxDim = Math.round(maxDim * targetMin / minDim);
		minDim = targetMin;

		canvas.width = this.viewportWidth = wx > wy ? maxDim : minDim;
		canvas.height = this.viewportHeight = wx > wy ? minDim : maxDim;
		canvas.style.width = wx + 'px';
		canvas.style.height = wy + 'px';
	}

	hotLoadShaders(newShaders, newFiles) {
		for (let i = 0; i < this.pipelines.length; i++) {
			let shader = this.pipelines[i].shader;
			let newVertSrc = newFiles.includes(shader.vertFile) ? newShaders[shader.vertFile] : null;
			let newFragSrc = newFiles.includes(shader.fragFile) ? newShaders[shader.fragFile] : null;
			if (newVertSrc || newFragSrc) {
				shader.hotLoad(newVertSrc, newFragSrc);
			}
		}
	}

	bindToWasm(HEAPU8, env) {
		let gfx_allocBuffer = (access, usage, size) => { this.allocBuffer(access, usage, size); };
		let gfx_allocTexture = (format, width, height) => { return this.allocTexture(format, width, height); };
		let gfx_allocRenderTarget = (colorTexId, depthTexId, isPresentationFramebuffer) => { this.allocRenderTarget(colorTexId, depthTexId, isPresentationFramebuffer); };
		let gfx_allocBindGroupLayout = (bindPointLayoutsOffset, bindPointCount) => { this.allocBindGroupLayout(HEAPU8, bindPointLayoutsOffset, bindPointCount); };
		let gfx_allocPipeline = (rtId, depthOp, blend, primitive, vlOffset, bglIdsOffset) => { this.allocPipeline(HEAPU8, rtId, depthOp, blend, primitive, vlOffset, bglIdsOffset); };
		let gfx_transfer = (bufferId, bufferOffset, data, size) => { this.transfer(HEAPU8, bufferId, bufferOffset, data, size); };
		let gfx_updateTexture = (textureId, dataOffset) => { this.updateTexture(HEAPU8, textureId, dataOffset); };
		let gfx_beginRenderPass = (rtId, clearColor, clearDepth, r, g, b, a, depth) => { this.beginRenderPass(rtId, clearColor, clearDepth, r, g, b, a, depth); };
		let gfx_viewport = (x, y, width, height) => { this.viewport(x, y, width, height); };
		let gfx_setPipeline = (plId) => { this.setPipeline(plId); };
		let gfx_setVertexBuffer = (bufferId, offset) => { this.setVertexBuffer(bufferId, offset); };
		let gfx_setIndexBuffer = (bufferId) => { this.setIndexBuffer(bufferId); };
		let gfx_setBindGroup = (index, bindGroupOffset) => { this.setBindGroup(HEAPU8, index, bindGroupOffset); };
		let gfx_draw = (count, firstIndex) => { this.draw(HEAPU8, count, firstIndex); };
		let gfx_endFrame = () => { this.endFrame(); };

		env['gfx_allocBuffer'] = gfx_allocBuffer;
		env['gfx_allocTexture'] = gfx_allocTexture;
		env['gfx_allocRenderTarget'] = gfx_allocRenderTarget;
		env['gfx_allocBindGroupLayout'] = gfx_allocBindGroupLayout;
		env['gfx_allocPipeline'] = gfx_allocPipeline;
		env['gfx_transfer'] = gfx_transfer;
		env['gfx_updateTexture'] = gfx_updateTexture;
        env['gfx_viewport'] = gfx_viewport;
        env['gfx_beginRenderPass'] = gfx_beginRenderPass;
        env['gfx_setPipeline'] = gfx_setPipeline;
        env['gfx_setVertexBuffer'] = gfx_setVertexBuffer;
        env['gfx_setIndexBuffer'] = gfx_setIndexBuffer;
        env['gfx_setBindGroup'] = gfx_setBindGroup;
		env['gfx_draw'] = gfx_draw;
		env['gfx_endFrame'] = gfx_endFrame;
	}
}

export { Gfx };
