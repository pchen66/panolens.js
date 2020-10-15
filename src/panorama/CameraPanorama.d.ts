export class CameraPanorama extends Panorama {
  media: Media;
  radius: number;

  constructor(constraints: MediaStreamConstraints);

  onPanolensContainer(container: { container: HTMLElement, [key: string]: any; }): void;

  onPanolensScene(scene: { scene: THREE.Scene, [key: string]: any; }): void;

  start(): Promise<MediaDeviceInfo[]>;

  stop(): void;
}
