import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { UserProfile } from "./UserProfile";
import { Footer } from "./Footer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
export const DashboardLayout: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return <div className="relative min-h-screen w-full bg-gray-50 overflow-hidden">
      {/* Background Text */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div initial={{
        opacity: 0.1
      }} animate={{
        opacity: [0.1, 0.15, 0.1]
      }} transition={{
        duration: 5,
        repeat: Infinity
      }} className="absolute inset-0 flex items-center justify-center">
          <div className="transform -rotate-45 text-gray-200/50 whitespace-nowrap text-[200px] font-bold select-none">
            UTUMISHI KWA WOTE
          </div>
        </motion.div>
        <motion.div initial={{
        opacity: 0.1
      }} animate={{
        opacity: [0.1, 0.15, 0.1]
      }} transition={{
        duration: 5,
        repeat: Infinity,
        delay: 2.5
      }} className="absolute inset-0 flex items-center justify-center">
          <div className="transform rotate-45 text-gray-200/50 whitespace-nowrap text-[150px] font-bold select-none">
            KENYA POLICE SERVICE
          </div>
        </motion.div>
      </div>
      {/* Main Layout */}
      <div className="relative flex h-screen w-full">
        <Sidebar isCollapsed={isCollapsed} />
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-1.5 rounded-r-lg shadow-sm hover:bg-gray-50 z-10 ml-64 transition-all duration-300" style={{
        marginLeft: isCollapsed ? "64px" : "256px"
      }}>
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar with User Profile */}
          <div className="h-16 bg-white border-b flex items-center justify-end px-8">
            <UserProfile />
          </div>
          {/* Main Content */}
          <main className="flex-1 overflow-auto p-8">{children}</main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>;
};