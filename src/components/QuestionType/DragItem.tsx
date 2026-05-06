import { useDraggable } from "@dnd-kit/core";
import { Options } from "../../types/questions";

interface SortPropItem {
  answer: Options;
  usedRight: string | null;
  dragging: string | null;
}

const DragItem = (props: SortPropItem) => {
  const { answer, usedRight, dragging } = props;

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: answer?.value!,
  });
  
  const used = usedRight && usedRight.includes(answer?.value!);
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`w-[95%] px-4 py-7 border-[2px] cursor-grab active:cursor-grabbing z-10 rounded-tl-sm rounded-bl-sm relative before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-[1.52rem] before:border-[2px] before:z-10 before:rounded-full before:p-[1.45rem] before:[clip-path:inset(0_0_0_50%)] h-full text-center place-content-center ${isDragging ? "z-20" : ""} ${
        used
          ? "bg-[#c8a46e] border-[#a88352] before:bg-[#c8a46e] before:border-[#a88352] text-[#dbd7cc] cursor-grab hover:scale-[1.02]"
          : dragging === answer?.value
            ? "bg-[#c8a46e]/15 before:bg-[#c8a46e]/15 before:border-[#c8a46e]  border-[#c8a46e]/40 text-[#e8c898] cursor-grabbing scale-[0.98]"
            : "bg-[#2a2418] before:bg-[#2a2418] before:border-[#3a3020] border-[#3a3020] text-[#c8a88a] cursor-grab hover:border-[#c8a46e]/30 hover:bg-[#2e2818] hover:before:bg-[#2e2818] hover:before:border-[#c8a46e]/30"
      }`}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      {answer?.value}
    </div>
  );
};

export default DragItem;
