import { Meteor } from 'meteor/meteor';
import React, { useState, useEffect } from 'react';
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
import { TextField } from '@material-ui/core';
import { Checkbox } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';



const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const GerenciamentoTarefas = (props) => {

  const user = useTracker(() => Meteor.user());
  const classes = estilos();
  const history = useHistory();
  const [text, setText] = useState('');
  const [taskText, setTaskText] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [page, setPage] = React.useState(1);
  const [numPages, setNumPages] = React.useState(1)
  const maxPerPage = 4;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const visibilityFilter = { $or: [{ visivel: true }, { cadastradaPor: user._id }, { userId: user._id }] };
  const hideCompletedFilter = hideCompleted ? { concluida: false } : {};
  const taskTFilter = taskText ? { text: { '$regex': taskText } } : {};
  //const userFilter = user ? { userId: user._id } : {};
  const viewTask = ({ _id }) => {
    history.push('/dados/' + _id);
    localStorage.setItem('readonly', 'true');
  };

  const editTask = ({ _id }) => {
    history.push('/dados/' + _id);
    localStorage.setItem('readonly', 'false');
  };

  const changeHidden = e => {
    e.preventDefault();
    setHideCompleted(!hideCompleted);
    setPage(1);
  }

  const filter = { ...hideCompletedFilter, ...taskTFilter, ...visibilityFilter };

  const { tasks, pendingTasksCount, numTasks, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const pulo = (page - 1) * maxPerPage
    const handler = Meteor.subscribe('filterTasks', filter, maxPerPage, pulo);
    //console.log(handler)
    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const tasks = TasksCollection.find().fetch();
    const numTasks = TasksCollection.find(filter).count();
    const pendingTasksCount = TasksCollection.find(filter).count();

    return { tasks, pendingTasksCount, numTasks };
  });

  useEffect(() => {
    if (numTasks) {
      setNumPages(Math.ceil(numTasks / 4));
    }
  });

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
    <div>
      <Box marginY={2} mx="auto" padding={3} >
        <Paper>
          <Grid container direction='row'>
            <Grid item xs={12} lg={6} className={classes.searchBarMagin}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <TextField id="outlined-basic"
                  type="text"
                  placeholder="Nome da Tarefa"
                  label="Nome da Tarefa"
                  className={classes.filterText}
                  value={taskText}
                  onChange={e => setTaskText(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6} className={classes.searchBarMagin}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                Mostrar Apenas não concluidas?
                <Checkbox
                  checked={hideCompleted}
                  onChange={e => changeHidden(e)}
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box marginY={2} marginX={5} padding={3} >
        <Paper>
          <List component="nav" aria-label="main mailbox folders" className={classes.rowMargin}>
            <Box mb={3}>
              <Grid container direction='row' justifyContent='center'>
                <Button className={classes.buttonCadastro} onClick={cadastrarTarefa}>
                  Cadastrar uma tarefa
                </Button>
              </Grid>
            </Box>
            {tasks.length > 0 ?
              <div>
                {tasks.map(task => (
                  <Task
                    key={task._id}
                    task={task}
                    user={user}
                    onViewClick={viewTask}
                    onEditClick={editTask}
                    onDeleteClick={deleteTask}
                    showButtons={true}
                  />
                ))}
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box marginY={2}>
                    <Pagination count={numPages} page={page} onChange={handleChange} />
                  </Box>
                </Grid>
              </div>
              :
              <div>
                <ListItem>
                  <Grid item xs={12} lg={12}>
                    <Box display='flex' marginBottom={3}>
                      <Grid container direction='column' justifyContent='center'>
                        <Grid container direction='row' justifyContent='center'><h2>Sem tarefas cadastradas.</h2></Grid>
                        <Grid container direction='row' justifyContent='center'>
                          <h4>Verifique se já existem tarefas no sistema ou se você digitou os termos de busca corretamente.</h4>
                        </Grid>
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
