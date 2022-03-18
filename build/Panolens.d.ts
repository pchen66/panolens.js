import * as THREE from 'three';
import { Geometry } from 'three/examples/jsm/deprecated/Geometry';
import * as TWEEN$1 from '@tweenjs/tween.js';

/**
 * REVISION
 * @module REVISION
 * @example PANOLENS.REVISION
 * @type {string} revision
 */
declare const REVISION: string;
/**
 * VERSION
 * @module VERSION
 * @example PANOLENS.VERSION
 * @type {string} version
 */
declare const VERSION: string;
/**
 * THREEJS REVISION
 * @module THREE_REVISION
 * @example PANOLENS.THREE_REVISION
 * @type {string} threejs revision
 */
declare const THREE_REVISION: string;
/**
 * THREEJS VERSION
 * @module THREE_VERSION
 * @example PANOLENS.THREE_VERSION
 * @type {string} threejs version
 */
declare const THREE_VERSION: string;
declare namespace CONTROLS {
    const ORBIT: number;
    const DEVICEORIENTATION: number;
}
declare namespace MODES$1 {
    const UNKNOWN: number;
    const NORMAL: number;
    const CARDBOARD: number;
    const STEREO: number;
}
declare namespace CONTROL_BUTTONS {
    const FULLSCREEN: string;
    const SETTING: string;
    const VIDEO: string;
}
declare namespace OUTPUTS {
    const NONE: string;
    const CONSOLE: string;
    const OVERLAY: string;
}

declare namespace DataImage {
    const Info: string;
    const Arrow: string;
    const FullscreenEnter: string;
    const FullscreenLeave: string;
    const VideoPlay: string;
    const VideoPause: string;
    const WhiteTile: string;
    const Setting: string;
    const ChevronRight: string;
    const Check: string;
    const ViewIndicator: string;
}

interface ImageLoader {
  load(
    url: string,
    onLoad?: (image?: HTMLElement) => any,
    onProgress?: LoaderProgressHandler,
    onError?: (error?: any) => any,
  ): HTMLElement;
}

interface TextureLoader {
  load(
    url: string,
    onLoad?: (texture?: THREE.Texture) => any,
    onProgress?: LoaderProgressHandler,
    onError?: (error?: any) => any,
  ): THREE.Texture;
}

interface CubeTextureLoader {
  load(
    urls: string[],
    onLoad?: (texture?: THREE.Texture) => any,
    onProgress?: LoaderProgressHandler,
    onError?: (error?: any) => any,
  ): THREE.Texture;
}

declare class Media$1 extends THREE.EventDispatcher {
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

declare class Reticle extends THREE.Sprite {
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

declare class Infospot extends THREE.Sprite {
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

declare class Widget extends THREE.EventDispatcher {
  DEFAULT_TRANSITION: string
  TOUCH_ENABLED: boolean
  container: HTMLElement
  barElement: HTMLElement
  fullscreenElement: HTMLElement
  videoElement: HTMLElement
  settingElement: HTMLElement
  mainMenu: HTMLElement
  activeMainItem: HTMLElement
  activeSubMenu: HTMLElement
  mask: HTMLElement

  constructor(container?: HTMLElement)

  PREVENT_EVENT_HANDLER(event?: EventListener): void;

  addControlBar(): void;

  createDefaultMenu(): void;

  addControlButton(name?: string): void;

  createMask(): void;

  createSettingButton(): void;

  createFullscreenButton(): HTMLElement;

  createVideoControl(): HTMLElement;

  createVideoControlButton(): HTMLElement;

  createVideoControlSeekbar(): HTMLElement;

  createMenuItem(title?: string): HTMLElement;

  createMenuItemHeader(title?: string): HTMLElement;

  createMainMenu(menus?: HTMLElement[]): HTMLElement;

  createSubMenu(title?: string, items?: HTMLElement[]): void;

  createMenu(): HTMLElement;

  createCustomItem(options: WidgetCustomItemOptions): HTMLElement;

  mergeStyleOptions(element: HTMLElement, options: CSSStyleDeclaration): HTMLElement;

  dispose(): void;
}

declare class Panorama$1 extends THREE.Mesh {
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
  infospotAnimation: TWEEN$1.Tween;

  constructor(geometry?: Geometry, material?: THREE.Material);

  onClick(event?: PanoramaClickEvent): void;

  setContainer(data: HTMLElement | { container: HTMLElement; }): void;

  onLoad(): void;

  onProgress(progress?: number): void;

  onError(): void;

  getZoomLevel(): number;

  updateTexture(texture: THREE.Texture): void;

  toggleInfospotVisibility(isVisible?: boolean, delay?: number): void;

  setLinkingImage(url?: string, scale?: number): void;

