/** Infer router basename from the built bundle path (e.g. /PORTFOLIO or ""). */
export function getRouterBasename(): string {
  const script = document.querySelector('script[type="module"][src]');
  if (!(script instanceof HTMLScriptElement)) return "";

  const { pathname } = new URL(script.src, window.location.href);
  const match = pathname.match(/^(.+)\/assets\//);
  return match?.[1] ?? "";
}
