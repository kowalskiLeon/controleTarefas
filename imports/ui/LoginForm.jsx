import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Card, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Grid, Box, Paper } from '@material-ui/core';
import estilos from '../styles/Styles';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const classes = estilos();

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
    history.push('/tarefas')
  };

  const { tasks, pendingTasksCount, numItems, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    const numItems = TasksCollection.find().count();
    console.log(numItems)

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find().fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();
    return { tasks, pendingTasksCount, numItems };
  });
  console.log(tasks)
  return (
    <Grid container
      direction="row"
      justifyContent="center"
      alignItems="center"
      className={classes.conteudo}
      >
      <Grid item xs={12} lg={4}>
        <Box height={1} marginX={2} display="flex" flexDirection="column" height={1}>
          <Card className={classes.card}>
            <Box margin={5}>
              <h2 align='center'>Controle o seu dia a dia.</h2>
              {numItems>0?
              <h4 align='center'>Já são {numItems} tarefas cadastradas.</h4>:
              <h4 align='center'>Entre no sistema e cadastre algumas tarefas para obter os números destas por aqui!</h4>}
            </Box>
          </Card>
        </Box>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Box marginX={2}>
          <form onSubmit={submit}>
            <Card className={classes.card}>
              <Box margin={5}>
                <h2 align='center'>Boas vindas!</h2>
                <h4 align='center'>Forneça nome de usuário e senha para entrar!</h4>
              </Box>
              <Box marginY={5} marginX="auto">
                <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                  <TextField
                    align='center'
                    id="outlined-basic"
                    type="text"
                    placeholder="Usuário"
                    name="username"
                    label="Usuário"
                    required
                    onChange={e => setUsername(e.target.value)}
                  />
                </Grid>

              </Box>

              <Box margin={5}>
                <Grid container
                  direction="row"
                  justifyContent="center"
                  alignItems="center">
                  <TextField
                    id="outlined-basic"
                    type="password"
                    placeholder="Senha"
                    name="password"
                    label="Senha"
                    required
                    onChange={e => setPassword(e.target.value)}
                  />
                </Grid>
              </Box>
              <Box margin='auto'
                alignItems="center">
                <Grid container direction="column" justifyContent='center'>
                  <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center">
                    <Box marginY={2}>
                      <Button color='primary' type='submit' className={classes.loginButton}>
                        Entrar
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>

            </Card>

          </form>
        </Box>
      </Grid>
    </Grid>
  );
};
