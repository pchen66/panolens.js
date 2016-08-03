# [Panolens.js](http://pchen66.github.io/Panolens)

###Javascript Panorama Viewer

Panolens.js is an event-driven and WebGL based panorama viewer. It's built on top of [Three.JS](https://github.com/mrdoob/three.js). 

![Panorama Demo](https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens.gif?raw=true)

###Usage

Include `three.min.js` and `panolens.min.js`

```html
<script src="js/three.min.js"></script>
<script src="js/panolens.min.js"></script>
```
This code creates a 360 image panorama. The first panorama added to the viewer will be the entry point. To link panoramas, simply use `panorama.link( other_panorama )` to connect the two. See [examples](http://pchen66.github.io/Panolens/) and [documentation](http://pchen66.github.io/Panolens/docs/index.html) for more details.

```html
<script>

	var panorama, viewer;

	panorama = new PANOLENS.ImagePanorama( 'asset/equirectangular.jpg' );

	viewer = new PANOLENS.Viewer();
	viewer.add( panorama );

</script>
```

###PANOLENS.Viewer Configuration
All attributes are optional
```html
<script>
	viewer = new PANOLENS.Viewer({
		container: document.body,	// A DOM Element container
		controlBar: true, 			// Vsibility of bottom control bar
		controlButtons: [],			// Buttons array in the control bar. Default to ['fullscreen', 'setting', 'video']
		autoHideControlBar: false,	// Auto hide control bar
		autoHideInfospot: true,		// Auto hide infospots
		horizontalView: false,		// Allow only horizontal camera control
		cameraFov: 60,				// Camera field of view in degree
		reverseDragging: false,		// Reverse orbit control direction
		enableReticle: false,		// Enable reticle for mouseless interaction
		dwellTime: 1500,			// Dwell time for reticle selection in millisecond
		autoReticleSelect: true,	// Auto select a clickable target after dwellTime
		passiveRendering: false,	// Render only when control triggered by user input 
	});
</script>
```

###Examples

Check Panolens [example page](http://pchen66.github.io/Panolens/#Example)

###Features

1.	Support equirectangular image
2.	Support cubemap images
3.	Support google streetview with panoId ([How to get Panorama ID](http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id))
4.	Support 360 equirectangular video (like youtube/facebook 360 video) even on iOS!
5.	Support text/image/domElement annotations (Infospot)
6.	Built-in Orbit / DeviceOrientation camera controls
7.	Built-in fullscreen and video control widgets
8.	Convert equirectangular image into little planet (Stereographic projection)

###How to add an infospot (hotspot)

Move cursor on a specific point in a panorama and press `Ctrl` with mouse clicking or hovering, which will generate position (x, y, z) in the console. See [Panorama Infospot](http://pchen66.github.io/Panolens/examples/panorama_infospot.html) example for creating and attaching infospots.

![Panorama Finding Infospot Position](https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens_add_infospot_480p.gif?raw=true)

###Dependency

Panolens.js includes [Tween.js](https://github.com/tweenjs/tween.js/) by default

###How to contribute

Always make your contributions for the latest `dev` branch, not `master`, so it can be tracked for the next release. 

###Roadmap
1.	Add dwell animation
2.	npm packaging
3.	infospot editor