"use strict";

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _serveFavicon = _interopRequireDefault(require("serve-favicon"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _cluster = _interopRequireDefault(require("cluster"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _mongoose_config = _interopRequireDefault(require("./server/config/mongoose_config.js"));

var _logger_config = _interopRequireDefault(require("./server/config/logger_config.js"));

var _express_config = _interopRequireDefault(require("./server/config/express_config.js"));

var _error_handler = _interopRequireDefault(require("./server/config/error_handler.js"));

var _index = _interopRequireDefault(require("./server/main/routes/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var numCPUs = require('os').cpus().length;

var app = (0, _express["default"])();

_dotenv["default"].config(); // /**
//  * [if in development mode, use logger]
//  * @param  {[type]} process.env.APP_ENV [description]
//  * @return {[type]}                     [description]
//  */


if (process.env.APP_ENV === 'development') {
  (0, _logger_config["default"])(app);

  _mongoose["default"].set('debug', true);
} // /**
//  * connnection to database mongodb using mongoose
//  */


(0, _mongoose_config["default"])(_mongoose["default"]); // /**
//  * express default configuration
//  */

app.use(_express["default"]["static"](_path["default"].join(__dirname, 'client/dist')));
app.use((0, _serveFavicon["default"])(_path["default"].join(__dirname, 'client/dist', 'favicon.ico')));
(0, _express_config["default"])(app); // /**
//  * routes API
//  */

app.use('/api', _index["default"]); // /**
//  * send the user to index html page inspite of the url
//  */

app.get('*', function (req, res) {
  res.sendFile(_path["default"].resolve(__dirname, 'client/dist/index.html'));
}); // /**
//  * the default error handler, at the last
//  */

(0, _error_handler["default"])(app);

if (_cluster["default"].isMaster) {
  console.log("Master ".concat(process.pid, " is running")); // Fork workers.

  for (var i = 0; i < numCPUs; i++) {
    _cluster["default"].fork();
  }

  _cluster["default"].on('exit', function (worker, code, signal) {
    console.log("worker ".concat(worker.process.pid, " died"));
  });
} else {
  app.listen(app.get('port'), app.get('host'), function () {
    console.log("Server started at http://".concat(app.get('host'), ":").concat(app.get('port'), "/api"));
  });
  console.log("Worker ".concat(process.pid, " started"));
}