const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id = '5b57f41e2bf03c2dced51774';

// if (!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }

// Todo.find({
//    _id: id 
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id 
// }).then((todo) => {
//     console.log('Todo', todo);
// });

//  Todo.findById(id).then((todo) => {
//      if (!todo) {
//          return console.log('Id not found');
//      }
//     console.log('Todo by Id', todo);
// }).catch((e) => consolelog(e));

User.findById('5b56df4b2600fe26ab6f07899').then((user) => {
    if (!user) {
        return console.log('Unable to find user');
    }
    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e);
});