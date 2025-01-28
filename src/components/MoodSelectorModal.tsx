import React from "react";

interface MoodSelectorModalProps {
  onClose: () => void;
}

const MoodSelectorModal: React.FC<MoodSelectorModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative p-8 rounded-2xl bg-lavender-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 appearance-none border-none bg-transparent p-0"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default MoodSelectorModal;
