
export class Infospot extends THREE.Sprite {
  type: string;
  animated: boolean;
  isHovering: boolean;
  frustumCulled: boolean;
  element: HTMLElement;
  cursorStyle: string;
  mode: number;
  container: HTMLElement | object;
  originalRaycast: THREE.Raycaster;
  HANDLER_FOCUS: null | InfoSpotFocusHandler;
  scaleUpAnimation: TWEEN.Tween;
  scaleDownAnimation: TWEEN.Tween;
  showAnimation: TWEEN.Tween;
  hideAnimation: TWEEN.Tween;

  constructor(scale?: number, imageSrc?: string, animated?: boolean);

  postLoad(texture?: object): void;

  setContainer(data?: HTMLElement | object): void;

  getContainer(): HTMLElement;

  onClick(event?: object): void;

  onDismiss(): void;

  onHover(): void;

  onHoverStart(event?: object): void;

  onHoverEnd(): void;

  onDualEyeEffect(event?: object): void;

  translateElement(x?: number, y?: number): void;

  setElementStyle(type?: string, element?: HTMLElement, value?: string): void;

  setText(text: string): void;

  setCursorHoverStyle(style: string): void;

  addHoverText(text?: string, delta?: number): void;

  addHoverElement(el?: HTMLElement, delta?: number): void;

  removeHoverElement(): void;

  lockHoverElement(): void;

  unlockHoverElement(): void;

  enableRaycast(enabled?: boolean): void;

  show(delay?: number): void;

  hide(delay?: number): void;

  setFocusMethod(event?: { method: InfoSpotFocusHandler; }): void;

  focus(duration?: number, easing?: Easing): void;

  dispose(): void;
}
