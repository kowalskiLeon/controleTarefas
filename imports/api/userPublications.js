import { Meteor } from 'meteor/meteor';
import UserCollections from '/imports/db/UserCollections'

Meteor.publish('userDatas', function publishTasks() {
  return UserCollections.find();
});
