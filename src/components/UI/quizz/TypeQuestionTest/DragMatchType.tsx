import { useState } from "react";
import { MatchEntity } from "../../../../types/questions";
import { MatchAnswer } from "../../../../types/answer";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import DragItem from "../../../QuestionType/DragItem";
import DropZoneItem from "../../../QuestionType/DropZoneItem";

interface DragMatchProps {
  q: MatchEntity;
  value: MatchAnswer;
  onChange: (v: MatchAnswer) => void;
}

export default function DragMatch(props: DragMatchProps) {
  const { q, value, onChange } = props;

  const leftItems = q.pairs.map((pair) => pair.left);
  const rightItems = q.pairs.map((pair) => pair.right);


  const getLeft = (value: string) => leftItems.find((i) => i.value === value)!;
  const getRight = (value: string) =>
    rightItems.find((i) => i.value === value)!;
  const getImageUrl = (value: string) =>
    rightItems.find((i) => i.imageUrl === value)!;

  
  const [pairs, setPairs] = useState<MatchAnswer>(() => {
    
    return value && Object.keys(value).length > 0 ? value : q.pairs.filter((pair) => pair.isCorrect).map((pair) => ({ [pair.right.value ? pair.right.value : pair.right.imageUrl ? pair.right.imageUrl : "" ]: null }));
  });
  
  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;
    const leftValue = active.id as string;
    const rightValue = over.id as string;

    setPairs((prev) => {
      const newPairs = [...prev];

    // tìm phần tử có dragging = rightValue
    const oldIndex = newPairs.findIndex(
      (p) => Object.values(p)[0] === leftValue,
    );

    // tìm phần tử có tai drop = leftValue
    const targetIndex = newPairs.findIndex(
      (p) => Object.keys(p)[0] === rightValue,
    );

    if (targetIndex === -1 || oldIndex === targetIndex) return prev;

    const [targetLeft, targetRight] = Object.entries(newPairs[targetIndex])[0];

    newPairs[targetIndex] = { [targetLeft]: leftValue };

    if (oldIndex !== -1) {
      const [oldLeft] = Object.entries(newPairs[oldIndex])[0];
      newPairs[oldIndex] = { [oldLeft]: targetRight || null };
    }
    
    setDragging(null);
    onChange(newPairs);
    return newPairs;
    });
  };

  // animate the dragged item to the drop target
  const [dragging, setDragging] = useState<string | null>(null);

  const getDraggedItem = (index: number) => pairs?.[index] ? Object.values(pairs[index])[0] : null;
  const handleDragStart = ({ active }: DragStartEvent) =>
    setDragging(active.id as string);
  
  return (
    <DndContext modifiers={[restrictToFirstScrollableAncestor]} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-hidden overflow-y-hidden">
        {/* LEFT */}
        <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-4 col-span-1">
          <p className="text-[10px] font-semibold text-[#6b5e4a] uppercase tracking-widest mb-3">
            Drag from here
          </p>
          <div className="flex flex-col gap-2">
            {leftItems
              .filter((item) =>
                !pairs?.some((p) => Object.values(p).includes(item.value)),
              )
              .map((item, index) => (
                <DragItem
                  key={index}
                  answer={item}
                  usedRight={getDraggedItem(index)}
                  dragging={dragging}
                />
              ))}
          </div>
        </div>

        {/* Right — drop targets */}
        <div className="bg-[#1a1510] border border-[#2e2418] rounded-2xl p-4 col-span-2">
          <p className="text-[10px] font-semibold text-[#6b5e4a] uppercase tracking-widest mb-3">
            Drop to match
          </p>
          <div className="flex flex-col gap-2 w-full">
            {pairs.map((pair, index) => {
              return (
                <DropZoneItem
                  key={Object.keys(pair)[0]}
                  pair={pair}
                  getLeft={getLeft}
                  getRight={getRight}
                  getImageUrl={getImageUrl}
                  usedRight={getDraggedItem(index)}
                  dragging={dragging}
                />
              );
            })}
          </div>
        </div>
      </div>
    </DndContext>
  );
}
