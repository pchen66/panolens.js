export class Widget extends THREE.EventDispatcher {
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
