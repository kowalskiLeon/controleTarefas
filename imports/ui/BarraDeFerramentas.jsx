import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import clsx from 'clsx';
import estilos from '../styles/Styles';
import { AppBar, Toolbar, Grid, Box, Button } from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, withRouter } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import { Route } from 'react-router';


const BarraDeFerramentas = (props) => {
    const classes = estilos();

    const logout = () => Meteor.logout();
    const [state, setState] = React.useState({
        right: false,
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
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
            <ListItem>
                    <Link to={"/cadastro/"+props.user._id}>
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        Editar Dados Pessoais
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to="/tarefas">
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        Lista de Tarefas
                    </Link>
                </ListItem>
                <Divider />
                <ListItem>
                    <Link to="/gerenciamento">
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        Gerenciamento
                    </Link>
                </ListItem><ListItem>
                    <Link to="/dados">
                        <ListItemIcon><InboxIcon /></ListItemIcon>
                        Adicionar Tarefa
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