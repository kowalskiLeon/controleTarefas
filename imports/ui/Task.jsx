import React from 'react';
import { Button, Grid, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import estilos from '../styles/Styles';

export const Task = ({ task, onCheckboxClick, onViewClick, onEditClick, onDeleteClick, user, creator, showButtons }) => {
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
      <Grid item xs={showButtons ?3:3} lg={showButtons ?3:3}>
        <span>{task.text}</span>
      </Grid>
      <Grid item xs={showButtons ?2:3} lg={showButtons ?3:3}>
        <span>{user.name?user.name:user.username}</span>
      </Grid>
      <Grid item xs={showButtons ?2:3} lg={showButtons ?3:3}>
        <span>{creator.username}</span>
      </Grid>
      <Grid item xs={showButtons ?4:false} lg={showButtons ?2:false}>
        {showButtons ? <div>
          <Button className={classes.vizualize} onClick={() => onViewClick(task)}><VisibilityIcon /></Button>
          <Button disabled={isSameUser()} className={classes.edit} onClick={() => onEditClick(task)}><EditIcon /></Button>
          <Button disabled={isSameUser()} className={classes.delete} onClick={() => onDeleteClick(task)}><DeleteIcon /></Button>
        </div>: ''}
      </Grid>
    </ListItem>
  );
};
