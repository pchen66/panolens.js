export class Panorama extends THREE.Mesh {
  type: string;
  ImageQualityLow: number;
  ImageQualityFair: number;
  ImageQualityMedium: number;
  ImageQualityHigh: number;
  ImageQualitySuperHigh: number;
  animationDuration: number;
  defaultInfospotSize: number;
  container: HTMLElement | { container: HTMLElement; };
  loaded: boolean;
  linkedSpots: Infospot[];
  isInfospotVisible: boolean;
  linkingImageURL: string;
  linkingImageScale: number;
  active: boolean;
  infospotAnimation: TWEEN.Tween;

  constructor(geometry?: THREE.Geometry, material?: THREE.Material);

  onClick(event?: PanoramaClickEvent): void;

  setContainer(data: HTMLElement | { container: HTMLElement; }): void;

  onLoad(): void;

  onProgress(progress?: number): void;

  onError(): void;

  getZoomLevel(): number;

  updateTexture(texture: THREE.Texture): void;

  toggleInfospotVisibility(isVisible?: boolean, delay?: number): void;

  setLinkingImage(url?: string, scale?: number): void;

  link(pano: Panorama, position?: THREE.Vector3, imageScale?: number, imageSource?: string): void;

  fadeIn(duration?: number): void;

  fadeOut(duration?: number): void;

  onEnter(): void;

  onLeave(): void;

  dispose(): void;
}
