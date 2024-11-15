import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../features/todos/todosSlice';
import { TextField, Button } from '@mui/material';

export const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text) {
            dispatch(addTodo({ id: Date.now(), text, completed: false }));
            setText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Add a new task"
                variant="outlined"
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Add
            </Button>
        </form>
    );
};