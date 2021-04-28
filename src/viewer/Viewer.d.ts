export class Viewer extends THREE.EventDispatcher {
  options: ViewerOptions
  container: HTMLElement
  camera: THREE.PerspectiveCamera
  scene: THREE.Scene
  renderer: THREE.WebGLRenderer
  sceneReticle: THREE.Scene
  viewIndicatorSize: number
  reticle: Reticle
  tempEnableReticle: boolean
  mode: number
  panorama: Panorama
  widget: Widget
  hoverObject: HTMLElement
  infospot: Infospot
  pressEntityObject: HTMLElement
  pressObject: HTMLElement
  raycaster: THREE.Raycaster
  raycasterPoint: THREE.Vector2
  userMouse: THREE.Vector2
  updateCallbacks: (() => any)[]
  requestAnimationId: number
  cameraFrustum: THREE.Frustum
  cameraViewProjectionMatrix: THREE.Matrix4
  autoRotateRequestId: number
  outputDivElement: HTMLElement
  touchSupported: boolean
  HANDLER_MOUSE_DOWN: (event?: MouseEvent) => any
  HANDLER_MOUSE_UP: (event?: MouseEvent) => any
  HANDLER_MOUSE_MOVE: (event?: MouseEvent) => any
  HANDLER_WINDOW_RESIZE: (event?: Event) => any
  HANDLER_KEY_DOWN: (event?: KeyboardEvent) => any
  HANDLER_KEY_UP: (event?: KeyboardEvent) => any
  HANDLER_TAP: (event?: MouseEvent) => any
  OUTPUT_INFOSPOT: HTMLElement
  tweenLeftAnimation: TWEEN.Tween
  tweenUpAnimation: TWEEN.Tween
  OrbitControls: OrbitControls
  DeviceOrientationControls: DeviceOrientationControls
  controls: [DeviceOrientationControls, OrbitControls]
  control: OrbitControls
  CardboardEffect: CardboardEffect
  StereoEffect: StereoEffect
  effect: CardboardEffect
  radius: number
  currentPanoAngle: number
  fovAngle: number
  leftAngle: number
  rightAngle: number
  leftX: number
  leftY: number
  rightX: number
  rightY: number
  indicatorD: string

  constructor(options?: ViewerOptions);

  add(object?: THREE.Object3D): void;

  remove(object?: THREE.Object3D): void;

  addDefaultControlBar(array?: string[]): void;

  setPanorama(pano?: Panorama): void;

  eventHandler(event?: Event): void;

  dispatchEventToChildren(event?: Event): void;

  activateWidgetItem(index?: number, mode?: MODES): void;

  enableEffect(mode: MODES): void;

  disableEffect(): void;

  enableReticleControl(): void;

  disableReticleControl(): void;

  enableAutoRate(): void;

  disableAutoRate(): void;

  toggleVideoPlay(pause?: boolean): void;

  setVideoCurrentTime(percentage?: number): void;

  onVideoUpdate(percentage?: number): void;

  addUpdateCallback(fn?: () => any): void;

  removeUpdateCallback(fn?: () => any): void;

  showVideoWidget(): void;

  hideVideoWidget(): void;

  updateVideoPlayButton(paused?: boolean): void;

  addPanoramaEventListener(pano?: Panorama): void;

  setCameraControl(): void;

  getControl(): OrbitControls | DeviceOrientationControls;

  getScene(): THREE.Scene;

  getCamera(): THREE.Camera;

  getRenderer(): THREE.WebGLRenderer;

  getContainer(): HTMLElement;

  getControlId(): string;

  getNextControlId(): string;

  getNextControlIndex(): number;

  setCameraFov(fov: number): void;

  enableControl(index: number): void;

  disableControl(): void;

  toggleNextControl(): void;

  getScreenVector(worldVector: THREE.Vector3): void;

  checkSpriteInViewport(sprite?: THREE.Sprite): void;

  reverseDraggingDirection(): void;

  addReticle(): void;

  tweenControlCenter(vector?: THREE.Vector3, duration?: number, easing?: Easing): void;

  tweenControlCenterByObject(object?: THREE.Object3D, duration?: number, easing?: Easing): void;

  onWindowResize(windoWidth?: number, windowHeight?: number): void;

  addOutputElement(): void;

  outputPosition(): void;

  onMouseDown(event: Event): void;

  onMouseMove(event: Event): void;

  onMouseUp(event: Event): void;

  onTap(event: Event, type: string): void;

  getConvertedIntersect(intersects: THREE.Intersection[]): void;

  hideInfospot(): void;

  toggleControlBar(): void;

  onKeyDown(event: Event): void;

  onKeyUp(): void;

  update(): void;

  render(): void;

  animate(): void;

  onChange(): void;

  registerMouseAndTouchEvents(): void;

  unregisterMouseAndTouchEvents(): void;

  registerReticleEvent(): void;

  unregisterReticleEvent(): void;

  updateReticleEvent(): void;

  registerEventListeners(): void;

  unregisterEventListeners(): void;

  dispose(): void;

  destroy(): void;

  onPanoramaDispose(panorama: Panorama): void;

  loadAsyncRequest(url: string, callback: (event?: ProgressEvent) => any): void;

  addViewIndicator(): void;

  appendControlItem(option: object): void;

  clearAllCache(): void;
}
