(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterActions = function () {
  function FooterActions() {
    _classCallCheck(this, FooterActions);

    this.generateActions('getTopCharactersSuccess', 'getTopCharactersFail');
  }

  _createClass(FooterActions, [{
    key: 'getTopCharacters',
    value: function getTopCharacters() {
      // $.ajax({ url: '/api/characters/top' })
      //   .done((data) => {
      //     this.actions.getTopCharactersSuccess(data)
      //   })
      //   .fail((jqXhr) => {
      //     this.actions.getTopCharactersFail(jqXhr)
      //   });
    }
  }]);

  return FooterActions;
}();

exports.default = _alt2.default.createActions(FooterActions);

},{"../alt":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarActions = function () {
  function NavbarActions() {
    _classCallCheck(this, NavbarActions);

    this.generateActions('updateOnlineUsers', 'updateAjaxAnimation', 'updateSearchQuery', 'getCharacterCountSuccess', 'getCharacterCountFail', 'findCharacterSuccess', 'findCharacterFail', 'updateLoginStatus');
  }

  _createClass(NavbarActions, [{
    key: 'findCharacter',
    value: function findCharacter(payload) {
      var _this = this;

      $.ajax({
        url: '/api/characters/search',
        data: { name: payload.searchQuery }
      }).done(function (data) {
        (0, _underscore.assign)(payload, data);
        _this.actions.findCharacterSuccess(payload);
      }).fail(function () {
        _this.actions.findCharacterFail(payload);
      });
    }
  }, {
    key: 'getCharacterCount',
    value: function getCharacterCount() {
      var _this2 = this;

      $.ajax({ url: '/api/characters/count' }).done(function (data) {
        _this2.actions.getCharacterCountSuccess(data);
      }).fail(function (jqXhr) {
        _this2.actions.getCharacterCountFail(jqXhr);
      });
    }
  }, {
    key: 'checkLogin',
    value: function checkLogin() {
      var _this3 = this;

      $.ajax({
        url: '/auth/bnet/status'
      }).done(function (data) {
        _this3.updateLoginStatus(data);
        if (data === '') {
          window.location = '/';
        }
      }).fail(function () {
        window.location = '/';
      });
    }
  }, {
    key: 'hardLogout',
    value: function hardLogout() {
      $.ajax({
        url: 'eu.battle.net/en/?logout'
      }).done(function () {
        window.location = '/auth/bnet/logout';
      }).fail(function () {
        window.location = '/';
      });
    }
  }]);

  return NavbarActions;
}();

exports.default = _alt2.default.createActions(NavbarActions);

},{"../alt":11,"underscore":"underscore"}],3:[function(require,module,exports){
"use strict";

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _ViewRostersActions = require('./ViewRostersActions');

var _ViewRostersActions2 = _interopRequireDefault(_ViewRostersActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddRosterActions = function () {
  function AddRosterActions() {
    _classCallCheck(this, AddRosterActions);

    this.generateActions('updateRosterName', 'addRosterSuccess', 'addRosterFailure');
  }

  _createClass(AddRosterActions, [{
    key: 'addRoster',
    value: function addRoster(rosterName) {
      var _this = this;

      $.ajax({
        method: 'POST',
        url: '/api/admin/roster/add',
        data: { 'name': rosterName }
      }).done(function (data) {
        (0, _underscore.assign)(rosterName, data);
        _this.addRosterSuccess(rosterName);
        _ViewRostersActions2.default.updateRosterList();
      }).fail(function () {
        _this.addRosterFailure();
      });
    }
  }]);

  return AddRosterActions;
}();

exports.default = _alt2.default.createActions(AddRosterActions);

},{"../../alt":11,"./ViewRostersActions":10,"underscore":"underscore"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminActions = function AdminActions() {
  _classCallCheck(this, AdminActions);

  this.generateActions('placeholder');
};

exports.default = _alt2.default.createActions(AdminActions);

},{"../../alt":11}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminSideNavActions = function AdminSideNavActions() {
  _classCallCheck(this, AdminSideNavActions);

  this.generateActions('redirects?');
};

exports.default = _alt2.default.createActions(AdminSideNavActions);

},{"../../alt":11}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterControlPanelActions = function RosterControlPanelActions() {
  _classCallCheck(this, RosterControlPanelActions);

  this.generateActions('updateCharacterClass', 'updateCharacterName', 'updateCharacterRole');
};

exports.default = _alt2.default.createActions(RosterControlPanelActions);

},{"../../alt":11}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterManagementActions = function RosterManagementActions() {
  _classCallCheck(this, RosterManagementActions);

  this.generateActions('placeholder');
};

