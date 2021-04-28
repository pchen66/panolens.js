export interface ImageLoader {
  load(
    url: string,
    onLoad?: (image?: HTMLElement) => any,
    onProgress?: LoaderProgressHandler,
    onError?: (error?: any) => any,
  ): HTMLElement;
}
