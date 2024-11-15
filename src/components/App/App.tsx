import React from 'react';
import { Provider } from 'react-redux';
import store from '../../app/store';
import { AddTodo } from '../AddTodo/AddTodo';
import { TodoList } from '../TodoList/TodoList';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <Container maxWidth="sm">
                <Typography variant="h4" align="center" gutterBottom>
                    ToDo App
                </Typography>
                <AddTodo />
                <TodoList />
            </Container>
        </Provider>
    );
};

export default App;