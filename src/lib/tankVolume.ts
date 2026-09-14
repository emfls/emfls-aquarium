export interface TankVolumeInput { width: number; depth: number; height: number; usablePercent: number; }
export interface TankVolumeResult { theoreticalLiters: number; usableLiters: number; }
export function calculateTankVolume(input: TankVolumeInput): TankVolumeResult | null {
  const values = [input.width, input.depth, input.height, input.usablePercent];
  if (!values.every(Number.isFinite) || input.width <= 0 || input.depth <= 0 || input.height <= 0 || input.usablePercent <= 0 || input.usablePercent > 100) return null;
  if (input.width > 1000 || input.depth > 1000 || input.height > 1000) return null;
  const theoreticalLiters = (input.width * input.depth * input.height) / 1000;
  return { theoreticalLiters, usableLiters: theoreticalLiters * input.usablePercent / 100 };
}
