import React, { useEffect } from "react";
import { X } from "lucide-react";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md"
}: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl"
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={e => {
    if (e.target === e.currentTarget) onClose();
  }}>
      <div className={`bg-white rounded-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-auto`} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 p-2 rounded-lg transition-colors" aria-label="Close modal">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>;
};