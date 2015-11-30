# Panolens.js

###Javascript Panorama Viewer

This project aims to provide a tool for anyone wants to see panorama, photo-based or virtually created, in a simple and painless way. It's built on top of [Three.JS](https://github.com/mrdoob/three.js). 

![Panorama Video Demo](https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens_video_demo_480p.gif?raw=true)

###Demo
1.	[Panorama Basic](http://pchen66.github.io/Panolens/examples/panorama_basic.html)
2.	[Panorama Cube](http://pchen66.github.io/Panolens/examples/panorama_cube.html)
3.	[Panorama Google Streetview](http://pchen66.github.io/Panolens/examples/panorama_googlestreetview.html)
4.	[Panorama Video](http://pchen66.github.io/Panolens/examples/panorama_video.html)
5.	[Panorama Infospot](http://pchen66.github.io/Panolens/examples/panorama_infospot.html)
6.	[Panorama Linking](http://pchen66.github.io/Panolens/examples/panorama_linking.html)
7.	[Panorama Match 3 Game](http://pchen66.github.io/Panolens/examples/XDiamond/)

###Features

1.	Support equirectangular image
2.	Support cubemap images
3.	Support google streetview with panoId ([How to get Panorama ID](http://stackoverflow.com/questions/29916149/google-maps-streetview-how-to-get-panorama-id))
4.	Support 360 equirectangular video (like youtube/facebook 360 video) even on iOS!
5.	Support text/image/domElement annotations (Infospot)
6.	Built-in Orbit / DeviceOrientation camera controls
7.	Built-in fullscreen and video control widgets

###Usage

Get the minified library (includes libraries already)

```html
<script src="js/panolens.min.js"></script>
```
This code creates a 360 video panorama. The first panorama added to the viewer will be the entry point. To link panoramas, simply use `panorama.link( other_panorama )` to connect the two. See `examples` for more details.

```html
<script>

	var panorama, viewer;

	panorama = new PANOLENS.ImagePanorama( 'equirectangular', 'asset/equirectangular.jpg' );

	viewer = new PANOLENS.Viewer();
	viewer.add( panorama );

</script>
```

###Try it

Simply run it with local server ( or check out three.js [How to run things locally](https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally) )

###How to add infospot (aka hotspot)

Move cursor on a specific point in a panorama and press `Ctrl` with mouse clicking or hovering, which will generate position (x, y, z) in the console. See [Panorama Infospot](http://pchen66.github.io/Panolens/examples/panorama_infospot.html) example for creating and attaching infospots.
![Panorama Finding Infospot Position](https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens_add_infospot_480p.gif?raw=true)

###Dependency

The minified version includes these libraries:

1. [Three.JS](https://github.com/mrdoob/three.js)
	1. [OrbitControls.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/OrbitControls.js)
	2. [DeviceOrientationControl.js](https://github.com/mrdoob/three.js/blob/master/examples/js/controls/DeviceOrientationControls.js)
2. [Tween.js](https://github.com/tweenjs/tween.js/)

###Future
1.	Add AR/VR support