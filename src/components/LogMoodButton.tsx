import React, { useState } from "react";
import MoodSelectorModal from "./MoodSelectorModal";

type MoodType = "PLEASANT" | "SAD" | "EXCITED";

export default function LogMoodButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleMoodSelect = (mood: MoodType) => {
    closeModal();
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
}
