import { motion } from "motion/react";
import laurel_wreath1 from "../../../assets/laurel_wreath/laurel_wreath1.svg";
import laurel_wreath2 from "../../../assets/laurel_wreath/laurel_wreath2.svg";
import laurel_wreath3 from "../../../assets/laurel_wreath/laurel_wreath3.svg";


/* ─── Avatar circle with initials ─────────────────────────────── */
function Avatar({ name, gradient }: { name: string; gradient: string }) {
  const initials = name
    .split(" ")
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

/* ─── Podium Card ─────────────────────────────────────────────── */
interface PodiumCardProps {
  entry: any;
  rank: 1 | 2 | 3;
  delay?: number;
}

const podiumConfig = {
  1: {
    gradient:
      "bg-[linear-gradient(to_bottom,#171412_0%,#694E3A_25%,#A07838_50%,#CA9835_75%,#EBB12E_100%)]",
    textColor: "#FCD34D",
    height: "h-[400px]",
    avatarGradient: "linear-gradient(135deg, #f59e0b, #b45309)",
    zIndex: "z-10",
    laurelWreathLink: laurel_wreath1,
    laurelWreathDimension: "w-[130px] md:w-[240px]",
    position: "top-1/2 -translate-y-[95%] left-1/2 -translate-x-1/2"
  },
  2: {
    gradient:
      "bg-[linear-gradient(to_bottom,#171412_0%,#181554_25%,#233D7F_50%,#3064A0_75%,#40A2CC_100%)]",
    textColor: "#CBD5E1",
    height: "h-[360px]",
    avatarGradient: "linear-gradient(135deg, #64748b, #334155)",
    zIndex: "z-0",
    laurelWreathLink: laurel_wreath2,
    laurelWreathDimension: "w-[100px] md:w-[150px]",
    position: "top-1/2 -translate-y-[90%] left-1/2 -translate-x-1/2"
  },
  3: {
    gradient:
      "bg-[linear-gradient(to_bottom,#171412_0%,#3e234b_25%,#8B413A_50%,#C5613A_100%)]",
    textColor: "#FB923C",
    height: "h-[280px]",
    avatarGradient: "linear-gradient(135deg, #FF7070, #7c2d12)",
    zIndex: "z-0",
    laurelWreathLink: laurel_wreath3,
    laurelWreathDimension: "w-[80px] md:w-[110px]",
    position: "top-1/2 -translate-y-[100%] md:-translate-y-[120%] left-1/2 -translate-x-1/2"
  },
};

export default function PodiumCard({ entry, rank, delay = 0 }: PodiumCardProps) {
  const cfg = podiumConfig[rank];
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={`relative bg-${cfg.gradient} flex items-center justify-center ${cfg.height} ${cfg.zIndex} cursor-default`}
      >
        <div
          className={`relative w-full shrink-0 ${cfg.height} rounded-[28px] overflow-hidden`}
        >
          {/* Main Card */}
          <div className={`absolute inset-0 rounded-[28px] ${cfg.gradient}`} />

          {/* Top opacity fade */}
          <div className="absolute inset-0 border-white/25 rounded-[28px] bg-gradient-to-b from-black/75 via-black/25 to-transparent" />

          {/* Thicker border */}
          <div className="absolute inset-0 rounded-[28px] border-2 border-white/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]" />

          {/* Hide border top softly */}
          <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#171412] via-[#171412]/20 to-transparent z-10" />

          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-background/60 via-[#171412]/10 to-transparent z-10" />


          {/* Inner glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[180px] bg-white/10 blur-3xl rounded-full" />

          {/* Rank */}
          <div className={`absolute ${cfg.position} flex items-center justify-center z-20`}>
            {/* <div className="text-white text-7xl font-bold leading-none">2</div>
            <div className="text-white/80 text-xl -mt-2">nd</div> */}
            <img src={cfg.laurelWreathLink} alt="Laurel Wreath" className={`${cfg.laurelWreathDimension} max-w-none`} />
          </div>

          {/* Avatar */}
          <div className="mb-3 absolute bottom-16 left-1/2 -translate-x-1/2">
            <Avatar name={entry.name} gradient={cfg.avatarGradient} />
          </div>

          {/* Name & Info */}
          <div className="text-center px-2 absolute bottom-3 left-1/2 -translate-x-1/2 max-w-full">
            <p className="font-bold text-white text-sm leading-tight truncate">
              {entry.name}
            </p>
            {entry.class && (
              <p
                className="text-xs mt-0.5"
                style={{ color: cfg.textColor, opacity: 0.8 }}
              >
                {entry.class}
              </p>
            )}
            <p className="text-sm text-white/60 mt-0.5 min-w-0 leading-tight truncate">
              {entry.school}
            </p>
          </div>
        </div>
      </motion.div>

    </>
  );
}