exports.default = _alt2.default.createActions(RosterManagementActions);

},{"../../alt":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _ViewRostersStore = require('../../stores/admin/ViewRostersStore');

var _ViewRostersStore2 = _interopRequireDefault(_ViewRostersStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterViewActions = function () {
  function RosterViewActions() {
    _classCallCheck(this, RosterViewActions);

    this.generateActions('populateRosterListSuccess', 'populateRosterListFailure');
  }

  _createClass(RosterViewActions, [{
    key: 'populateRosterList',
    value: function populateRosterList(value) {
      var _this = this;

      $.ajax({
        method: 'POST',
        url: '/api/admin/roster/',
        data: { 'name': value }
      }).done(function (data) {
        _this.populateRosterListSuccess(data);
      }).fail(function () {
        _this.populateRosterListFailure();
      });
    }
  }]);

  return RosterViewActions;
}();

exports.default = _alt2.default.createActions(RosterViewActions);

},{"../../alt":11,"../../stores/admin/ViewRostersStore":35,"underscore":"underscore"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import RosterViewActions from './RosterViewActions';

var ViewRostersActions = function () {
  function ViewRostersActions() {
    _classCallCheck(this, ViewRostersActions);

    this.generateActions('updateRosterListSuccess', 'updateRosterListFailure', 'updateCurrentRoster', 'updateCurrentRosterRaw');
  }

  _createClass(ViewRostersActions, [{
    key: 'updateRosterList',
    value: function updateRosterList() {
      var _this = this;

      $.ajax({
        url: '/api/admin/roster/'
      }).done(function (data) {
        _this.updateRosterListSuccess(data);
        _this.updateCurrentRosterRaw(data[0].name);
      }).fail(function (jqXhr) {
        _this.updateRosterListFailure(jqXhr);
      });
    }
  }]);

  return ViewRostersActions;
}();

exports.default = _alt2.default.createActions(ViewRostersActions);

},{"../../alt":11}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Footer = require('./Footer');

var _Footer2 = _interopRequireDefault(_Footer);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Navbar2.default, { history: this.props.history }),
        this.props.children,
        _react2.default.createElement(_Footer2.default, null)
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;

},{"./Footer":13,"./Navbar":15,"react":"react"}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _FooterStore = require('../stores/FooterStore');

var _FooterStore2 = _interopRequireDefault(_FooterStore);

var _FooterActions = require('../actions/FooterActions');

var _FooterActions2 = _interopRequireDefault(_FooterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Footer = function (_React$Component) {
  _inherits(Footer, _React$Component);

  function Footer(props) {
    _classCallCheck(this, Footer);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).call(this, props));

    _this.state = _FooterStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Footer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _FooterStore2.default.listen(this.onChange);
      _FooterActions2.default.getTopCharacters();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _FooterStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var admins = this.state.admins.map(function (name) {
        return _react2.default.createElement(
          'li',
          { key: name },
          name
        );
      });

      return _react2.default.createElement(
        'footer',
        null,
        _react2.default.createElement(
          'div',
          { className: 'container' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-sm-5' },
              _react2.default.createElement(
                'h2',
                { className: 'lead' },
                _react2.default.createElement(
                  'strong',
                  null,
                  'Darkstorm'
                )
              ),
              _react2.default.createElement(
                'p',
                null,
                'Scheduling application for a World of Warcraft raiding guild.'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-7 hidden-xs' },
              _react2.default.createElement(
                'h2',
                { className: 'lead' },
                _react2.default.createElement(
                  'strong',
                  null,
                  'Admins'
                )
              ),
              _react2.default.createElement(
                'ul',
                { className: 'list-inline' },
                admins
              )
            )
          )
        )
      );
    }
  }]);

  return Footer;
}(_react2.default.Component);

