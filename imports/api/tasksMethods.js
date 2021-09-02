import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.methods({
  'tasks.insert'(text, descricao, data, userID) {
    check(text, String);
    check(descricao, String);
    if (!userID) {
      userID = this.userID;
      if (!userID) {
        throw new Meteor.Error('Not authorized.');
      }
    }

    TasksCollection.insert({
      text,
      descricao,
      data,
      createdAt: new Date(),
      userId: userId,
    });
  },

  'tasks.update'(id, text, descricao, data, userID) {
    check(text, String);

    if (!userID) {
      userID == this.userID;
      if (!userID) {
        throw new Meteor.Error('Not authorized.');
      }
    }

    TasksCollection.update(id, {
      $set: {
        text,
        descricao,
        data,
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
