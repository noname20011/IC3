import { ChevronLeft, LayoutList } from "lucide-react";
import { useCustomContext } from "../../hooks/use-context";
import { useLocation } from "react-router-dom";

interface HeaderProps {
    onBack: () => void
}
const Header = (props: HeaderProps) => {
    const { onBack } = props;
    const { setShowList } = useCustomContext();

    const location = useLocation();
  return (
    <>
      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-[11] bg-[#13100d]/95 backdrop-blur-md border-b border-[#2a231a]">
        {/* Top row */}
        <div className="flex items-center justify-between px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-3">
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
              {
                location.pathname === "/quiz" && <span className="text-xs font-mono font-semibold text-[#c8a46e]">
                12:45
              </span>
              }
            </div>
            {/* Score */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1510] border border-[#2e2418] rounded-lg">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path
                  d="M6.5 1.5l1.2 2.4 2.7.4-1.95 1.9.46 2.66L6.5 7.5l-2.41 1.36.46-2.66L2.6 4.34l2.7-.4z"
                  fill="#c8a46e"
                />
              </svg>
              {
                location.pathname === "/quiz" && <span className="text-xs font-semibold text-[#c8a46e]">
                  {450} pts
                </span>
              }
            </div>
            {/* All Questions button */}
            <button
              onClick={() => setShowList(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1510] border border-[#2e2418] rounded-lg text-xs font-semibold text-[#7a6b55] hover:text-[#c8a46e] hover:border-[#3e3020] transition-all"
            >
              <LayoutList size={13} />
              <span className="hidden sm:inline">Questions</span>
            </button>
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c8a46e] to-[#9a7040] flex items-center justify-center text-xs font-bold text-[#0f0d0a]">
              JE
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
