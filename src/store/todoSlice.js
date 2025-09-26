import { createSlice } from "@reduxjs/toolkit";


const loadTodos = () => {
    try{
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : []
    }catch{
        return []
    }
}

const saveTodos = (todo) => {
    try{
        localStorage.setItem("todos", JSON.stringify(todo))
    }catch(error){
        console.error("Failed to save todos......", error)
    }
}

const initialState = {
    items: loadTodos(),
    filter: "all",
    isAddingTodo: false,
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        setIsAddingTodo: (state, action)=>{
            state.isAddingTodo = action.payload
        },

        addTodo: (state, action)=>{
            const newTodo = { 
                id: crypto.randomUUID(), 
                text: action.payload.trim(), 
                completed: false, 
                createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        };
        state.items.unshift(newTodo);
        state.isAddingTodo = false;
        saveTodos(state.items);
    },

    // Toggle Todo Checkbox
    toggleTodo: (state, action) => {
            const todo = state.items.find((todo) => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
                todo.updatedAt = new Date().toISOString();
                saveTodos(state.items);
            }
        },

    deleteTodo: (state, action) => {
            state.items = state.items.filter((todo) => todo.id !== action.payload);
            saveTodos(state.items);
        },  
    
    updateTodo: (state, action) => {
            const { id, updates } = action.payload;
            const todo = state.items.find((todo) => todo.id === id);

            if (todo) {
                Object.assign(todo, updates, { updatedAt: new Date().toISOString() });
            }
        },

    setFilter: (state, action) => {
        state.filter = action.payload;
    },

    markAllComplete: (state) => {
        const hasIncomplete = state.items.some((todo)=> !todo.completed);
        state.items.forEach((todo) => {
        todo.completed = hasIncomplete;
        todo.updatedAt = new Date().toDateString();
        saveTodos(state.items);
        });
    },

    clearCompleted: (state) => {
        state.items = state.items.filter((todo)=> !todo.completed);
        saveTodos(state.items);
    }
    },
});


export const { 
    setIsAddingTodo, 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    updateTodo, 
    setFilter, 
    markAllComplete, 
    clearCompleted } = todoSlice.actions;

export default todoSlice.reducer;