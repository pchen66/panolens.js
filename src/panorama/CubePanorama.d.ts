export class CubePanorama extends Panorama {
  images: string[];
  edgeLength: number;

  constructor(images: string[]);

  load(): void;

  dispose(): void;
}
