# [Panolens.js](http://pchen66.github.io/Panolens)

[![Release][release-badge]][release-badge-url]
[![License][license-badge]][license-badge-url]
![GzipSize][gzip-size-badge]

### Javascript Panorama Viewer

Panolens.js is an event-driven and WebGL based panorama viewer. Lightweight and flexible. It's built on top of [Three.JS](https://github.com/mrdoob/three.js).

![Panorama Demo](https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens.gif?raw=true)

### Usage

Include `three.min.js` and `panolens.min.js`

```html
<script src="js/three.min.js"></script>
<script src="js/panolens.min.js"></script>
```
This code creates a 360 image panorama. The first panorama added to the viewer will be the entry point. To link panoramas, simply use `panorama.link( other_panorama, new PANOLENS.Vector3( X, Y, Z ) )` to connect the two. See [examples](http://pchen66.github.io/Panolens/) and [documentation](http://pchen66.github.io/Panolens/docs/index.html) for more details.

```html
<script>

	const panorama = new PANOLENS.ImagePanorama( 'asset/equirectangular.jpg' );
	const viewer = new PANOLENS.Viewer();
	viewer.add( panorama );

</script>
```

### PANOLENS.Viewer Configuration
All attributes are optional
```html
<script>
	viewer = new PANOLENS.Viewer({

		// A DOM Element container
		container: document.body,

		// Vsibility of bottom control bar
		controlBar: true,

		// Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
		controlButtons: [],

		// Auto hide control bar
		autoHideControlBar: false,

		// Auto hide infospots
		autoHideInfospot: true,

		// Allow only horizontal camera control
		horizontalView: false,

		// Camera field of view in degree
		cameraFov: 60,

		// Reverse orbit control direction
		reverseDragging: false,

		// Enable reticle for mouseless interaction
		enableReticle: false,

		// Dwell time for reticle selection in millisecond
		dwellTime: 1500,

		// Auto select a clickable target after dwellTime
		autoReticleSelect: true,

		// Adds an angle view indicator in upper left corner
		viewIndicator: false,

		// Size of View Indicator
		indicatorSize: 30,

		// Whether and where to output infospot position. Could be 'console' or 'overlay'
		output: 'console',

		// Auto rotate
		autoRotate: false,

		// Auto rotate speed as in degree per second. Positive is counter-clockwise and negative is clockwise.
		autoRotateSpeed: 2.0,

		// Duration before auto rotatation when no user interactivity in ms
		autoRotateActivationDuration: 5000

	});
</script>
```

### Examples

Check Panolens [example page](http://pchen66.github.io/Panolens/#Example)

Website Example | Codepen Live Exmaple
------------ | -------------
[Image Panorama](https://pchen66.github.io/Panolens/examples/panorama_image.html) | [Custom Widget](https://codepen.io/pchen66/pen/vZVyYr)
[Cube Panorama](https://pchen66.github.io/Panolens/examples/panorama_cube.html) | [Custom Linking](https://codepen.io/pchen66/pen/yXeWMJ)
[Basic Panorama](https://pchen66.github.io/Panolens/examples/panorama_basic.html) | [Custom Infospot](https://codepen.io/pchen66/pen/dRYNNG)
[Google Street View Panorama](https://pchen66.github.io/Panolens/examples/panorama_googlestreetview.html) | [Custom Set Panorama](https://codepen.io/pchen66/pen/RgxeJM)
[Infospot](https://pchen66.github.io/Panolens/examples/panorama_infospot.html) | [Custom Container](https://codepen.io/pchen66/pen/gMmggW)
[Infospot Focus](https://pchen66.github.io/Panolens/examples/panorama_infospot_focus.html) | [Custom Hover Element](https://codepen.io/pchen66/pen/vKvWQV)
[Panorama Linking](https://pchen66.github.io/Panolens/examples/panorama_linking.html) | [Initial Lookat](https://codepen.io/pchen66/pen/LLgxME)
[Panorama Loading Progress](https://pchen66.github.io/Panolens/examples/panorama_loading_progress.html) | [Spaital Audio](https://codepen.io/pchen66/pen/EZjbXq)
[Simple Gallery](https://pchen66.github.io/Panolens/examples/panorama_simple_gallery.html) | [Update Image](https://codepen.io/pchen66/pen/YxeYGZ)
[Little Planet Panorama](https://pchen66.github.io/Panolens/examples/littleplanet_image.html) | [Auto Rotate](https://codepen.io/pchen66/pen/rGpoPv)
[Reticle](https://pchen66.github.io/Panolens/examples/panorama_reticle.html) | [Orbit Control](https://codepen.io/pchen66/pen/JrMxdV)
[Interactive](https://pchen66.github.io/Panolens/examples/panorama_interactive.html) | 
[Storytelling](http://pchen66.github.io/Panolens/examples/panorama_storytelling.html) |
[Memory Leaking Test](http://pchen66.github.io/Panolens/examples/panorama_memoryleak_test.html) |
[PanoTheater](http://pchen66.github.io/PanoTheater) | 

### How to add an infospot (hotspot)

Move cursor on a specific point in a panorama and press `Ctrl` with clicking or hovering, which will generate position (x, y, z) in the console or on the overlay element based on parameter `output='console' or 'overlay'`. See [Panorama Infospot](http://pchen66.github.io/Panolens/examples/panorama_infospot.html) example for creating and attaching infospots.

![Panorama Finding Infospot Position](https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens_add_infospot_480p.gif?raw=true)

### Dependency

Panolens.js includes [Tween.js](https://github.com/tweenjs/tween.js/) by default, meaning `TWEEN` will be available with `windows` object

### How to contribute

Always make your contributions for the latest `dev` branch, not `master`, so it can be tracked for the next release. 

### FAQ

#### PANOLENS.SpriteText (Tile/TileGroup) is not a constructor
`SpriteText`, `Tile`, and `TileGroup` are deprecated after r10. Fundamentally they are compatible with existing `THREE` methods. If you need text rendering, please checkout [Creating text](https://threejs.org/docs/#manual/en/introduction/Creating-text) from three.js

#### Uncaught TypeError: Cannot read property 'TextureLoader' of undefined
`PANOLENS.Utils` is deprecated after r10. `PANOLENS.Utils.TextureLoader` is now `PANOLENS.TextureLoader`.

#### Device orientation not working on my phone
Apple introduced a new Motion & Orientation Access toggle (off by default) after iOS 12.2 under `Settings > Safari > Privacy & Security`. This requires users to turn on maunally to enable DeviceMotionEvent and DeviceOrientationEvent.

[How (and why) to use Motion & Orientation Settings in iOS](https://www.applemust.com/how-and-why-to-use-motion-orientation-settings-in-ios/)

#### Infospot is not visible
Check again if `position` or `scale` property is being set correctly. It's default to and the border of the panorama with scale value as `300`.

#### No sound for `VideoPanorama`
By default the `muted` attribute for video is set to `false` to prevent `DOMException`. [Autoplay Policy Changes](https://developers.google.com/web/updates/2017/09/autoplay-policy-changes) Video `play()` without a user gesture will reject the promise with a DOMException. And the autoplay attribute will also be ignored. Change the default behavior by passing additional options to `VideoPanorama`

```
new PANOLENS.VideoPanorama( 'asset/textures/video/ClashofClans.mp4', { autoplay: true, muted: true });
```

### Support
[![Support][panolens-support]][panolens-support-url]  
https://www.paypal.me/panolens

[release-badge]: https://img.shields.io/github/release/pchen66/panolens.js.svg
[release-badge-url]:https://github.com/pchen66/panolens.js/releases
[license-badge]: https://img.shields.io/github/license/pchen66/panolens.js.svg
[license-badge-url]: ./LICENSE
[gzip-size-badge]: http://img.badgesize.io/https://raw.githubusercontent.com/pchen66/panolens.js/master/build/panolens.min.js?compression=gzip&label=gzip%20size
[panolens-support]: https://pics.paypal.com/00/p/NDIyZmRiMGEtMGQyMy00Y2QzLWI1YWQtZmY1OGI1MzRjNDYw/image_2.PNG
[panolens-support-url]: https://www.paypal.me/panolens