exports.default = Footer;

},{"../actions/FooterActions":1,"../stores/FooterStore":26,"react":"react","react-router":"react-router"}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home() {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
  }

  _createClass(Home, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'alert alert-info' },
        'Hello from Home Component'
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

},{"react":"react"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _NavbarActions = require('../actions/NavbarActions');

var _NavbarActions2 = _interopRequireDefault(_NavbarActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Navbar).call(this, props));

    _this.state = _NavbarStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Navbar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _NavbarStore2.default.listen(this.onChange);
      //NavbarActions.getCharacterCount();

      var socket = io.connect();

      socket.on('onlineUsers', function (data) {
        _NavbarActions2.default.updateOnlineUsers(data);
      });

      $(document).ajaxStart(function () {
        _NavbarActions2.default.updateAjaxAnimation('fadeIn');
      });

      $(document).ajaxComplete(function () {
        setTimeout(function () {
          _NavbarActions2.default.updateAjaxAnimation('fadeOut');
        }, 750);
      });

      _NavbarActions2.default.checkLogin();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _NavbarStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();

      var searchQuery = this.state.searchQuery.trim();

      if (searchQuery) {
        _NavbarActions2.default.findCharacter({
          searchQuery: searchQuery,
          searchForm: this.refs.searchForm,
          history: this.props.history
        });
      }
    }
  }, {
    key: 'handleLoginSubmit',
    value: function handleLoginSubmit(event) {}
  }, {
    key: 'registerRedirect',
    value: function registerRedirect() {
      window.location = '/';
    }
  }, {
    key: 'bnetAuth',
    value: function bnetAuth() {
      window.location = '/auth/bnet';
    }
  }, {
    key: 'logout',
    value: function logout() {
      window.location = '/auth/bnet/logout';
    }
  }, {
    key: 'hardLogout',
    value: function hardLogout() {
      _NavbarActions2.default.hardLogout();
    }
  }, {
    key: 'render',
    value: function render() {
      var profilePane;

      if (this.state.battleNetTag === '') {
        profilePane = _react2.default.createElement(
          'div',
          { className: 'navbar-form' },
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default', onClick: this.bnetAuth },
              'Login'
            )
          )
        );
      } else {
        profilePane = _react2.default.createElement(
          'div',
          { className: 'navbar-form' },
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            _react2.default.createElement(
              'label',
              null,
              'Welcome ',
              this.state.battleNetTag
            ),
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default', onClick: this.logout },
              'Logout'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'input-group' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-default', onClick: this.hardLogout },
              'Hard Logout'
            )
          )
        );
      }

      return _react2.default.createElement(
        'nav',
        { className: 'navbar navbar-default navbar-static-top' },
        _react2.default.createElement(
          'div',
          { className: 'navbar-header' },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar' },
            _react2.default.createElement(
              'span',
              { className: 'sr-only' },
              'Toggle navigation'
            ),
            _react2.default.createElement('span', { className: 'icon-bar' }),
            _react2.default.createElement('span', { className: 'icon-bar' }),
            _react2.default.createElement('span', { className: 'icon-bar' })
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: 'navbar-brand' },
            _react2.default.createElement(
              'span',
              { ref: 'triangles', className: 'triangles animated ' + this.state.ajaxAnimationClass },
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri' }),
              _react2.default.createElement('div', { className: 'tri invert' }),
              _react2.default.createElement('div', { className: 'tri' }),
              _react2.default.createElement('div', { className: 'tri invert' })
            ),
            'Darkstorm Schedule',
            _react2.default.createElement(
              'span',
              { className: 'badge badge-up badge-danger' },
              this.state.onlineUsers
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'navbar', className: 'navbar-collapse collapse' },
          _react2.default.createElement(
            'ul',
            { className: 'nav navbar-nav' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/' },
                'Home'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/stats' },
                'Roster'
              )
            ),
            _react2.default.createElement(
              'li',
              { className: 'dropdown' },
              _react2.default.createElement(
                'a',
                { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
                'Sections',
                _react2.default.createElement('span', { className: 'caret' })
              ),
              _react2.default.createElement(
                'ul',
                { className: 'dropdown-menu' },
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/DPS' },
                    'DPS'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/Tank' },
                    'Tank'
                  )
                ),
                _react2.default.createElement(
                  'li',
                  null,
                  _react2.default.createElement(
                    _reactRouter.Link,
                    { to: '/Healer' },
                    'Healer'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/admin' },
                'Admin'
              )
            )
          ),
          profilePane
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;

},{"../actions/NavbarActions":2,"../stores/NavbarStore":27,"react":"react","react-router":"react-router"}],16:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RegisterActions = require('../actions/RegisterActions');

var _RegisterActions2 = _interopRequireDefault(_RegisterActions);

var _RegisterStore = require('../stores/RegisterStore');

