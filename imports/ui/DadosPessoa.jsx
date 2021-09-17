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
import { UsersCollection } from '../db/UsersCollection';


export const DadosDaPessoa = (props) => {
    const imgPath = '/imgs/task.png';
    const classes = estilos();
    const history = useHistory();
    const [id, setID] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [sexo, setSexo] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [foto, setFoto] = useState('');
    const [title, setTitle] = useState('Texto');
    const [text, setText] = useState('Texto');
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
            var uid = params.id;
            //console.log(uid)
            Meteor.call('users.byUserId', uid, (error, result) => {
                if (result) {
                    carregarDados(result)
                }
            });
        }

    }, []);


    function carregarDados(person) {
        setNome(person.nome);
        setEmail(person.email);
        setDataNascimento(person.dataNascimento)
        setSexo(person.sexo)
        setID(person._id)
        setEmpresa(person.empresa)
        setFoto(person.foto);
    }

    function mostrarMensagem(alertTitle, text) {
        setText(text);
        setTitle(alertTitle)
        handleClickOpen();
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!nome) { mostrarMensagem('Alerta', 'O campo "Nome" não foi informado! Por favor preencha todos os campos'); return; }
        if (!email) { mostrarMensagem('Alerta', 'O campo "E-Mail" não foi informado! Por favor preencha todos os campos'); return; }
        if (!params.id && !username) { mostrarMensagem('Alerta', 'O campo "Nome de Usuário" não foi informado! Por favor preencha todos os campos'); return; }
        if (!params.id && !password) { mostrarMensagem('Alerta', 'O campo "Senha" não foi informado! Por favor preencha todos os campos'); return; }
        if (!params.id && password != confirmpassword) { mostrarMensagem('Alerta', 'Senhas não coincidem'); return; }
        if (!dataNascimento) { mostrarMensagem('Alerta', 'O campo "Data de Nasciemtno" não foi informado! Por favor preencha todos os campos'); return; }
        if (!sexo) { mostrarMensagem('Alerta', 'O campo "Genêro" não foi informado! Por favor preencha todos os campos'); return; }
        if (!empresa) { mostrarMensagem('Alerta', 'O campo "Empresa" não foi informado! Por favor preencha todos os campos'); return; }
        if (!foto) { mostrarMensagem('Alerta', 'A foto de perfil não foi enviada!'); return; }
        if (!validateEmail(email)) { mostrarMensagem('Alerta', 'Esse e-mail não é válido.'); return; }
        if (params.id) {
            var ret = Meteor.call('users.update', id, nome, email, dataNascimento, sexo, empresa, foto, (error, result) => {
                if (!error) {
                    mostrarMensagem('Sucesso', 'Você foi cadastrado com sucesso. Lhe enviaremos de volta para a tela de login.');
                    history.push('/');
                } else {
                    mostrarMensagem('Falha ao cadastrar', 'Ocorreu um problema, consulte a assistência técnica.');
                    console.log(error)
                }
            });
        } else {
            var ret = Meteor.call('validar', username, (error, result) => {
                if (result) {
                    var ret2 = Meteor.call('newUser', nome, email, dataNascimento,
                        username, password, sexo, empresa, foto, (error2, result2) => {
                            if (!error2) {
                                mostrarMensagem('Sucesso', 'Você foi cadastrado com sucesso. Lhe enviaremos de volta para a tela de login.');
                                history.push('/');
                            } else {
                                mostrarMensagem('Falha ao cadastrar', 'Ocorreu um problema, consulte a assistência técnica.');
                            }
                        })
                } else {
                    mostrarMensagem('Alerta', 'Já existe um usuário com este nome. Escolha outro por favor.');
                    return;
                }
            })
        }
    };

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

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
        //console.log(url); // Would see a path?
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
                                        <h3>Editar Dados Pessoais</h3>
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
                                {!params.id ?
                                    <div>
                                        <Grid container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center">

                                            <TextField id="outlined-basic"
                                                type="text"
                                                placeholder="Usuário"
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
                                                placeholder="Senha"
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
                                                type="password"
                                                placeholder="Confirmar Senha"
                                                label="Confirmar Senha"
                                                value={confirmpassword}
                                                className={classes.textfield}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />
                                        </Grid>
                                    </div> : ''
                                }
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
            <Mensagem handleClose={handleClose} text={text} open={open} titulo={title} />
        </div>

    );
};