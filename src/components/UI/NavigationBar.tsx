import { cn } from "../../libs/utils";
import { FileStack, HomeIcon, LogIn, Trophy } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCustomContext } from "../../hooks/use-context";

export default function NavigationBar() {
  const location = useLocation();
  const { setIsLoading } = useCustomContext();

  const navItems = [
    { path: "/", icon: HomeIcon, label: "Home" },
    { path: "/level", icon: FileStack, label: "Levels" },
    { path: "/leaderboard", icon: Trophy, label: "Leaderboard" },
    // { path: "/manage", icon: Settings, label: "Admin" },
    { path: "/admin/login", icon: LogIn, label: "Login Admin" },
  ];

  return (
    <>
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 glass-card px-6 py-3 flex items-center gap-8 z-[101]">
        {navItems.map((item) => {
          const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsLoading(false)}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive
                  ? "text-devotion-gold scale-110"
                  : "text-slate-400 hover:text-slate-200",
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium uppercase tracking-wider">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
      <div className="fixed bottom-0 left-0 w-full z-10">
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 
                  bg-gradient-to-b from-transparent to-white/20"
        />
      </div>
    </>
  );
}
