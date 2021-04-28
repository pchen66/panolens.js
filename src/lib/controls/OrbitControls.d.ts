export interface OrbitMouseButton {
  ORBIT: THREE.MOUSE;
  ZOOM: THREE.MOUSE;
  PAN: THREE.MOUSE;
}

export class OrbitControls extends THREE.EventDispatcher {
  object: THREE.Object3D;
  domElement: HTMLElement;
  frameId: string;
  enabled: boolean;
  target: THREE.Vector3;
  center: THREE.Vector3;
  noZoom: boolean;
  zoomSpeed: number;
  minDistance: number;
  maxDistance: number;
  minZoom: number;
  maxZoom: number;
  noRotate: boolean;
  rotateSpeed: number;
  noPan: boolean;
  keyPanSpeed: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  momentumDampingFactor: number;
  momentumScalingFactor: number;
  momentumKeydownFactor: number;
  minFov: number;
  maxFov: number;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
  noKeys: boolean;
  keys: number;
  mouseButtons: OrbitMouseButton;
  STATE: number;
  target0: THREE.Vector3;
  position0: THREE.Vector3;
  zoom0: object;
  changeEvent: object;
  startEvent: object;
  endEvent: object;

  constructor(object?: THREE.Object3D, element?: HTMLElement);

  setLastQuaternion(quaternion: THREE.Quaternion): void;

  getLastPosition(): THREE.Vector3;

  rotateLeft(angle?: number): void;

  rotateUp(angle?: number): void;

  panLeft(distance?: number): void;

  panUp(distance?: number): void;

  pan(deltaX?: number, deltaY?: number): void;

  momentum(): void;

  dollyIn(scale?: number): void;

  dollyOut(scale?: number): void;

  update(ignoreUpdate?: boolean): void;

  reset(): void;

  getPolarAngle(): number;

  getAzimuthalAngle(): number;

  getAutoRotationAngle(): number;

  getZoomScale(): number;

  onMouseDown(event?: MouseEvent): void;

  onMouseMove(event?: MouseEvent): void;

  onMouseUp(): void;

  onMouseWheel(event?: MouseEvent): void;

  onKeyUp(event?: KeyboardEvent): void;

  onKeyDown(event?: KeyboardEvent): void;

  touchstart(event?: TouchEvent): void;

  touchmove(event?: TouchEvent): void;

  touchend(event?: TouchEvent): void;

  dispose(): void;
}
