import { Bootloader } from './bootloader.mjs';
import { Gfx } from './gfx.mjs';

let bootloader = new Bootloader();
let gfx = null;
let hotLoading = false;
let hotLoadIndicator = null;

//-----------------------------------------------------------------------------
// HotLoadIndicator
//-----------------------------------------------------------------------------
class HotLoadIndicator {
    constructor(parentElement) {
        this.elem = document.createElement('div');
        this.elem.style = `
            display: none;
            position: fixed;
            top: 0.45em;
            left: 50%;
            transform: translateX(-50%);
            font: 3em bolder, sans-serif;
            text-shadow: 0px 0px 0.5em;
        `;
        this.elem.innerText = 'Hot Loading';
        parentElement.appendChild(this.elem);
        this.fadeTime = 0.0;
        this.fadeDuration = 0.0;
    }

    setState(state) {
        this.elem.style.display = 'block';
        this.elem.style.color = state == 'failed' ? 'FireBrick' : 'Gold';
        this.elem.style.fontSize = state == 'failed' ? '4em' : '3em';
        this.elem.style.top = state == 'failed' ? '0.15em' : '0.45em';
        this.elem.style.opacity = 1.0;
        this.elem.innerText = state == 'failed' ? 'Failed' : 'Hot Loading';
        this.fadeTime = state == 'hot-loading' ? 0.0 : (performance.now() + (state == 'failed' ? 500.0 : 0.0));
        this.fadeDuration = state == 'failed' ? 1100.0 : 333.0;
    }

    update(timestamp) {
        if (timestamp - this.fadeTime < this.fadeDuration) {
            let t = Math.PI * Math.max(0.0, timestamp - this.fadeTime) / this.fadeDuration;
            this.elem.style.opacity = 0.5 + 0.5 * Math.cos(t);
        } else if (this.fadeTime != 0.0) {
            this.fadeTime = 0.0;
            this.elem.style.display = 'none';
        }
    }
}

//-----------------------------------------------------------------------------
// Debug websocket
//-----------------------------------------------------------------------------
console.log('ws://'+window.location.hostname+':8080');
let debugUrl = 'ws://'+window.location.hostname+':8080';
let debugSocket = new WebSocket(debugUrl);
debugSocket.binaryType = "arraybuffer";
debugSocket.onclose = (event) => {
    console.log("ConnectionToServer.onclose");
    debugSocket = null;
};
debugSocket.onerror = (event) => {
    console.log("ConnectionToServer.onerror:", event.data);
};
debugSocket.onmessage = (event) => {
    let data = JSON.parse(event.data)
    console.log('data', data);

    if (data.cmd == 'prepare-hot-load') {
        hotLoading = true;
        hotLoadIndicator.setState('hot-loading');
    } else if (data.cmd == 'cancel-hot-load') {
        hotLoading = false;
        hotLoadIndicator.setState('failed');
    } else if (data.cmd == 'hot-load') {
        console.log('Hot loading ...');
        let hotLoadCpp = (onComplete) => {
            if (data.cpp.length == 0) { return onComplete(); }
            bootloader.hotUnload();
            bootloader.hotLoad(onComplete);
        };
        let hotLoadShaders = (onComplete) => {
            if (data.shaders.length == 0) { return onComplete(); }
            fetch('./shaders.mjs').then(response => {
                return response.text();
            }).then(text => {
                let newShaders;
                eval(text.replace('var Shaders', 'newShaders').replace('export { Shaders };', ''));
                gfx.hotLoadShaders(newShaders, data.shaders);
                onComplete();
            });
        };
        hotLoadCpp(() => {
            hotLoadShaders(() => {
                console.log('... Complete!');
                hotLoading = false;
                hotLoadIndicator.setState('complete');
            });
        });
    } else {
        console.log('Unknown debug message: ', event.data);
    }
};
debugSocket.onopen = (event) => {
};

//-----------------------------------------------------------------------------
// Update loop
//-----------------------------------------------------------------------------
function update(timestamp) {
    if (!hotLoading) {
        bootloader.update(timestamp);
    }
    hotLoadIndicator.update(timestamp);
    window.requestAnimationFrame(update);
}

document.addEventListener("DOMContentLoaded", function(event) {
    // Init ...
    gfx = new Gfx(document.body);
    bootloader.init(gfx);
    hotLoadIndicator = new HotLoadIndicator(document.body);

    // Kick off an update loop
    window.requestAnimationFrame(update);
});
