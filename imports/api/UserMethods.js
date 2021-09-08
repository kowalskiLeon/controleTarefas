import { check } from 'meteor/check';
import { UsersCollection } from '/imports/db/UsersCollection';
import fs from 'fs';

Meteor.methods({
    'validar'(username) {
        var ret = !Accounts.findUserByUsername(username);
        console.log(ret)
        return ret
    },

    'newUser'(nome, email, dataNascimento, username, password, sexo, empresa, foto) {
        check(nome, String);
        check(email, String);
        const ret = Accounts.createUser({
            username: username,
            password: password,
        });

        const userData = UsersCollection.insert({
            nome,
            email,
            dataNascimento,
            sexo,
            empresa,
            foto,
            userId: ret
        })
        return userData;
    },

    'users.update'(id, nome, email, dataNascimento, sexo, empresa, foto) {
          if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
          }
        UsersCollection.update(id, {
          $set: {
            nome,
            email,
            dataNascimento,
            sexo,
            empresa,
            foto,
          },
        });
      },

    'users.byUserId'(id) {
        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
        }
        return UsersCollection.findOne({userId:id});
    },


})