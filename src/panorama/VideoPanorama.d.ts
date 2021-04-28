export interface VideoPanoramaOptions {
  videoElement: HTMLVideoElement;
  loop: boolean;
  muted: boolean;
  autoplay: boolean;
  playsinline: boolean;
  crossOrigin: string;
}

export class VideoPanorama extends Panorama {
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
