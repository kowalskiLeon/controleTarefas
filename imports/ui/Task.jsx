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
  const [nomeResponsavel, setNomeResponsavel] = useState('');
  const [nomeCriador, setNomeCriador] = useState('');
  const [idResponsavel, setIdResponsavel] = useState('');
  const [idCriador, setIdCriador] = useState('');


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

  function dataConvertida(data) {
    var tempo = data.split('T')[1];
    var dia = data.split('T')[0].split('-')[2];
    var mes = data.split('T')[0].split('-')[1];
    var ano = data.split('T')[0].split('-')[0];
    var dataCompleta = dia + '/' + mes + '/' + ano;
    return dataCompleta + ' as ' + tempo;
  }

  useEffect(() => {
    if (task) {
      getResponsavel(task);
      getCriador(task);
    }

  }, []);


  return (
    <ListItem className={classes.taskBackground}>
      <Grid container direction='column'>
        <Grid container direction='row' className={classes.rowMargin} >
          <Grid item xs={1} lg={1}>
            <ListItemIcon>
              {task.cadastrada ? <DescriptionIcon /> : ''}
              {task.andamento ? <AlarmIcon /> : ''}
              {task.concluida ? <DoneAllIcon /> : ''}
            </ListItemIcon>
          </Grid>
          <Grid item xs={showButtons ? 12 : 3} lg={showButtons ? 2 : 4}>
            <h2 className={classes.headerMargin}>{task.text}</h2>
          </Grid>
          <Grid item xs={12} lg={showButtons ? 3 : 4}>
            <h4 className={classes.headerMargin}>{nomeResponsavel ? 'Responsavel: ' + nomeResponsavel : ''}</h4>
          </Grid>
          <Grid item xs={12} lg={showButtons ? 3 : 3}>
            <h4 className={classes.headerMargin}>{nomeCriador ? 'Criado Por: ' + nomeCriador : ''}</h4>
          </Grid>
          <Grid item xs={showButtons ? 12 : false} lg={showButtons ? 3 : false}>
            {showButtons && idResponsavel != '' && idCriador != '' ? <div>
              <Button className={classes.vizualize} onClick={() => onViewClick(task)}><VisibilityIcon /></Button>
              <Button disabled={isSameUser()} className={classes.edit} onClick={() => onEditClick(task)}><EditIcon /></Button>
              <Button disabled={isSameUser()} className={classes.delete} onClick={() => onDeleteClick(task)}><DeleteIcon /></Button>
            </div> : ''}
          </Grid>
        </Grid>
        <Grid container direction='row' >
          <Grid item xs={false} lg={1}>
          </Grid>
          <Grid item xs={12} lg={12}>

            <h4 className={classes.dataMargin}>{task.data ? 'Data da Tarefa: ' + dataConvertida(task.data) : ''}</h4>

          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
};
