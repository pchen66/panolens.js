export interface TextureLoader {
  load(
    url: string,
    onLoad?: (texture?: THREE.Texture) => any,
    onProgress?: LoaderProgressHandler,
    onError?: (error?: any) => any,
  ): THREE.Texture;
}
