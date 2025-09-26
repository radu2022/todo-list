import { List, Clock, CheckCircle, Icon } from "lucide-react";
import React from "react";

function TodoFilters({ 
  currentfilter, 
  stats, 
  onFilterChange 
}) {
  const filters = [
    { key: "all", label: "All", icon: List, count: stats.total },
    { key: "active", label: "Active", icon: Clock, count: stats.active },
    {
      key: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: stats.completed,
    },
  ];

  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex bg-gray-200 rounded-lg p-1">
        {/* {Inside the code I will add Logics} */}
        {filters.map(({ key, label, icon: Icon, count }) => {
          return (
            <button
              className={`flex items-center gap-2 px-2 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentfilter === key
                  ? "bg-white text-gray-800 shadow-md"
                  : "text-gray-700 hover:text-gray-800 hover:bg-gray-300"
              }`}
              key={key}
              onClick={() => onFilterChange(key)}
            >
              <Icon size={16} />
              <span>{label}</span>
              <span>{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TodoFilters;
