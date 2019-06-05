# Panolens.js
[![Release][release-badge]][release-badge-url]
[![License][license-badge]][license-badge-url]
![GzipSize][gzip-size-badge]

## Javascript 360 Panorama Viewer

Panolens.js is an event-driven and WebGL based panorama viewer. Lightweight and flexible. It's built on top of [Three.JS](https://github.com/mrdoob/three.js).

[Examples](https://pchen66.github.io/Panolens/#Example) &mdash;
[Documentation](https://pchen66.github.io/panolens.js) &mdash;
[Migration](https://github.com/pchen66/panolens.js/wiki/MigrationGuide) &mdash;
[FAQ](https://github.com/pchen66/panolens.js/wiki/Frequently-Asked-Questions)

<p align="center">
  <img alt= "Panorama Demo" style="object-fit:cover" src="https://github.com/pchen66/pchen66.github.io/blob/master/Panolens/images/panolens.gif?raw=true">
</p>

## Usage

Include `three.min.js` and `panolens.min.js`

```html
<script src="js/three.min.js"></script>
<script src="js/panolens.min.js"></script>
```
The following code generates a 360 image panorama. The first panorama added to the viewer will be the entry point. To link panoramas, use `panorama.link( other_panorama, new THREE.Vector3( X, Y, Z ) )` to connect the two.
```javascript
const panorama = new PANOLENS.ImagePanorama( 'asset/equirectangular.jpg' );
const viewer = new PANOLENS.Viewer();
viewer.add( panorama );
```
 
## Dependency

Panolens.js includes [Tween.js](https://github.com/tweenjs/tween.js/) by default, meaning `TWEEN` will be available with `window` object

## How to contribute

Always make your contributions for the latest `dev` branch, not `master`, so it can be tracked for the next release. 

### **Development**
```
npm start
```

### **Build**
```
npm run build-closure
```

[release-badge]: https://img.shields.io/github/release/pchen66/panolens.js.svg
[release-badge-url]:https://github.com/pchen66/panolens.js/releases
[license-badge]: https://img.shields.io/github/license/pchen66/panolens.js.svg
[license-badge-url]: ./LICENSE
[gzip-size-badge]: http://img.badgesize.io/https://raw.githubusercontent.com/pchen66/panolens.js/master/build/panolens.min.js?compression=gzip&label=gzip%20size
[panolens-support]: https://pics.paypal.com/00/p/NDIyZmRiMGEtMGQyMy00Y2QzLWI1YWQtZmY1OGI1MzRjNDYw/image_2.PNG
[panolens-support-url]: https://www.paypal.me/panolens