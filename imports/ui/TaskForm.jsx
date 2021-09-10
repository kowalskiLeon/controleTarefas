import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import estilos from '../styles/Styles';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ListItem, List } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';



const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const TaskForm = (props) => {

  const user = useTracker(() => Meteor.user());
  const classes = estilos();
  const history = useHistory();
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const viewTask = ({ _id }) => {
    history.push('/dados/' + _id);
    localStorage.setItem('readonly', 'true');
  };

  const editTask = ({ _id }) => {
    history.push('/dados/' + _id);
    localStorage.setItem('readonly', 'false');
  };

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      {$or: [{visivel: true},{cadastradaPor : user._id},{userId: user._id}]}
    ).fetch();
    //console.log(tasks)
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };


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
                <Grid item xs={3} lg={3}>
                  <span>Usuário</span>
                </Grid>
                <Grid item xs={3} lg={3}>
                  <span>Criado Por</span>
                </Grid>
              </ListItem>
              {tasks.map(task => (
                <Task
                  key={task._id}
                  task={task}
                  user={user}
                  onViewClick={viewTask}
                  onEditClick={editTask}
                  onDeleteClick={deleteTask}
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
