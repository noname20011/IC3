import { useState } from "react";
import { Play, ChevronRight, Star, Flame, Trophy, Clock, Calendar, TrendingUp, BookOpen, Heart } from "lucide-react";

interface DailyDevotionProps {
  onLeaderboard: () => void;
}

const weekDays = [
  { day: "Mon", done: true },
  { day: "Tue", done: true },
  { day: "Wed", done: true },
  { day: "Thu", done: true },
  { day: "Fri", done: true },
  { day: "Fri", done: true },
  { day: "Sat", done: false },
];

const recentDevotions = [
  { title: "The Power of Grace", speaker: "David Kim", duration: "6 min", topic: "Grace" },
  { title: "Walking in Faith", speaker: "Sarah Okafor", duration: "5 min", topic: "Faith" },
  { title: "Finding Peace", speaker: "Mark Torres", duration: "4 min", topic: "Peace" },
];

export default function DailyDevotion({ onLeaderboard }: DailyDevotionProps) {
  const [playing, setPlaying] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#13100d]">

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex items-center justify-between px-6 lg:px-8 py-4 bg-[#13100d]/90 backdrop-blur-md border-b border-[#2a231a]">
          <div>
            <p className="text-xs text-[#6b5e4a] font-medium">Tuesday, 14 May 2024</p>
            <h1 className="text-lg font-bold text-white leading-tight">Daily Devotion</h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Streak badge */}
            <div className="flex items-center gap-1.5 bg-[#1e1810] border border-[#2e2418] rounded-full px-3 py-1.5">
              <Flame size={14} className="text-orange-400" />
              <span className="text-xs font-semibold text-orange-300">6 Day Streak</span>
            </div>
            {/* Leaderboard button */}
            <button
              data-testid="button-leaderboard-banner"
              onClick={onLeaderboard}
              className="hidden sm:flex items-center gap-1.5 bg-[#c8a46e]/10 border border-[#c8a46e]/25 text-[#c8a46e] rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-[#c8a46e]/20 transition-colors"
            >
              <Star size={12} className="fill-[#c8a46e]" />
              Top 1% in Florida
              <ChevronRight size={12} />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c8a46e] to-[#9a7040] flex items-center justify-center text-sm font-bold text-[#0f0d0a]">
              JE
            </div>
          </div>
        </header>

        <div className="px-6 lg:px-8 py-6 max-w-6xl mx-auto">
          {/* Desktop grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* === LEFT / MAIN COLUMN === */}
            <div className="xl:col-span-2 flex flex-col gap-6">

              {/* Hero devotion card */}
              <div className="relative rounded-2xl overflow-hidden bg-[#1a1510] border border-[#2e2418]" data-testid="card-devotion-hero">
                {/* Decorative gradient top */}
                <div className="h-1 w-full bg-gradient-to-r from-[#c8a46e] via-[#e8c898] to-[#c8a46e] opacity-60" />

                <div className="p-6 sm:p-8">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <div className="inline-flex items-center gap-1.5 bg-[#c8a46e]/12 border border-[#c8a46e]/20 rounded-full px-2.5 py-1 mb-3">
                        <Calendar size={11} className="text-[#c8a46e]" />
                        <span className="text-[11px] font-semibold text-[#c8a46e] uppercase tracking-wide">Today's Reflection</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">5 Minutes with Jesus</h2>
                      <p className="text-sm text-[#7a6b55] mt-1">with Sam Smith · 4 min watch</p>
                    </div>
                    <button
                      data-testid="button-like"
                      onClick={() => setLiked(!liked)}
                      className={`p-2.5 rounded-xl border transition-all duration-200 ${liked ? "bg-red-500/15 border-red-500/30 text-red-400" : "bg-[#1e1810] border-[#2e2418] text-[#5a4e3a] hover:text-[#9a8668]"}`}
                    >
                      <Heart size={18} className={liked ? "fill-red-400" : ""} />
                    </button>
                  </div>

                  {/* Video area */}
                  <div className="relative rounded-xl overflow-hidden mb-6 bg-[#0f0d0a] border border-[#2e2418] aspect-video flex items-center justify-center" data-testid="card-video">
                    {/* Abstract geometric background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1810] via-[#13100d] to-[#0a0806]" />
                      {/* Decorative rays */}
                      <svg viewBox="0 0 400 240" className="absolute inset-0 w-full h-full opacity-20" preserveAspectRatio="xMidYMid slice">
                        <defs>
                          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#c8a46e" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#c8a46e" stopOpacity="0" />
                          </radialGradient>
                        </defs>
                        <ellipse cx="200" cy="120" rx="180" ry="100" fill="url(#rg)" />
                        {[...Array(12)].map((_, i) => {
                          const angle = (i * 30 * Math.PI) / 180;
                          return (
                            <line
                              key={i}
                              x1="200" y1="120"
                              x2={200 + 220 * Math.cos(angle)}
                              y2={120 + 220 * Math.sin(angle)}
                              stroke="#c8a46e" strokeWidth="0.5" strokeOpacity="0.4"
                            />
                          );
                        })}
                      </svg>
                      {/* Center icon */}
                      <svg viewBox="0 0 64 64" fill="none" className="relative z-10 w-16 h-16 opacity-30">
                        <line x1="32" y1="4" x2="32" y2="60" stroke="#c8a46e" strokeWidth="3.5" strokeLinecap="round" />
                        <line x1="4" y1="32" x2="60" y2="32" stroke="#c8a46e" strokeWidth="3.5" strokeLinecap="round" />
                        <line x1="9.4" y1="9.4" x2="54.6" y2="54.6" stroke="#c8a46e" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="54.6" y1="9.4" x2="9.4" y2="54.6" stroke="#c8a46e" strokeWidth="2.5" strokeLinecap="round" />
                        {[[32,4,26,12],[32,4,38,12],[32,60,26,52],[32,60,38,52],[4,32,12,26],[4,32,12,38],[60,32,52,26],[60,32,52,38]].map(([x1,y1,x2,y2], i) => (
                          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c8a46e" strokeWidth="1.8" strokeLinecap="round" />
                        ))}
                      </svg>
                    </div>

                    {/* Play button overlay */}
                    <button
                      data-testid="button-play"
                      onClick={() => setPlaying(!playing)}
                      className="relative z-20 w-16 h-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all duration-200 group"
                    >
                      {playing ? (
                        <div className="flex gap-1">
                          <div className="w-1.5 h-5 bg-white rounded-full" />
                          <div className="w-1.5 h-5 bg-white rounded-full" />
                        </div>
                      ) : (
                        <Play size={22} className="text-white fill-white ml-1 group-hover:scale-110 transition-transform" />
                      )}
                    </button>

                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-md px-2 py-1">
                      <Clock size={10} className="text-white/70" />
                      <span className="text-[11px] text-white/80 font-medium">4:00</span>
                    </div>
                  </div>

                  {/* Start button + meta */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      data-testid="button-start"
                      onClick={() => setPlaying(!playing)}
                      className="flex items-center justify-center gap-2 bg-white text-[#13100d] font-semibold text-sm px-8 py-3 rounded-xl hover:bg-[#f5ead8] active:scale-[0.98] transition-all duration-150 shadow-lg shadow-black/30"
                    >
                      <Play size={15} className="fill-[#13100d]" />
                      {playing ? "Pause Devotion" : "Start Devotion"}
                    </button>
                    <div className="flex items-center gap-4 sm:ml-2">
                      <div className="flex items-center gap-1.5">
                        <BookOpen size={14} className="text-[#6b5e4a]" />
                        <span className="text-xs text-[#6b5e4a]">Matthew 5:1-12</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp size={14} className="text-[#6b5e4a]" />
                        <span className="text-xs text-[#6b5e4a]">21,563 completed today</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Week progress */}
              <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-6" data-testid="card-weekly-streak">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">This Week's Progress</h3>
                  <span className="text-xs text-[#c8a46e] font-medium">6 of 7 days</span>
                </div>
                <div className="flex gap-2">
                  {weekDays.map(({ day, done }, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                      <div className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                        done
                          ? "bg-[#c8a46e] text-[#0f0d0a]"
                          : i === 6
                          ? "bg-[#1e1810] border-2 border-[#c8a46e]/40 text-[#c8a46e]"
                          : "bg-[#1e1810] text-[#4a3d2e]"
                      }`}>
                        {done ? "✓" : i === 6 ? "·" : "·"}
                      </div>
                      <span className="text-[10px] text-[#6b5e4a] font-medium">{day}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-1.5 bg-[#1e1810] rounded-full overflow-hidden">
                  <div className="h-full w-[85.7%] bg-gradient-to-r from-[#c8a46e] to-[#e8c898] rounded-full" />
                </div>
              </div>

              {/* Recent devotions */}
              <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-6" data-testid="card-recent">
                <h3 className="text-sm font-semibold text-white mb-4">Recent Devotions</h3>
                <div className="flex flex-col gap-2">
                  {recentDevotions.map((d, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#1e1810] cursor-pointer transition-colors group" data-testid={`row-devotion-${i}`}>
                      <div className="w-10 h-10 rounded-lg bg-[#2e2418] flex items-center justify-center shrink-0">
                        <BookOpen size={16} className="text-[#c8a46e]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{d.title}</p>
                        <p className="text-xs text-[#6b5e4a] mt-0.5">{d.speaker} · {d.duration}</p>
                      </div>
                      <span className="text-[11px] text-[#4a3d2e] bg-[#1e1810] rounded-full px-2.5 py-1 font-medium shrink-0">{d.topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* === RIGHT COLUMN === */}
            <div className="flex flex-col gap-5">
              {/* Stats cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-4 flex flex-col gap-2" data-testid="card-stat-streak">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/15 flex items-center justify-center">
                    <Flame size={16} className="text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">6</p>
                    <p className="text-xs text-[#6b5e4a]">Day streak</p>
                  </div>
                </div>
                <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-4 flex flex-col gap-2" data-testid="card-stat-points">
                  <div className="w-8 h-8 rounded-lg bg-[#c8a46e]/15 flex items-center justify-center">
                    <Trophy size={16} className="text-[#c8a46e]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">105</p>
                    <p className="text-xs text-[#6b5e4a]">Total points</p>
                  </div>
                </div>
              </div>

              {/* Leaderboard preview */}
              <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-5" data-testid="card-leaderboard-preview">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-white">Florida Leaderboard</h3>
                  <button
                    data-testid="button-view-leaderboard"
                    onClick={onLeaderboard}
                    className="text-[11px] text-[#c8a46e] hover:text-[#e8c898] font-medium flex items-center gap-0.5 transition-colors"
                  >
                    View all <ChevronRight size={11} />
                  </button>
                </div>

                {/* Rank badge */}
                <div className="mb-4 bg-[#c8a46e]/10 border border-[#c8a46e]/20 rounded-xl px-4 py-3 flex items-center gap-3">
                  <Star size={16} className="fill-[#c8a46e] text-[#c8a46e] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#c8a46e]">You're in the Top 1%!</p>
                    <p className="text-[11px] text-[#7a6b55] mt-0.5">Florida · Rank #2</p>
                  </div>
                </div>

                {[
                  { rank: 1, name: "lilyonetwo", pts: 146, color: "#e8c898" },
                  { rank: 2, name: "josheleve", pts: 105, color: "#c8a46e", isMe: true },
                  { rank: 3, name: "herotaylor", pts: 99, color: "#b8864e" },
                ].map((u) => (
                  <div key={u.rank} className={`flex items-center gap-3 py-2 border-b border-[#1e1810] last:border-0 ${u.isMe ? "rounded-lg px-2 bg-[#c8a46e]/6" : ""}`}>
                    <span className="w-4 text-xs font-bold text-center" style={{ color: u.color }}>{u.rank}</span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-[#0f0d0a] shrink-0" style={{ background: `linear-gradient(135deg, ${u.color}, ${u.color}99)` }}>
                      {u.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="flex-1 text-xs font-medium text-white truncate">{u.name}{u.isMe && " (you)"}</span>
                    <div className="flex items-center gap-1">
                      <Trophy size={10} className="text-[#c8a46e]" />
                      <span className="text-xs font-semibold text-[#c8a46e]">{u.pts}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Community */}
              <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-5" data-testid="card-community">
                <h3 className="text-sm font-semibold text-white mb-3">Community Today</h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex -space-x-2">
                    {["#c8a46e","#9a7040","#e8c898","#7a5830"].map((color, i) => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1510] flex items-center justify-center text-[10px] font-bold text-[#0f0d0a]" style={{ background: color }}>
                        {["JE","SK","ML","RC"][i]}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#6b5e4a]"><span className="text-white font-medium">21,563</span> completed today</p>
                </div>
                <p className="text-xs text-[#5a4e3a] leading-relaxed italic">
                  "Jackie and thousands of others have already done their reflection today."
                </p>
              </div>

              {/* Quote */}
              <div className="bg-gradient-to-br from-[#1e1810] to-[#2a2018] border border-[#3a2e1e] rounded-2xl p-5">
                <p className="text-xs text-[#c8a46e] font-semibold uppercase tracking-widest mb-2">Verse of the Day</p>
                <p className="text-sm text-white leading-relaxed font-medium">
                  "Blessed are the pure in heart, for they will see God."
                </p>
                <p className="text-xs text-[#6b5e4a] mt-2">Matthew 5:8</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}