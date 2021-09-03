import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text, descricao, data, user, visivel, cadastrada, andamento, concluida) {
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
      createdAt: new Date(),
      userId: user,
    });

    return ret;
  },

  'tasks.update'(id, text, descricao, data, userId, visivel, cadastrada, andamento, concluida) {
    check(text, String);

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
});
