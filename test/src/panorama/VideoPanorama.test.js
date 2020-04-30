import test from 'ava';
import { join } from 'path';
import { VideoPanorama } from '../../../src/panorama/VideoPanorama';

const localImageFolder = '../../../example/asset/textures/video';
const videoURL = join( __dirname, localImageFolder, '1941-battle-low.mp4' );

test.cb('Load Event', t => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'loaded', () => t.end() );
    panorama.load();
});

test.cb('Video Play and Pause', t => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'loaded', () => {
        const element = panorama.getVideoElement();
        const percentage = 0.5;
        t.true(panorama.isVideoPaused());
        panorama.setVideoCurrentTime( { percentage } );
        t.is(element.currentTime, element.duration * percentage);
        panorama.resumeVideoProgress();
        t.true(panorama.isVideoPaused());
        panorama.playVideo();
        t.false(panorama.isVideoPaused());
        panorama.pauseVideo();
        t.true(panorama.isVideoPaused());
        panorama.toggleVideo();
        t.false(panorama.isVideoPaused());
        panorama.resetVideo();
        t.is(element.currentTime, 0);
        t.end();
    } );
    panorama.load();
});

test.cb('Video AutoPlay', t => {
    const panorama = new VideoPanorama( videoURL, { autoplay: true } );
    panorama.addEventListener( 'loaded', () => {
        const percentage = 0.7;
        panorama.setVideoCurrentTime( { percentage } );
        panorama.resumeVideoProgress();
        t.false(panorama.isVideoPaused());
        t.end();
    } );
    panorama.load();
});

test.cb('Video Mute and Unmute', t => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'loaded', () => {
        t.true(panorama.isVideoMuted());
        panorama.unmuteVideo();
        t.false(panorama.isVideoMuted());
        panorama.muteVideo();
        t.true(panorama.isVideoMuted());
        t.end();
    } );
    panorama.load();
});

test.cb('Preloaded Video', t => {
    const videoElement = document.createElement( 'video' );
    videoElement.readyState = 3;
    const panorama = new VideoPanorama( videoURL, { videoElement } );
    panorama.addEventListener( 'loaded', () => t.end() );
    panorama.load();
});

test.cb('Video Non Loopable Video', t => {
    const panorama = new VideoPanorama( videoURL, { loop: false } );

    panorama.addEventListener( 'loaded', () => {
        panorama.playVideo();
        setTimeout( ()=> {
            t.end();
        }, 5000 );
    } );
    panorama.load();
});

test('Set Empty Video Texture', t => {
    const panorama = new VideoPanorama( videoURL );
    const texture = panorama.setVideoTexture( null );
    t.falsy(texture);
});

test.cb('Reset', t => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'loaded', () => {
        panorama.reset();
        t.falsy(panorama.getVideoElement());
        panorama.dispatchEvent( { type: 'video-toggle' } );
        t.end();
    } );
    panorama.load();
});

test.cb('Dispose', t => {
    const panorama = new VideoPanorama( videoURL );
    panorama.addEventListener( 'loaded', () => {
        panorama.dispose();
        t.falsy(panorama.geometry);
        t.falsy(panorama.material);
        t.falsy(panorama.parent);
        t.end();
    } );
    panorama.load();
});