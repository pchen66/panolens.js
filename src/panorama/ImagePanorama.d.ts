export class ImagePanorama extends Panorama {
  src: string | HTMLElement;
  radius: number;

  constructor(image: string | HTMLImageElement, geometry?: THREE.Geometry, material?: THREE.Material);

  onLoad(src?: THREE.Texture): void;

  load(src: string | HTMLImageElement): void;

  reset(): void;
}
