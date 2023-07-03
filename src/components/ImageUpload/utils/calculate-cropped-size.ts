export function calculateCroppedSize(original: number, cropped: number): number {
  return Math.round((original * cropped) / 100);
}
