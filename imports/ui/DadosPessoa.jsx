import React from 'react';
import { Button, Grid, ListItem, Paper, TextField } from '@material-ui/core';
import estilos from '../styles/Styles';
import { Box } from '@material-ui/core';
import { useState } from 'react';
import { useRouteMatch, Switch, Route, useHistory } from 'react-router';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { MenuItem } from '@material-ui/core';
import { Mensagem } from '../ui/components/Mensagem'
import fs from 'fs';


export const DadosDaPessoa = (props) => {
    const imgPath = '/imgs/task.png';
    const classes = estilos();
    const history = useHistory();
    const [id, setID] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [foto, setFoto] = useState('');
    const [text, setText] = useState('');
    const params = useParams();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        if (params.id) {
            carregarDados();
        }

    }, []);


    function carregarDados() {

    }

    function mostrarMensagem(text){
        setText(text);
        handleClickOpen();
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!nome) return;
        if (!email) return;
        if (!dataNascimento) return;
        if (!sexo) return;
        if (!empresa) return;
        if (!foto) return;
        var ret = Meteor.call('validar', username, (error, result) => {
            if (result) {
                var ret2 = Meteor.call('newUser', nome, email, dataNascimento,
                    username, password, sexo, empresa, foto, (error2, result2) => {
                        console.log(result2);
                    })
            } else {
                mostrarMensagem('Já existe um usuário com este nome. Escolha outro por favor.')
            }
        })
    };

    const voltar = e => {
        e.preventDefault();
        if (params.id) history.push('/gerenciamento');
        else history.push('/');
    }

    const limpar = e => {
        e.preventDefault();
        setNome('');
        setUsername('');
        setPassword('');
        setEmail('');
        setDataNascimento('');
        setSexo('');
        setEmpresa('');
        setFoto('');
    }

    const handleUploadClick = (e) => {
        e.preventDefault();
        var file = e.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);
        reader.onloadend = function (e) {
            const data = [reader.result][0];
            setFoto(data);
        }.bind(this);
        console.log(url); // Would see a path?
    };

    return (
        <div>
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
                                        <h3>Editar Usuário - ID: {params.id}</h3>
                                    </Grid>
                                </div>
                                :
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <h3>Cadastrar Usuário</h3>
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
                                        placeholder="Nome"
                                        value={nome}
                                        className={classes.textfield}
                                        onChange={e => setNome(e.target.value)}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <TextField id="outlined-basic"
                                        type="text"
                                        placeholder="E-Mail"
                                        value={email}
                                        className={classes.textfield}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <TextField id="outlined-basic"
                                        type="text"
                                        placeholder="E-Mail"
                                        label="Usuário"
                                        value={username}
                                        className={classes.textfield}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <TextField id="outlined-basic"
                                        type="password"
                                        placeholder="E-Mail"
                                        label="Senha"
                                        value={password}
                                        className={classes.textfield}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <TextField id="outlined-basic"
                                        type="date"
                                        placeholder="Data de Nascimento"
                                        value={dataNascimento}
                                        className={classes.textfield}
                                        onChange={e => setDataNascimento(e.target.value)}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="Gênero"
                                        value={sexo}
                                        className={classes.textfield}
                                        onChange={e => setSexo(e.target.value)}
                                        helperText=""
                                    >
                                        <MenuItem key={'Masculino'} value={'Masculino'}>
                                            Masculino
                                        </MenuItem>
                                        <MenuItem key={'Feminino'} value={'Feminino'}>
                                            Feminino
                                        </MenuItem>
                                        <MenuItem key={'NB'} value={'NB'}>
                                            Prefiro Não Informar/Não Binário/Outros
                                        </MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <TextField id="outlined-basic"
                                        type="text"
                                        placeholder="Empresa"
                                        value={empresa}
                                        className={classes.textfield}
                                        onChange={e => setEmpresa(e.target.value)}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">

                                    <TextField id="outlined-basic"
                                        type="file"
                                        placeholder="Foto"
                                        //value={foto}
                                        className={classes.textfield}
                                        onChange={handleUploadClick}
                                    />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <img src={foto ? foto : imgPath} className={classes.profile} />
                                </Grid>
                                <Grid container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Button color="primary" className={classes.buttonCadastro} type="submit">
                                        {params.id ?
                                            'Atualizar Dados'
                                            :
                                            'Cadastrar'
                                        }
                                    </Button>
                                    <Button className={classes.buttonCadastro} onClick={limpar}>Limpar</Button>
                                    <Button className={classes.buttonCadastro} onClick={voltar}>Voltar</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Paper>
            </Box>
        </div>

    );
};