import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, Card, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Grid, Box, Paper } from '@material-ui/core';
import { Mensagem } from './components/Mensagem';
import estilos from '../styles/Styles';
import { useEffect } from 'react';
import { TasksCollection } from '../db/TasksCollection';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false)
  const [textM, setTextM] = useState('')
  const [title, setTitle] = useState('')
  const [numero, setNumero] = useState(0)
  const [numeroAndamento, setNumeroAndamento] = useState(0)
  const [numeroCadastradas, setNumeroCadastradas] = useState(0)
  const [numeroConcluidas, setNumeroConcluidas] = useState(0)
  const history = useHistory();
  const classes = estilos();

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (error, result) => {
      if (!error) {
        history.push('/tarefas')
      } else {
        mostrarMensagem('Login Inválido', 'Não foi possível acessar o sistema com as credenciais informadas por você. Tente novamente.')
      }
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function mostrarMensagem(alertTitle, text) {
    setTextM(text);
    setTitle(alertTitle)
    handleClickOpen();
  }

  useEffect(() => {
    Meteor.call('tasks.getCount', (error, result) => {
      setNumero(result);
    })
    Meteor.call('tasks.getCountWithFilter', true, false, false, (error, result) => {
      setNumeroCadastradas(result);
    })
    Meteor.call('tasks.getCountWithFilter', false, true, false, (error, result) => {
      setNumeroAndamento(result);
    })
    Meteor.call('tasks.getCountWithFilter', false, false, true, (error, result) => {
      setNumeroConcluidas(result);
    })
  }, []);

  // const { tasks, numItems, isLoading } = useTracker(() => {
  //   const noDataAvailable = { tasks: [] };
  //   if (!Meteor.user()) {
  //     return noDataAvailable;
  //   }
  //   const handler = Meteor.subscribe('tasks');

  //   const numItems = TasksCollection.find().count();
  //   console.log(numItems)

  //   const tasks = TasksCollection.find().fetch();
  //   return { tasks, numItems };
  // });

  return (
    <div>
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
                {numero > 0 ?
                  <div>
                    <h4 align='center'>Já são {numero} tarefas no total.</h4>
                    <h4 align='center'>{numeroCadastradas} tarefas cadastradas.</h4>
                    <h4 align='center'>{numeroAndamento} tarefas em andamento.</h4>
                    <h4 align='center'>{numeroConcluidas} tarefas concluidas.</h4>
                  </div>
                  :
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
      <Mensagem handleClose={handleClose} text={textM} open={open} titulo={title} />
    </div>
  );
};
