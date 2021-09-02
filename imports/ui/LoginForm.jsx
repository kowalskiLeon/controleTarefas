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
    <Grid
      display="flex"
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height={1}
      className={classes.conteudo}
      
    >
      <form onSubmit={submit}>
        <Card className={classes.card}>
          <Box margin={5}>
            <TextField
              id="outlined-basic"
              type="text"
              placeholder="Usuário"
              name="username"
              required
              onChange={e => setUsername(e.target.value)}
            />
          </Box>

          <Box margin={5}>
            <TextField
              id="outlined-basic"
              type="password"
              placeholder="Senha"
              name="password"
              required
              onChange={e => setPassword(e.target.value)}
            />
          </Box>
          <Box margin='auto' justifyContent="center"
            alignItems="center">
            <Button color='primary' type='submit'>
              Entrar
            </Button>
          </Box>

        </Card>

      </form>
    </Grid>
  );
};
