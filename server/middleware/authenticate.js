var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    //console.log(token);
    User.findByToken(token).then((user) => {
        if (!user) {
            //res.status(401).send();
            return Promise.reject();
        }

        //res.send(user);
        req.user = user;
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send();
    });
};

module.exports = {authenticate};