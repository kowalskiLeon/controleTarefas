import React from 'react';
import { Button, Grid, ListItem, Paper, TextField } from '@material-ui/core';
import estilos from '../styles/Styles';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import { useParams } from 'react-router';
import { TasksCollection } from '../db/TasksCollection';
import { useEffect } from 'react';
import { Checkbox } from '@material-ui/core';
import { useRef } from 'react';

import { useTracker } from 'meteor/react-meteor-data';



export const DadosDaTarefa = (props) => {
    const classes = estilos();
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const [id, setID] = useState('');
    // this.text = useRef('');
    // this.descricao = useRef('');
    // this.data = useRef('');
    // this.userID = useRef('');
    this.andamento = React.createRef(false);
    this.concluida = React.createRef(false);
    const [text, setText] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [userID, setuserID] = useState('');
    const [visivel, setVisivel] = useState(true);
    const [cadastrada, setCadastrada] = useState(true);
    const [andamento, setAndamento] = useState(false);
    const [concluida, setConcluida] = useState(false);
    const params = useParams();
    const ro = localStorage.getItem('readonly') === 'true' && params.id ? true : false;
    const { task, isLoading } = useTracker(() => {
        const noDataAvailable = { tasks: [] };
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        const handler = Meteor.subscribe('tasks');

        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
        }

        const task = TasksCollection.find({
            _id: params.id
        }).fetch();

        return { task };
    });

    useEffect(() => {
        if (task) {
            if(task[0]){
                const tarefa = task[0];
                setID(tarefa.id);
                setText(tarefa.text)
                setDescricao(tarefa.descricao)
                setVisivel(tarefa.visivel)
                setuserID(tarefa.userId)
                setData(tarefa.data)
                setAndamento(tarefa.andamento)
                setCadastrada(tarefa.cadastrada)
                setConcluida(tarefa.concluida)
            }
        }

    }, task);

    const handleSubmit = e => {
        e.preventDefault();

        if (!text) return;
        if (!descricao) return;
        if (!data) return;
        if (!userID) return;
        let r = 'teste';
        if (id === '') r = Meteor.call('tasks.insert', text, descricao, data, userID, visivel, cadastrada, andamento, concluida);
        else r = Meteor.call('tasks.update', id, text, descricao, data, userID, visivel, cadastrada, andamento, concluida);
        console.log(r);
    };

    const voltar = e => {
        e.preventDefault();
        history.push('/gerenciamento');
    }

    const limpar = e => {
        e.preventDefault();
        setText('');
        setDescricao('');
        setData('');
        setuserID('')
        setVisivel(true);
        set
    }



    return (
        <Box marginY={2} padding={3} >
            <Paper>
                <Box padding={4}>
                    <Grid container
                        direction="column">
                        {params.id ?
                            <div>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    {ro ? <h3>Visulizar Tarefa - ID: {params.id}</h3> : <h3>Editar Tarefa - ID: {params.id}</h3>}
                                </Grid>
                                {ro ? <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <h4>Edição está travada.</h4>
                                </Grid> : ''}
                            </div>
                            :
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">
                                <h3>Cadastrar Tarefa</h3>
                            </Grid>}
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
                                    placeholder="Nome da Tarefa"
                                    value={text}
                                    InputProps={{
                                        readOnly: ro,
                                    }}
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
                                    InputProps={{
                                        readOnly: ro,
                                    }}
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
                                    InputProps={{
                                        readOnly: ro,
                                    }}
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
                                    InputProps={{
                                        readOnly: ro,
                                    }}
                                    className={classes.textfield}
                                    onChange={e => setuserID(e.target.value)}
                                />
                            </Grid>
                            <Grid container
                                direction="row"
                                justifyContent="center"
                                alignItems="center">

                                Visivel para todos?
                                <Checkbox
                                    checked={visivel}
                                    onChange={e => setVisivel(!visivel)}
                                    inputProps={{ 'aria-label': 'primary checkbox' }, {
                                        readOnly: ro,
                                        disabled: ro,
                                    }}
                                />
                            </Grid>
                            {ro ?
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    Cadastrada
                                    <Checkbox
                                        checked={cadastrada}
                                        onChange={e => setCadastrada(!cadastrada)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    Andamento
                                    <Checkbox
                                        checked={andamento}
                                        onChange={e => setAndamento(!andamento)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                    Concluída
                                    <Checkbox
                                        checked={concluida}
                                        onChange={e => setConcluida(!concluida)}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </Grid>
                                :
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Button color="primary" className={classes.buttonCadastro} type="submit">
                                        {params.id ?
                                            'Atualizar Tarefa'
                                            :
                                            'Adicionar Tarefa'
                                        }
                                    </Button>
                                    <Button className={classes.buttonCadastro} onClick={limpar}>Limpar</Button>
                                    <Button className={classes.buttonCadastro} onClick={voltar}> Voltar</Button>
                                </Grid>}
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </Box>
    );
};