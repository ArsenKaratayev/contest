var User = require('../models/user.model');

module.exports.addUser = function (req,res,next) {
    var user = new User({
    	name : req.body.name,
        surname : req.body.surname,
        patronymic : req.body.patronymic,
        gender : req.body.gender,
        photo : req.body.photo,
        position : req.body.position,
        subdivision : req.body.subdivision,
        accesses : req.body.accesses
        // objcts : req.body.objcts
    });

    user.save(function (err) {
        if (err) return next(err);
        res.status(201).json({
            message : "User created"
        });
    });
};

module.exports.updateUserByID = function (req,res,next) {
	var name = req.body.name;
    var surname = req.body.surname;
    var patronymic = req.body.patronymic;
    var gender = req.body.gender;
    var photo = req.body.photo;
    var position = req.body.position;
    var subdivision = req.body.subdivision;
    var accesses = req.body.accesses;
    var userID = req.params.userID;
    User
        .findOne({
            _id : userID
        })
        .exec(function (err,user) {
            if (err) return next(err);
            if (!user) return next({
                message : 'notFound'
            });
            user.name = name;
            user.surname = surname;
            user.patronymic = patronymic;
            user.gender = gender;
            user.photo = photo;
            user.position = position;
            user.subdivision = subdivision;
            user.save(function (err) {
                if (err) return next(err);
                res.status(200).json({
                    message : 'success!'
                });
            });
        });
};

module.exports.getUsers = function (req,res,next) {
    User
        .find({})
        .exec(function (err,users) {
            if (err) return next(err);
            res.status(200).json(users);
        });
};
module.exports.getUserByID = function (req,res,next) {
    User
        .findOne({
            _id : req.params.userID
        })
        .exec(function (err,user) {
            if (err) return next(err);
            res.status(200).json(user);
        });
};
module.exports.deleteUser = function (req,res,next) {
    User
        .findOne({
            _id : req.params.userID
        })
        .remove()
        .exec(function (err) {
            if (err) return next(err);
            res.status(200).json('deleted!');
        });
};
