import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { Options } from "../../types/questions";

interface SortPropItem {
  answer: Options;
  index?: number;
}

const SortItem = (props: SortPropItem) => {
  const { answer, index } = props;

  const animateLayoutChanges = (args: any) =>
    defaultAnimateLayoutChanges({
      ...args,
      wasDragging: true,
    });

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: answer!.id!, animateLayoutChanges });

  const bgColors = [ "bg-[#ffffff08]", "bg-[#ffffff10]", "bg-[#ffffff18]", "bg-[#ffffff22]" ];

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex items-center gap-3 px-4 py-4 glass-card rounded-xl cursor-grab active:cursor-grabbing hover:border-[#c8a46e]/30 hover:bg-[#251e14] duration-150 select-none group ${bgColors[index || 0]}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition:
          transition || "transform 250ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <span className="px-3 min-w-10 h-7 rounded-lg bg-[#2a2418] text-[#c8a46e] text-xs font-bold flex items-center justify-center shrink-0">
        Step {index! + 1}
      </span>
      <span className="text-sm font-medium text-[#c8a88a] flex-1 leading-snug">
        {answer.value}
      </span>
      <GripVertical
        size={16}
        className="text-[#4a3d2e] group-hover:text-[#6b5e4a] transition-colors shrink-0"
      />
    </div>
  );
};

export default SortItem;
