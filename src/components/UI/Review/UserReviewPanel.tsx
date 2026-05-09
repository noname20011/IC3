import { Button } from "@/components/core/buttons/MainButton";
import { FormData } from "./TestViewScreen";
import { useNavigate } from "react-router-dom";
import { convertTime } from "@/utils/convertTime";
import { Avatar } from "@/utils/avatarName";
import { ConfettiSideCannons } from "@/components/UI/ConfettieEffect";

interface UserReviewPanelProps {
  userData: FormData;
  points: number;
  totalScore: number;
}

export default function UserReviewPanel({
  userData,
  points,
  totalScore,
}: UserReviewPanelProps) {
  const percent = (points / totalScore) * 100;

  const navigate = useNavigate();

  return (
    <div id="view-score" className="w-full md:w-[320px] rounded-2xl p-5 bg-gradient-to-b from-[#1a1510] to-[#181818] border border-white/10 shadow-xl relative">
      {/* Avatar + Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
          {userData?.studentName && <Avatar name={userData.studentName}/>}
        </div>

        <div className="min-w-0">
          <p className="text-white font-semibold truncate">
            {userData.studentName}
          </p>
          <p className="text-white/60 text-sm">
            {userData.studentClass} • {userData.schoolName}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between mt-4 text-sm">
        <span className="text-white/60">Time</span>
        <span className="text-white">{convertTime(Number(localStorage.getItem("timedDoTest") ?? 0))}</span>
      </div>

      <div className="flex justify-between items-baseline mt-2 text-sm">
        <span className="text-white/60">Points</span>
        <span className="text-yellow-400 font-semibold text-4xl">
          {points} / {totalScore}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-5">
        <div className="flex justify-between text-md text-white/50 mb-1">
          <span>0</span>
          <span>{Math.floor(totalScore / 3)}</span>
          <span>{Math.floor(totalScore / 3) * 2}</span>
          <span>{totalScore}</span>
        </div>

        <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
          {/* glow track */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-red-400 via-yellow-400 to-green-400 transition-all duration-700 ease-out"
            style={{ width: `${percent}%` }}
          />

          {/* highlight dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg transition-all duration-700"
            style={{ left: `calc(${percent}% - 8px)` }}
          />
        </div>

        {/* Emoji state */}
        <div className="flex justify-between mt-4 text-lg">
          <span
            className={
              points < totalScore / 3 ? "scale-[3] mt-1" : "opacity-40 scale-150"
            }
          >
            🤡
          </span>
          <span
            className={
              points >= totalScore / 3 && points < totalScore * 2 / 3 ? "scale-[3] mt-1" : "opacity-40 scale-150"
            }
          >
            😭
          </span>
          <span
            className={
              points >= totalScore * 2 / 3 && points < totalScore
                ? "scale-[3] mt-1"
                : "opacity-40 scale-150"
            }
          >
            😑
          </span>
          <span
            className={
              points === totalScore ? "scale-[3] mt-1" : "opacity-40 scale-150"
            }
          >
            😄
          </span>
        </div>
      </div>

      {/* Button */}

      <Button
        className="hover:bg-devotion-gold/90 bg-transparent border text-white mt-6 w-full relative overflow-hidden rounded-xl py-4 block"
        onClick={() => {
          navigate("/leaderboard");
          localStorage.clear();
          sessionStorage.clear();
        }}
      >
        {/* glow animation */}
        <span className="absolute inset-0 bg-white/20 blur-xl opacity-0 hover:opacity-100 transition" />

        <span className="relative z-10">Xem Bảng Xếp Hạng →</span>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[-100%] h-full w-[40%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-shimmer">
          </div>
        </div>
      </Button>

      {points === totalScore && <ConfettiSideCannons/>}
    </div>
  );
}
