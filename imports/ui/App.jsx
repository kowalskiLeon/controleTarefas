import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/db/TasksCollection';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import BarraDeFerramentas, { BarraFerramentas } from './BarraDeFerramentas';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { GerenciamentoTarefas } from './GerenciamentoTarefas';
import estilos from '../styles/Styles';
import { Container } from '@material-ui/core';
import { DadosTarefa } from './DadosTarefa';

const toggleChecked = ({ _id, isChecked }) =>
  Meteor.call('tasks.setIsChecked', _id, !isChecked);

const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id);

export const App = () => {
  const classes = estilos();
  const user = useTracker(() => Meteor.user());


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

  return (
    <div className="app">

      <div className={classes.conteudo}>
        <div className="main">
          <BrowserRouter>
            <BarraDeFerramentas user={user} />
              <Route exact path="/tarefas">
                {user ? <TaskForm /> :
                  <Redirect to="/" />}
              </Route>
              <Route exact path="/gerenciamento">
                {user ? <GerenciamentoTarefas /> :
                  <Redirect to="/" />}
              </Route>
              <Route exact path="/dados">
                {user ? <DadosTarefa /> :
                  <Redirect to="/" />}
              </Route>
              <Route exact path="/">
                {!user ? <LoginForm /> :
                  <Redirect to="/tarefas" />}
              </Route>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};
