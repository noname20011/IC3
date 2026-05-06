import { cn } from "@/libs/utils";

interface UserClickProps {
  color: string
}
const UserClick = ({color}: UserClickProps) => {


  return (
    <div className={cn("relative flex items-center justify-center")}>
    {/* Layered Glows */}
    <div className="absolute inset-0 bg-[#C69E67]/20 blur-xl rounded-full" />
    <div className="absolute inset-[15%] bg-[#C69E67]/30 blur-md rounded-full" />
    
    <svg viewBox="0 0 100 100" className="w-10 h-10 md:w-20 md:h-20 relative z-10 p-1" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Ring */}
      <circle cx="50" cy="50" r="35" stroke={cn(color)} strokeWidth="3" strokeOpacity="0.8" />
      
      {/* Center Point */}
      <circle cx="50" cy="50" r="14" fill={cn(color)} />
      {/* Crosshair Markers */}
      {/* Top */}
      <rect x="47.5" y="8" width="5" height="22" rx="2.5" fill={cn(color)} />
      {/* Bottom */}
      <rect x="47.5" y="70" width="5" height="22" rx="2.5" fill={cn(color)} />
      {/* Left */}
      <rect x="8" y="47.5" width="22" height="5" rx="2.5" fill={cn(color)} />
      {/* Right */}
      <rect x="70" y="47.5" width="22" height="5" rx="2.5" fill={cn(color)} />
    </svg>
  </div>
  );
};

export default UserClick;
