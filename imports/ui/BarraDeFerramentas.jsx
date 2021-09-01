import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import estilos from '../styles/Styles';
import { AppBar, Toolbar, Typography, Grid, Box, Button } from '@material-ui/core';
import { useTracker } from 'meteor/react-meteor-data';
import { withRouter } from 'react-router-dom';



const BarraDeFerramentas = (props) => {
    const classes = estilos();

    const logout = () => Meteor.logout();

    return (
        <AppBar position="static" className={classes.barra}>
            <Toolbar variant="dense">
                <Box>
                    <Grid container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Box marginLeft={5} marginRight={5}>
                            <h1>
                                📝️ Controle de Tarefas
                                {props.pendingTasksTitle}
                            </h1>
                        </Box>
                        {props.user ?
                            <div>
                                <Button  className= {classes.botao} onClick={logout}>
                                    Sair 🚪
                                </Button>
                            </div>
                            :
                            <div>
                                
                            </div>
                        }
                    </Grid>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default withRouter(BarraDeFerramentas);