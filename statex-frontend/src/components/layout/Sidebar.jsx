import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {

  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Expenses",
      icon: Wallet,
      path: "/expenses",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");

    navigate("/login");

  };

  return (

    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-900">

      {/* Logo */}

      <div className="border-b border-slate-800 px-8 py-8">

        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-5xl font-black tracking-tight text-transparent">
          Statex
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Smart Expense Tracker
        </p>

      </div>

      {/* Navigation */}

      <nav className="flex-1 px-4 py-6">

        {menus.map((menu) => {

          const Icon = menu.icon;

          return (

            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `group mb-3 flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon
                size={21}
                className="transition-transform duration-300 group-hover:scale-110"
              />

              <span className="font-medium">
                {menu.title}
              </span>

            </NavLink>

          );

        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-5">

        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-3 font-semibold text-white transition-all duration-300 hover:bg-red-700"
        >

          <LogOut size={18} />

          Logout

        </button>

      </div>

    </aside>

  );

}