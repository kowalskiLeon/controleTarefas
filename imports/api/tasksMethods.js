import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';
import fs from 'fs';

Meteor.methods({
  'tasks.insert'(text, descricao, data, user, visivel, cadastrada, andamento, concluida, cadastradaPor) {
    check(text, String);
    check(descricao, String);
    if (!user) {
      user = this.userID;
      if (!user) {
        throw new Meteor.Error('Not authorized.');
      }
    }
    const ret = TasksCollection.insert({
      text,
      descricao,
      data,
      visivel,
      cadastrada,
      andamento,
      concluida,
      cadastradaPor,
      createdAt: new Date(),
      userId: user,
    });

    return ret;
  },

  'tasks.update'(id, text, descricao, data, userId, visivel, cadastrada, andamento, concluida) {
    check(text, String);
    console.log(id, text, descricao, data, userId, visivel, cadastrada, andamento, concluida);
    if (!userId) {
      userId == this.userId;
      if (!userId) {
        throw new Meteor.Error('Not authorized.');
      }
    }
    TasksCollection.update(id, {
      $set: {
        text,
        descricao,
        data,
        visivel,
        cadastrada,
        andamento,
        concluida,
        userId
      },
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.remove(taskId);
  },


  'tasks.definirEstado'(taskId, cadastrada, andamento, concluida) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        cadastrada,
        andamento,
        concluida
      },
    });
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });

    if (!task) {
      throw new Meteor.Error('Access denied.');
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },

  'tasks.findAll'() {
    if (!this.userId) {
      throw new Meteor.Error('Not authorized.');
    }
    return TasksCollection.find().fetch();
  },

});
