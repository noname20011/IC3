import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Home, Compass, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[98vh] flex items-center justify-center relative overflow-hidden">
      {/* Atmospheric Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-devotion-gold/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center space-y-8 max-w-2xl px-6"
      >
        <div className="relative inline-block">
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-[180px] md:text-[240px] font-display font-black leading-none tracking-tighter opacity-10 select-none"
          >
            404
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="w-24 h-24 md:w-32 md:h-32 glass-card rounded-full flex items-center justify-center text-devotion-gold shadow-[0_0_50px_rgba(234,179,8,0.3)]"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Compass size={48} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-display font-bold gold-gradient-text"
          >
            Lost in Devotion?
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-lg max-w-md mx-auto"
          >
            The path you're looking for seems to have vanished into the digital ether. Let's get you back on track.
          </motion.p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Link
            to="/"
            className="group px-8 py-4 bg-devotion-gold text-devotion-bg rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(234,179,8,0.3)]"
          >
            <Home size={18} />
            Return Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-4 glass-card text-slate-300 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-devotion-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-devotion-gold/20 to-transparent" />
    </div>
  );
}
