function loadFile(path, onfileload) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.responseType = 'arraybuffer';
    let onfailure = (event) => {
        console.error('Failed loading file: '+path);
    };
    xhr.addEventListener('load', (event) => {
        let arrayBuffer = xhr.response;
        if (!arrayBuffer) {
            onfailure(event);
            return;
        }
        onfileload(arrayBuffer);
    });
    xhr.addEventListener('abort', onfailure);
    xhr.addEventListener('error', onfailure);
    xhr.addEventListener('timeout', onfailure);
    xhr.send();
}

class Bootloader {
    constructor() {
        this.memory = null;
        this.env = null;
        this.instance = null;
        this.wasmInitialized = false;
        this.wasmContext = 0;
    }

    init(gfx) {
        // Debug log
        // this.logLines = [];
        // this.log = document.createElement('div');
        // this.log.style =
        //     'color: white; background: rgba(0,0,0,0.5); '+
        //     'margin: 6px; padding: 4px; '+
        //     'position: absolute; left: 0px; top: 0px;';
        // document.body.appendChild(this.log);

        //-----------------------------
        // Initialize state for the native code and load it
        let INITIAL_TOTAL_MEMORY = 33554432; // Must be the same value as the cpp linker command line
        let WASM_PAGE_SIZE = 65536;
        let PAGES = INITIAL_TOTAL_MEMORY / WASM_PAGE_SIZE;
        this.memory = new WebAssembly.Memory({ 'initial': PAGES, 'maximum': PAGES });
        this.env = {};
        this.env['memory'] = this.memory;
    
        // Provide a few helper functions to allow debug printing
        let HEAPU8 = new Uint8Array(this.memory.buffer);
        let UTF8Decoder = new TextDecoder();
        this.env['emscripten_memcpy_big'] = function emscripten_memcpy_big(dest, src, num) {
            HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
        }
        let debugln = (cstr, length) => {
            let msg = UTF8Decoder.decode(HEAPU8.subarray(cstr, cstr+length));
            console.log(msg);
            if (this.log) {
                this.logLines.push(msg);
                if (this.logLines.length > 5) {
                    this.logLines.splice(0, this.logLines.length - 5);
                }
                this.log.innerHTML = this.logLines.join('<br />');
            }
        };
        this.env['debugln'] = debugln;
        this.env['performance_now'] = function performance_now() {
            return performance.now();
        };
        gfx.bindToWasm(HEAPU8, this.env);

        // We're ready to try to load it
        loadFile('main.wasm?'+Math.random(), (arrayBuffer) => {
            WebAssembly.instantiate(arrayBuffer, { 'env': this.env }).then((result) => {
                this.instance = result.instance;
                if (!this.wasmInitialized) {
                    this.wasmInitialized = true;
                    this.instance.exports.Init();
                    this.instance.exports.Resize(gfx.viewportWidth, gfx.viewportHeight, gfx.ppi); //@TODO: This seems ripe for wasting cycles. We should know the viewport dims and ppi before init ...
                }
            });
        });

        //-----------------------------
        // Pass along input to the native code
        const TouchEvent_Move = 0;
        const TouchEvent_Start = 1;
        const TouchEvent_End = 2;
        const TouchEvent_Cancel = 3;

        let timeOld = 0.0;
        let onTouchShared = (event, type) => {
            //@HACK: For now, just throw the document into fullscreen as soon as we can ...
            if (!document.fullscreenElement && type == TouchEvent_End) {
                if (gfx.canvas.requestFullscreen) {
                    gfx.canvas.requestFullscreen();
                }
            }

            if (type != TouchEvent_Cancel) {
                event.preventDefault();
            }

            if (!this.instance) {
                return;
            }

            let time = 0.001 * (event.timeStamp || performance.now());
            //@NOTE: There's currently a bug in Chrome 74 where event.timeStamp doesn't update
            // during certain multi-touch events. To work around, we detect when that's happened
            // and just use performance.now(). This can lead to cases where an event using
            // performance.now() can have a slightly newer time than a following event
            // using event.timeStamp.
            if (time == timeOld) {
                time = 0.001 * performance.now();
            } else {
                timeOld = time;
            }

            for (let i = 0; i < event.changedTouches.length; i++) {
                let t = event.changedTouches[i];
                let id = t.identifier + 5; // Allow room for virtual mouse IDs
                let x = t.clientX * (gfx.viewportWidth / window.innerWidth);   // Convert from device pixels
                let y = t.clientY * (gfx.viewportHeight / window.innerHeight); // to viewport pixels
                this.instance.exports.OnTouchEvent(type, time, id, x, y);
            }
        };
        let onTouchMove = (event) => { onTouchShared(event, TouchEvent_Move); };
        let onTouchStart = (event) => { onTouchShared(event, TouchEvent_Start); };
        let onTouchEnd = (event) => { onTouchShared(event, TouchEvent_End); };
        let onTouchCancel = (event) => { onTouchShared(event, TouchEvent_Cancel); };
        gfx.canvas.addEventListener("touchmove", onTouchMove, false);
        gfx.canvas.addEventListener("touchstart", onTouchStart, false);
        gfx.canvas.addEventListener("touchend", onTouchEnd, false);
        gfx.canvas.addEventListener("touchcancel", onTouchCancel, false);
        // Simulate touches with the mouse
        let onMouseShared = (event, type) => {
            if (!this.instance) {
                return;
            }

            let time = 0.001 * (event.timeStamp || performance.now());
            let x = event.clientX * (gfx.viewportWidth / window.innerWidth);
            let y = event.clientY * (gfx.viewportHeight / window.innerHeight);

            if (type == TouchEvent_Move) {
                for (let i = 0; i < 5; i++) {
                    if (event.buttons & (1 << i)) {
                        this.instance.exports.OnTouchEvent(type, time, i, x, y);
                    }
                }
            } else {
                let map = [0, 2, 1, 3, 4];
                this.instance.exports.OnTouchEvent(type, time, map[event.button], x, y);
            }

            return false;
        };
        let onMouseMove = (event) => { onMouseShared(event, TouchEvent_Move); };
        let onMouseDown = (event) => { onMouseShared(event, TouchEvent_Start); };
        let onMouseUp = (event) => { onMouseShared(event, TouchEvent_End); };
        window.addEventListener("mousemove", onMouseMove, false);
        window.addEventListener("mousedown", onMouseDown, false);
        window.addEventListener("mouseup", onMouseUp, false);
        window.addEventListener("contextmenu", (event) => { event.preventDefault(); }, false);

        let onWindowFocus = () => {
            if (this.instance) {
                this.instance.exports.OnFocus();
            }
        };
        window.addEventListener('focus', onWindowFocus, false);

        let resize = () => {
            gfx.resize();
            if (this.instance) {
                this.instance.exports.Resize(gfx.viewportWidth, gfx.viewportHeight, gfx.ppi);
            }
        };
        window.addEventListener('resize', resize, false);
    }

    hotLoad(onComplete) {
        if (this.instance) {
            return onComplete();
        }

        loadFile('main.wasm?'+Math.random(), (arrayBuffer) => {
            WebAssembly.instantiate(arrayBuffer, { 'env': this.env }).then((result) => {
                this.instance = result.instance;
                this.instance.exports.HotLoad(this.wasmContext);
                onComplete();
            });
        });
    }

    hotUnload() {
        if (!this.instance) {
            return;
        }
    
        this.wasmContext = this.instance.exports.HotUnload();
        this.instance = null;
    }

    update(timestamp) {
        if (!this.instance) {
            return;
        }

        this.instance.exports.Update(0.001 * timestamp);
    }
}

export { Bootloader };
