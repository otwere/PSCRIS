import React, { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
export const CurrentDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
  };
  return <div className="flex flex-col sm:flex sm:flex-row items-center gap-4 text-gray-600 bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-600" />
        <span className="font-medium">{formatDate(dateTime)}</span>
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Clock className="h-5 w-5 text-blue-600" />
        <span className="font-medium">{formatTime(dateTime)}</span>
      </div>
    </div>;
};