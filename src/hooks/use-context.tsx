import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from "react";
import LoadingScreen from "../components/core/LoadingScreen";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showList: boolean
  setShowList: (loading: boolean) => void;
  setTimeCountDown: Dispatch<SetStateAction<number>>;
  timeCountDown: number;
  timeDoTest: number;
  setTimeDoTest: Dispatch<SetStateAction<number>>;
  completeQuiz: boolean;
  setCompleteQuiz: (complete: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  const [timeCountDown, setTimeCountDown] = useState<number>(100);
  const [timeDoTest, setTimeDoTest] = useState<number>(100);
  const [completeQuiz, setCompleteQuiz] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setShowList, showList, timeCountDown, setTimeCountDown, timeDoTest, setTimeDoTest, completeQuiz, setCompleteQuiz }}>
      {isLoading && <LoadingScreen />}
      {children}
    </LoadingContext.Provider>
  );
}

export function useCustomContext() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
