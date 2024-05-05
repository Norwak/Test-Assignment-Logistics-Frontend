export function padZeros(number: number): string {
  return number.toString().padStart(2, '0');
}