export class CardboardEffect {
  constructor(renderer: THREE.WebGLRenderer);

  setSize(width: number, height: number): void;

  render(scene: THREE.Scene, camera: THREE.Camera): void;
}
