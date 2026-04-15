import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StatsPage() {
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem("quests");
    return saved ? JSON.parse(saved) : [];
  });

  const totalQuests = quests.length;
  const completedQuests = quests.filter(q => q.completed).length;
  const activeQuests = totalQuests - completedQuests;
  const completionPercentage = totalQuests === 0 ? 0 : Math.round((completedQuests / totalQuests) * 100);

  const getMotivationalMessage = () => {
    if (totalQuests === 0) return "Add some quests to see your stats! ⚔️";
    if (completionPercentage >= 80) return "You're crushing it! 🌟";
    if (completionPercentage >= 50) return "Halfway there, keep going! ⚔️";
    return "Every quest starts with a single step. 🌱";
  };

  const categories = [
    { name: "Learning", emoji: "📚", color: "bg-blue-300" },
    { name: "Health", emoji: "💪", color: "bg-rose-300" },
    { name: "Work", emoji: "💼", color: "bg-violet-300" },
    { name: "Personal", emoji: "🌸", color: "bg-orange-300" }
  ];

  const getCategoryStats = (catName) => {
    const catQuests = quests.filter(q => q.category === catName);
    const catTotal = catQuests.length;
    const catCompleted = catQuests.filter(q => q.completed).length;
    const catPercentage = catTotal === 0 ? 0 : Math.round((catCompleted / catTotal) * 100);
    return { catTotal, catCompleted, catPercentage };
  };

  const activePriorities = quests.filter(q => !q.completed);
  const highCount = activePriorities.filter(q => q.priority === "High").length;
  const mediumCount = activePriorities.filter(q => q.priority === "Medium").length;
  const lowCount = activePriorities.filter(q => q.priority === "Low").length;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-12">
      <h1 className="text-4xl font-serif font-bold text-[#3B1F2B] dark:text-pink-100 mb-2 text-center">Your Journey Stats 📊</h1>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-8 font-medium">Track your personal growth and productivity.</p>

      {totalQuests === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl shadow-md border border-pink-100 dark:border-slate-800">
          <p className="text-xl text-slate-500 dark:text-slate-400 font-medium mb-4">No quests currently available to track.</p>
          <Link to="/" className="inline-block bg-pink-300 hover:bg-pink-400 text-[#3B1F2B] font-bold py-2.5 px-6 rounded-xl transition-all hover:scale-105 shadow-sm shadow-pink-200">
            Start a new Quest
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Overview Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-pink-50 dark:border-slate-800 hover:shadow-lg transition-shadow">
            <h2 className="font-serif text-xl font-bold text-[#3B1F2B] dark:text-pink-100 mb-4">Overview</h2>
            <div className="flex justify-between items-end mb-6">
              <div>
                <p className="text-slate-500 dark:text-slate-400 font-semibold mb-1">Completion</p>
                <div className="text-5xl font-bold text-pink-400">{completionPercentage}%</div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">Total Quests: <span className="text-[#3B1F2B] dark:text-white">{totalQuests}</span></p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">Completed: <span className="text-emerald-500 dark:text-emerald-400">{completedQuests}</span></p>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold">Active: <span className="text-amber-500 dark:text-amber-400">{activeQuests}</span></p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 text-center">
              <span className="font-medium text-slate-600 dark:text-slate-300">{getMotivationalMessage()}</span>
            </div>
          </div>

          {/* Progress Bar Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-pink-50 dark:border-slate-800 hover:shadow-lg transition-shadow flex flex-col justify-center">
             <h2 className="font-serif text-xl font-bold text-[#3B1F2B] dark:text-pink-100 mb-6 text-center">Your Quest Journey</h2>
             <div className="w-full bg-slate-100 dark:bg-slate-800 h-8 rounded-full overflow-hidden shadow-inner mb-4 relative">
               <div 
                 className="bg-gradient-to-r from-pink-300 via-violet-300 to-emerald-300 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2 shadow-md"
                 style={{ width: `${completionPercentage}%` }}
               >
                 {completionPercentage > 10 && <span className="text-xs text-white font-bold opacity-80">🌟</span>}
               </div>
             </div>
             <p className="text-center text-slate-500 dark:text-slate-400 text-sm font-semibold">Keep the momentum going!</p>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-pink-50 dark:border-slate-800 hover:shadow-lg transition-shadow md:col-span-2">
            <h2 className="font-serif text-xl font-bold text-[#3B1F2B] dark:text-pink-100 mb-4">Category Breakdown</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map(cat => {
                const { catTotal, catCompleted, catPercentage } = getCategoryStats(cat.name);
                return (
                  <div key={cat.name} className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{cat.emoji} {cat.name}</span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{catCompleted}/{catTotal}</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-2">
                       <div 
                         className={`h-full ${cat.color} rounded-full transition-all duration-700`}
                         style={{ width: `${catPercentage}%` }}
                       ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Priority Breakdown (Active) */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-pink-50 dark:border-slate-800 hover:shadow-lg transition-shadow md:col-span-2 text-center">
            <h2 className="font-serif text-xl font-bold text-[#3B1F2B] dark:text-pink-100 mb-4">Active Quests by Priority</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="bg-pink-100 dark:bg-pink-900/40 text-pink-800 dark:text-pink-300 px-6 py-3 rounded-2xl font-bold shadow-sm border border-pink-200 dark:border-pink-800/50">
                High 🔥 <span className="bg-white/70 dark:bg-black/20 px-2 py-0.5 rounded-full ml-2 text-sm">{highCount}</span>
              </div>
              <div className="bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 px-6 py-3 rounded-2xl font-bold shadow-sm border border-amber-200 dark:border-amber-800/50">
                Medium ⚡ <span className="bg-white/70 dark:bg-black/20 px-2 py-0.5 rounded-full ml-2 text-sm">{mediumCount}</span>
              </div>
              <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 px-6 py-3 rounded-2xl font-bold shadow-sm border border-emerald-200 dark:border-emerald-800/50">
                Low 🌿 <span className="bg-white/70 dark:bg-black/20 px-2 py-0.5 rounded-full ml-2 text-sm">{lowCount}</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
