// Priority color logic
const priorityColors = {
  High: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300",
  Medium: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Low: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
};

// Category colors
const categoryColors = {
  Learning: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Health: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
  Work: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
  Personal: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
};

export default function QuestCard({ quest, onToggle, onDelete }) {
  return (
    <div className={`p-5 rounded-2xl shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg bg-white dark:bg-slate-900 flex items-center justify-between border-l-4 ${quest.completed ? 'opacity-75 border-l-emerald-300 dark:border-l-emerald-600 bg-emerald-50/30 dark:bg-emerald-900/20' : 'border-l-pink-300 dark:border-l-pink-500'} mb-4 animate-in fade-in zoom-in duration-300`}>
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={() => onToggle(quest.id)}
          className="text-2xl hover:scale-110 transition-transform"
          title={quest.completed ? "Mark incomplete" : "Mark complete"}
        >
          {quest.completed ? "🌟" : "⭕"}
        </button>
        <div className="flex flex-col gap-1">
          <h3 className={`text-lg font-bold font-serif transition-colors ${quest.completed ? "line-through text-slate-400 dark:text-slate-500" : "text-[#3B1F2B] dark:text-slate-100"}`}>
            {quest.title}
          </h3>
          <div className="flex gap-2 text-xs font-semibold">
            <span className={`px-2 py-1 rounded-full ${categoryColors[quest.category]}`}>
              {quest.category}
            </span>
            <span className={`px-2 py-1 rounded-full ${priorityColors[quest.priority]}`}>
              {quest.priority}
            </span>
          </div>
        </div>
      </div>
      <button 
        onClick={() => onDelete(quest.id)}
        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-all text-xl ml-2"
        title="Delete Quest"
      >
        🗑️
      </button>
    </div>
  );
}
