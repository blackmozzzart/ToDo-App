import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodosState {
    todos: Todo[];
}

const initialState: TodosState = {
    todos: JSON.parse(localStorage.getItem('todos') || '[]'), // Загружаем задачи из localStorage  
};

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
            localStorage.setItem('todos', JSON.stringify(state.todos)); // Сохраняем в localStorage  
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
                localStorage.setItem('todos', JSON.stringify(state.todos)); // Сохраняем в localStorage  
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(state.todos)); // Сохраняем в localStorage  
        },
    },
});

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;