import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Task } from './Task';
import { useTracker } from 'meteor/react-meteor-data';
import estilos from '../styles/Styles';
import { TasksCollection } from '/imports/db/TasksCollection';
import { ListItem, List } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { PinDropSharp } from '@material-ui/icons';
import { useHistory } from 'react-router';

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);


const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const GerenciamentoTarefas = () => {

  const user = useTracker(() => Meteor.user());
  const classes = estilos();

  const [hideCompleted, setHideCompleted] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };

  const userFilter = user ? { userId: user._id } : {};

  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };

  const { tasks, pendingTasksCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTasksCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe('tasks');

    if (!handler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }

    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const pendingTasksCount = TasksCollection.find(pendingOnlyFilter).count();

    return { tasks, pendingTasksCount };
  });

  const pendingTasksTitle = `${pendingTasksCount ? ` (${pendingTasksCount})` : ''
    }`;


  const [text, setText] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    if (!text) return;

    Meteor.call('tasks.insert', text);

    setText('');
  };

  const getUser = (task) => {
    return Meteor.users.findOne(task.userId)
  }

  return (
    <Box marginY={2} padding={3} >
      {/* <div className="filter">
        <button onClick={() => setHideCompleted(!hideCompleted)}>
          {hideCompleted ? 'Show All' : 'Hide Completed'}
        </button>
      </div> */}

      {isLoading && <div className="loading">loading...</div>}
      {/* <form className="task-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type to add new tasks"
          value={text}
          onChange={e => setText(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form> */}

      <Paper>
        <List component="nav" aria-label="main mailbox folders" className="tasks">
          <ListItem>
            <Grid item xs={1} lg={1}>
            </Grid>
            <Grid item xs={3} lg={4}>
              <span>Nome</span>
            </Grid>
            <Grid item xs={3} lg={4}>
              <span>Usuário</span>
            </Grid>
            <Grid item xs={5} lg={3}>
              <span>Ações</span>
            </Grid>
          </ListItem>
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              //onViewClick={viewTask}
              //onEditClick={editTask}
              onDeleteClick={deleteTask}
              user={getUser(task)}
              showButtons={true}
            />
          ))}
        </List>
      </Paper>
    </Box>
  );
};
