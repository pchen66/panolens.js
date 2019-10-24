import test from 'ava';
import { Infospot } from '../../../src/infospot/Infospot';
import { MODES } from '../../../src/Constants';

const clientX = 100;
const clientY = 200;
const container = document.createElement( 'div' );

test('Add Hover Text', t => {
    const text = 'hello panolens!';
    const infospot = new Infospot();
    infospot.addHoverText( text );
    t.is(infospot.element.textContent, text);
});

test('Add Hover Element', t => {
    const element = document.createElement( 'div' );
    const infospot = new Infospot();
    infospot.addHoverElement( element, 10 );
    t.notDeepEqual(element, infospot.element);
});

test('Click Infospot with Hovering Text', t => {
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( container );
    infospot.addEventListener( 'click', () => t.pass() );
    infospot.dispatchEvent( { type: 'click', mouseEvent: { clientX, clientY } });
});

test('Hover Enter and Leave Event', t => {
    t.plan(3);
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( { container } );
    t.is(infospot.container, container);
    infospot.addEventListener( 'hoverenter', () => t.pass() );
    infospot.addEventListener( 'hoverleave', () => t.pass() );
    infospot.dispatchEvent( { type: 'hoverenter', mouseEvent: { clientX, clientY } });
    infospot.dispatchEvent( { type: 'hoverleave', mouseEvent: { clientX, clientY } });
});

test('Dual Eye Effect Event - Normal', t => {
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( container );
    infospot.addEventListener( 'panolens-dual-eye-effect', () => {
        t.not(infospot.element.style.display, 'none');
    } );
    infospot.dispatchEvent( { type: 'panolens-dual-eye-effect', mode: MODES.NORMAL });
});

test('Empty Container', t => {
    const infospot = new Infospot();
    infospot.setContainer();
    infospot.dispatchEvent( { type: 'hoverenter' } );
    infospot.dispatchEvent( { type: 'hoverleave' } );
    infospot.dispatchEvent( { type: 'panolens-dual-eye-effect' } );
    infospot.dispatchEvent( { type: 'hoverenter' } );
    infospot.dispatchEvent( { type: 'hoverleave' } );
    t.falsy(infospot.container);
});

test('Element is not ready when receiving a click', t => {
    const infospot = new Infospot();
    infospot.enableRaycast();
    infospot.dispatchEvent( { type: 'click' } );
    t.falsy(infospot.element);
});

test('Dual Eye Effect Event - Cardboard', t => {
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( container );
    infospot.addEventListener( 'panolens-dual-eye-effect', () => {
        t.truthy(infospot.element.left);
        t.truthy(infospot.element.right);
        t.is(infospot.mode, MODES.CARDBOARD);
        infospot.translateElement( 0, 20 );
    } );
    infospot.dispatchEvent( { type: 'hoverenter', mouseEvent: { clientX, clientY } });
    infospot.dispatchEvent( { type: 'panolens-dual-eye-effect', mode: MODES.CARDBOARD });
    infospot.dispatchEvent( { type: 'hoverleave', mouseEvent: { clientX, clientY } });
    infospot.dispatchEvent( { type: 'hoverenter', mouseEvent: { clientX, clientY } });
    infospot.dispatchEvent( { type: 'hoverleave', mouseEvent: { clientX, clientY } });
});

test('Dispose', t => {
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( container );
    infospot.dispatchEvent( { type: 'panolens-dual-eye-effect', mode: MODES.CARDBOARD });
    infospot.dispose();
    t.falsy(infospot.material);
});

test('Default Values', t => {
    const infospot = new Infospot( 100, null, false );
    const element = document.createElement( 'div' );
    infospot.addHoverElement( element );
    infospot.show();
    infospot.hide();
    t.pass();
});

test('Branch Conditions', t => {
    const infospot = new Infospot( 100, null, false );
    const container = document.createElement( 'div' );
    const element = document.createElement( 'div' );
    element._width = 100;
    element._height = 100;
    element.container = container;
    infospot.element = element;
    infospot.setCursorHoverStyle( 'pointer' );
    infospot.addHoverText();
    infospot.translateElement( 0, 0 );
    infospot.element = undefined;
    infospot.setText();
    infospot.setElementStyle( 'background', element,  '#fff' );
    infospot.setContainer( container );
    infospot.dispatchEvent( { type: 'panolens-dual-eye-effect', mode: MODES.CARDBOARD });
    t.pass();
});

