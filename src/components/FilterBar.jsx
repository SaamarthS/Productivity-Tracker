export default function FilterBar({ 
  filterCategory, setFilterCategory, 
  filterStatus, setFilterStatus, 
  sortBy, setSortBy 
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center border border-pink-50 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Category:</label>
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-pink-300"
        >
          <option value="All">All</option>
          <option value="Learning">Learning</option>
          <option value="Health">Health</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
        {['All', 'Active', 'Completed'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${filterStatus === status ? "bg-white dark:bg-slate-700 shadow-md text-[#3B1F2B] dark:text-pink-100" : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label className="text-sm font-semibold text-slate-600 dark:text-slate-300">Sort by:</label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-violet-300"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priority">Priority (High→Low)</option>
        </select>
      </div>
    </div>
  );
}
