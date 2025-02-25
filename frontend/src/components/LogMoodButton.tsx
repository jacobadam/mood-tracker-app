import React, { useState } from "react";
import MoodSelectorModal from "./MoodSelectorModal";
import { MoodType } from "../types/mood-types";

interface LogMoodButtonProps {
  onMoodSelect: (mood: MoodType) => void;
}

const LogMoodButton: React.FC<LogMoodButtonProps> = ({ onMoodSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="w-full">
        <div className="flex flex-2">
          <button
            onClick={openModal}
            className="min-w-full lg:min-w-80 h-20 p-6 rounded-3xl bg-lavender-300 hover:bg-lavender-200 text-white border-none  mt-2 lg:mt-0"
          >
            LOG MOOD
          </button>
          <div className="flex flex-1 justify-end items-center" />
        </div>
      </div>

      {isModalOpen && (
        <MoodSelectorModal
          onClose={closeModal}
          onMoodSelect={(mood: MoodType) => {
            onMoodSelect(mood);
            closeModal();
          }}
        />
      )}
    </>
  );
};

export default LogMoodButton;
