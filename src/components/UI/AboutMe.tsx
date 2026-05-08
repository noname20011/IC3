

const AboutMe = () => {
  return (
    <section className="glass-card p-8 md:p-10 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-devotion-gold/10 to-transparent pointer-events-none" />

      {/* Image Section - Male Teacher with IC3 Whiteboard */}
      <div className="w-full md:w-2/5 aspect-[4/5] rounded-3xl overflow-hidden relative group ">
        <img
          src="/assets/about_me.png"
          alt="Frankie - IC3 Teacher"
          className="w-full h-full object-cover transition-transform duration-700 scale-120"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-devotion-bg/20 via-transparent to-transparent" />

      </div>

      {/* Content Section */}
      <div className="flex-1 space-y-8 py-4">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-devotion-gold/10 border border-devotion-gold/20 text-devotion-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
            Featured Author
          </div>
          <div className="space-y-1">
            <h2 className="text-5xl font-display font-black gold-gradient-text tracking-tighter">
              About Me
            </h2>
            <p className="text-2xl font-display font-bold text-slate-100 italic">
              "Carrying the torch of knowledge, one student at a time."
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full border-2 border-devotion-gold p-0.5">
              <img
                src="https://picsum.photos/seed/hieu/100/100"
                className="w-full h-full rounded-full object-cover"
                alt="Hieuisme Avatar"
              />
            </div>
            <div>
              <p className="font-black text-lg tracking-tight">Frankie</p>
              <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">
                Founder & Educator
              </p>
            </div>
          </div>

          <p className="text-slate-300 leading-relaxed text-lg font-medium">
            I am Frankie, an educator dedicated to bridging the gap between
            technical mastery and spiritual growth. Through the{" "}
            <span className="text-devotion-gold font-bold">
              IC3 certification
            </span>{" "}
            and our daily
            <span className="text-white font-bold">
              {" "}
              "Carrying the torch of knowledge"
            </span>{" "}
            reflections, I aim to empower students to excel both in their
            careers and their faith.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 pt-4">
          <button className="px-10 py-5 bg-devotion-gold text-devotion-bg rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(234,179,8,0.3)]">
            Start Reflection
          </button>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src={`https://picsum.photos/seed/student${i}/40/40`}
                  className="w-10 h-10 rounded-full border-2 border-devotion-bg shadow-xl"
                  referrerPolicy="no-referrer"
                  alt={`Student ${i}`}
                />
              ))}
            </div>
            <div className="text-xs">
              <p className="text-white font-black">21,563+</p>
              <p className="text-slate-500 font-bold uppercase tracking-tighter">
                Students Joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