var _RegisterStore2 = _interopRequireDefault(_RegisterStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"../actions/RegisterActions":3,"../stores/RegisterStore":28,"react":"react","react-router":"react-router"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _AddRosterStore = require('../../stores/admin/AddRosterStore');

var _AddRosterStore2 = _interopRequireDefault(_AddRosterStore);

var _AddRosterActions = require('../../actions/admin/AddRosterActions');

var _AddRosterActions2 = _interopRequireDefault(_AddRosterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddRoster = function (_React$Component) {
  _inherits(AddRoster, _React$Component);

  function AddRoster(props) {
    _classCallCheck(this, AddRoster);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AddRoster).call(this, props));

    _this.state = _AddRosterStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(AddRoster, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _AddRosterStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _AddRosterStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      e.preventDefault();

      var rosterName = this.state.rosterName.trim();

      if (rosterName) {
        _AddRosterActions2.default.addRoster(rosterName);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'col-md-6' },
        _react2.default.createElement(
          'h3',
          null,
          'Add New Roster'
        ),
        _react2.default.createElement(
          'form',
          { className: 'form-horizontal', onSubmit: this.handleSubmit.bind(this) },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'col-sm-2 control-label', htmlFor: 'rosterName' },
              'Name'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'rosterName', placeholder: 'Main Raid, Alt Raid etc...', value: this.state.rosterName, onChange: _AddRosterActions2.default.updateRosterName })
            )
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default pull-right' },
            'Submit'
          )
        )
      );
    }
  }]);

  return AddRoster;
}(_react2.default.Component);

exports.default = AddRoster;

},{"../../actions/admin/AddRosterActions":4,"../../stores/admin/AddRosterStore":29,"react":"react","react-router":"react-router"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _AdminStore = require('../../stores/admin/AdminStore');

var _AdminStore2 = _interopRequireDefault(_AdminStore);

var _AdminActions = require('../../actions/admin/AdminActions');

var _AdminActions2 = _interopRequireDefault(_AdminActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Admin = function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin(props) {
    _classCallCheck(this, Admin);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Admin).call(this, props));

    _this.state = _AdminStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Admin, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _AdminStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _AdminStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_AdminSideNav2.default, null)
      );
    }
  }]);

  return Admin;
}(_react2.default.Component);

exports.default = Admin;

},{"../../actions/admin/AdminActions":5,"../../stores/admin/AdminStore":31,"./AdminSideNav":19,"react":"react","react-router":"react-router"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _AdminSideNavStore = require('../../stores/admin/AdminSideNavStore');

var _AdminSideNavStore2 = _interopRequireDefault(_AdminSideNavStore);

var _AdminSideNavActions = require('../../actions/admin/AdminSideNavActions');

var _AdminSideNavActions2 = _interopRequireDefault(_AdminSideNavActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AdminSideNav = function (_React$Component) {
  _inherits(AdminSideNav, _React$Component);

  function AdminSideNav(props) {
    _classCallCheck(this, AdminSideNav);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AdminSideNav).call(this, props));

    _this.state = _AdminSideNavStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(AdminSideNav, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _AdminSideNavStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _AdminSideNavStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'col-md-2 sidebar' },
        _react2.default.createElement(
          'ul',
          { className: 'nav' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/roster' },
              'Roster'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/schedule' },
              'Schedule'
            )
          )
        )
      );
    }
  }]);

  return AdminSideNav;
}(_react2.default.Component);

