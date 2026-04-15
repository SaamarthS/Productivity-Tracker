import { useState } from "react";

export default function QuestForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Learning");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: Date.now(),
      title,
      category,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    });

    setTitle("");
    setCategory("Learning");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md shadow-pink-100 dark:shadow-none dark:border dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-4 items-end">
      <div className="flex-1 w-full">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">New Quest</label>
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's your next adventure?"
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-shadow"
          required
        />
      </div>
      
      <div className="w-full md:w-36">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          <option value="Learning">Learning</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="w-full md:w-32">
        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
        <select 
          value={priority} 
          onChange={(e) => setPriority(e.target.value)}
          className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full md:w-auto bg-pink-300 hover:bg-pink-400 text-[#3B1F2B] font-bold py-2.5 px-6 rounded-xl transition-all hover:scale-105 shadow-md shadow-pink-200"
      >
        Add Quest ⚔️
      </button>
    </form>
  );
}
