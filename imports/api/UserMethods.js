import { check } from 'meteor/check';
import { UserCollections } from '/imports/db/UserCollections';
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

        const userData = UserCollections.insert({
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

})