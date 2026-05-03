import {
  ChevronDown,
  ChevronUp,
  Minus,
  School,
  Target,
  TrendingUp,
  Trophy,
  Users
} from "lucide-react";
import { useState } from "react";
import { MOCK_LEADERBOARD } from "@/data/mockData";
import PodiumCard from "@/components/UI/leader_board/PodiumCard";

/* ─── Trend icon based on value ─────────────────────────────── */
function TrendIcon({ trend }: { trend: string | number }) {
  const val = typeof trend === "string" ? parseInt(trend) : trend;
  if (val > 0) return <ChevronUp size={12} className="text-emerald-400" />;
  if (val < 0) return <ChevronDown size={12} className="text-red-400" />;
  return <Minus size={10} className="text-[#4a3d2e]" />;
}

/* ─── Main Component ─────────────────────────────────────────────── */
export default function Leaderboard() {
  // const [, setLocation] = useLocation();
  const [quizId, setQuizId] = useState<string>("all");
  const [partId, setPartId] = useState<string>("all");
  const [schoolId, setSchoolId] = useState<string>("all");

  const params: any = {};
  if (quizId !== "all") params.quizId = parseInt(quizId, 10);
  if (partId !== "all") params.partId = parseInt(partId, 10);
  if (schoolId !== "all") params.schoolId = parseInt(schoolId, 10);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Trophy className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Bảng xếp hạng
              </h1>
              <p className="text-muted-foreground text-sm">
                Top thí sinh xuất sắc
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
            {[
              { icon: Users, label: "Thí sinh", value: 7 },
              { icon: School, label: "Trường", value: 5 },
              { icon: TrendingUp, label: "Điểm TB", value: "7.5" },
              { icon: Target, label: "Điểm cao nhất", value: "950" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-card border border-card-border rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Top 3 Podium ── */}
        {MOCK_LEADERBOARD.length >= 3 && (
          <div className="mb-10">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-5">
              🏆 Top 3 Xuất sắc
            </p>
            {/* Cards: 2nd | 1st | 3rd  — 1st is taller and centered */}
            <div className="grid grid-cols-3 items-end gap-3 sm:gap-5 justify-center md:px-10">
              {/* 2nd place */}
              {MOCK_LEADERBOARD[1] && (
                <PodiumCard entry={MOCK_LEADERBOARD[1]} rank={2} delay={0.15} />
              )}
              {/* 1st place */}
              {MOCK_LEADERBOARD[0] && (
                <PodiumCard entry={MOCK_LEADERBOARD[0]} rank={1} delay={0} />
              )}
              {/* 3rd place */}
              {MOCK_LEADERBOARD[2] && (
                <PodiumCard entry={MOCK_LEADERBOARD[2]} rank={3} delay={0.3} />
              )}
            </div>
          </div>
        )}

        {/* ── Full Rankings ── */}
        <div className="bg-card border border-card-border rounded-xl overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-sm">
              Bảng xếp hạng đầy đủ
            </h3>
            <span className="text-xs text-muted-foreground">
              {MOCK_LEADERBOARD.length} thí sinh
            </span>
          </div>
          {MOCK_LEADERBOARD.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Đang tải...
            </div>
          ) : MOCK_LEADERBOARD.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Trophy className="w-10 h-10 mx-auto mb-3 opacity-40" />
              Chưa có kết quả
            </div>
          ) : (
            <div className="divide-y divide-border">
              {MOCK_LEADERBOARD.map((entry, index) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 px-4 py-3 hover:bg-muted/30 transition-colors ${index < 3 ? "bg-primary/5" : ""}`}
                  data-testid={`row-leaderboard-${entry.id}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      index === 0
                        ? "bg-yellow-400/20 text-yellow-400"
                        : index === 1
                          ? "bg-slate-400/20 text-slate-300"
                          : index === 2
                            ? "bg-orange-600/20 text-orange-400"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground text-sm truncate">
                        {entry.name}
                      </p>
                      {entry.class && (
                        <span className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded flex-shrink-0">
                          {entry.class}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {entry.school}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 flex items-baseline gap-4">
                    <Trophy size={11} className="text-[#c8a46e]" />
                    <p className="font-bold text-foreground text-sm">
                      {entry.score}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      1m20s
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mr-1">
                      <TrendIcon trend={"2"} />
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

    {/* Filters */}
        // <div className="flex flex-wrap gap-3 mb-8">
        //   <Select
        //     value={quizId}
        //     onValueChange={(v: any) => {
        //       setQuizId(v);
        //       setPartId("all");
        //     }}
        //   >
        //     <SelectTrigger className="w-44 bg-card border-input text-sm">
        //       <SelectValue placeholder="Cấp độ thi" />
        //     </SelectTrigger>
        //     <SelectContent className="bg-popover border-popover-border">
        //       <SelectItem value="all">Tất cả cấp độ</SelectItem>
        //       {["GM1", "GM2"].map((q, i) => (
        //         <SelectItem key={i} value={String(i)}>
        //           {q}
        //         </SelectItem>
        //       ))}
        //     </SelectContent>
        //   </Select>

        //   <Select
        //     value={partId}
        //     onValueChange={setPartId}
        //     disabled={quizId === "all"}
        //   >
        //     <SelectTrigger className="w-44 bg-card border-input text-sm">
        //       <SelectValue placeholder="Phần thi" />
        //     </SelectTrigger>
        //     <SelectContent className="bg-popover border-popover-border">
        //       <SelectItem value="all">Tất cả phần</SelectItem>
        //       {["GM1", "GM2"].map((p, i) => (
        //         <SelectItem key={i} value={String(i)}>
        //           {p}
        //         </SelectItem>
        //       ))}
        //     </SelectContent>
        //   </Select>

        //   <Select value={schoolId} onValueChange={setSchoolId}>
        //     <SelectTrigger className="w-52 bg-card border-input text-sm">
        //       <SelectValue placeholder="Trường học" />
        //     </SelectTrigger>
        //     <SelectContent className="bg-popover border-popover-border">
        //       <SelectItem value="all">Tất cả trường</SelectItem>
        //       {["THCS Huynh Van Nghe", "THCS Le Hong Phong"].map((s, i) => (
        //         <SelectItem key={i} value={String(i)}>
        //           {s}
        //         </SelectItem>
        //       ))}
        //     </SelectContent>
        //   </Select>
        // </div>