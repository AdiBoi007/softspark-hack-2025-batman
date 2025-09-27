export async function triggerConfetti(opts: { zIndex?: number; spread?: number; scalar?: number } = {}) {
  if (typeof window === "undefined") return

  try {
    const module = await import("canvas-confetti")
    const confetti = module.default

    const defaults = {
      particleCount: 120,
      spread: opts.spread ?? 70,
      origin: { y: 0.6 },
      scalar: opts.scalar ?? 1,
      zIndex: opts.zIndex ?? 3000,
    }

    confetti({ ...defaults, angle: 60, origin: { x: 0 } })
    confetti({ ...defaults, angle: 120, origin: { x: 1 } })
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Confetti failed to load", error)
    }
  }
}
