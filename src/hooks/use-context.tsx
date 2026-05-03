import { createContext, useContext, useState, ReactNode, use } from "react";
import LoadingScreen from "../components/core/LoadingScreen";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  showList: boolean
  setShowList: (loading: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showList, setShowList] = useState(false);
  
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading, setShowList, showList }}>
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
