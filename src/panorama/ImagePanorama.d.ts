import * as THREE from 'three';
import { Panorama } from './Panorama';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';

export class ImagePanorama extends Panorama {
  src: string | HTMLElement;
  radius: number;

  constructor(image: string | HTMLImageElement, geometry?: Geometry, material?: THREE.Material);

  onLoad(src?: THREE.Texture): void;

  load(src: string | HTMLImageElement): void;

  reset(): void;
}
