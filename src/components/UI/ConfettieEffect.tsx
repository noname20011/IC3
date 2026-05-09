import confetti from "canvas-confetti";
import { useEffect } from "react";
export function ConfettiSideCannons() {

  useEffect(() => {
    const end = Date.now() + 3 * 1000;

    const colors = ["#fff", "#fd8bbc", "#eca184", "#f8deb1", "#60A5FA"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.8 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.8 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);
  return null;
}
