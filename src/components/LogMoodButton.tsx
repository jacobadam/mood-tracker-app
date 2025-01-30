import React, { useState } from "react";
import MoodSelectorModal from "./MoodSelectorModal";
import { addMood } from "../api/moodTrackerApi";

type MoodType = "PLEASANT" | "SAD" | "EXCITED";

const LogMoodButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const apiKey = process.env.REACT_APP_API_KEY;
  if (!apiKey) {
    console.error("API key is missing.");
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleMoodSelect = async (mood: MoodType) => {
    if (!apiKey) {
      console.error("API key is missing.");
      return;
    }

    try {
      await addMood(mood, apiKey);
      console.log(`Mood "${mood}" successfully posted.`);
      closeModal();
    } catch (error) {
      console.error("Failed to post mood:", (error as Error).message);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-full h-20 p-6 rounded-3xl bg-lavender-300 hover:bg-lavender-200 text-white border-none"
      >
        LOG MOOD
      </button>

      {isModalOpen && (
        <MoodSelectorModal
          onClose={closeModal}
          onMoodSelect={handleMoodSelect}
        />
      )}
    </>
  );
};

export default LogMoodButton;
