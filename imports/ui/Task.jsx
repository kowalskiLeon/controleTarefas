import React from 'react';
import { Button, Grid, ListItem } from '@material-ui/core';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import AssignmentReturnedIcon from '@material-ui/icons/AssignmentReturned';
import { Checkbox } from '@material-ui/core';
import estilos from '../styles/Styles';

export const Task = ({ task, onCheckboxClick, onDeleteClick, user}) => {
  const classes = estilos();
  const isSameUser = () => {
    return user.id == task.userId
  }

  return (
    <ListItem>
      <Grid item xs={1}>
        <ListItemIcon>
          <AssignmentReturnedIcon />
        </ListItemIcon>
      </Grid>
      <Grid item xs={1}>
        <Checkbox
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          readOnly
        />
      </Grid>
      <Grid item xs={4}>
        <span>{task.text}</span>
      </Grid>
      <Grid item xs={3}>
        <span>{user.username}</span>
      </Grid>
      <Grid item xs={1}>
        {isSameUser ? <Button className={classes.delete}  onClick={() => onDeleteClick(task)}><DeleteIcon /></Button> : <div></div>}
      </Grid>
    </ListItem>
  );
};
