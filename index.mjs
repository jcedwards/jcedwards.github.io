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