exports.default = AdminSideNav;

},{"../../actions/admin/AdminSideNavActions":6,"../../stores/admin/AdminSideNavStore":30,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RosterControlPanelStore = require('../../stores/admin/RosterControlPanelStore');

var _RosterControlPanelStore2 = _interopRequireDefault(_RosterControlPanelStore);

var _RosterControlPanelActions = require('../../actions/admin/RosterControlPanelActions');

var _RosterControlPanelActions2 = _interopRequireDefault(_RosterControlPanelActions);

var _ViewRostersStore = require('../../stores/admin/ViewRostersStore');

var _ViewRostersStore2 = _interopRequireDefault(_ViewRostersStore);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import Autosize from 'Autosize';
// import Autocomplete from 'Autocomplete';
// import Combobox from 'Combobox';
// import Mask from 'Mask';
// import DatePicker from 'DatePicker';

var RosterControlPanel = function (_React$Component) {
  _inherits(RosterControlPanel, _React$Component);

  function RosterControlPanel(props) {
    _classCallCheck(this, RosterControlPanel);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RosterControlPanel).call(this, props));

    _this.state = _RosterControlPanelStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RosterControlPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _RosterControlPanelStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _RosterControlPanelStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleAddCharacterSubmit',
    value: function handleAddCharacterSubmit(e) {
      e.preventDefault();
      var currentRoster = _ViewRostersStore2.default.getState().currentRoster;

      _RosterControlPanelActions2.default.addCharacterToRoster(currentRoster, this.state.addCharacter_Name, this.state.addCharacter_Class, this.state.addCharacter);
    }
  }, {
    key: 'currentClassColour',
    value: function currentClassColour() {
      var currentClass = this.state.addCharacter_Class;
      var arr = currentClass.split(" ");

      var ret = '';
      for (var i = 0; i < arr.length; ++i) {
        ret += arr[i].toLowerCase();
        ret += '-';
      }

      ret += 'color';
      return ret;
    }
  }, {
    key: 'render',
    value: function render() {
      var classColour = this.currentClassColour();
      var classColourClasses = (0, _classnames2.default)(classColour, { 'col-sm-2': true });

      return _react2.default.createElement(
        'div',
        { className: 'col-md-6' },
        _react2.default.createElement(
          'h3',
          null,
          'Add Character To Roster'
        ),
        _react2.default.createElement(
          'form',
          { className: 'form-horizontal', onSubmit: this.handleAddCharacterSubmit.bind(this) },
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'col-sm-2 control-label', htmlFor: 'characterName' },
              'Name'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'characterName', name: 'characterName', value: this.state.addCharacter_Name, onChange: _RosterControlPanelActions2.default.updateCharacterName })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'col-sm-2 control-label', htmlFor: 'characterClass' },
              'Class'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-7' },
              _react2.default.createElement(
                'select',
                { className: 'form-control', id: 'characterClass', value: this.state.addCharacter_Class, onChange: _RosterControlPanelActions2.default.updateCharacterClass },
                _react2.default.createElement(
                  'option',
                  { value: 'Death Knight' },
                  'Death Knight'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Demon Hunter' },
                  'Demon Hunter'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Druid' },
                  'Druid'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Hunter' },
                  'Hunter'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Mage' },
                  'Mage'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Monk' },
                  'Monk'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Paladin' },
                  'Paladin'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Priest' },
                  'Priest'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Rogue' },
                  'Rogue'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Shaman' },
                  'Shaman'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Warlock' },
                  'Warlock'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Warrior' },
                  'Warrior'
                )
              )
            ),
            _react2.default.createElement('div', { className: classColourClasses })
          ),
          _react2.default.createElement(
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'col-sm-2 control-label', htmlFor: 'characterRole' },
              'Role'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement(
                'select',
                { className: 'form-control', id: 'characterRole', value: this.state.addCharacter_Role, onChange: _RosterControlPanelActions2.default.updateCharacterRole },
                _react2.default.createElement(
                  'option',
                  { value: 'Tank' },
                  'Tank'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'DPS' },
                  'DPS'
                ),
                _react2.default.createElement(
                  'option',
                  { value: 'Healer' },
                  'Healer'
                )
              )
            )
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default pull-right' },
            'Submit'
          )
        )
      );
    }
  }]);

  return RosterControlPanel;
}(_react2.default.Component);

exports.default = RosterControlPanel;

},{"../../actions/admin/RosterControlPanelActions":7,"../../stores/admin/RosterControlPanelStore":32,"../../stores/admin/ViewRostersStore":35,"classnames":36,"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RosterManagementStore = require('../../stores/admin/RosterManagementStore');

var _RosterManagementStore2 = _interopRequireDefault(_RosterManagementStore);

var _RosterManagementActions = require('../../actions/admin/RosterManagementActions');

var _RosterManagementActions2 = _interopRequireDefault(_RosterManagementActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

var _AddRoster = require('./AddRoster');

var _AddRoster2 = _interopRequireDefault(_AddRoster);

var _ViewRosters = require('./ViewRosters');

var _ViewRosters2 = _interopRequireDefault(_ViewRosters);

var _RosterView = require('./RosterView');

var _RosterView2 = _interopRequireDefault(_RosterView);

var _RosterControlPanel = require('./RosterControlPanel');

var _RosterControlPanel2 = _interopRequireDefault(_RosterControlPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RosterManagement = function (_React$Component) {
  _inherits(RosterManagement, _React$Component);

  function RosterManagement(props) {
    _classCallCheck(this, RosterManagement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RosterManagement).call(this, props));

    _this.state = _RosterManagementStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RosterManagement, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _RosterManagementStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _RosterManagementStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(_AdminSideNav2.default, null),
        _react2.default.createElement(
          'div',
          { className: 'col-md-8' },
          _react2.default.createElement(_ViewRosters2.default, null),
          _react2.default.createElement(_AddRoster2.default, null),
          _react2.default.createElement(_RosterView2.default, null),
          _react2.default.createElement(_RosterControlPanel2.default, null)
        )
      );
    }
  }]);

  return RosterManagement;
}(_react2.default.Component);

