export class GoogleStreetviewLoader {
  result: google.maps.StreetViewPanoramaData;
  rotation: number;
  copyright: string;
  levelsW: number[];
  levelsH: number[];
  widths: number[];
  heights: number[];
  maxW: number;
  maxH: number;
  canvas: HTMLCanvasElement;
  panoId: string;
  zoom: number;

  constructor(parameters: { useWebGL: boolean; });

  setProgress(loaded: number, total: number): void;

  adaptTextureToZoom(): void;

  composeFromTile(x: number, y: number, texture: any): void;

  progress(): void;

  composePanorama(): void;

  load(panoid: string): void;

  loadPano(id: string): void;

  setZoom(z: number): void;
}
