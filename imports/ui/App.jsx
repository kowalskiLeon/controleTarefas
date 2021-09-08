import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TaskForm } from './TaskForm';
import { LoginForm } from './LoginForm';
import BarraDeFerramentas from './BarraDeFerramentas';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { GerenciamentoTarefas } from './GerenciamentoTarefas';
import estilos from '../styles/Styles';
import { DadosDaTarefa } from './DadosTarefa';
import { DadosDaPessoa } from './DadosPessoa';

export const App = () => {
  const classes = estilos();
  const user = useTracker(() => Meteor.user());

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
              {user ? <DadosDaTarefa /> :
                <Redirect to="/" />}
            </Route>
            <Route path="/dados/:id">
              {user ? <DadosDaTarefa /> :
                <Redirect to="/" />}
            </Route>
            <Route exact path="/">
              {!user ? <LoginForm /> :
                <Redirect to="/tarefas" />}
            </Route>
            <Route exact path="/cadastro">
              {!user ? <DadosDaPessoa /> :
                <Redirect to="/tarefas" />}
            </Route>
            <Route exact path="/cadastro/:id">
              {user ? <DadosDaPessoa /> :
                <Redirect to="/" />}
            </Route>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};
