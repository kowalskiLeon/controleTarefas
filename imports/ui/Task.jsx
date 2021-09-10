import React, { useEffect, useState } from 'react';
import { Button, Grid, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import estilos from '../styles/Styles';
import DescriptionIcon from '@material-ui/icons/Description';
import AlarmIcon from '@material-ui/icons/Alarm';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { UsersCollection } from '/imports/db/UsersCollection'
import { useTracker } from 'meteor/react-meteor-data';

export const Task = ({ task, onCheckboxClick, onViewClick, onEditClick, onDeleteClick, user, creator, showButtons }) => {
  const classes = estilos();
  const [nomeResponsavel, setNomeResponsavel]= useState('');
  const [nomeCriador, setNomeCriador]= useState('');
  const [idResponsavel, setIdResponsavel]= useState('');
  const [idCriador, setIdCriador]= useState('');


  const getResponsavel = (task) => {
     Meteor.call('users.byUserId', task.userId, (error, result) => {
      if (result) {
        setNomeResponsavel(result.nome);
        setIdResponsavel(result.id);
      }
    });
    return;
  }

  const getCriador = (task) => {
     Meteor.call('users.byUserId', task.cadastradaPor, (error, result) => {
      if (result) {
        setNomeCriador(result.nome)
        setIdCriador(result.id);
      }
    });
    return;
  }

  function isSameUser() {
    if (task) {
      if (user._id === task.cadastradaPor) {
        return false
      }
    }
    return true;
  }

  useEffect(() => {
    if (task) {
        getResponsavel(task);
        getCriador(task);
    }

}, []);


  return (
    <ListItem>
      <Grid item xs={1} lg={1}>
        <ListItemIcon>
          {task.cadastrada ? <DescriptionIcon /> : ''}
          {task.andamento ? <AlarmIcon /> : ''}
          {task.concluida ? <DoneAllIcon /> : ''}
        </ListItemIcon>
      </Grid>
      <Grid item xs={showButtons ? 3 : 5} lg={showButtons ? 3 : 5}>
        <span>{task.text}</span>
      </Grid>
      <Grid item xs={showButtons ? 2 : 3} lg={showButtons ? 3 : 3}>
        <span>{nomeResponsavel ? nomeResponsavel : ''}</span>
      </Grid>
      <Grid item xs={showButtons ? 2 : 3} lg={showButtons ? 3 : 3}>
        <span>{nomeCriador ? nomeCriador : ''}</span>
      </Grid>
      <Grid item xs={showButtons ? 4 : false} lg={showButtons ? 2 : false}>
        {showButtons && idResponsavel!='' && idCriador!='' ? <div>
          <Button className={classes.vizualize} onClick={() => onViewClick(task)}><VisibilityIcon /></Button>
          <Button disabled={isSameUser()} className={classes.edit} onClick={() => onEditClick(task)}><EditIcon /></Button>
          <Button disabled={isSameUser()} className={classes.delete} onClick={() => onDeleteClick(task)}><DeleteIcon /></Button>
        </div> : ''}
      </Grid>
    </ListItem>
  );
};
