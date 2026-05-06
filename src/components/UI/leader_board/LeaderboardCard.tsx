import { SchoolIcon, Star, UserPlus2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { LeaderboardEntry } from "../../../../types";
import { convertTime } from "../../../utils/convertTime";

interface dataSlide {
  title: string;
  label: string;
  level: string;
  color: string;
  user: LeaderboardEntry;
  class: string;
  point: number;
  time: number;
}
interface LeaderboardCard {
  topSlides: dataSlide[];
  currentSlide: number;
  setCurrentSlide: (value: number | ((prev: number) => number)) => void;
}
const LeaderboardCard = (props: LeaderboardCard) => {
  const { topSlides, currentSlide, setCurrentSlide } = props;

  useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev: number) => (prev + 1) % topSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }, [topSlides.length]);

  return (
    <>
      {/* 3D Cover-flow Top 1 Carousel - Enhanced */}
      <section className="max-w-7xl mx-auto px-4 relative py-4 overflow-hidden">
        <div className="relative h-[550px] lg:h-[360px] flex items-center justify-center perspective-[1200px]">
          <AnimatePresence initial={false}>
            {topSlides.map((slide, idx) => {
              // Calculate relative position for circular 3-item carousel
              const diff =
                (idx - currentSlide + topSlides.length) % topSlides.length;
              let position = 0;
              if (diff === 1) position = 1;
              if (diff === topSlides.length - 1) position = -1;

              const isActive = position === 0;

              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.75,
                    x: position * 420,
                    zIndex: isActive ? 40 : 10,
                    opacity: isActive ? 1 : 0.3,
                    filter: isActive ? "blur(0px)" : "blur(6px)",
                    rotateY: position * -35,
                    translateZ: isActive ? 0 : -100,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.4, 0, 0.2, 1],
                    opacity: { duration: 0.8 },
                  }}
                  className="absolute w-full max-w-[45rem] preserve-3d"
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => !isActive && setCurrentSlide(idx)}
                >
                  <div
                    className={`shimmer-border ${isActive ? "cursor-default bg-devotion-surface/10 rounded-sm border-devotion-gold border" : "cursor-pointer hover:opacity-60 transition-opacity"}`}
                  >
                    <div className="shimmer-border-content p-10 pt-14 md:pt-20 flex flex-col md:flex-row items-center justify-between relative gap-10 rounded-2xl ">
                      {/* Rectangular Ranking Tag */}
                      <div className="absolute lg:-top-[0.75rem] lg:-left-[3.95rem] lg:-translate-x-0 z-20 lg:-rotate-[35deg] -top-[1.2rem] left-1/2 -translate-x-1/2 rotate-0 max-w-max">
                        <div className="px-4 lg:py-3 py-5 bg-devotion-bg backdrop-blur-md border border-devotion-gold/50 rounded-lg shadow-[0_0_20px_rgba(234,179,8,0.2)]">
                          <span className="text-[14px] font-black uppercase tracking-[0.2em] text-devotion-gold">
                            {slide.title}
                          </span>
                        </div>
                      </div>

                      {/* Background Glow */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-devotion-gold/5 blur-[120px] pointer-events-none" />
                      <div className="flex items-center gap-8 z-10 pt-6 md:pt-0 relative">
                        <div className="text-6xl lg:mb-1.5 text-center absolute z-10 lg:-top-[60%] lg:left-[5%] md:-top-[60%] md:left-[4%] -top-[4%] left-[7%]">
                          👑
                        </div>
                        <div className="relative">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 15,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="absolute -inset-4 border border-dashed border-devotion-gold/20 rounded-full"
                          />
                          <div className="w-32 h-32 rounded-full border-2 border-devotion-gold relative z-10 bg-devotion-bg shadow-[0_0_50px_rgba(234,179,8,0.25)]">
                            <img
                              src="/assets/graduate.png"
                              alt={slide.user.name}
                              className="w-full h-full rounded-full object-cover bg-white"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div className="absolute -bottom-4 -right-6 text-devotion-bg p-2.5 z-20 text-4xl">
                            🥇
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-sm uppercase tracking-[0.4em] md:-mt-8 font-black ${slide.color}`}
                            >
                              {slide.label}
                            </span>
                            <div className="flex gap-1 md:-mt-8">
                              {[1, 2, 3, 4, 5].map((i) => (
                                <Star
                                  key={i}
                                  size={10}
                                  fill="currentColor"
                                  className="text-devotion-gold"
                                />
                              ))}
                            </div>
                          </div>
                          <h3 className="text-2xl md:text-4xl font-display font-black tracking-tighter leading-tight">
                            {slide.user.name}
                          </h3>
                          <div className="flex items-end gap-2 text-slate-400">
                            <SchoolIcon className="text-devotion-gold"
                              size={20}
                            />
                            <span className="text-sm tracking-widest font-bold">
                              {slide.user.school}
                            </span>
                          </div>
                          <div className="flex items-end gap-2 text-slate-400">
                            <UserPlus2 className="text-devotion-gold"
                              size={20}
                            />
                            <span className="text-sm tracking-widest font-bold">
                              {slide.user.class}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center md:items-end gap-5 relative z-10">
                        <div className="text-center md:text-right">
                          <div className="text-6xl font-display font-black text-devotion-gold tracking-tighter leading-none">
                            {slide.user.score}
                          </div>
                          <div className="text-md tracking-widest text-white font-black mt-2">
                            {convertTime(slide.time)}
                          </div>
                        </div>
                        <div className="px-8 py-3 bg-devotion-gold/10 border border-devotion-gold/20 text-devotion-gold rounded-2xl font-black uppercase tracking-[0.25em] hover:bg-devotion-gold hover:text-devotion-bg transition-all shadow-xl shadow-devotion-gold/5 text-md">
                          {slide.level}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {topSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-8 bg-devotion-gold"
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default LeaderboardCard;
