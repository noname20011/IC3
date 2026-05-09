import { Options, SortEntity } from "../../../../types/questions";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { ReorderAnswer } from "../../../../types/answer";
import { SortableContext } from "@dnd-kit/sortable";
import SortItem from "../../../QuestionType/SortItem";

interface ReorderTypeProps {
  q: SortEntity;
  value: ReorderAnswer;
  onChange: (v: ReorderAnswer) => void;
}

const ReorderType = (props: ReorderTypeProps) => {
  const { q, value, onChange } = props;

  const items = value ?? q.options.map((opt) => opt.id!);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item === active.id);
      const newIndex = items.findIndex((item) => item === over.id);

      const next = [...items];

      // remove item old index when drag and insert item to new index
      const [movedItem] = next.splice(oldIndex, 1);
      next.splice(newIndex, 0, movedItem);
      onChange(next);
    }
  };

  // Set up sort for mobile
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    }),
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <SortableContext items={items}>
        <div className="flex flex-col gap-2">
          <p className="text-xs text-[#6b5e4a] italic mb-1 flex items-center gap-1.5">
            <GripVertical size={13} />
            Drag items to arrange them in the correct order
          </p>
          {items.map((item, i) => (
            <SortItem
              key={item}
              answer={q.options.find((opt) => opt.id === item) as Options}
              index={i}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default ReorderType;