  link(pano: Panorama$1, position?: THREE.Vector3, imageScale?: number, imageSource?: string): void;

  fadeIn(duration?: number): void;

  fadeOut(duration?: number): void;

  onEnter(): void;

  onLeave(): void;

  dispose(): void;
}

declare class ImagePanorama$1 extends Panorama$1 {
  src: string | HTMLElement;
  radius: number;

  constructor(image: string | HTMLImageElement, geometry?: Geometry, material?: THREE.Material);

  onLoad(src?: THREE.Texture): void;

  load(src: string | HTMLImageElement): void;

  reset(): void;
}

declare class EmptyPanorama {
}

declare class CubePanorama$1 extends Panorama$1 {
  images: string[];
  edgeLength: number;

  constructor(images: string[]);

  load(): void;

  dispose(): void;
}

declare class BasicPanorama extends CubePanorama {
}

interface VideoPanoramaOptions {
  videoElement: HTMLVideoElement;
  loop: boolean;
  muted: boolean;
  autoplay: boolean;
  playsinline: boolean;
  crossOrigin: string;
}

declare class VideoPanorama extends Panorama {
  src: string;
  options: VideoPanoramaOptions;
  videoElement: HTMLVideoElement;
  videoProgress: number;
  radius: number;

  constructor(src: string, options?: VideoPanoramaOptions);

  load(): void;

  setVideoTexture(video: HTMLVideoElement): void;

  reset(): void;

  isVideoPaused(): boolean;

  toggleVideo(): void;

  setVideoCurrentTime(event: { percentage: number; }): void;

  playVideo(): void;

  pauseVideo(): void;

  resumeVideoProgress(): void;

  resetVideo(): void;

  isVideoMuted(): boolean;

  muteVideo(): void;

  unmuteVideo(): void;

  getVideoElement(): HTMLVideoElement;
}

declare class GoogleStreetviewPanorama extends ImagePanorama {
  panoId: string;
  gsvLoader: GoogleStreetviewLoader;
  loadRequested: boolean;

  constructor(panoId: string, apiKey?: string);

  load(panoId: string): void;

  setupGoogleMapAPI(apiKey: string): void;

  setGSVLoader(): object;

  getGSVLoader(): object;

  loadGSVLoader(panoId: string): void;

  reset(): void;
}

declare class LittlePlanet$1 extends ImagePanorama {
  size: number;
  ratio: number;
  EPS: number;
  frameId: number;
  dragging: boolean;
  userMouse: THREE.Vector2;
  quatA: THREE.Quaternion;
  quatB: THREE.Quaternion;
  quatCur: THREE.Quaternion;
  quatSlerp: THREE.Quaternion;
  vectorX: THREE.Vector3;
  vectorY: THREE.Vector3;

  constructor(type: string, source: string, size?: number, ratio?: number);

  createGeometry(size: number, ratio: number): THREE.PlaneBufferGeometry;

  createMaterial(size: number): THREE.ShaderMaterial;

  registerMouseEvents(): void;

  unregisterMouseEvents(): void;

  addZoomDelta(delta: number): void;
}

declare class ImageLittlePlanet extends LittlePlanet {
  constructor(source: string, size?: number, ratio?: number);

  updateTexture(texture: THREE.Texture): void;

  dispose(): void;
}

declare class CameraPanorama extends Panorama {
  media: Media;
  radius: number;

  constructor(constraints: MediaStreamConstraints);

  onPanolensContainer(container: { container: HTMLElement, [key: string]: any; }): void;

  onPanolensScene(scene: { scene: THREE.Scene, [key: string]: any; }): void;

  start(): Promise<MediaDeviceInfo[]>;

  stop(): void;
}

interface OrbitMouseButton {
  ORBIT: THREE.MOUSE;
  ZOOM: THREE.MOUSE;
  PAN: THREE.MOUSE;
}

declare class OrbitControls extends THREE.EventDispatcher {
  object: THREE.Object3D;
  domElement: HTMLElement;
  frameId: string;
  enabled: boolean;
  target: THREE.Vector3;
  center: THREE.Vector3;
  noZoom: boolean;
  zoomSpeed: number;
  minDistance: number;
  maxDistance: number;
  minZoom: number;
  maxZoom: number;
  noRotate: boolean;
  rotateSpeed: number;
  noPan: boolean;
  keyPanSpeed: number;
  autoRotate: boolean;
  autoRotateSpeed: number;
  minPolarAngle: number;
  maxPolarAngle: number;
  momentumDampingFactor: number;
  momentumScalingFactor: number;
  momentumKeydownFactor: number;
  minFov: number;
  maxFov: number;
  minAzimuthAngle: number;
  maxAzimuthAngle: number;
  noKeys: boolean;
  keys: number;
  mouseButtons: OrbitMouseButton;
  STATE: number;
  target0: THREE.Vector3;
  position0: THREE.Vector3;
  zoom0: object;
  changeEvent: object;
  startEvent: object;
  endEvent: object;

