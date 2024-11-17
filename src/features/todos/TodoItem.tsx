import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onUpdate: (updatedTodo: Todo) => void;
    onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate, onDelete }) => {
    const [openDelete, setOpenDelete] = useState(false); // Состояние для модального окна удаления  
    const [openEdit, setOpenEdit] = useState(false); // Состояние для модального окна редактирования  
    const [editText, setEditText] = useState(todo.text); // Состояние для текста редактирования  

    const handleToggleComplete = () => {
        onUpdate({ ...todo, completed: !todo.completed });
    };

    const handleDeleteClick = () => {
        setOpenDelete(true); // Открываем модальное окно удаления  
    };

    const handleCloseDelete = () => {
        setOpenDelete(false); // Закрываем модальное окно удаления  
    };

    const handleConfirmDelete = () => {
        onDelete(todo.id); // Вызываем функцию удаления  
        handleCloseDelete(); // Закрываем модальное окно удаления  
    };

    const handleEditClick = () => {
        setOpenEdit(true); // Открываем модальное окно редактирования  
        setEditText(todo.text); // Устанавливаем текст для редактирования  
    };

    const handleCloseEdit = () => {
        setOpenEdit(false); // Закрываем модальное окно редактирования  
    };

    const handleConfirmEdit = () => {
        onUpdate({ ...todo, text: editText }); // Обновляем текст задачи  
        handleCloseEdit(); // Закрываем модальное окно редактирования  
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
                <IconButton edge="end" onClick={handleEditClick}>
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton edge="end" onClick={handleDeleteClick}>
                    <DeleteIcon color="secondary" />
                </IconButton>
            </ListItem>

            {/* Модальное окно для подтверждения удаления */}
            <Dialog open={openDelete} onClose={handleCloseDelete}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы уверены, что хотите удалить эту задачу?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDelete} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Модальное окно для редактирования задачи */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Редактировать задачу</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Текст задачи"
                        type="text"
                        fullWidth
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleConfirmEdit} color="primary">
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default TodoItem;