import { NavLink } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="sticky top-0 z-10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-pink-100 dark:border-slate-800 shadow-sm px-6 py-4 flex justify-between items-center transition-all duration-300">
      <div className="font-serif text-2xl font-bold text-[#3B1F2B] dark:text-pink-100">
        QuestBoard ⚔️
      </div>
      <div className="flex gap-2 sm:gap-4 items-center">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all ${
              isActive ? "bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 font-bold" : "text-slate-600 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800"
            }`
          }
        >
          My Quests
        </NavLink>
        <NavLink 
          to="/stats" 
          className={({ isActive }) => 
            `px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold rounded-full transition-all ${
              isActive ? "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-bold" : "text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-800"
            }`
          }
        >
          Stats 📊
        </NavLink>
        
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1 sm:ml-2 text-xl"
          aria-label="Toggle dark mode"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}
