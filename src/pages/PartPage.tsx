import {
  Check,
  ChevronDown,
  ChevronLeft,
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  School as SchoolIcon,
  User
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SubmitEvent, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../components/core/popups/PopUp";
import PartCard from "../components/PartCard";
import { MOCK_LEVELS, MOCK_SCHOOLS } from "../data/mockData";
import { toast } from "../hooks/use-toast";
import { cn } from "../libs/utils";

interface FormData {
  studentName: string;
  studentClass: string;
  schoolId: string;
  password: string;
  schoolName: string | null;
}

export default function PartsPage() {
  const { levelId } = useParams();
  const level = MOCK_LEVELS.find((l) => l.id === levelId);

  const [showPopup, setShowPopup] = useState(false);
  const [choosePart, setChoosePart] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    studentName: "",
    studentClass: "",
    schoolId: "",
    password: "",
    schoolName: "",
  });

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const currentSchool = MOCK_SCHOOLS.find((s) => s.id === formData.schoolId);

  if (!level) return <div>Level not found</div>;

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== "OT626") {
      toast({title: "Password is incorrect", variant: "destructive"});
      return;
    }
    
    localStorage.clear();
    const studentInfo = {
      studentName: formData.studentName,
      studentClass: formData.studentClass,
      schoolId: formData.schoolId,
      schoolName: currentSchool?.name,
    };

    localStorage.setItem("student", JSON.stringify(studentInfo));
    navigate(`/quiz/${levelId}/${choosePart}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8 max-w-5xl mx-auto px-4 pt-6"
    >
      <header className="space-y-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
        >
          <ChevronLeft size={16} />
          Quay lại danh sách bài thi
        </button>
        <div className="space-y-1">
          <h2 className="text-4xl font-display font-bold">Chọn phần thi</h2>
          <p className="text-slate-400">Chọn phần thi để bắt đầu làm bài</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {level.parts.map((part, index) => (
          <PartCard
            part={part}
            setShowPopup={() => setShowPopup(true)}
            setChoosePart={setChoosePart}
            index={index}
          />
        ))}
      </div>
      {showPopup && (
        <PopUp showPopup={showPopup} setShowPopup={setShowPopup}>
          <div className="text-center space-x-2">
            <h3 className="text-2xl  md:font-display font-bold">
              Thông tin thí sinh
            </h3>
            <p className="text-sm text-slate-400">
              Vui lòng cung cấp thông tin để bắt đầu bài thi
            </p>
          </div>

          <form className="" onSubmit={(e) => handleSubmit(e)}>
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                Họ và tên
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
                  onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                Lớp
              </label>
              <div className="relative">
                <GraduationCap
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Nhập lớp của bạn"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
                  onChange={(e) => setFormData({...formData, studentClass: e.target.value})}
                />
              </div>
            </div>

            {/* Shool select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-200 ml-1">
                Trường học
              </label>
              <div className="relative" ref={selectRef}>
                <button
                  type="button"
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="w-full bg-white/5 border border-white/10 pl-12 pr-4 rounded-xl py-3 px-4 flex items-center justify-between text-left focus:outline-none focus:border-devotion-gold/50 transition-colors"
                >
                  <SchoolIcon
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={18}
                  />
                  <span
                    className={currentSchool ? "text-white" : "text-slate-500"}
                  >
                    {currentSchool ? currentSchool.name : "Chọn trường của bạn"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "text-slate-500 transition-transform duration-200",
                      isSelectOpen && "rotate-180",
                    )}
                    size={18}
                  />
                </button>

                <AnimatePresence>
                  {isSelectOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute z-50 w-full mt-2 bg-background border border-white/10 rounded-xl shadow-2xl max-h-[200px]"
                    >
                      <div className="max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                        {MOCK_SCHOOLS.map((school, index) => (
                          <button
                            key={school.id}
                            type="button"
                            onClick={() => {
                              setFormData({...formData, schoolId: school.id});
                              setIsSelectOpen(false);
                            }}
                            className={cn(
                              "w-full px-4 py-3 text-left flex items-center justify-between transition-colors",
                              formData.schoolId === school.id
                                ? "bg-devotion-gold/20 text-devotion-gold"
                                : "text-slate-300 hover:bg-devotion-gold/10",
                                index === 0 && "first:rounded-tl-xl first:rounded-tr-xl",
                                index === MOCK_SCHOOLS.length - 1 && "last:rounded-bl-xl last:rounded-br-xl",
                            )}
                          >
                            <span>{school.name}</span>
                            {formData.schoolId === school.id && (
                              <Check size={16} />
                            )}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 ml-1">
                Mật khẩu bài thi
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-devotion-gold/50 transition-colors"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {/* Icon toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button className="w-full py-4 bg-devotion-gold text-devotion-bg rounded-2xl font-bold mt-8 hover:bg-amber-400 transition-colors">
              Bắt đầu làm bài
            </button>
          </form>
        </PopUp>
      )}
    </motion.div>
  );
}
