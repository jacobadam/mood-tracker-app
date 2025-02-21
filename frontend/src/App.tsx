import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MoodTrackerApp from "./components/MoodTrackerApp";

const App: React.FC = () => {
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

export default App;
