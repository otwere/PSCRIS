import React, { useEffect } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";
interface NotificationProps {
  type: "success" | "error" | "warning";
  message: string;
  onClose: () => void;
  duration?: number;
}
export const Notification = ({
  type,
  message,
  onClose,
  duration = 5000
}: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <XCircle className="h-5 w-5 text-red-500" />,
    warning: <AlertCircle className="h-5 w-5 text-yellow-500" />
  };
  const colors = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-yellow-50 border-yellow-200"
  };
  return <div className={`fixed bottom-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border ${colors[type]} animate-slide-up`} role="alert">
      {icons[type]}
      <p className="text-gray-600">{message}</p>
      <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full" aria-label="Close notification">
        <X className="h-4 w-4 text-gray-400" />
      </button>
    </div>;
};