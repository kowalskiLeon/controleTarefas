import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import estilos from '../styles/Styles';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ListItem, List, TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';



const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const TaskForm = (props) => {

  const user = useTracker(() => Meteor.user());
  const classes = estilos();
  const history = useHistory();
  const [taskText, setTaskText] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const visibilityFilter = { $or: [{ visivel: true }, { cadastradaPor: user._id }, { userId: user._id }] };
  const hideCompletedFilter = hideCompleted ? { cadastrada: { $ne: true } } : {};
  //const userFilter = user ? { userId: user._id } : {};
  const taskTFilter = taskText ? { text: { '$regex': taskText } } : {};
  const viewTask = ({ _id }) => {
    history.push('/dados/' + _id);
    localStorage.setItem('readonly', 'true');
  };

  const editTask = ({ _id }) => {
    history.push('/dados/' + _id);
    localStorage.setItem('readonly', 'false');
  };

  const filter = { ...hideCompletedFilter, ...taskTFilter, ...visibilityFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(filter).fetch();
    const pendingTasksCount = TasksCollection.find(filter).count();

    return { tasks, pendingTasksCount };
  });

  const cadastrarTarefa = e => {
    e.preventDefault();
    history.push('/dados');
  }

  return (
    <div>
      <Box marginY={2} mx="auto" padding={3} >
        <Paper>
          <Grid container direction='row'>
            <Grid item xs={6} lg={6}>
              <Box width={1} my="auto" marginX={3}>
                <TextField id="outlined-basic"
                  type="text"
                  placeholder="Nome da Tarefa"
                  label="Nome da Tarefa"
                  value={taskText}
                  onChange={e => setTaskText(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Box width={1} mt={2} marginX={3}>
                Cadastrada
                <Checkbox
                  checked={hideCompleted}
                  onChange={e => setHideCompleted(!hideCompleted)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box mx="auto" padding={3} >
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
    </div>
  );
};
