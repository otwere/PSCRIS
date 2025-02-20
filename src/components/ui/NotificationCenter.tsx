import React, { useState } from "react";
import { Bell, X, CheckCircle, AlertTriangle, Info } from "lucide-react";
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  timestamp: Date;
  read: boolean;
};
interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}
export const NotificationCenter = ({
  notifications,
  onMarkAsRead,
  onClearAll
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "error":
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };
  return <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>}
      </button>
      {isOpen && <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-medium">Notifications</h3>
            {notifications.length > 0 && <button onClick={onClearAll} className="text-sm text-gray-600 hover:text-gray-800">
                Clear all
              </button>}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? <div className="p-4 text-center text-gray-500">
                No notifications
              </div> : notifications.map(notification => <div key={notification.id} className={`p-4 border-b last:border-b-0 ${!notification.read ? "bg-blue-50" : ""}`} onClick={() => onMarkAsRead(notification.id)}>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>)}
          </div>
        </div>}
    </div>;
};