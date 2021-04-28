export class LittlePlanet extends ImagePanorama {
  size: number;
  ratio: number;
  EPS: number;
  frameId: number;
  dragging: boolean;
  userMouse: THREE.Vector2;
  quatA: THREE.Quaternion;
  quatB: THREE.Quaternion;
  quatCur: THREE.Quaternion;
  quatSlerp: THREE.Quaternion;
  vectorX: THREE.Vector3;
  vectorY: THREE.Vector3;

  constructor(type: string, source: string, size?: number, ratio?: number);

  createGeometry(size: number, ratio: number): THREE.PlaneBufferGeometry;

  createMaterial(size: number): THREE.ShaderMaterial;

  registerMouseEvents(): void;

  unregisterMouseEvents(): void;

  addZoomDelta(delta: number): void;
}
