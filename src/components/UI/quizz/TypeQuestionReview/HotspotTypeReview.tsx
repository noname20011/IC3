import UserClick from "@/components/core/hotspot/UserClick";
import { HotspotAnswer } from "@/types/answer";
import { HotSpotEntity } from "../../../../types/questions";

interface HotspotTypeReviewProps {
  question: HotSpotEntity;
  userPts?: HotspotAnswer;
  isCorrect: boolean;
}


const HotspotTypeReview = (props: HotspotTypeReviewProps) => {
  const { question: q, userPts, isCorrect } = props;
  
  return (
    <div
      className={`flex items-center gap-3 rounded-xl overflow-hidden border mt-3 ${isCorrect ? "bg-emerald-400/8 border-emerald-400/20" : "bg-red-400/8 border-red-400/20"}`}
    >
      <div className="relative w-fit">
        <img
          src={q.imageUrl}
          style={{
            display: "block",
            maxWidth: "100%",
          }}
          alt="Exam"
        />
        {q.hotSpots.map((point, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: `${point.left}%`,
              top: `${point.top}%`,
              width: `${point.width}%`,
              height: `${point.height}%`,
              background: "rgba(0,0,0,0.6)",
              zIndex: 10,
            }}
          ></div>
        ))}
        {(userPts || []).map((point) => (
          <div
            key={point.id}
            style={{
              position: "absolute",
              left: `${point.left}%`,
              top: `${point.top}%`,
              transform: "translate(-50%, -50%)",
              zIndex: 12,
            }}
          >
            <UserClick color="#c8a46e" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotspotTypeReview;
