import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Flame,
  Trophy,
  Zap,
  Crown,
  LibraryBig,
  LoaderPinwheel,
  Gem,
} from "lucide-react";
import { MOCK_LEVELS, MOCK_LEADERBOARD } from "../data/mockData";
import LeaderboardCard from "@/components/UI/leader_board/LeaderboardCard";
import { useCustomContext } from "../hooks/use-context";
import AboutMe from "../components/UI/AboutMe";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setIsLoading } = useCustomContext();

  useEffect(() => {
    // Simulate initial data loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  // mockData
  const topSlides = [
    {
      title: "Top #1 Server",
      label: "King of IC3",
      level: "Level 1",
      color: "text-orange-400",
      user: MOCK_LEADERBOARD[0],
      class: "6a1",
      point: 450,
      time: 82,
    },
    {
      title: "Top #1 Server",
      label: "King of IC3",
      color: "text-orange-400",
      level: "Level 2",
      user: MOCK_LEADERBOARD[1],
      class: "7a2",
      point: 400,
      time: 86,
    },
    {
      title: "Top #1 Server",
      label: "King of IC3",
      color: "text-orange-400",
      level: "Level 3",
      user: MOCK_LEADERBOARD[2],
      class: "8a1",
      point: 450,
      time: 74,
    },
  ];

  const iconLevel = [
    {
      icon: <Zap size={26} className="" />,
      color: "text-yellow-400",
    },
    {
      icon: <Gem size={26} className="" />,
      color: "text-blue-400",
    },
    {
      icon: <Crown size={26} className="" />,
      color: "text-red-400",
    },
    {
      icon: <LibraryBig size={26} className="" />,
      color: "text-green-400",
    },
    {
      icon: <LoaderPinwheel size={26} className="" />,
      color: "text-orange-400",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <section className="text-center py-12 pb-0 space-y-4">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 glass-card text-devotion-gold text-xs font-bold uppercase tracking-widest"
        >
          <Flame size={14} />
          {new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </motion.div>
        <h2 className="text-5xl leading-tight font-display font-bold gold-gradient-text">
          TOP TIER
        </h2>
      </section>

      {/* 3D Cover-flow Top 1 Carousel - Enhanced */}
      <LeaderboardCard
        topSlides={topSlides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />

      <section className="max-w-6xl mx-auto">
        <h2 className="text-5xl leading-tight font-display font-bold gold-gradient-text text-center pb-6 space-y-4">
          Study Programs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_LEVELS.map((level, index) => (
            <Link key={level.id} to={`/level/${level.id}/parts`}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-8 group relative overflow-hidden h-full flex flex-col justify-between hover:border-primary/40"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Trophy size={80} />
                </div>

                <div className="space-y-4">
                  <div className={`w-12 h-12 glass-button rounded-2xl flex items-center justify-center ${iconLevel[index].color}`}>
                    {iconLevel[index].icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold">
                    {level.name}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {level.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-devotion-gold">
                    Explore Parts
                  </span>
                  <ChevronRight className="text-devotion-gold group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        
      {/* About me */}
      <div className="h-20"></div>
      <AboutMe/>
      </section>
    </motion.div>
  );
}
