# Deprecated

This repository will be deprecated due to the rapidly evolving JavaScript ecosystem and the increasing difficulty of keeping up with the changes in the Three.js API.

Over the years, the Three.js library has undergone significant updates and improvements, introducing new features and optimizations. However, these advancements have also led to changes in the API, making it challenging for us to maintain this repository effectively.

We understand that this may be disappointing news for those who have relied on this repository for their projects. We apologize for any inconvenience this may cause.

To ensure that you can continue to benefit from the latest updates and improvements in the Three.js library, we recommend using the official Three.js documentation and resources. The official documentation provides comprehensive guides, examples, and API references to help you leverage the full potential of Three.js in your projects.

Here are some alternative resources that we recommend:

- [Official Three.js Documentation](https://threejs.org/docs/)
- [Three.js GitHub Repository](https://github.com/mrdoob/three.js/)
- [Three.js Discourse](https://discourse.threejs.org/)

We want to express our gratitude to the community for your support and contributions to this repository. We encourage you to migrate your projects to alternative solutions as there are many more Javascript-based panorama viewer nowadays compared to 2015.

This repository will remain available for historical purposes, but no further updates or bug fixes will be provided. We encourage you to fork this repository if you wish to continue maintaining it independently.

Thank you for your understanding and continued support.

# Panolens.js

[![NPM package][npm]][npm-url]
[![License][license]][license-url]
[![Bundle Size][bundle-size]][bundle-size-url]
[![Build Status][build-status]][build-status-url]
[![Dependencies][dependencies]][dependencies-url]
[![Dev Dependencies][dev-dependencies]][dev-dependencies-url]
[![Language Grade][lgtm]][lgtm-url]
[![Coverage][coverage]][coverage-url]

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

To find the correct supported versions, please check `dependencies` section in `package.json` or acess `PANOLENS.VERSION` or `PANOLENS.THREE_VERSION` at runtime.

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

[npm]: https://img.shields.io/npm/v/panolens.svg
[npm-url]:https://www.npmjs.com/package/panolens
[license]: https://img.shields.io/github/license/pchen66/panolens.js.svg
[license-url]: ./LICENSE
[bundle-size]: https://badgen.net/bundlephobia/minzip/panolens
[bundle-size-url]: https://bundlephobia.com/result?p=panolens
[build-status]: https://travis-ci.com/pchen66/panolens.js.svg?branch=dev
[build-status-url]: https://travis-ci.com/pchen66/panolens.js
[dependencies]: https://img.shields.io/david/pchen66/panolens.js.svg
[dependencies-url]: https://david-dm.org/pchen66/panolens.js
[dev-dependencies]: https://img.shields.io/david/dev/pchen66/panolens.js.svg
[dev-dependencies-url]: https://david-dm.org/pchen66/panolens.js?type=dev
[lgtm]: https://img.shields.io/lgtm/grade/javascript/g/pchen66/panolens.js.svg?logo=lgtm&logoWidth=18&label=code%20quality
[lgtm-url]: https://lgtm.com/projects/g/pchen66/panolens.js/context:javascript
[coverage]: https://coveralls.io/repos/github/pchen66/panolens.js/badge.svg?branch=dev
[coverage-url]: https://coveralls.io/github/pchen66/panolens.js?branch=dev
[panolens-support]: https://pics.paypal.com/00/p/NDIyZmRiMGEtMGQyMy00Y2QzLWI1YWQtZmY1OGI1MzRjNDYw/image_2.PNG
[panolens-support-url]: https://www.paypal.me/panolens