exports.default = RosterManagement;

},{"../../actions/admin/RosterManagementActions":8,"../../stores/admin/RosterManagementStore":33,"./AddRoster":17,"./AdminSideNav":19,"./RosterControlPanel":20,"./RosterView":22,"./ViewRosters":23,"react":"react","react-router":"react-router"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RosterViewStore = require('../../stores/admin/RosterViewStore');

var _RosterViewStore2 = _interopRequireDefault(_RosterViewStore);

var _RosterViewActions = require('../../actions/admin/RosterViewActions');

var _RosterViewActions2 = _interopRequireDefault(_RosterViewActions);

var _ViewRostersStore = require('../../stores/admin/ViewRostersStore');

var _ViewRostersStore2 = _interopRequireDefault(_ViewRostersStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RosterView = function (_React$Component) {
  _inherits(RosterView, _React$Component);

  function RosterView(props) {
    _classCallCheck(this, RosterView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RosterView).call(this, props));

    _this.state = _RosterViewStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RosterView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _RosterViewStore2.default.listen(this.onChange);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _RosterViewStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'col-md-6' },
        _react2.default.createElement(
          'h1',
          null,
          this.state.rosterName
        )
      );
    }
  }]);

  return RosterView;
}(_react2.default.Component);

exports.default = RosterView;

},{"../../actions/admin/RosterViewActions":9,"../../stores/admin/RosterViewStore":34,"../../stores/admin/ViewRostersStore":35,"react":"react","react-router":"react-router"}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ViewRostersStore = require('../../stores/admin/ViewRostersStore');

var _ViewRostersStore2 = _interopRequireDefault(_ViewRostersStore);

var _ViewRostersActions = require('../../actions/admin/ViewRostersActions');

var _ViewRostersActions2 = _interopRequireDefault(_ViewRostersActions);

var _RosterViewActions = require('../../actions/admin/RosterViewActions');

var _RosterViewActions2 = _interopRequireDefault(_RosterViewActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewRosters = function (_React$Component) {
  _inherits(ViewRosters, _React$Component);

  function ViewRosters(props) {
    _classCallCheck(this, ViewRosters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ViewRosters).call(this, props));

    _this.state = _ViewRostersStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ViewRosters, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ViewRostersStore2.default.listen(this.onChange);
      _ViewRostersActions2.default.updateRosterList();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ViewRostersStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'handleCurrentRosterChange',
    value: function handleCurrentRosterChange(e) {
      _ViewRostersActions2.default.updateCurrentRoster(e.target.value);
      _RosterViewActions2.default.populateRosterList(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      var rosterListCopy = this.state.rosterList;
      var arr = Object.keys(rosterListCopy).map(function (i) {
        return rosterListCopy[i];
      });

      var list = arr.map(function (roster) {
        return _react2.default.createElement(
          'option',
          { key: roster._id, value: roster.name },
          roster.name
        );
      });

      return _react2.default.createElement(
        'div',
        { className: 'col-md-6 form-horizontal' },
        _react2.default.createElement(
          'h3',
          null,
          'View Roster'
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-group' },
          _react2.default.createElement(
            'label',
            { className: 'col-sm-2 control-label', htmlFor: 'rosterList' },
            'Rosters'
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-sm-6' },
            _react2.default.createElement(
              'select',
              { name: 'rosterList', className: 'form-control', value: this.state.currentRoster, onChange: this.handleCurrentRosterChange },
              list
            )
          ),
          _react2.default.createElement(
            'button',
            { type: 'submit', className: 'btn btn-default' },
            'DELETE'
          )
        )
      );
    }
  }]);

  return ViewRosters;
}(_react2.default.Component);

exports.default = ViewRosters;

},{"../../actions/admin/RosterViewActions":9,"../../actions/admin/ViewRostersActions":10,"../../stores/admin/ViewRostersStore":35,"react":"react","react-router":"react-router"}],24:[function(require,module,exports){
'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//let history = createBrowserHistory();

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _routes2.default
), document.getElementById('app'));
//import createBrowserHistory from 'history/lib/createBrowserHistory';

//var Router = require('react-router').Router

},{"./routes":25,"react":"react","react-dom":"react-dom","react-router":"react-router"}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./components/App');

var _App2 = _interopRequireDefault(_App);

var _Home = require('./components/Home');

var _Home2 = _interopRequireDefault(_Home);

var _Admin = require('./components/admin/Admin');

var _Admin2 = _interopRequireDefault(_Admin);

var _RosterManagement = require('./components/admin/RosterManagement');

var _RosterManagement2 = _interopRequireDefault(_RosterManagement);

var _Register = require('./components/Register');

var _Register2 = _interopRequireDefault(_Register);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/register', component: _Register2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _Admin2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/roster', component: _RosterManagement2.default })
);

},{"./components/App":12,"./components/Home":14,"./components/Register":16,"./components/admin/Admin":18,"./components/admin/RosterManagement":21,"react":"react","react-router":"react-router"}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _FooterActions = require('../actions/FooterActions');

