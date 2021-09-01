import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const submit = e => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password);
    history.push('/tarefas')
  };

  return (
    <form onSubmit={submit} className="login-form">
      <div>
        <TextField
          type="text"
          placeholder="Usuário"
          name="username"
          required
          onChange={e => setUsername(e.target.value)}
        />
      </div>

      <div>
        <TextField
          type="password"
          placeholder="Senha"
          name="password"
          required
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" type="submit" color="primary">
          Entrar
        </Button>
      </div>
    </form>
  );
};
