import { CheckCircle2, Circle, Filter, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoFilters from "./TodoFilters";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import Footer from "./Footer";
import { Button } from "../components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  updateTodo,
} from "../store/todoSlice";

function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const filterTodos = useSelector(selectFilteredTodos);
  const stats = useSelector(selectTodosStats);
  const filter = useSelector(selectFilter);
  const isAddingTodo = useSelector(selectIsAddingTodo);
  const [editingTodo, setEditingTodo] = useState(null); // Track the todo being edited

  const handleFilterChange = (newFilter) => {
    dispatch(setFilter(newFilter));
  };

  const handleAddTodoClick = () => {
    dispatch(setIsAddingTodo(true));
    setEditingTodo(null); // Ensure editing is disabled when adding
  };

  const handleEditTodo = (todo) => {
    dispatch(setIsAddingTodo(false)); // Disable add mode
    setEditingTodo(todo); // Set the todo to edit
  };

  const handleMarkComplete = () => {
    dispatch(markAllComplete());
  };

  const handleClearComplete = () => {
    dispatch(clearCompleted());
  };

  const handleFormSubmit = (text) => {
    if (editingTodo) {
      console.log("red", text);
      // Update existing todo
      dispatch(
        updateTodo({ id: editingTodo.id, updates: { text: text.trim() } })
      );
      setEditingTodo(null); // Exit edit mode
    } else {
      // Add new todo (handled by TodoForm and Redux)
      dispatch(setIsAddingTodo(false)); // Exit add mode
    }
  };

  const handleFormCancel = () => {
    dispatch(setIsAddingTodo(false));
    setEditingTodo(null); // Exit edit or add mode
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">TodoFlow</h1>
          <p>Organize your life, one task at a time</p>
        </div>

        {/* Stats Card */}
        {stats.total > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-300 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Progress Overview
              </h2>
              <div className="text-2xl font-bold text-green-600">
                {stats.completionPercentage}%
              </div>
            </div>
            <Progress
              value={stats.completionPercentage}
              className="w-full h-3 bg-white border-1 [&>div]:bg-green-500"
            />
            <div className="grid grid-cols-4 gap-5 text-center self-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.active}
                </div>
                <div className="text-sm text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.completed}
                </div>
                <div className="text-sm text-gray-600">Deleted</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Todo Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-lg overflow-hidden mt-1">
          {/* Action Bar */}
          <div className="p-6 border-b-2 border-gray-600 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Button onClick={handleAddTodoClick}>Add</Button>
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
            <TodoFilters
              currentfilter={filter}
              stats={stats}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Todo Form for both adding and editing */}
          {(isAddingTodo || editingTodo) && (
            <div className="p-6 border-b border-gray-300 bg-gray-100 font-light text-gray-100">
              <TodoForm
                placeholder={
                  editingTodo ? "Update your todo" : "What needs to be done?"
                }
                initialValue={editingTodo ? editingTodo.text : ""}
                onSubmit={editingTodo?  handleFormSubmit:null}
                onCancel={handleFormCancel}
                isEditing={!!editingTodo}
              />
            </div>
          )}

          {/* Todo List */}
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
                      No {filter} Todos yet
                    </p>
                    <p className="text-sm">
                      {filter === "active" && "All your todos are completed"}
                      {filter === "completed" &&
                        "No completed todos yet, keep going"}
                      {filter === "deleted" &&
                        "No deleted todos. You're keeping it clean!"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-300">
                {filterTodos.map((todo, index) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    index={index}
                    onEdit={() => handleEditTodo(todo)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <Footer />
      </div>
    </div>
  );
}

export default TodoApp;
