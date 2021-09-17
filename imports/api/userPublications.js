import { Meteor } from 'meteor/meteor';
import { UsersCollection } from '../db/UsersCollection';

Meteor.publish('userDatas', function publishUserDatas() {
  return UsersCollection.find();
});

Meteor.publish('findUserById', function publishUsersWithId(id) {
  return UsersCollection.find({
    userId: id
  })
});