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
    t.plan(2);
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( container );
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

test('Dual Eye Effect Event - Cardboard', t => {
    const infospot = new Infospot();
    infospot.addHoverText( 'panolens' );
    infospot.setContainer( container );
    infospot.addEventListener( 'panolens-dual-eye-effect', () => {
        t.truthy(infospot.element.left);
        t.truthy(infospot.element.right);
    } );
    infospot.dispatchEvent( { type: 'hoverenter', mouseEvent: { clientX, clientY } });
    infospot.dispatchEvent( { type: 'panolens-dual-eye-effect', mode: MODES.CARDBOARD });
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

