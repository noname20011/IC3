import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  HandMetal,
  LoaderPinwheel,
} from "lucide-react";
import { motion } from "motion/react";
import { QuizPart } from "../../types";
import { Button } from "./core/buttons/MainButton";
import { pickRandom } from "@/utils/shuffleArray";
import questionsData from "../data/questions.json";
import { QuestionTypeEntity } from "@/types/questions";

interface PartCardProps {
  part: QuizPart;
  index: number;
  setChoosePart: (partId: number) => void;
  setShowPopup: () => void;
}

export default function PartCard(props: PartCardProps) {
  const { part, index, setChoosePart, setShowPopup } = props;

  return (
    <motion.button
      key={part.id}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => {
        setShowPopup();

        if(part.name.includes("Level 1")) {
          const allQuestions: any[] = questionsData.map(item => item.questions).flat();
          const randomQuestions = pickRandom<QuestionTypeEntity>(allQuestions, 45);
          sessionStorage.setItem("test", JSON.stringify(randomQuestions));
        }
        setChoosePart(part.id);
      }}
      className="glass-card p-8 group relative overflow-hidden h-full flex flex-col justify-between hover:border-primary/40 group"
    >
      <div className="flex text-left items-start gap-4 mb-6">
        <div className="w-12 h-12 bg-devotion-gold/10 rounded-xl flex items-center justify-center text-devotion-gold shrink-0">
          <FileText size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-display font-bold group-hover:text-devotion-gold transition-colors">
            {part.name}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            {part?.description || `Phần thi ${part.name}`}
          </p>
        </div>
      </div>
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <LoaderPinwheel className="animate-spin-slow" size={80} />
      </div>
      <div className="flex items-center justify-between gap-6 pt-4 border-t border-white/5">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Clock size={16} className="text-devotion-gold/60" />
            <span>{part.duration && Math.floor(part.duration / 60) || 45} phút</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <BookOpen size={16} className="text-devotion-gold/60" />
            <span>{part.questionCount || 0} câu</span>
          </div>
        </div>
        <Button className="group-hover:bg-devotion-gold/90 bg-transparent border text-white">
          Vào thi
          <ArrowRight size={20} />
        </Button>
      </div>
    </motion.button>
  );
}
