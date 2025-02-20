import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { User, Settings, LogOut, Bell, ChevronDown } from "lucide-react";
export const UserProfile = () => {
  const {
    user,
    logout
  } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  return <div className="relative">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-50 rounded-full relative">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-medium">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>
      {isOpen && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </button>
          <button className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </button>
          <div className="border-t my-1"></div>
          <button onClick={logout} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2 text-red-600">
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>}
    </div>;
};