import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import clsx from 'clsx';
import estilos from '../styles/Styles';
import { AppBar, Toolbar, Grid, Box, Button, Card } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Route } from 'react-router';
import { useEffect } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import ListAltIcon from '@material-ui/icons/ListAlt';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import { UsersCollection } from '../db/UsersCollection';
import { useTracker } from 'meteor/react-meteor-data';



const BarraDeFerramentas = (props) => {
    const classes = estilos();
    const imgPath = '/imgs/task.png';
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('')
    const [foto, setFoto] = useState('')


    const logout = () => Meteor.logout();
    const [state, setState] = React.useState({
        right: false,
    });

    const { userData } = useTracker(() => {
        const noDataAvailable = { userData: undefined };
        if (!Meteor.user()) {
            return noDataAvailable;
        }
        if (props.user) {
            const handler = Meteor.subscribe('findUserById', props.user._id);
            if (!handler.ready()) {
                return { ...noDataAvailable, isLoading: true };
            }
            const userData = UsersCollection.find().fetch()[0];
            return { userData };
        }else{
            return noDataAvailable;
        }
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            }), classes.drawerBackground}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Button className={classes.drawerBotao} onClick={toggleDrawer(anchor, false)}>
                            Fechar
                        </Button>
                    </Grid>
                    <Grid container
                        direction="column"
                        justifyContent="center"
                        alignItems="center">
                        <Button className={classes.drawerBotao} onClick={logout}>
                            Sair 🚪
                        </Button>
                    </Grid>
                </ListItem>
                <ListItem>
                    <Box mx="auto" width={1} padding={2}>
                        <Card>
                            <Box width={1} py={2}>
                                <Grid container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center">
                                        {userData ? <img src={userData.foto ? userData.foto : imgPath} className={classes.profileSnippet} /> : ''}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center">
                                        {userData ? <h3> {userData.nome} </h3> : ''}
                                    </Grid>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center">
                                        {userData ? <span> {userData.email} </span> : ''}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </Box>
                </ListItem>
                <ListItem>
                    <Link to={"/cadastro/" + props.user._id} className={classes.drawerLink}>
                        <ListItemIcon><PeopleIcon /></ListItemIcon>
                        <span className={classes.drawerText}>Editar Dados Pessoais</span>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/tarefas" className={classes.drawerLink}>
                        <ListItemIcon><FormatListNumberedIcon /></ListItemIcon>
                        <span className={classes.drawerText}>Lista de Tarefas</span>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/gerenciamento" className={classes.drawerLink}>
                        <ListItemIcon><ListAltIcon /></ListItemIcon>
                        <span className={classes.drawerText}>Gerenciamento</span>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/dados" className={classes.drawerLink}>
                        <ListItemIcon><NoteAddIcon /></ListItemIcon>
                        <span className={classes.drawerText}>Adicionar Tarefa</span>
                    </Link>
                </ListItem>

            </List>

        </div>
    );

    return (
        <div>
            <AppBar position="static" className={classes.barra}>
                <Toolbar variant="dense">
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={8} lg={8}>
                            <Box marginRight={5}>
                                <h1>
                                    Controle de Tarefas
                                </h1>
                            </Box>
                        </Grid>
                        <Grid item xs={4} lg={4}>
                            {props.user ?
                                <Box display="flex" flexDirection="row-reverse">
                                    <IconButton className={classes.menu} onClick={toggleDrawer('right', true)}>
                                        <MenuIcon />
                                    </IconButton>
                                    <SwipeableDrawer
                                        anchor={'right'}
                                        open={state['right']}
                                        onClose={toggleDrawer('right', false)}
                                        onOpen={toggleDrawer('right', true)}
                                    >
                                        {list('right')}
                                    </SwipeableDrawer>
                                    <Button className={classes.botao} onClick={logout}>
                                        Sair 🚪
                                    </Button>
                                </Box>
                                :
                                <div>
                                    <Box>
                                        <Route exact path='/'>
                                            <Link className={classes.signLink} to="cadastro/">Cadastre-se</Link>
                                        </Route>
                                    </Box>
                                </div>
                            }
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>

        </div >
    );
}

export default withRouter(BarraDeFerramentas);