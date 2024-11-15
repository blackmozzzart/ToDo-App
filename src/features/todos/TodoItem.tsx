import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onUpdate: (updatedTodo: Todo) => void; // Функция обновления  
    onDelete: (id: number) => void; // Функция удаления  
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [open, setOpen] = useState(false); // Состояние для управления модальным окном  

    const handleToggleComplete = () => {
        onUpdate({ ...todo, completed: !todo.completed });
    };

    const handleDeleteClick = () => {
        setOpen(true); // Открываем модальное окно  
    };

    const handleClose = () => {
        setOpen(false); // Закрываем модальное окно  
    };

    const handleConfirmDelete = () => {
        onDelete(todo.id); // Вызываем функцию удаления  
        handleClose(); // Закрываем модальное окно  
    };

    return (
        <>
            <ListItem>
                <ListItemText
                    primary={todo.text}
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                />
                <IconButton edge="end" onClick={handleToggleComplete}>
                    <CheckIcon color={todo.completed ? 'primary' : 'action'} />
                </IconButton>
                <IconButton edge="end" onClick={handleDeleteClick}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </ListItem>

            {/* Модальное окно для подтверждения удаления */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите удалить эту задачу?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};