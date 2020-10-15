export class StereoEffect {
  constructor(renderer: THREE.WebGLRenderer);

  setEyeSeparation(eyeSep: number): void;

  setSize(width: number, height: number): void;

  render(scene: THREE.Scene, camera: THREE.Camera): void;
}
