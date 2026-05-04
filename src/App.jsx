import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PartPage from "./pages/PartPage";
import DailyDevotion from "./pages/UI_Sample/DailyDevotion";
import QuizPage from "./pages/QuizPage";
import { Login } from "./pages/admin/Login";
import NotFoundPage from "./pages/NotFoundPage";
import NavigationBar from "./components/UI/NavigationBar";
import { LoadingProvider } from "./hooks/use-context";
import HomePage from "./pages/Home";
import LevelPage from "./pages/LevelPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import Header from "./components/UI/Header";
import { Toaster } from "./components/core/Toaster";
import ScrollToTop from "./components/core/ScrollToTop";
import Footer from "./components/UI/Footer";

export default function App() {
  const location = useLocation();
  const locationPath = location.pathname;
  
  return (
    <>
      <ScrollToTop />
      <div className="bg-background py-2 px-2 relative">
        <LoadingProvider>
          {/* Header */}
          <Header locationPath={locationPath} onBack={() => window.history.back()}/>
            
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/level" element={<LevelPage />} />
            <Route path="/level/:levelId/parts" element={<PartPage />} />
            <Route path="/ui-sample/devotion" element={<DailyDevotion onLeaderboard={() => window.history.back()} />} />
            <Route path="/leaderboard" element={<LeaderboardPage onBack={() => window.history.back()} />} />
            <Route path="/quiz/:levelId/:partId" element={<QuizPage onBack={() => window.history.back()} />} />
            <Route path="*" element={<NotFoundPage/>} />


            {/* ADMIN */}
            <Route path="/admin/login" element={<Login onBack={() => window.location.href = "/admin/dashboard"} />} />
          </Routes>

          {/* side bar */}
          {!locationPath.startsWith("/quiz") && <NavigationBar />}
        </LoadingProvider>
        <Toaster/>
        <Footer/>
      </div>
    </>
  );
}