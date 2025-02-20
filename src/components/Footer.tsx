import React from "react";
import { Shield } from "lucide-react";
export const Footer = () => {
  return <footer className="bg-white border-t py-6 px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-600">
            Police Service Crime Reporting Information System
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            Terms of Service
          </a>
          <span className="text-sm text-gray-500">
            © {new Date().getFullYear()} KPS. All rights reserved.
          </span>
        </div>
      </div>
    </footer>;
};