export namespace StereographicShader {
  const uniforms: {
    toDiffuse: { value: THREE.Texture; },
    resolution: { value: number; },
    transform: { value: THREE.Matrix4; },
    zoom: { value: number; },
    opacity: { value: number; };
  };
  const vertexShader: string;
  const fragmentShader: string;
}
