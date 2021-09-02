import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import estilos from '../styles/Styles';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ListItem, List } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Box, Paper } from '@material-ui/core';

export const DadosTarefa = (props) => {
    
    return(
        <div>
            <Grid container >
                <Paper>
                    <h3>Dados</h3>
                </Paper>
            </Grid>
        </div>
    );
}