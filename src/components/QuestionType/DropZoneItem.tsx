import { Options } from "../../types/questions";
import { useDroppable } from "@dnd-kit/core";
import DragItem from "./DragItem";
import { MatchAnswer } from "../../types/answer";



interface DropPropItem {
  pair: Record<string, string | null>;
  getLeft: (value: string) => Options;
  getRight: (value: string) => Options;
  getImageUrl: (value: string) => Options;
  usedRight: string | null;
  dragging: string | null;
}

const DropZoneItem = (props: DropPropItem) => {
  const { pair, getLeft, getRight, getImageUrl, usedRight, dragging } = props;
  const [left, right] = Object.entries(pair)[0];
  const { setNodeRef, isOver } = useDroppable({
    id: left!
  });
  
  const imgData = getImageUrl(left!)?.imageUrl! || "";
  const valueData = getRight(left!)?.value! || "";
  return (
    <div
      ref={setNodeRef}
      className={`flex items-stretch gap-2 w-full rounded-xl transition-all duration-200
        ${isOver ? "p-1 border-[2px] border-white" : ""}
        ${right ? "shadow-sm" : "p-1 border-[2px] border-dashed border-[#3a3020]"}

      `}
    >
      {/* LEFT */}
      <div className={`w-1/3 pl-2 m-[6px]  ${right ? "" : "border-r border-[#3a3020] border-dashed"} min-h-[48px] flex items-center`}>
        {right ? (
          <DragItem answer={getLeft(right)} usedRight={usedRight} dragging={dragging}/>
        ) : (
          <span className="text-gray-400 text-sm ">Drop here</span>
        )}
      </div>

      {/* RIGHT */}
      {valueData && (valueData.trim() !== "" ? <div
        className={`m-[6px] w-2/3 pl-10 pr-2 md:px-10 py-7 bg-[#2a2418] text-[#aea799] rounded-tr-sm rounded-br-sm border-[#3a3020] border-[2px] [mask:radial-gradient(circle_25px_at_left_center,transparent_100%,black_100%)] z-10 overflow-hidden relative before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:border-[2px] before:border-[#3a3020] before:-left-[1.81rem] before:z-2 before:rounded-full before:p-[1.58rem] before:[clip-path:inset(0_0_0_50%)] before:bg-[#2a2418] ${right ? "ml-[-21px]" : null}`}
      >
        {valueData}
      </div> : null)}

      {/* has type is image */}
      {imgData && <div
        className={`m-[6px] w-2/3 pl-10 pr-2 md:px-10 bg-[#2a2418] text-[#aea799] rounded-tr-sm rounded-br-sm border-[#3a3020] border-[2px] [mask:radial-gradient(circle_25px_at_left_center,transparent_100%,black_100%)] z-10 overflow-hidden relative before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:border-[2px] before:border-[#3a3020] before:-left-[1.81rem] before:z-2 before:rounded-full before:p-[1.58rem] before:[clip-path:inset(0_0_0_50%)] before:bg-[#2a2418] ${right ? "ml-[-21px]" : null}`}
      >
        <img className="max-h-24" src={imgData} alt={imgData}  loading="lazy"/>
      </div>}
    </div>
  );
};

export default DropZoneItem;
