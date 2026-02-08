export interface Options {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: {
    x?: number;
    y?: number;
  };
  colors?: string[];
  shapes?: string[];
  zIndex?: number;
  disableForReducedMotion?: boolean;
  useWorker?: boolean;
  resize?: boolean;
  scalar?: number;
}

export interface ConfettiStatic {
  (options?: Options): Promise<null>;
  reset(): void;
  create(canvas: HTMLCanvasElement, options?: { useWorker?: boolean, resize?: boolean }): ConfettiStatic;
}

declare const confetti: ConfettiStatic;
export default confetti;
