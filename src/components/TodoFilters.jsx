import { List, Clock, CheckCircle, Icon, DeleteIcon } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function TodoFilters({ 
  currentfilter, 
  stats, 
  onFilterChange 
}) {
  const filters = [
    { key: "all", 
      label: "All", 
      icon: List, 
      count: stats.total },

    { key: "active", 
      label: "Active", 
      icon: Clock, 
      count: stats.active },
    {
      key: "completed",
      label: "Completed",
      icon: CheckCircle,
      count: stats.completed},
    {
      key: "deleted",
      label: "Deleted",
      icon: DeleteIcon,
      count: stats.deleted
    }
  ];

  return (
    <div>
      <Tabs
        defaultValue={currentfilter}
        onValueChange={onFilterChange}
        className="w-full justify-center "
      >
        <TabsList className="flex gap-2 self-center justify-center bg-gray-200 rounded-1">
          {filters.map(({ key, label, icon: Icon, count }) => (
            <TabsTrigger
              key={key}
              value={key}
              className={`flex items-center gap-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentfilter === key
                  ? "bg-white text-gray-800 shadow-md"
                  : "text-gray-700 hover:text-gray-800 hover:bg-gray-300"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
              <span className="text-xs text-gray-500">{count}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}

export default TodoFilters;
