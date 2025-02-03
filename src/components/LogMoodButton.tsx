import React, { useState } from "react";
import MoodSelectorModal from "./MoodSelectorModal";

interface LogMoodButtonProps {
  onMoodSelect: (mood: "PLEASANT" | "SAD" | "EXCITED") => void;
}
const LogMoodButton: React.FC<LogMoodButtonProps> = ({ onMoodSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="w-full min-w-80 h-20 p-6 rounded-3xl bg-lavender-300 hover:bg-lavender-200 text-white border-none"
      >
        LOG MOOD
      </button>

      {isModalOpen && (
        <MoodSelectorModal
          onClose={closeModal}
          onMoodSelect={(mood: "PLEASANT" | "SAD" | "EXCITED") => {
            onMoodSelect(mood);
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default LogMoodButton;
