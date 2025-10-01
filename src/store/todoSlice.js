import { createSlice } from "@reduxjs/toolkit";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


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
    const todo = state.items.find((todo) => todo.id === action.payload);
    if (todo) {
        todo.deleted = true;
        todo.updatedAt = new Date().toISOString();
        saveTodos(state.items);
    }
},
restoreTodo: (state, action) => {
        const todo = state.items.find((todo) => todo.id === action.payload);
        if (todo && todo.deleted) {
            delete todo.deleted;
            todo.updatedAt = new Date().toISOString();
            saveTodos(state.items);
        }
    },
    
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      // Create a new array with updated todo
      state.items = state.items.map((todo) =>
        todo.id === id
          ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
          : todo
      );
      // Persist updated todos if saveTodos is used
      saveTodos(state.items);
    },

    setFilter: (state, action) => {
        state.filter = action.payload;
    },

    markAllComplete: (state) => {
        const hasIncomplete = state.items.some((todo)=> !todo.completed);
        state.items.forEach((todo) => {
        todo.completed = hasIncomplete;
        todo.updatedAt = new Date().toISOString();
        saveTodos(state.items);
        });
    },

    
    clearCompleted: (state) => {
        state.items = state.items.filter((todo)=> !todo.completed);
        saveTodos(state.items);
    }
    },
});


// // Async
// export const fetchTodos = createAsyncThunk("todos/fetchTodos", async)



export const { 
    setIsAddingTodo, 
    addTodo, 
    toggleTodo, 
    deleteTodo,
    restoreTodo, 
    updateTodo, 
    setFilter, 
    markAllComplete, 
    clearCompleted } = todoSlice.actions;

export default todoSlice.reducer;