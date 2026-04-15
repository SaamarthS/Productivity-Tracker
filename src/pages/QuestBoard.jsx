import { useState, useEffect } from "react";
import QuestForm from "../components/QuestForm";
import FilterBar from "../components/FilterBar";
import QuestCard from "../components/QuestCard";

export default function QuestBoard() {
  const [quests, setQuests] = useState(() => {
    const saved = localStorage.getItem("quests");
    return saved ? JSON.parse(saved) : [];
  });
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Save to localStorage whenever quests change
  useEffect(() => {
    localStorage.setItem("quests", JSON.stringify(quests));
  }, [quests]);

  const addQuest = (newQuest) => {
    setQuests((prev) => [...prev, newQuest]);
  };

  const toggleComplete = (id) => {
    setQuests((prev) => 
      prev.map(q => q.id === id ? { ...q, completed: !q.completed } : q)
    );
  };

  const deleteQuest = (id) => {
    setQuests((prev) => prev.filter(q => q.id !== id));
  };

  // Filter & Sort Logic
  const filteredAndSortedQuests = quests
    .filter(q => {
      if (filterCategory !== "All" && q.category !== filterCategory) return false;
      if (filterStatus === "Active" && q.completed) return false;
      if (filterStatus === "Completed" && !q.completed) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "priority") {
        const priorities = { High: 3, Medium: 2, Low: 1 };
        return priorities[b.priority] - priorities[a.priority];
      }
      return 0;
    });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-bold text-[#3B1F2B] dark:text-pink-100 mb-2 text-center">My Quests ⚔️</h1>
      <p className="text-center text-slate-500 dark:text-slate-400 mb-8 font-medium">What adventures await you today?</p>      
      <QuestForm onAdd={addQuest} />
      
      <FilterBar 
        filterCategory={filterCategory} setFilterCategory={setFilterCategory}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        sortBy={sortBy} setSortBy={setSortBy}
      />

      {quests.length === 0 ? (
        <div className="text-center py-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur rounded-2xl border border-pink-50 dark:border-slate-800 shadow-sm">
          <p className="text-xl text-slate-500 font-medium">No quests yet! Add one above. ⚔️</p>
        </div>
      ) : filteredAndSortedQuests.length === 0 ? (
        <div className="text-center py-16 bg-white/50 dark:bg-slate-900/50 backdrop-blur rounded-2xl border border-pink-50 dark:border-slate-800 shadow-sm">
          <p className="text-xl text-slate-500 font-medium">No quests match this filter. Try a different one! 🌸</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAndSortedQuests.map(quest => (
            <QuestCard 
              key={quest.id} 
              quest={quest} 
              onToggle={toggleComplete} 
              onDelete={deleteQuest} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
