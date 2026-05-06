import UserClick from "@/components/core/hotspot/UserClick";
import { HotspotAnswer } from "@/types/answer";
import { HotSpotEntity } from "@/types/questions";
import { useEffect, useRef, useState } from "react";

interface HotspotProps {
  q: HotSpotEntity;
  value?: HotspotAnswer;
  onChange: (v: HotspotAnswer) => void;
}

export default function HotSpotType(props: HotspotProps) {
  const { q, value, onChange } = props;
  const imgRef = useRef<HTMLImageElement>(null);
  const [draggingPointId, setDraggingPointId] = useState<number | null>(0);

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    // Nếu đã chọn đủ 3 điểm thì không cho chọn thêm (hoặc cho phép đổi điểm cũ)
    console.log(value?.length, q.totalRequiredHotSpot);
    
    console.log((value?.length ?? 0) >= q.totalRequiredHotSpot);
    

    if ((value?.length ?? 0) >= q.totalRequiredHotSpot) return;

    const img = imgRef.current;
    if (!img) return;
    const { width, height, left, top } = img.getBoundingClientRect();

    // Tính toán tọa độ theo %
    const xPercent = parseFloat(
      (((e.clientX - left) / width) * 100).toFixed(2),
    );
    const yPercent = parseFloat(
      (((e.clientY - top) / height) * 100).toFixed(2),
    );

    const newPoint = { left: xPercent, top: yPercent, id: Date.now() };
    onChange([...(value || []), newPoint]);
  };

  // 2. Bắt đầu kéo một điểm
  const handleMouseDown = (e: any, id: number) => {
    e.stopPropagation(); // Ngăn sự kiện click vào ảnh
    setDraggingPointId(id);
  };

  // 3. Xử lý di chuyển chuột trên toàn bộ vùng chứa
  const handleMouseMove = (e: MouseEvent) => {
    if (draggingPointId === null) return;

    const img = imgRef.current;
    if(!img) return;
    const { width, height, left, top } = img.getBoundingClientRect();

    // Giới hạn tọa độ trong phạm vi ảnh (0 - 100%)
    let xPercent = ((e.clientX - left) / width) * 100;
    let yPercent = ((e.clientY - top) / height) * 100;

    xPercent = Math.max(0, Math.min(100, xPercent));
    yPercent = Math.max(0, Math.min(100, yPercent));

    const newData: HotspotAnswer = (value || []).map((p) =>
      p.id === draggingPointId
        ? {
            ...p,
            left: parseFloat(xPercent.toFixed(2)),
            top: parseFloat(yPercent.toFixed(2)),
          }
        : p,
    );

    onChange(newData);
  };

  // 4. Thả chuột để dừng kéo
  const handleMouseUp = () => {
    setDraggingPointId(null);
  };

  // Lắng nghe sự kiện mouseup/mousemove trên window để trải nghiệm kéo mượt mà hơn
  useEffect(() => {
    if (draggingPointId !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [draggingPointId]);

  return (
    <div className="relative inline-block w-fit"
        onDragStart={(e) => e.preventDefault()} // Chặn trình duyệt kéo ảnh gốc
      >
        <img
          ref={imgRef}
          src={q.imageUrl}
          onClick={handleClick}
          style={{
            display: "block",
            maxWidth: "100%",
            cursor:
              (value || []).length < q.totalRequiredHotSpot ? "crosshair" : "default",
          }}
          alt="Exam"
        />

        {(value || []).map((point, index) => (
          <div
            key={point.id}
            onMouseDown={(e) => handleMouseDown(e, point.id)}
            style={{
              position: "absolute",
              left: `${point.left}%`,
              top: `${point.top}%`,
              transform: "translate(-50%, -50%)",
              cursor: "cursor-crosshair",
              zIndex: draggingPointId === point.id ? 10 : 1,
            }}
          >
            <UserClick color={`${draggingPointId === point.id ? "#ff9900" : "#c8a46e"}`}/>
          </div>
        ))}
      </div>
  );
}
