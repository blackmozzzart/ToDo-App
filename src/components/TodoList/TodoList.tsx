import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '@mui/material';
import { RootState } from '../../app/store';
import { TodoItem } from '../../features/todos/TodoItem';
import { deleteTodo, updateTodo } from '../../features/todos/todosSlice';

export const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const dispatch = useDispatch();

    // Функция для обновления задачи  
    const handleUpdateTodo = (updatedTodo: { id: number; text: string; completed: boolean }) => {
        dispatch(updateTodo(updatedTodo));
    };

    // Функция для удаления задачи  
    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id));
    };

    return (
        <List>
            {todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onUpdate={handleUpdateTodo} // Передаем функцию обновления  
                    onDelete={handleDeleteTodo} // Передаем функцию удаления  
                />
            ))}
        </List>
    );
};