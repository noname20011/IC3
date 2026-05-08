import { ChevronRight, Facebook, Github, Instagram, LayoutDashboard, Youtube } from 'lucide-react';


function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 pt-16 pb-1 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-devotion-gold/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6 col-span-1 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass-card flex items-center justify-center text-devotion-gold">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight">QUIZZY</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Quiz Platform</p>
            </div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Empowering students through technical mastery and spiritual growth. Join our community of over 20,000 learners today.
          </p>
          <div className="flex items-center gap-4">
            {[Facebook, Youtube, Instagram, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 glass-button rounded-lg flex items-center justify-center text-slate-400 hover:text-devotion-gold transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Platform</h4>
          <ul className="space-y-4">
            {["Levels", "Leaderboard", "Practice Exams", "Study Materials"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-400 hover:text-devotion-gold transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Community</h4>
          <ul className="space-y-4">
            {["About Hieuisme", "Success Stories", "Daily Reflections", "Events"].map((item) => (
              <li key={item}>
                <a href="#" className="text-sm text-slate-400 hover:text-devotion-gold transition-colors">{item}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Newsletter</h4>
          <p className="text-sm text-slate-400">Get the latest updates and reflections delivered to your inbox.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-devotion-gold/50 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-devotion-gold text-devotion-bg rounded-lg flex items-center justify-center hover:bg-amber-400 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
          © 2026 QUIZZY PLATFORM. ALL RIGHTS RESERVED.
        </p>
        <div className="flex items-center gap-8">
          <a href="#" className="text-[10px] text-slate-500 uppercase tracking-widest font-medium hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="text-[10px] text-slate-500 uppercase tracking-widest font-medium hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer