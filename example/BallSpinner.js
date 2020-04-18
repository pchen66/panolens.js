/**
 * @author knee-cola / https://github.com/knee-cola
 * Original file URL: https://gist.github.com/knee-cola/37875bc4359609b96c9f329cd2a68fa1
 *
 * This is a spinner/loader built for Three.js platform.
 * It can be used to notify user that some resources are being loaded.
 * I made it to replace pure CSS spinner, which was displayed in the
 * overlay above the 3D animation, since it was slowing down WebGL
 *
 * How to use:
 *    // creating a new spinner
 *    var spinLoader = new THREE.BallSpinLoader({ groupRadius:20 });
 *    // add spinner to the scene
 *    spinLoader.addToScene(scene);
 *
 *   // add it to the render funcion
 *   function render() {
 *
 *      requestAnimationFrame( render );
 *
 *     // make it spin
 *     spinLoader.animate();
 *
 *     renderer.render( scene, camera );
 *   }
 * 
 */

export function BallSpinerLoader (config) {
  config = config  || {};

  this.groupRadius = config.groupRadius || 20;
  this.circleCount = config.circleCount || 8;
  this.circleRadius = config.circleRadius || 5;
  this.stage2 = false;
  this.groupAngle = 0;
  // circles depending on their opacity will
  // have higer or lower opacity
  // [depth] defines the amplitude
  this.animationDepth = config.animationDepth || 80;
  
  this.circles = [];
  this.mesh = this.initGroup();

  this.enableStage2 = function (setEnabled) {
    this.stage2 = setEnabled;
  }

};

BallSpinerLoader.prototype = {
  makeCircle: function(config) {
    config = config || {};
    var circleRadius = config.radius || 5,
        circleSegments = config.segments || 16, //<-- Increase or decrease for more resolution I guess
        circleGeometry = new THREE.CircleGeometry( circleRadius, circleSegments ),
        circleMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent:true, opacity: config.opacity, side: THREE.DoubleSide });

    return({
      mesh: new THREE.Mesh(circleGeometry, circleMaterial),
      opacityStep: config.opacityStep || 0.01
    });
  },
  addToScene:function(scene) {
    scene.add(this.mesh);
  },
  initGroup: function() {
    var mesh = new THREE.Object3D(),
        // the opacity will be distributed symetrically
        // with maximum on one side of the circle group
        // and minimum at the opposite side
        currOpacity = 0,
        opacityStep = 1 / (this.circleCount/2+1),
        // opacity will be animated - here we define how fast
        animationStep = 0.02,
        // circles are distributed evenly around the group edge
        currAngle = 0,
        angleStep = 2*Math.PI / this.circleCount;

    for(var i=0;i<this.circleCount;i++) {

      currOpacity+=opacityStep;

      if(currOpacity>1) {
      // IF the max opacity has been reached
      // > go into oposit direction
        currOpacity = 1-opacityStep;
        opacityStep = -opacityStep;
        // reverse the opacity animation direction,
        // so that the second halve of the circles
        // is on the fade-out direction
        // ... the net result that the opacity minimum/maximum
        // will rotate around the group
        animationStep = -animationStep;
      }

      var oneCircle = this.makeCircle({opacity:currOpacity, opacityStep: animationStep, radius: this.circleRadius});

      // oneCircle.rotation.x = Math.PI / 4; // rotiram krug tako da bude položen na ravninu
      var pos = this.polar2cartesian({ distance: this.groupRadius, radians: currAngle});
      oneCircle.mesh.position.set(pos.x, pos.y, currOpacity*this.animationDepth);

      currAngle+=angleStep;

      mesh.add(oneCircle.mesh);
      this.circles.push(oneCircle);
    }

    return(mesh);
  },
  polar2cartesian: function(polar) {
    return({
      x: Math.round(polar.distance * Math.cos(polar.radians)*1000)/1000,
      y: Math.round(polar.distance * Math.sin(polar.radians)*1000)/1000
    });
  },
  animate: function() {
    this.mesh.rotation.z+=0.02;
    var circles = this.circles;
    var zStep = 50 / (this.circleCount/2+1);

    for(var i=0; i<circles.length; i++) {
      var oneCircle = circles[i],
          newOpacity = oneCircle.mesh.material.opacity + oneCircle.opacityStep,
          newRadius = oneCircle.mesh.geometry.radius;

      if(newOpacity>1) {
        newOpacity = 1-oneCircle.opacityStep;
        oneCircle.opacityStep=-oneCircle.opacityStep;
      } else if(newOpacity<0) {
        newOpacity = oneCircle.opacityStep;
        oneCircle.opacityStep=-oneCircle.opacityStep;
      }

      oneCircle.mesh.material.opacity = newOpacity;
      oneCircle.mesh.position.z = newOpacity*this.animationDepth;
    }
  }
}; 