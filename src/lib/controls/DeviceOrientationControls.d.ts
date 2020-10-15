export class DeviceOrientationControls extends THREE.EventDispatcher {
  changeEvent: any;
  camera: any;
  domElement: any;
  enabled: any;
  deviceOrientation: any;
  screenOrientation: any;
  alpha: any;
  alphaOffsetAngle: any;

  constructor(camera?: THREE.Camera, element?: HTMLElement);

  onDeviceOrientationChangeEvent(event: Event): void;

  onScreenOrientationChangeEvent(): void;

  onTouchStartEvent(event: Event): void;

  onTouchMoveEvent(event: Event): void;

  setCameraQuaternion(quaternion: THREE.Quaternion, alpha: number, beta: number, gamma: number, orient: number): void;

  connect(): void;

  disconnect(): void;

  update(ignoreUpdate: boolean): void;

  updateAlphaOffsetAngle(angle: number): void;

  dispose(): void;
}