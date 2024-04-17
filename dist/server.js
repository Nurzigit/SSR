"use strict";

var _express = _interopRequireDefault(require("express"));
var _react = _interopRequireDefault(require("react"));
var _server = _interopRequireDefault(require("react-dom/server"));
var _App = _interopRequireDefault(require("./App"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var app = (0, _express["default"])();
app.use(_express["default"].json());
var users = [{
  id: 1,
  name: 'John Doe'
}, {
  id: 2,
  name: 'Jane Doe'
}];
app.get('/', function (req, res) {
  var content = _server["default"].renderToString( /*#__PURE__*/_react["default"].createElement(_App["default"], null));
  res.send("\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>My SSR App</title>\n      </head>\n      <body>\n        <div id=\"root\">".concat(content, "</div>\n      </body>\n    </html>\n  "));
});

// Получение списка всех пользователей
app.get('/api/users', function (req, res) {
  res.json(users);
});

// Получение пользователя по id
app.get('/api/users/:id', function (req, res) {
  var user = users.find(function (u) {
    return u.id === parseInt(req.params.id);
  });
  if (!user) res.status(404).send('User not found');else res.json(user);
});

// Создание нового пользователя
app.post('/api/users', function (req, res) {
  var user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.status(201).send(user);
});

// Обновление пользователя
app.put('/api/users/:id', function (req, res) {
  var user = users.find(function (u) {
    return u.id === parseInt(req.params.id);
  });
  if (!user) res.status(404).send('User not found');else {
    user.name = req.body.name;
    res.send(user);
  }
});

// Удаление пользователя
app["delete"]('/api/users/:id', function (req, res) {
  users = users.filter(function (u) {
    return u.id !== parseInt(req.params.id);
  });
  res.status(204).send();
});
var PORT = 3000;
app.listen(PORT, function () {
  console.log("Server is listening on port ".concat(PORT));
});