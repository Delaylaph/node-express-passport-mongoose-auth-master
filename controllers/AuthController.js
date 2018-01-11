var mongoose = require("mongoose");
var passport = require("passport");
const omdb = require('../lib/omdb');
const url = require('url');
var User = require("../models/User");

var userController = {};

// Огранічуєм доступ до корня
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

userController.register = function(req, res) {
  res.render('register');
};
// поіск
userController.search = function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const title = parsedUrl.query.title;

    omdb.get(title, (error, movie) => {
        if (error) {
            return res.render('error', { error: error.message });
        }

        res.render('movie', movie);

    });
};
// регистрация
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

userController.login = function(req, res) {
  res.render('login');
};

// логін
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
