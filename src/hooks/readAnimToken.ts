export function readTokenMs(varName: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return Number.parseFloat(raw) || 0;
}

export function readTokenPx(varName: string): number {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  return Number.parseFloat(raw) || 0;
}
