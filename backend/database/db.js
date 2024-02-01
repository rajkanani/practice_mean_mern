var mongoose = require("mongoose");
var config = require('../config/index')
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url).then(
    () => {
      console.log('mongodb connected');
    },
    err => {
      console.log(err);
    }
);
var glob = require("glob"),
  path = require("path");
glob.sync("./database/models/*").forEach(function (file) {
  require(path.resolve(file));
});
