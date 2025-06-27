// 📁 src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";

const Sidebar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  // Apply theme to HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="bg-base-100 w-16 h-screen flex flex-col justify-between items-center py-4 shadow-md fixed left-0 top-0 z-50">
      {/* Top: Profile Icon */}
      <div className="w-10 h-10 bg-primary text-white font-bold flex items-center justify-center rounded-full">
        D
      </div>

      {/* Bottom: Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="btn btn-ghost btn-sm text-base-content"
      >
        {theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Sidebar;
