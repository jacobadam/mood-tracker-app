import { BrowserRouter, Routes, Route } from "react-router";
import { MoodTrackerApp } from "./components/MoodTrackerApp";

export const App = () => {
  return (
    <div className="bg-gray-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoodTrackerApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
