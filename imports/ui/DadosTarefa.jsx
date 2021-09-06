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
import { MenuItem } from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';



export const DadosDaTarefa = (props) => {
    const classes = estilos();
    const history = useHistory();
    let { path, url } = useRouteMatch();
    const [loaded, setLoaded] = useState(false);
    const [id, setID] = useState('');
    const [text, setText] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [userId, setuserId] = useState('');
    const [visivel, setVisivel] = useState(true);
    const [cadastrada, setCadastrada] = useState(true);
    const [andamento, setAndamento] = useState(false);
    const [concluida, setConcluida] = useState(false);
    const params = useParams();
    const ro = localStorage.getItem('readonly') === 'true' && params.id ? true : false;

    const users = Meteor.users.find().fetch();

    useEffect(() => {
        const task = TasksCollection.find({
            _id: params.id
        }).fetch();
        if (task) {
            if (task[0]) {
                const tarefa = task[0];
                setID(tarefa._id);
                setText(tarefa.text)
                setDescricao(tarefa.descricao)
                setVisivel(tarefa.visivel)
                setuserId(tarefa.userId)
                setData(tarefa.data)
                setAndamento(tarefa.andamento)
                setCadastrada(tarefa.cadastrada)
                setConcluida(tarefa.concluida)
            }
        }

    }, []);

    const handleSubmit = e => {
        e.preventDefault();
        if (!text) return;
        if (!descricao) return;
        if (!data) return;
        if (!userId) return;
        let r = 'teste';
        if (id === '') r = Meteor.call('tasks.insert', text, descricao, data, userId, visivel, true, andamento, concluida);
        else r = Meteor.call('tasks.update', id, text, descricao, data, userId, visivel, cadastrada, andamento, concluida);
        console.log(r);
    };

    const handleCheckboxes = (e, _cadastrada, _andamento, _concluida) => {
        e.preventDefault();
        setCadastrada(_cadastrada);
        setAndamento(_andamento)
        setConcluida(_concluida)
        Meteor.call('tasks.definirEstado', id, _cadastrada, _andamento, _concluida);
    }

    const voltar = e => {
        e.preventDefault();
        history.push('/gerenciamento');
    }

    const limpar = e => {
        e.preventDefault();
        setText('');
        setDescricao('');
        setData('');
        setuserId('')
        setVisivel(true);
    }

    return (
        <Box marginY={2} padding={3} >
            <Grid container
                direction="row"
                justifyContent="center"
                alignItems="center">
                <Grid item xs={10} lg={8}>
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
                                        alignItems="center"
                                        >

                                        <TextField id="outlined-basic"
                                            type="text"
                                            placeholder="Nome da Tarefa"
                                            label="Nome da Tarefa"
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
                                            label="Descrição da Tarefa"
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
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Usuário Responsável"
                                            value={userId}
                                            InputProps={{
                                                readOnly: ro,
                                            }}
                                            onChange={e => setuserId(e.target.value)}
                                            className={classes.textfield}
                                            helperText="Selecione o usuário."
                                        >
                                            {users.map((option) => (
                                                <MenuItem key={option._id} value={option._id}>
                                                    {option.name ? option.name : option.username}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center">

                                        Tarefa Pública?(Visivel para todos)
                                        <Checkbox
                                            checked={visivel}
                                            onChange={e => setVisivel(!visivel)}
                                            className={classes.checkboxfield}
                                            inputProps={{ 'aria-label': 'primary checkbox' }, {
                                                readOnly: ro,
                                                disabled: ro,
                                            }}
                                        />
                                    </Grid>
                                    {ro ?
                                        <div>
                                            <Grid container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center">
                                                Cadastrada
                                                <Checkbox
                                                    checked={cadastrada}
                                                    onChange={e => handleCheckboxes(e, true, false, false)}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                                Andamento
                                                <Checkbox
                                                    checked={andamento}
                                                    onChange={e => handleCheckboxes(e, false, true, false)}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                                Concluída
                                                <Checkbox
                                                    checked={concluida}
                                                    onChange={e => handleCheckboxes(e, false, false, true)}
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </Grid>
                                            <Grid container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center">
                                                <Button className={classes.buttonCadastro} onClick={voltar}> Voltar para o Gerenciamento</Button>
                                            </Grid>
                                        </div>
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
                                        </Grid>
                                    }

                                </Grid>
                            </form>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>

    );
};