var _FooterActions2 = _interopRequireDefault(_FooterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterStore = function () {
  function FooterStore() {
    _classCallCheck(this, FooterStore);

    this.bindActions(_FooterActions2.default);
    this.characters = [];
    this.admins = ['Aeristial', 'Derp', 'Macio', 'Trallas', 'Xenorie'];
  }

  _createClass(FooterStore, [{
    key: 'onGetTopCharactersSuccess',
    value: function onGetTopCharactersSuccess(data) {
      this.characters = data.slice(0, 5);
    }
  }, {
    key: 'onGetTopCharactersFail',
    value: function onGetTopCharactersFail(jqXhr) {
      // Handle multiple response formats, fallback to HTTP status code number.
      toastr.error(jqXhr.responseJSON && jqXhr.responseJSON.message || jqXhr.responseText || jqXhr.statusText);
    }
  }]);

  return FooterStore;
}();

exports.default = _alt2.default.createStore(FooterStore);

},{"../actions/FooterActions":1,"../alt":11}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _NavbarActions = require('../actions/NavbarActions');

var _NavbarActions2 = _interopRequireDefault(_NavbarActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarStore = function () {
  function NavbarStore() {
    _classCallCheck(this, NavbarStore);

    this.bindActions(_NavbarActions2.default);
    this.totalCharacters = 0;
    this.onlineUsers = 0;
    this.searchQuery = '';
    this.ajaxAnimationClass = '';
    this.battleNetTag = '';
  }

  _createClass(NavbarStore, [{
    key: 'onFindCharacterSuccess',
    value: function onFindCharacterSuccess(payload) {
      payload.history.pushState(null, '/characters/' + payload.characterId);
    }
  }, {
    key: 'onFindCharacterFail',
    value: function onFindCharacterFail(payload) {
      payload.searchForm.classList.add('shake');
      setTimeout(function () {
        payload.searchForm.classList.remove('shake');
      }, 1000);
    }
  }, {
    key: 'onUpdateOnlineUsers',
    value: function onUpdateOnlineUsers(data) {
      this.onlineUsers = data.onlineUsers;
    }
  }, {
    key: 'onUpdateAjaxAnimation',
    value: function onUpdateAjaxAnimation(className) {
      this.ajaxAnimationClass = className; //fadein or fadeout
    }
  }, {
    key: 'onUpdateSearchQuery',
    value: function onUpdateSearchQuery(event) {
      this.searchQuery = event.target.value;
    }
  }, {
    key: 'onGetCharacterCountSuccess',
    value: function onGetCharacterCountSuccess(data) {
      this.totalCharacters = data.count;
    }
  }, {
    key: 'onGetCharacterCountFail',
    value: function onGetCharacterCountFail(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUpdateLoginStatus',
    value: function onUpdateLoginStatus(data) {
      this.battleNetTag = data;
    }
  }]);

  return NavbarStore;
}();

exports.default = _alt2.default.createStore(NavbarStore);

},{"../actions/NavbarActions":2,"../alt":11}],28:[function(require,module,exports){
"use strict";

},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _AddRosterActions = require('../../actions/admin/AddRosterActions');

var _AddRosterActions2 = _interopRequireDefault(_AddRosterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddRosterStore = function () {
  function AddRosterStore() {
    _classCallCheck(this, AddRosterStore);

    this.bindActions(_AddRosterActions2.default);
    this.rosterName = '';
    this.addRosterResultMessage = '';
  }

  _createClass(AddRosterStore, [{
    key: 'onUpdateRosterName',
    value: function onUpdateRosterName(e) {
      this.rosterName = e.target.value;
    }
  }, {
    key: 'onAddRosterSuccess',
    value: function onAddRosterSuccess(rosterName) {
      this.addRosterResultMessage = rosterName + ' has successfully been added';
    }
  }, {
    key: 'onAddRosterFailure',
    value: function onAddRosterFailure() {
      this.addRosterResultMessage = 'Unable to add roster';
    }
  }]);

  return AddRosterStore;
}();

exports.default = _alt2.default.createStore(AddRosterStore);

},{"../../actions/admin/AddRosterActions":4,"../../alt":11}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _AdminSideNavActions = require('../../actions/admin/AdminSideNavActions');

var _AdminSideNavActions2 = _interopRequireDefault(_AdminSideNavActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminSideNavStore = function AdminSideNavStore() {
  _classCallCheck(this, AdminSideNavStore);

  this.bindActions(_AdminSideNavActions2.default);
};

exports.default = _alt2.default.createStore(AdminSideNavStore);

},{"../../actions/admin/AdminSideNavActions":6,"../../alt":11}],31:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _AdminActions = require('../../actions/admin/AdminActions');

