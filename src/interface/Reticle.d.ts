export class Reticle extends THREE.Sprite {
  dpr: number
  canvasWidth: number
  canvasHeight: number
  context: CanvasRenderingContext2D
  color: THREE.Color
  autoSelect: boolean
  dwellTime: number
  rippleDuration: number
  startTimestamp: number
  timerId: number
  frustumCulled: boolean;
  callback: undefined | (() => any)

  constructor(color?: THREE.Color, autoSelect?: boolean, dwellTime?: number);

  setColor(color: THREE.Color): void;

  createCanvasTexture(canvas: THREE.CanvasTexture): THREE.CanvasTexture;

  createCanvas(): HTMLCanvasElement;

  updateCanvasArcByProgress(progress: number): void;

  ripple(): void;

  show(): void;

  hide(): void;

  start(callback?: () => any): void;

  end(): void;

  update(): void;
}
