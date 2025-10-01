// basic selectors
export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;
export const selectIsAddingTodo = (state) => state.todos.isAddingTodo;


// {Filter Items}
export const selectFilteredTodos = (state) => {
    const todos = state.todos.items;
    const filter = state.todos.filter;

    switch(filter) {
        case "active":
            return todos.filter((todo) => !todo.completed && !todo.deleted);
        case "completed":
            return todos.filter((todo) => todo.completed && !todo.deleted);
        case "deleted":
            return todos.filter((todo) => todo.deleted); //excl
        default:
            return todos.filter((todo) => !todo.deleted); // exclude deleted from "all"
    }
};

export const selectTodosStats = (state)=>{
    const todos = state.todos.items.filter((todo) => !todo.deleted); // exclude deleted
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const deleted =  state.todos.items.filter((todo) => todo.deleted).length;
    const active = total - completed;
    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { todos, deleted, total, completed, active, completionPercentage };
};