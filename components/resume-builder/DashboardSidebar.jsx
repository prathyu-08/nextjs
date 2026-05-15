import { 
  LayoutDashboard, 
  UserPen, 
  IdCard, 
  Download, 
  Eye, 
  Briefcase, 
  Heart, 
  Bell, 
  FilePen, 
  Mail, 
  Users, 
  Boxes, 
  CreditCard, 
  LogOut, 
  Moon, 
  Sun,
  Palette
} from "lucide-react";
import { useState } from "react";
import { useResumeBuilder } from "./ResumeBuilderContext";

export default function DashboardSidebar() {
  const { darkMode, setDarkMode } = useResumeBuilder();
  const [isOpenToWork, setIsOpenToWork] = useState(true);
  
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "#", active: false },
    { icon: UserPen, label: "Edit Profile", href: "#", active: false },
    { icon: IdCard, label: "Build Resume", href: "#", active: true },
    { icon: Download, label: "Download CV", href: "#", active: false },
    { icon: Eye, label: "View Public Profile", href: "#", active: false },
    { icon: Briefcase, label: "My Job Applications", href: "#", active: false },
    { icon: Heart, label: "My Favourite Jobs", href: "#", active: false },
    { icon: Bell, label: "Job Alerts", href: "#", active: false },
    { icon: FilePen, label: "Manage Resume", href: "#", active: false },
     { icon: Mail, label: "My Messages", href: "#", active: false },
    { icon: Users, label: "My Followings", href: "#", active: false },
    { icon: Boxes, label: "Packages", href: "#", active: false },
    { icon: CreditCard, label: "Payment History", href: "#", active: false },
    { icon: LogOut, label: "Logout", href: "#", active: false },
  ];

  return (
    <aside className="dashboard-sidebar lg:sticky lg:top-6 lg:self-start">
      <div className="sidebar-header">
        <div className="status-toggle">
          <div>
            <span className="status-label">Open to Work</span>
            <small className="status-note">Visible to recruiters</small>
          </div>
          <label className="status-switch" aria-label="Toggle open to work">
            <input 
              type="checkbox" 
              checked={isOpenToWork} 
              onChange={(e) => setIsOpenToWork(e.target.checked)} 
            />
            <span className="status-slider"></span>
          </label>
        </div>
        <h2>Job Seeker</h2>
        <p>jobseeker@jobsportal.com</p>
      </div>
      <ul className="dashboard-nav">
        {menuItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <li key={index} className={item.active ? "active" : ""}>
              <a href={item.href}>
                <IconComponent size={18} strokeWidth={2} />
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
        <button
          onClick={() => setDarkMode(!darkMode)}
           className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 hover:text-blue-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          {darkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </aside>
  );
}
