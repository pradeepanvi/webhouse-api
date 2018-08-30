var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/WebHouseApp');
module.exports = {mongoose};

/*var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
module.exports = {mongoose};
process.env.NODE_ENV = 'development';*/