import test from 'ava';
import { Widget } from '../../../src/widget/Widget';
import { DataImage } from '../../../src/DataImage';
import { CONTROLS } from '../../../src/Constants';

const fullscreenSupported = !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
const commonEventProperties = { preventDefault: () => {}, stopPropagation: () => {} };
const clickEvent = { type: 'click', ...commonEventProperties, clientX: 3, clientY: 3 };
const mousedownEvent = { type: 'mousedown', ...commonEventProperties, clientX: 3, clientY: 3 };
const mousemoveEvent = { type: 'mousemove', ...commonEventProperties, clientX: 5, clientY: 3 };
const mouseupEvent = { type: 'mouseup', ...commonEventProperties, clientX: 5, clientY: 3 };

test('Add Control Bar', t => {
    const container = document.createElement( 'div' );
    const widget = new Widget( container );
    widget.addControlBar();
    t.true(container.contains(widget.barElement));
});

test('Add Supported Buttons', t => {
    const container = document.createElement( 'div' );
    const widget = new Widget( container );
    widget.addControlBar();
    widget.addControlButton( 'fullscreen' );
    widget.addControlButton( 'setting' );
    widget.addControlButton( 'video' );
    const { barElement, fullscreenElement, videoElement, settingElement, mask } = widget;
    t.true(container.contains(barElement));
    t.is(barElement.contains(fullscreenElement), fullscreenSupported);
    t.true(barElement.contains(videoElement));
    t.true(barElement.contains(settingElement));
});

test('Buttons Click Events - Setting / Mask', t => {
    const container = document.createElement( 'div' );
    const widget = new Widget( container );
    widget.addControlBar();
    widget.addControlButton( 'setting' );

    const { settingElement, mask } = widget;
    t.is(mask.style.display, 'none');
    settingElement.dispatchEvent( clickEvent );
    t.is(mask.style.display, 'block');
    mask.dispatchEvent( clickEvent );
});

test('Buttons Click Events - Fullscreen', t => {
    document.fullscreenEnabled = true;                  // Emulate fullscreen supported
    const container = document.createElement( 'div' );
    const widget = new Widget( container );
    widget.addControlBar();
    widget.addControlButton( 'fullscreen' );

    const { fullscreenElement } = widget;
    fullscreenElement.dispatchEvent( clickEvent );
    t.true(fullscreenElement.style.backgroundImage.includes( DataImage.FullscreenLeave ) ); 
    fullscreenElement.dispatchEvent( clickEvent );
    t.true(fullscreenElement.style.backgroundImage.includes( DataImage.FullscreenEnter ) ); 

    document.dispatchEvent( { type: 'fullscreenchange' } );
    document.fullscreenEnabled = false;
});

test.cb('Buttons Click Events - Video Control', t => {
    const container = document.createElement( 'div' );
    const dispatchMouseUp = () => { container.dispatchEvent( mouseupEvent ); };
    const dispatchMouseMove = () => { container.dispatchEvent( mousemoveEvent ); };
    const widget = new Widget( container );
    widget.addControlBar();
    widget.addControlButton( 'video' );

    const { videoElement: { controlButton, seekBar } } = widget;
    const { progressElement, progressElementControl } = seekBar;
    controlButton.dispatchEvent( clickEvent );    
    t.is(controlButton.paused, false);
    
    // Emulate a click event on seekbar
    seekBar.dispatchEvent( Object.assign({}, clickEvent, {target: progressElement} ));

    // Emulate a mouse dragging
    progressElementControl.dispatchEvent( mousedownEvent );
    window.requestAnimationFrame( () => {
        dispatchMouseMove();
        window.requestAnimationFrame( () => {
            dispatchMouseUp();
            t.end();
        } );
    } );
});

test.cb('Menu Interaction', t => {
    const container = document.createElement( 'div' );
    const widget = new Widget( container );
    widget.addControlBar();
    t.truthy(widget.mainMenu);
    t.true(widget.mainMenu.children instanceof Array);
    t.is(widget.mainMenu.children.length, 2);
    const controlItem = widget.mainMenu.children[0];
    controlItem.dispatchEvent( clickEvent );
    t.is(widget.activeMainItem, controlItem);
    const sensorItem = controlItem.subMenu.children[2];
    widget.addEventListener( 'panolens-viewer-handler', ({ method, data }) => {
        t.is(method, 'enableControl');
        t.is(data, CONTROLS.DEVICEORIENTATION);
        t.end();
    } );
    setTimeout(() => {
        sensorItem.dispatchEvent( clickEvent );
    }, 300);
});
