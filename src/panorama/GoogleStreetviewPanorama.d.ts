export class GoogleStreetviewPanorama extends ImagePanorama {
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
