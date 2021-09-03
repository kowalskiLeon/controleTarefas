import React from 'react';
import { Button, Grid, ListItem, Paper, TextField } from '@material-ui/core';
import estilos from '../styles/Styles';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import { useParams } from 'react-router';
import { TasksCollection } from '../db/TasksCollection';
import { useEffect } from 'react';



export const DadosDaPessoa = (props) => {
    const classes = estilos();
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const ro = localStorage.getItem('readonly') === 'true' ? true : false;
    const [id, setID] = useState('');
    const [text, setText] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [userID, setuserID] = useState('');
    const [carregando, setCarregando] = useState(false);
    const params = useParams();


    useEffect(() => {
        if (params.id) {
            carregarDados();
        }

    }, []);


    function carregarDados() {
        setCarregando(true);
        setID(id);
        const tempTask = TasksCollection.find({ '_id': id });
        console.log(tempTask)
        setText(tempTask.text)
        setDescricao(tempTask.descricao)
        setData(tempTask.data)
        setuserID(tempTask.userID)
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;
        if (!descricao) return;
        if (!data) return;
        if (!userID) return;
        let r = 'teste';
        if (id === '') r = Meteor.call('tasks.insert', text, descricao, data, userID);
        else r = Meteor.call('tasks.update', id, text, descricao, data, userID);
        console.log(r);
    };

    const voltar = e => {
        e.preventDefault();
        history.push('/gerenciamento');
    }

    const limpar = e => {
        e.preventDefault();
        setID('');
        setText('');
        setDescricao('');
        setData('');
    }

    return (
        <Box marginY={2} padding={3} >
            <Paper>
                <Box padding={4}>
                    <Grid container
                        direction="column">
                        {params.id ?
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <h3>Editar Pessoa - ID: {params.id}</h3>
                            </Grid>
                            :
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <h3>Cadastrar Pessoa</h3>
                            </Grid>
                        }
                    </Grid>
                    <form className="task-form" onSubmit={handleSubmit}>
                        <Grid container
                            direction="column">
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                <TextField id="outlined-basic"
                                    type="text"
                                    placeholder="Nome da Pessoa"
                                    value={text}
                                    readOnly={ro}
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
                                    placeholder="Descrição da Pessoa"
                                    value={descricao}
                                    readOnly={ro}
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
                                    placeholder="Data da Pessoa"
                                    value={data}
                                    readOnly={ro}
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
                                    readOnly={ro}
                                    className={classes.textfield}
                                    onChange={e => setuserID(e.target.value)}
                                />
                            </Grid>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <Button color="primary" className={classes.buttonCadastro} type="submit">
                                    {params.id ?
                                        'Editar Pessoa'
                                        :
                                        'Adicionar Pessoa'
                                    }
                                </Button>
                                <Button className={classes.buttonCadastro} onClick={limpar}>Limpar</Button>
                                <Button className={classes.buttonCadastro} onClick={voltar}> Voltar</Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};