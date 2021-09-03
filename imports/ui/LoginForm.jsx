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

  return (
    <Grid container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height={1}
      className={classes.conteudo}

    >
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
                required
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
          </Box>
          <Box margin='auto'
            alignItems="center">
            <Grid containter direction="column" justifyContent='center'>
              <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Box marginY={2}>
                  <Button color='primary' type='submit'>
                    Entrar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>

        </Card>

      </form>
    </Grid>
  );
};
