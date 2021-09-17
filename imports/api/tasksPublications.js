import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

Meteor.publish('tasks', function publishTasks() {
  return TasksCollection.find();
});

Meteor.publish('filterTasks', function publishTasksWithTasks(filter, maxPerPage, pulo) {
  return TasksCollection.find(filter,
    {
      limit: maxPerPage,
      skip: pulo
    });
});

Meteor.publish('findById', function publishTasksWithTasks(id) {
  return TasksCollection.find({
    _id: id
  })
});


