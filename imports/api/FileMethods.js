import fs from 'fs';

Meteor.methods({
    saveFile: function(blob, name){
      fs.writeFile(name, blob, function (err) {
          if (err) {
              throw (new Meteor.Error(500, 'Failed to save file.', err));
          } else {
              //console.log('Filesaved');
          }
      });
  }
})