var _AdminActions2 = _interopRequireDefault(_AdminActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminStore = function AdminStore() {
  _classCallCheck(this, AdminStore);

  this.bindActions(_AdminActions2.default);
};

exports.default = _alt2.default.createStore(AdminStore);

},{"../../actions/admin/AdminActions":5,"../../alt":11}],32:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _RosterControlPanelActions = require('../../actions/admin/RosterControlPanelActions');

var _RosterControlPanelActions2 = _interopRequireDefault(_RosterControlPanelActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterControlPanelStore = function () {
  function RosterControlPanelStore() {
    _classCallCheck(this, RosterControlPanelStore);

    this.bindActions(_RosterControlPanelActions2.default);
    this.addCharacter_Name = '';
    this.addCharacter_Class = 'Death Knight';
    this.addCharacter_Role = 'Tank';
  }

  _createClass(RosterControlPanelStore, [{
    key: 'onUpdateCharacterName',
    value: function onUpdateCharacterName(e) {
      this.addCharacter_Name = e.target.value;
    }
  }, {
    key: 'onUpdateCharacterClass',
    value: function onUpdateCharacterClass(e) {
      this.addCharacter_Class = e.target.value;
    }
  }, {
    key: 'onUpdateCharacterRole',
    value: function onUpdateCharacterRole(e) {
      this.addCharacter_Role = e.target.value;
    }
  }]);

  return RosterControlPanelStore;
}();

exports.default = _alt2.default.createStore(RosterControlPanelStore);

},{"../../actions/admin/RosterControlPanelActions":7,"../../alt":11}],33:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _RosterManagementActions = require('../../actions/admin/RosterManagementActions');

var _RosterManagementActions2 = _interopRequireDefault(_RosterManagementActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterManagementStore = function RosterManagementStore() {
  _classCallCheck(this, RosterManagementStore);

  this.bindActions(_RosterManagementActions2.default);
};

exports.default = _alt2.default.createStore(RosterManagementStore);

},{"../../actions/admin/RosterManagementActions":8,"../../alt":11}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _RosterViewActions = require('../../actions/admin/RosterViewActions');

var _RosterViewActions2 = _interopRequireDefault(_RosterViewActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterViewStore = function () {
  function RosterViewStore() {
    _classCallCheck(this, RosterViewStore);

    this.bindActions(_RosterViewActions2.default);
    this.roster = {};
  }

  _createClass(RosterViewStore, [{
    key: 'onPopulateRosterListSuccess',
    value: function onPopulateRosterListSuccess(data) {
      this.roster = data;
    }
  }, {
    key: 'onPopulateRosterListFailure',
    value: function onPopulateRosterListFailure() {}
  }]);

  return RosterViewStore;
}();

exports.default = _alt2.default.createStore(RosterViewStore);

},{"../../actions/admin/RosterViewActions":9,"../../alt":11}],35:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ViewRostersActions = require('../../actions/admin/ViewRostersActions');

var _ViewRostersActions2 = _interopRequireDefault(_ViewRostersActions);

var _RosterViewActions = require('../../actions/admin/RosterViewActions');

var _RosterViewActions2 = _interopRequireDefault(_RosterViewActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewRostersStore = function () {
  function ViewRostersStore() {
    _classCallCheck(this, ViewRostersStore);

    this.bindActions(_ViewRostersActions2.default);
    this.rosterList = {};
    this.currentRoster = '';
  }

  _createClass(ViewRostersStore, [{
    key: 'onUpdateCurrentRoster',
    value: function onUpdateCurrentRoster(e) {
      this.currentRoster = e;
    }
  }, {
    key: 'onUpdateCurrentRosterRaw',
    value: function onUpdateCurrentRosterRaw(name) {
      this.currentRoster = name;
    }
  }, {
    key: 'onUpdateRosterListSuccess',
    value: function onUpdateRosterListSuccess(data) {
      this.rosterList = data;
    }
  }, {
    key: 'onUpdateRosterListFailure',
    value: function onUpdateRosterListFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return ViewRostersStore;
}();

exports.default = _alt2.default.createStore(ViewRostersStore);

},{"../../actions/admin/RosterViewActions":9,"../../actions/admin/ViewRostersActions":10,"../../alt":11}],36:[function(require,module,exports){
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());

},{}]},{},[24])


//# sourceMappingURL=bundle.js.map
