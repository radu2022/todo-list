import { CheckCircle2, Circle, Filter, Plus, Trash2 } from "lucide-react";
import React from "react";
import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilter,
  selectFilteredTodos,
  selectIsAddingTodo,
  selectTodos,
  selectTodosStats,
} from "../store/selectors";
import {
  clearCompleted,
  markAllComplete,
  setFilter,
  setIsAddingTodo,
} from "../store/todoSlice";

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filterTodos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodosStats);
  const filter = useSelector(selectFilter);
  const isAddingTodo = useSelector(selectIsAddingTodo);
  console.log(isAddingTodo);

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleAddTodoClic = () => {
    dispatch(setIsAddingTodo(true));
  };

  const handleMarkComplete = () => {
    dispatch(markAllComplete());
  };

  const handleClearComplete = () => {
    dispatch(clearCompleted());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* {Header} */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TodoFlow</h1>
          <p>Organize your life, one task at a time</p>
        </div>

        {/* {Stats Card} */}
        {stats.total > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Progress Overview
              </h2>
              <div className="text-2xl font-bold text-green-600">
                {/* {Stats Completed Logics} */}
                {stats.completionPercentage}%
              </div>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
              {/* {Preogressbar} */}
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${stats.completionPercentage}%` }}
              ></div>
            </div>

            {/* {Stats} */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* {Status Total Logic} */}
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* {Status Active Logic} */}
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {/* {Status Completed Logic} */}
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}

        {/* {Main Todo Container} */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden mt-1">
          {/* {Action Bar} */}

          <div className="p-6 border-b-2 border-gray-600 shadow-lg">
            <div className="flex items-center justify-between mb-4 ">
              <button
                className="flex items-center gap-3 bg-white hover:bg-gray-400 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                onClick={handleAddTodoClic}
              >
                <Plus size={20} />
                Add Todo
              </button>

              {/* {Clear and Delete Buttons} */}
              {stats.total > 0 && (
                <div className="flex items-center gap-2">
                  {stats.completed > 0 && (
                    <button
                      className="flex items-center gap-3 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 text-sm"
                      onClick={handleClearComplete}
                    >
                      <Trash2 size={16} />
                      Clear Completed
                    </button>
                  )}
                  {stats.active > 0 && (
                    <button
                      className="flex items-center gap-3 text-green-600 hover:text-green-700 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200 text-sm"
                      onClick={handleMarkComplete}
                    >
                      <CheckCircle2 size={16} />
                      Mark All Completed
                    </button>
                  )}
                </div>
              )}
            </div>
            {/* {Todo Filter I will add Logics} */}
            <TodoFilters
              currentfilter={filter}
              stats={stats}
              onFilterChange={handleFilterChange}
            />
          </div>
          {isAddingTodo && (
            <div className="p-6 border-b border-gray-300 bg-gray-100 font-light text-gray-200">
              <TodoForm placeholder="what need to be done" />
            </div>
          )}

          {/* {Todo List} */}
          <div className="max-h-96 overflow-y-auto">
            {filterTodos.length === 0 ? (
              <div className="p-12 text-center">
                {todos.length === 0 ? (
                  <div className="text-gray-600">
                    <Circle size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2 text-gray-800">
                      No Todos Yet
                    </p>
                    <p>Add your todo to get started!</p>
                  </div>
                ) : (
                  <div className="text-gray-600">
                    <Filter size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2 text-gray-800">
                      No {filter} Todos
                      <p className="text-sm">
                        {filter === "active" && "all your todos are completed"}
                        {filter === "active" &&
                          "No comleted todos yet, keep going"}
                      </p>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {filterTodos.map((todo, index) => {
                  return <TodoItem key={todo.id} todo={todo} index={index} />;
                })}
              </div>
            )}
          </div>
        </div>

        {/* {Footer Info} */}
        <Footer />      </div>
    </div>
  );
}

export default TodoApp;
