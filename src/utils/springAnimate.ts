export type SpringConfig = {
  mass: number;
  stiffness: number;
  damping: number;
  threshold?: number;
};

/** Damped spring — matches Figma SMART_ANIMATE CUSTOM_SPRING. */
export function animateSpring(
  from: number,
  to: number,
  config: SpringConfig,
  onUpdate: (value: number) => void,
): () => void {
  const threshold = config.threshold ?? 0.01;
  let value = from;
  let velocity = 0;
  let raf = 0;
  let last = performance.now();

  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.064);
    last = now;

    const springForce = -config.stiffness * (value - to);
    const dampingForce = -config.damping * velocity;
    const acceleration = (springForce + dampingForce) / config.mass;

    velocity += acceleration * dt;
    value += velocity * dt;
    onUpdate(value);

    if (Math.abs(value - to) > threshold || Math.abs(velocity) > threshold) {
      raf = requestAnimationFrame(tick);
    } else {
      onUpdate(to);
    }
  };

  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
