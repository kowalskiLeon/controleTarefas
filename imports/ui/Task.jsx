import React from 'react';
import { Button, Grid, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import { Checkbox } from '@material-ui/core';
import estilos from '../styles/Styles';

export const Task = ({ task, onCheckboxClick, onDeleteClick, user, showButtons }) => {
  const classes = estilos();
  function isSameUser() {
    if (user.id == task.userId) {
      return true
    }
    return false;
  }

  return (
    <ListItem>
      <Grid item xs={1} lg={1}>
        <ListItemIcon>
          <AssignmentReturnedIcon />
        </ListItemIcon>
      </Grid>
      <Grid item xs={showButtons ?3:5} lg={showButtons ?4:5}>
        <span>{task.text}</span>
      </Grid>
      <Grid item xs={showButtons ?3:5} lg={showButtons ?4:5}>
        <span>{user.name?user.name:user.username}</span>
      </Grid>
      <Grid item xs={showButtons ?5:false} lg={showButtons ?3:false}>
        {showButtons ? <div>
          <Button className={classes.vizualize} onClick={() => onDeleteClick(task)}><VisibilityIcon /></Button>
          <Button disabled={isSameUser()} className={classes.edit} onClick={() => onDeleteClick(task)}><EditIcon /></Button>
          <Button disabled={isSameUser()} className={classes.delete} onClick={() => onDeleteClick(task)}><DeleteIcon /></Button>
        </div>: ''}
      </Grid>
    </ListItem>
  );
};
