import React from 'react';
import { Button, Grid, ListItem, Paper, TextField } from '@material-ui/core';
import estilos from '../styles/Styles';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { useRouteMatch, Switch, Route } from 'react-router';

export const DadosDaTarefa = (props) => {
    const classes = estilos();
    let { path, url } = useRouteMatch();
    const ro = localStorage.getItem('readonly') === 'true' ? true : false;
    const [id, setID] = useState('');
    const [text, setText] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [userID, setuserID] = useState('');
    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;
        if (!descricao) return;
        if (!data) return;
        if (!userID) return;
        if (id === '') Meteor.call('tasks.insert', text, descricao, data, userID);
        else Meteor.call('tasks.update', id, text, descricao, data, userID);

        setText('');
    };

    return (
        <Box marginY={2} padding={3} >
            <Paper>
                <Box padding={4}>
                    <form className="task-form" onSubmit={handleSubmit}>
                        <Grid container
                            direction="column">
                            {id != '' ? <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                <TextField id="outlined-basic"
                                    type="text"
                                    placeholder="ID"
                                    value={id}
                                    className={classes.textfield}
                                    onChange={e => setID(e.target.value)}
                                />
                            </Grid> :
                                <div></div>}
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                <TextField id="outlined-basic"
                                    type="text"
                                    placeholder="Nome da Tarefa"
                                    value={text}
                                    className={classes.textfield}
                                    onChange={e => setText(e.target.value)}
                                />
                            </Grid>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                <TextField id="outlined-basic"
                                    type="text"
                                    placeholder="Descrição da Tarefa"
                                    value={descricao}
                                    className={classes.textfield}
                                    onChange={e => setDescricao(e.target.value)}
                                />
                            </Grid>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                <TextField id="outlined-basic"
                                    type="date"
                                    placeholder="Data da Tarefa"
                                    value={data}
                                    className={classes.textfield}
                                    onChange={e => setData(e.target.value)}
                                />
                            </Grid>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                <TextField id="outlined-basic"
                                    type="text"
                                    placeholder="Id do Usuário"
                                    value={userID}
                                    className={classes.textfield}
                                    onChange={e => setuserID(e.target.value)}
                                />
                            </Grid>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Button color="primary" className={classes.buttonCadastro} type="submit">Adicionar Tarefa</Button>
                                <Button className={classes.buttonCadastro} >Limpar</Button>
                                <Button className={classes.buttonCadastro}> Voltar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};