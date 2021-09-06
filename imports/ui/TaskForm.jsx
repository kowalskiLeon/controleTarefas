import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import estilos from '../styles/Styles';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ListItem, List } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box, Paper, Button, Pagination } from '@material-ui/core';
import { useHistory } from 'react-router';

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);


export const TaskForm = () => {

  const user = useTracker(() => Meteor.user());
  const classes = estilos();

  const [hideCompleted, setHideCompleted] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [numPaginas, setNumPaginas] = useState(0);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const history = useHistory();


  const { tasks, pendingTasksCount, numItems, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const numItems = TasksCollection.find().count();
    console.log(numItems)

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1},
        limit: 4
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount, numItems };
  });

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;


  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  const getUser = (task) => {
    return Meteor.users.findOne(task.userId)
  }

  const cadastrarTarefa = e => {
    e.preventDefault();
    history.push('/dados');
  }

  return (
    <Box marginY={2} marginX={5} padding={3} >
      <Paper>
        <List component="nav" aria-label="main mailbox folders" className="tasks">
          {tasks.length > 0 ?
            <div>
              <ListItem>
                <Grid item xs={1} lg={1}>
                </Grid>
                <Grid item xs={5} lg={5}>
                  <span>Nome</span>
                </Grid>
                <Grid item xs={5} lg={5}>
                  <span>Usuário</span>
                </Grid>
              </ListItem>
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  onCheckboxClick={toggleChecked}
                  user={getUser(task)}
                  showButtons={false}
                />
              ))}
            </div>
            :
            <div>
              <ListItem>
                <Grid item xs={12} lg={12}>
                  <Box display='flex' marginBottom={3}>
                    <Grid container direction='column' justifyContent='center'>
                      <Grid container direction='row' justifyContent='center'><h2>Sem tarefas cadastradas.</h2></Grid>
                      <Grid container direction='row' justifyContent='center'>
                        <Button className={classes.buttonCadastro} onClick={cadastrarTarefa}>
                          Cadastrar uma tarefa
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </ListItem>
            </div>
          }
        </List>
      </Paper>
    </Box>
  );
};
