import { motion } from "motion/react";

export default function LoadingScreen() {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
    >
      <div className="relative w-40 h-40 flex flex-col items-center justify-center">
        {/* The Typing Boy SVG - Refined Version */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Body/Shoulders - Thinner Stroke */}
          <motion.path
            d="M30 170 Q30 120 100 120 Q170 120 170 170"
            stroke="currentColor"
            strokeWidth="2"
            className="text-white"
          />
          
          {/* Shirt Collar detail */}
          <path d="M85 120 L100 135 L115 120" stroke="currentColor" strokeWidth="1.5" className="text-white" />

          {/* Head */}
          <g>
            {/* Neck */}
            <rect x="90" y="105" width="20" height="15" fill="currentColor" className="text-white" />
            
            {/* Face Shape - Thinner Stroke */}
            <motion.path
              d="M65 70 Q65 110 100 110 Q135 110 135 70 Q135 35 100 35 Q65 35 65 70"
              fill="black"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Ivy League Hair Style - Exact Match to Sample Wave */}
            <motion.g
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <path 
                d="M65 65 Q65 30 100 30 Q135 30 135 65 C135 65 125 55 115 60 C105 65 95 55 85 60 C75 65 65 65 65 65 Z" 
                fill="currentColor" 
                className="text-white" 
              />
              {/* Ears - Thinner Stroke */}
              <circle cx="62" cy="75" r="8" stroke="currentColor" strokeWidth="2" fill="black" className="text-white" />
              <circle cx="138" cy="75" r="8" stroke="currentColor" strokeWidth="2" fill="black" className="text-white" />
            </motion.g>

            {/* Face Details: Happy eyes and smile */}
            <motion.g 
              className="text-white"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M80 75 Q85 68 90 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M110 75 Q115 68 120 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M92 92 Q100 98 108 92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </g>

          {/* Keyboard */}
          <g transform="translate(40, 160)">
            <rect width="120" height="35" rx="6" stroke="currentColor" strokeWidth="1.5" className="text-yellow-400" fill="black" />
            <rect x="35" y="25" width="50" height="4" rx="2" fill="currentColor" className="text-yellow-400" />
          </g>

          {/* Typing Hands - Moved INSIDE Keyboard area */}
          {/* Left Hand */}
          <motion.g
            className="text-white"
            animate={{ 
              x: [-1, 2, -1.5, 1, 0],
              y: [0, -3, 1.5, -2, 0]
            }}
            transition={{ duration: 0.25, repeat: Infinity, ease: "linear" }}
          >
            {/* Arm - Thinner Stroke */}
            <path d="M55 125 L65 165" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-20" />
            {/* Hand Base - Lowered */}
            <path d="M60 165 Q70 165 75 160 L80 170 Q70 175 60 170 Z" fill="currentColor" />
            {/* Fingers - Lowered */}
            <motion.path
              d="M68 172 L70 182"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ d: ["M68 172 L70 182", "M68 172 L70 178", "M68 172 L70 182"] }}
              transition={{ duration: 0.15, repeat: Infinity }}
            />
            <motion.path
              d="M75 171 L78 181"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ d: ["M75 171 L78 181", "M75 171 L78 177", "M75 171 L78 181"] }}
              transition={{ duration: 0.18, repeat: Infinity, delay: 0.05 }}
            />
          </motion.g>

          {/* Right Hand */}
          <motion.g
            className="text-white"
            animate={{ 
              x: [1, -2, 1.5, -1, 0],
              y: [0, -2.5, 2, -1.5, 0]
            }}
            transition={{ duration: 0.28, repeat: Infinity, ease: "linear", delay: 0.1 }}
          >
            {/* Arm - Thinner Stroke */}
            <path d="M145 125 L135 165" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="opacity-20" />
            {/* Hand Base - Lowered */}
            <path d="M140 165 Q130 165 125 160 L120 170 Q130 175 140 170 Z" fill="currentColor" />
            {/* Fingers - Lowered */}
            <motion.path
              d="M132 172 L130 182"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ d: ["M132 172 L130 182", "M132 172 L130 178", "M132 172 L130 182"] }}
              transition={{ duration: 0.17, repeat: Infinity, delay: 0.08 }}
            />
            <motion.path
              d="M125 171 L122 181"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              animate={{ d: ["M125 171 L122 181", "M125 171 L122 177", "M125 171 L122 181"] }}
              transition={{ duration: 0.22, repeat: Infinity, delay: 0.12 }}
            />
          </motion.g>
        </svg>

        {/* Loading Text */}
        <div className="mt-1 text-center">
          <motion.h3
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white font-display font-bold tracking-[0.1em] text-[14px]"
          >
            Đợi chút
          </motion.h3>
          <div className="flex gap-1.5 justify-center mt-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.6, 1], 
                  opacity: [0.3, 1, 0.3],
                  y: [0, -2, 0]
                }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(234,179,8,0.5)]"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-devotion-gold/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-devotion-gold/10 blur-[80px] rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
}
