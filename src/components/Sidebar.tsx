import React, { useState } from "react";
import { Shield, Users, FileText, BarChart2, Settings, Scale, LogOut, ChevronDown, Folder, FileClock, Network, Database, History, GraduationCap, Calendar, Building2, Car, MessageSquare } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
type MenuItem = {
  icon: React.ReactNode;
  label: string;
  items?: {
    label: string;
    path: string;
  }[];
};
const menuItems: MenuItem[] = [{
  icon: <BarChart2 className="h-5 w-5" />,
  label: "Dashboard",
  items: [{
    label: "Overview",
    path: "/"
  }, {
    label: "Analytics",
    path: "/dashboard/analytics"
  }]
}, {
  icon: <FileText className="h-5 w-5" />,
  label: "Cases",
  items: [{
    label: "All Cases",
    path: "/cases"
  }, {
    label: "Civil Cases",
    path: "/cases/civil"
  }, {
    label: "Criminal Cases",
    path: "/cases/criminal"
  }, {
    label: "Court Files",
    path: "/cases/court-files"
  }, {
    label: "Court Process",
    path: "/cases/court-process"
  }]
}, {
  icon: <Folder className="h-5 w-5" />,
  label: "Investigation",
  items: [{
    label: "Active Cases",
    path: "/investigation/active"
  }, {
    label: "Evidence Tracking",
    path: "/investigation/evidence"
  }, {
    label: "Witness Statements",
    path: "/investigation/witnesses"
  }, {
    label: "Case Timeline",
    path: "/investigation/timeline"
  }]
}, {
  icon: <Users className="h-5 w-5" />,
  label: "Personnel",
  items: [{
    label: "Officers",
    path: "/personnel/officers"
  }, {
    label: "Departments",
    path: "/personnel/departments"
  }, {
    label: "Duty Roster",
    path: "/personnel/roster"
  }, {
    label: "Training",
    path: "/personnel/training"
  }, {
    label: "Inmates",
    path: "/inmates"
  }]
}, {
  icon: <Car className="h-5 w-5" />,
  label: "Traffic",
  items: [{
    label: "Traffic Management",
    path: "/traffic"
  }, {
    label: "Analytics",
    path: "/traffic/analytics"
  }]
}, {
  icon: <MessageSquare className="h-5 w-5" />,
  label: "Communication",
  items: [{
    label: "Messages",
    path: "/communication"
  }]
}, {
  icon: <Shield className="h-5 w-5" />,
  label: "Cybercrime",
  items: [{
    label: "Incident Dashboard",
    path: "/cybercrime"
  }, {
    label: "Digital Forensics",
    path: "/cybercrime/forensics"
  }, {
    label: "Threat Intelligence",
    path: "/cybercrime/threats"
  }]
}];
export const Sidebar = ({
  isCollapsed
}: {
  isCollapsed: boolean;
}) => {
  const {
    logout,
    user
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<string[]>(["Dashboard"]);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const toggleMenu = (label: string) => {
    setOpenMenus(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
  };
  const adminMenuItems: MenuItem[] = [{
    icon: <Shield className="h-5 w-5" />,
    label: "Admin",
    items: [{
      label: "System Settings",
      path: "/admin/settings"
    }]
  }];
  const finalMenuItems = user?.role === "super_admin" ? [...menuItems, ...adminMenuItems] : menuItems;
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return <div className={`${isCollapsed ? "w-16" : "w-64"} bg-slate-900 text-white flex flex-col h-full transition-all duration-300 border-r border-slate-800 relative group`}>
      <div className={`flex items-center gap-3 p-4 border-b border-slate-800 ${isCollapsed ? "justify-center" : ""}`}>
        <Shield className="h-8 w-8 text-blue-500 transition-transform duration-300 hover:scale-110" />
        {!isCollapsed && <span className="font-bold text-lg text-blue-500">PCRIS</span>}
      </div>
      {!isCollapsed && <div className="px-4 py-4">
          <div className="bg-slate-800/50 rounded-lg p-3 transition-all duration-200 hover:bg-slate-800">
            <p className="text-sm font-medium text-slate-200">{user?.name}</p>
            <p className="text-xs text-slate-400 mt-0.5 capitalize">
              {user?.role}
            </p>
          </div>
        </div>}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {finalMenuItems.map(item => <div key={item.label}>
              <button onClick={() => !isCollapsed && toggleMenu(item.label)} onMouseEnter={() => setHoveredMenu(item.label)} onMouseLeave={() => setHoveredMenu(null)} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${openMenus.includes(item.label) ? "bg-slate-800 text-blue-500" : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100"} ${isCollapsed ? "justify-center" : "justify-between"}`} title={isCollapsed ? item.label : undefined}>
                <div className="flex items-center gap-3">
                  <div className={`transition-transform duration-200 ${hoveredMenu === item.label ? "scale-110" : ""}`}>
                    {item.icon}
                  </div>
                  {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </div>
                {!isCollapsed && item.items && <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${openMenus.includes(item.label) ? "rotate-180" : ""}`} />}
              </button>
              {!isCollapsed && openMenus.includes(item.label) && item.items && <div className="mt-1 ml-4 space-y-1">
                  {item.items.map(subItem => <button key={subItem.path} onClick={() => handleNavigation(subItem.path)} className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 
                        ${location.pathname === subItem.path ? "bg-blue-500/10 text-blue-500" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-200 
                          ${location.pathname === subItem.path ? "bg-blue-500" : "bg-slate-600"}`} />
                      <span>{subItem.label}</span>
                    </button>)}
                </div>}
            </div>)}
        </div>
      </nav>
      <div className="p-4 border-t border-slate-800">
        {!isCollapsed && <div className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 mb-3 transition-colors duration-200 hover:text-slate-300">
            <Network className="h-4 w-4" />
            <span>System Status : <span className="text-green-500">Online</span> </span>
          </div>}
        <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-slate-800/50 hover:text-red-300 rounded-lg transition-all duration-200 ${isCollapsed ? "justify-center" : ""}`}>
          <LogOut className="h-5 w-5 transition-transform duration-200 hover:scale-110" />
          {!isCollapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>
    </div>;
};