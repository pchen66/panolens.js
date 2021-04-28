export class ImageLittlePlanet extends LittlePlanet {
  constructor(source: string, size?: number, ratio?: number);

  updateTexture(texture: THREE.Texture): void;

  dispose(): void;
}
