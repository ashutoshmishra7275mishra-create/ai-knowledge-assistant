import { NavLink, Outlet } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaRegCalendarCheck, FaRegStickyNote } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineTask } from "react-icons/md";
import { SiRobotframework } from "react-icons/si";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-white text-black">
      
      {/* SIDEBAR */}
      <aside className="w-72 backdrop-blur-xl bg-white/5 border-r border-white/10 p-6 flex flex-col gap-6">
        
        <h1 className="text-2xl font-bold tracking-wider">
          AI Productivity OS
        </h1>

        <nav className="flex flex-col gap-3 text-lg">
          <NavItem to="/" icon={<TbLayoutDashboard />} label="Dashboard" />
          <NavItem to="/tasks" icon={<MdOutlineTask />} label="Tasks" />
          <NavItem to="/notes" icon={<FaRegStickyNote />} label="Notes" />
          <NavItem to="/calendar" icon={<FaRegCalendarCheck />} label="Calendar" />
          <NavItem to="/assistant" icon={<SiRobotframework />} label="AI Assistant" />
          <NavItem to="/settings" icon={<IoSettingsOutline />} label="Settings" />
        </nav>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-xl transition-all
        ${isActive
          ? "bg-blue-600/30 text-blue-400 shadow-lg shadow-blue-600/20"
          : "hover:bg-white/10 hover:pl-6"
        }`
      }
    >
      {icon}
      {label}
    </NavLink>
  );
}





// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-100 dark:bg-gray-800 p-6 flex flex-col">
//         <h1 className="text-2xl font-bold mb-8">AI Productivity OS</h1>
//         <nav className="flex flex-col gap-4">
//           <Link to="/" className="hover:text-blue-500">Dashboard</Link>
//           <Link to="/tasks" className="hover:text-blue-500">Tasks</Link>
//           <Link to="/notes" className="hover:text-blue-500">Notes</Link>
//           <Link to="/calendar" className="hover:text-blue-500">Calendar</Link>
//           <Link to="/assistant" className="hover:text-blue-500">AI Assistant</Link>
//           <Link to="/settings" className="hover:text-blue-500">Settings</Link>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 bg-white dark:bg-gray-900 p-6 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default MainLayout;