  constructor(object?: THREE.Object3D, element?: HTMLElement);

  setLastQuaternion(quaternion: THREE.Quaternion): void;

  getLastPosition(): THREE.Vector3;

  rotateLeft(angle?: number): void;

  rotateUp(angle?: number): void;

  panLeft(distance?: number): void;

  panUp(distance?: number): void;

  pan(deltaX?: number, deltaY?: number): void;

  momentum(): void;

  dollyIn(scale?: number): void;

  dollyOut(scale?: number): void;

  update(ignoreUpdate?: boolean): void;

  reset(): void;

  getPolarAngle(): number;

  getAzimuthalAngle(): number;

  getAutoRotationAngle(): number;

  getZoomScale(): number;

  onMouseDown(event?: MouseEvent): void;

  onMouseMove(event?: MouseEvent): void;

  onMouseUp(): void;

  onMouseWheel(event?: MouseEvent): void;

  onKeyUp(event?: KeyboardEvent): void;

  onKeyDown(event?: KeyboardEvent): void;

  touchstart(event?: TouchEvent): void;

  touchmove(event?: TouchEvent): void;

  touchend(event?: TouchEvent): void;

  dispose(): void;
}

declare class DeviceOrientationControls extends THREE.EventDispatcher {
  changeEvent: any;
  camera: any;
  domElement: any;
  enabled: any;
  deviceOrientation: any;
  screenOrientation: any;
  alpha: any;
  alphaOffsetAngle: any;

  constructor(camera?: THREE.Camera, element?: HTMLElement);

  onDeviceOrientationChangeEvent(event: Event): void;

  onScreenOrientationChangeEvent(): void;

  onTouchStartEvent(event: Event): void;

  onTouchMoveEvent(event: Event): void;

  setCameraQuaternion(quaternion: THREE.Quaternion, alpha: number, beta: number, gamma: number, orient: number): void;

  connect(): void;

  disconnect(): void;

  update(ignoreUpdate: boolean): void;

  updateAlphaOffsetAngle(angle: number): void;

  dispose(): void;
}

declare class CardboardEffect {
  constructor(renderer: THREE.WebGLRenderer);

  setSize(width: number, height: number): void;

  render(scene: THREE.Scene, camera: THREE.Camera): void;
}

declare class StereoEffect {
  constructor(renderer: THREE.WebGLRenderer);

  setEyeSeparation(eyeSep: number): void;

  setSize(width: number, height: number): void;

  render(scene: THREE.Scene, camera: THREE.Camera): void;
}

type ViewerOptions = {
  container?: HTMLElement,
  scene?: THREE.Scene,
  camera?: THREE.Camera,
  renderer?: THREE.WebGLRenderer,
  controlBar?: boolean,
  controlButtons?: string[],
  autoHideControlBar?: boolean,
  autoHideInfoSpot?: boolean,
  horizontalView?: boolean,
  clickTolerance?: number,
  cameraFov?: number,
  reverseDragging?: boolean,
  enableReticle?: boolean,
  dwellTime?: number,
  autoReticleSelect?: boolean,
  viewIndicator?: boolean,
  indicatorSize?: number,
  output?: 'event' | 'console' | 'overlay',
  autoRotate?: boolean,
  autoRotateSpeed?: number,
  autoRotateActivationDuration?: number
};

declare class Viewer extends THREE.EventDispatcher {
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
  panorama: Panorama$1
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
  tweenLeftAnimation: TWEEN$1.Tween
  tweenUpAnimation: TWEEN$1.Tween
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

  setPanorama(pano?: Panorama$1): void;

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

  addPanoramaEventListener(pano?: Panorama$1): void;

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

  onPanoramaDispose(panorama: Panorama$1): void;

  loadAsyncRequest(url: string, callback: (event?: ProgressEvent) => any): void;

  addViewIndicator(): void;

  appendControlItem(option: object): void;

  clearAllCache(): void;
}

export { BasicPanorama, CONTROLS, CONTROL_BUTTONS, CameraPanorama, CubePanorama$1 as CubePanorama, CubeTextureLoader, DataImage, EmptyPanorama, GoogleStreetviewPanorama, ImageLittlePlanet, ImageLoader, ImagePanorama$1 as ImagePanorama, Infospot, LittlePlanet$1 as LittlePlanet, MODES$1 as MODES, Media$1 as Media, OUTPUTS, Panorama$1 as Panorama, REVISION, Reticle, THREE_REVISION, THREE_VERSION, TextureLoader, VERSION, VideoPanorama, Viewer, Widget };
