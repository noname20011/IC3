import { ChevronLeft, LayoutDashboard, LayoutList } from "lucide-react";
import { useCustomContext } from "../../hooks/use-context";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { convertTime } from "@/utils/convertTime";

interface HeaderProps {
  onBack: () => void;
  locationPath: string;
}
const Header = (props: HeaderProps) => {
  const { onBack, locationPath } = props;
    const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const timeParam = Number(searchParams.get("time")) || 0;
  const { setShowList, setTimeCountDown, timeCountDown, setTimeDoTest, completeQuiz } = useCustomContext();

    useEffect(() => {

      setTimeCountDown(timeParam);
      setTimeDoTest(timeParam);

      const id = setInterval(() => {
        setTimeCountDown((prev: number) => {
          if (prev <= 1) {
            clearInterval(id);
            return 0;
          }
          return prev - 1;
        });
    }, 1000);
    return () => clearInterval(id);
    }, [timeParam]);

  return (
    <>
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-[100] bg-[#13100d]/95 backdrop-blur-md border-b border-[#2a231a]">
        {/* Top row */}
        <div className="flex items-center justify-between px-6 lg:px-8 py-3.5">
          {/* <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-lg bg-[#1e1810] border border-[#2e2418] flex items-center justify-center hover:bg-[#2a2018] transition-colors"
            >
              <ChevronLeft size={15} className="text-[#c8a46e]" />
            </button>
            <div>
              <p className="text-xs text-[#6b5e4a] font-medium">
                Faith Quiz · Matthew 5–7
              </p>
              <h1 className="text-base font-bold text-white leading-tight">
                Knowledge Check
              </h1>
            </div>
          </div> */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 glass-card flex items-center justify-center text-devotion-gold">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="font-display font-bold text-xl tracking-tight">QUIZZY</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em]">Quiz Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Time */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1510] border border-[#2e2418] rounded-lg">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle
                  cx="6.5"
                  cy="6.5"
                  r="5.5"
                  stroke="#6b5e4a"
                  strokeWidth="1.2"
                />
                <path
                  d="M6.5 4v3l2 1.5"
                  stroke="#c8a46e"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              {locationPath.includes("/quiz") && (
                <span className="text-xs font-mono font-semibold text-[#c8a46e]">
                  {completeQuiz ? convertTime(Number(localStorage.getItem("timedDoTest") ?? 0)) : `${Math.floor(timeCountDown / 60)}:${String(timeCountDown % 60).padStart(2, "0")}`}
                </span>
              )}
            </div>
            {/* Score */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1510] border border-[#2e2418] rounded-lg">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M6.5 1.5l1.2 2.4 2.7.4-1.95 1.9.46 2.66L6.5 7.5l-2.41 1.36.46-2.66L2.6 4.34l2.7-.4z"
                  fill="#c8a46e"
                />
              </svg>
              {locationPath.includes("/quiz") && (
                <span className="text-xs font-semibold text-[#c8a46e]">
                  {450} pts
                </span>
              )}
            </div>
            {/* All Questions button */}
            {locationPath.includes("/quiz") && (
              <button
                onClick={() => setShowList(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1510] border border-[#2e2418] rounded-lg text-xs font-semibold text-[#7a6b55] hover:text-[#c8a46e] hover:border-[#3e3020] transition-all"
              >
                <LayoutList size={13} />
                <span className="inline">All Questions</span>
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
