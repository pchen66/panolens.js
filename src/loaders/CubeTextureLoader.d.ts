export interface CubeTextureLoader {
  load(
    urls: string[],
    onLoad?: (texture?: THREE.Texture) => any,
    onProgress?: LoaderProgressHandler,
    onError?: (error?: any) => any,
  ): THREE.Texture;
}
