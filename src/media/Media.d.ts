export class Media extends THREE.EventDispatcher {
  constructor(constraints?: MediaStreamConstraints);

  constraints: MediaStreamConstraints
  container: HTMLElement
  scene: THREE.Scene
  element: HTMLVideoElement
  devices: MediaDeviceInfo[]
  stream: MediaStream
  ratioScalar: number
  videoDeviceIndex: number

  setScene(scene: THREE.Scene): void;

  setContainer(container: HTMLElement): void;

  enumerateDevices(): Promise<MediaDeviceInfo[]>;

  switchNextVideoDevice(): void;

  getDevices(type?: string): Promise<MediaDeviceInfo[]>;

  getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>;

  setVideDeviceIndex(index: number): void;

  start(targetDevice?: MediaDeviceInfo): Promise<MediaDeviceInfo[]>;

  stop(): void;

  setMediaStream(stream?: MediaStream): void;

  playVideo(): void;

  pauseVideo(): void;

  createVideoTexture(): THREE.VideoTexture;

  createVideoElement(): HTMLVideoElement;

  onWindowResize(event?: Event): void;
}
