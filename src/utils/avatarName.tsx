/* ─── Avatar circle with initials ─────────────────────────────── */
export function Avatar({ name, gradient = "" }: { name: string; gradient?: string }) {
  const initials = name
    .split(" ")
    .reverse()
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className="w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center text-lg md:text-2xl font-bold text-white shadow-lg mx-auto"
      style={{ background: gradient }}
    >
      {initials}
    </div>
  );
}