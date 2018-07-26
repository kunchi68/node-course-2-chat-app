const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove
// Todo.findByIdAndRemove
Todo.findOneAndRemove({_id: '5b5943cac3acc6a84fe4472f'}).then((todo) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5b5943cac3acc6a84fe4472f').then((todo) => {
    console.log(todo);
});