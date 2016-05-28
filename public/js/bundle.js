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

},{"../alt":12}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NavbarActions = function () {
  function NavbarActions() {
    _classCallCheck(this, NavbarActions);

    this.generateActions('updateOnlineUsers', 'updateAjaxAnimation', 'updateSearchQuery', 'getCharacterCountSuccess', 'getCharacterCountFail', 'findCharacterSuccess', 'findCharacterFail', 'updateBattletag', 'updateAccessToken', 'checkLoginFailure', 'checkUserSuccess', 'checkUserFailure');
  }

  _createClass(NavbarActions, [{
    key: 'checkLogin',
    value: function checkLogin() {
      var _this = this;

      $.ajax({
        url: '/auth/bnet/status'
      }).done(function (data) {
        if (data) {
          _this.updateBattletag(data.battletag);
          _this.updateAccessToken(data.token);
          $.ajax({
            method: 'POST',
            url: '/api/user/log',
            data: { battletag: data.battletag, role: 'member' }
          }).done(function (result) {
            _this.checkUserSuccess(result.data.user.role);
          }).fail(function (jqXhr) {
            _this.checkUserFailure(jqXhr);
          });
        }
      }).fail(function (jqXhr) {
        _this.checkLoginFailure(jqXhr);
      });
    }
  }, {
    key: 'navigateProfile',
    value: function navigateProfile() {
      _reactRouter.browserHistory.push('/profile');
    }
  }]);

  return NavbarActions;
}();

exports.default = _alt2.default.createActions(NavbarActions);

},{"../alt":12,"react-router":"react-router","underscore":"underscore"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileActions = function () {
  function ProfileActions() {
    _classCallCheck(this, ProfileActions);

    this.generateActions('populateRetrievedCharactersSuccess', 'populateRetrievedCharactersFailure', 'confirmCharacterSuccess', 'confirmCharacterFailure', 'updateStoredCharactersSuccess', 'updateStoredCharactersFailure', 'handleMainRoleChange', 'handleOffRoleChange', 'saveStoredCharacterDetailsSuccess', 'saveStoredCharacterDetailsFailure', 'deleteStoredCharacterSuccess', 'deleteStoredCharacterFailure', 'retrieveAverageIlvlFailure', 'updateCharacterIlvl');
  }

  _createClass(ProfileActions, [{
    key: 'retrieveProfileCharacters',
    value: function retrieveProfileCharacters() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: 'https://eu.api.battle.net/wow/user/characters?locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g&access_token=' + _NavbarStore2.default.getState().accessToken
      }).done(function (data) {
        _this.populateRetrievedCharactersSuccess(data);
      }).fail(function (jqXhr) {
        _this.populateRetrievedCharactersFailure(jqXhr);
      });
    }
  }, {
    key: 'getStoredCharacters',
    value: function getStoredCharacters() {
      var _this2 = this;

      $.ajax({
        method: 'GET',
        url: '/api/character/confirmed/' + encodeURIComponent(_NavbarStore2.default.getState().battletag)
      }).done(function (result) {
        console.log(result);
        _this2.updateStoredCharactersSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.updateStoredCharactersFailure(jqXhr);
      });
    }
  }, {
    key: 'confirmCharacter',
    value: function confirmCharacter(character) {
      var _this3 = this;

      character.battletag = _NavbarStore2.default.getState().battletag;
      $.ajax({
        method: 'POST',
        url: '/api/character/confirm/' + encodeURIComponent(_NavbarStore2.default.getState().battletag),
        data: character
      }).done(function (result) {
        console.log(result);
        _this3.confirmCharacterSuccess(result);
        _this3.getStoredCharacters();
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this3.confirmCharacterFailure(jqXhr);
      });
    }
  }, {
    key: 'saveStoredCharacterDetails',
    value: function saveStoredCharacterDetails(character) {
      var _this4 = this;

      $.ajax({
        method: 'PUT',
        url: '/api/character/' + character.id,
        data: character
      }).done(function (result) {
        _this4.saveStoredCharacterDetailsSuccess(result);
      }).fail(function (jqXhr) {
        _this4.saveStoredCharacterDetailsFailure(jqXhr);
      });
    }
  }, {
    key: 'deleteStoredCharacter',
    value: function deleteStoredCharacter(character) {
      var _this5 = this;

      $.ajax({
        method: 'DELETE',
        url: '/api/character/' + character.id,
        data: character
      }).done(function (result) {
        _this5.deleteStoredCharacterSuccess(character.name);
        _this5.getStoredCharacters();
      }).fail(function (jqXhr) {
        _this5.deleteStoredCharacterFailure(jqXhr);
      });
    }
  }, {
    key: 'updateIlvlForCharacter',
    value: function updateIlvlForCharacter(character, index) {
      var _this6 = this;

      $.ajax({
        method: 'GET',
        url: 'https://eu.api.battle.net/wow/character/' + character.realm + '/' + character.name + '?fields=items&locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g'
      }).done(function (result) {
        character.average_ilvl = result.items.averageItemLevel;
        _this6.saveStoredCharacterDetails(character);
        _this6.updateCharacterIlvl(result.items.averageItemLevel, index);
      }).fail(function (jqXhr) {
        _this6.retrieveAverageIlvlFailure(jqXhr);
      });
    }
  }]);

  return ProfileActions;
}();

exports.default = _alt2.default.createActions(ProfileActions);

},{"../alt":12,"../stores/NavbarStore":29,"underscore":"underscore"}],4:[function(require,module,exports){
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

    this.generateActions('updateRosterName', 'updateRosterDescription', 'addRosterSuccess', 'addRosterFailure');
  }

  _createClass(AddRosterActions, [{
    key: 'addRoster',
    value: function addRoster(rosterName) {
      var _this = this;

      $.ajax({
        method: 'POST',
        url: '/api/roster/admin/' + rosterName
      }).done(function (data) {
        _this.addRosterSuccess(data);
        _ViewRostersActions2.default.updateRosterList();
      }).fail(function () {
        _this.addRosterFailure();
      });
    }
  }]);

  return AddRosterActions;
}();

exports.default = _alt2.default.createActions(AddRosterActions);

},{"../../alt":12,"./ViewRostersActions":11,"underscore":"underscore"}],5:[function(require,module,exports){
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

},{"../../alt":12}],6:[function(require,module,exports){
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

},{"../../alt":12}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('./../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterManagementActions = function () {
  function CharacterManagementActions() {
    _classCallCheck(this, CharacterManagementActions);

    this.generateActions('getCharactersForConfirmationSuccess', 'getCharactersForConfirmationFailure', 'confirmCharacterSuccess', 'confirmCharacterFailure', 'unconfirmCharacterSuccess', 'unconfirmCharacterFailure');
  }

  _createClass(CharacterManagementActions, [{
    key: 'getCharactersForConfirmation',
    value: function getCharactersForConfirmation() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/character/admin/confirmation'
      }).done(function (result) {
        console.log(result);
        _this.getCharactersForConfirmationSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.getCharactersForConfirmationFailure(jqXhr);
      });
    }
  }, {
    key: 'confirmCharacter',
    value: function confirmCharacter(characterid) {
      var _this2 = this;

      $.ajax({
        method: 'PUT',
        url: '/api/character/admin/confirm/' + characterid
      }).done(function (result) {
        _this2.confirmCharacterSuccess(result);
        _this2.getCharactersForConfirmation();
      }).fail(function (jqXhr) {
        _this2.confirmCharacterFailure(jqXhr);
      });
    }
  }, {
    key: 'unconfirmCharacter',
    value: function unconfirmCharacter(characterid) {
      var _this3 = this;

      $.ajax({
        method: 'DELETE',
        url: '/api/character/admin/unconfirm/' + characterid
      }).done(function (result) {
        _this3.unconfirmCharacterSuccess(result);
        _this3.getCharactersForConfirmation();
      }).fail(function (jqXhr) {
        _this3.unconfirmCharacterFailure(jqXhr);
      });
    }
  }]);

  return CharacterManagementActions;
}();

exports.default = _alt2.default.createActions(CharacterManagementActions);

},{"./../../alt":12}],8:[function(require,module,exports){
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

},{"../../alt":12}],9:[function(require,module,exports){
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

},{"../../alt":12}],10:[function(require,module,exports){
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

},{"../../alt":12,"../../stores/admin/ViewRostersStore":38,"underscore":"underscore"}],11:[function(require,module,exports){
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

},{"../../alt":12}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],13:[function(require,module,exports){
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

},{"./Footer":14,"./Navbar":16,"react":"react"}],14:[function(require,module,exports){
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

},{"../actions/FooterActions":1,"../stores/FooterStore":28,"react":"react","react-router":"react-router"}],15:[function(require,module,exports){
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
        'Hello from Home test 1 alpha'
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

},{"react":"react"}],16:[function(require,module,exports){
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
      window.location = '/auth/bnet/logout/hard';
    }
  }, {
    key: 'render',
    value: function render() {
      var profilePane;

      if (!this.state.battletag) {
        profilePane = _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'a',
            { href: '/auth/bnet' },
            'Login'
          )
        );
      } else {
        profilePane = _react2.default.createElement(
          'li',
          { className: 'dropdown' },
          _react2.default.createElement(
            'a',
            { href: '/profile', className: 'dropdown-toggle', 'data-toggle': 'dropdown' },
            this.state.battletag,
            ' ',
            _react2.default.createElement('span', { className: 'caret' })
          ),
          _react2.default.createElement(
            'ul',
            { className: 'dropdown-menu' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { onClick: _NavbarActions2.default.navigateProfile },
                'Profile'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'a',
                { href: '/auth/bnet/logout' },
                'Logout'
              )
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
            ),
            profilePane
          )
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;

},{"../actions/NavbarActions":2,"../stores/NavbarStore":29,"react":"react","react-router":"react-router"}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ProfileStore = require('../stores/ProfileStore');

var _ProfileStore2 = _interopRequireDefault(_ProfileStore);

var _ProfileActions = require('../actions/ProfileActions');

var _ProfileActions2 = _interopRequireDefault(_ProfileActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = require('../../utility/WowClasses');
var races = require('../../utility/WowRaces');
var _ = require('underscore');

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile(props) {
    _classCallCheck(this, Profile);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Profile).call(this, props));

    _this.state = _ProfileStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Profile, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ProfileStore2.default.listen(this.onChange);
      _ProfileActions2.default.getStoredCharacters();
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var retrievedCharactersList;
      var storedCharactersList;

      if (this.state.retrievedCharacters) {
        var retrievedCharactersCopy = this.state.retrievedCharacters;
        var arr = [];
        Object.keys(retrievedCharactersCopy).map(function (i) {
          if (retrievedCharactersCopy[i].level === 100 && retrievedCharactersCopy[i].guild === "Darkstorm") {
            arr.push(retrievedCharactersCopy[i]);
          }
        });

        retrievedCharactersList = arr.map(function (character) {
          var characterRace = _.findWhere(races, { id: character.race }).name;
          var characterClass = _.findWhere(classes, { id: character.class }).name;
          return _react2.default.createElement(
            'tr',
            { key: character.name },
            _react2.default.createElement(
              'td',
              { key: character.name },
              character.name
            ),
            _react2.default.createElement(
              'td',
              { key: characterClass },
              characterClass
            ),
            _react2.default.createElement(
              'td',
              { key: characterRace },
              characterRace
            ),
            _react2.default.createElement(
              'td',
              { key: character.realm },
              character.realm
            ),
            _react2.default.createElement(
              'td',
              { key: 'main/alt' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: function onClick() {
                    character.rank = 'main';
                    _ProfileActions2.default.confirmCharacter(character);
                  } },
                'Main'
              ),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default', onClick: function onClick() {
                    character.rank = 'alt';
                    _ProfileActions2.default.confirmCharacter(character);
                  } },
                'Alt'
              )
            )
          );
        });
      }

      if (this.state.storedCharacters.length > 0) {
        storedCharactersList = this.state.storedCharacters.map(function (character, index) {
          return _react2.default.createElement(
            'div',
            { className: 'col-md-4' },
            _react2.default.createElement(
              'div',
              { className: 'col-sm-offset-6 col-sm-6' },
              _react2.default.createElement(
                'h2',
                null,
                character.rank
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-horizontal' },
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Name:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6 control-label text-left' },
                  character.name
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Class:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6 control-label text-left' },
                  _.findWhere(classes, { id: parseInt(character.class) }).name
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Realm:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6 control-label text-left' },
                  character.realm
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Main Role:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6' },
                  _react2.default.createElement(
                    'select',
                    { className: 'form-control', id: 'main-role', value: _this2.state.storedCharacters[index].main_role, onChange: function onChange(e) {
                        _ProfileActions2.default.handleMainRoleChange(e.target.value, index);
                      } },
                    _react2.default.createElement(
                      'option',
                      { key: 'Tank', value: 'Tank' },
                      'Tank'
                    ),
                    _react2.default.createElement(
                      'option',
                      { key: 'Healer', value: 'Healer' },
                      'Healer'
                    ),
                    _react2.default.createElement(
                      'option',
                      { key: 'DPS', value: 'DPS' },
                      'DPS'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Off Role:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6' },
                  _react2.default.createElement(
                    'select',
                    { className: 'form-control', id: 'off-role', value: _this2.state.storedCharacters[index].off_role, onChange: function onChange(e) {
                        _ProfileActions2.default.handleOffRoleChange(e.target.value, index);
                      } },
                    _react2.default.createElement(
                      'option',
                      { key: 'Tank', value: 'Tank' },
                      'Tank'
                    ),
                    _react2.default.createElement(
                      'option',
                      { key: 'Healer', value: 'Healer' },
                      'Healer'
                    ),
                    _react2.default.createElement(
                      'option',
                      { key: 'DPS', value: 'DPS' },
                      'DPS'
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Average ilvl:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6 control-label text-left' },
                  character.average_ilvl
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'label',
                  { className: 'col-sm-6 control-label' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    'Admin Confirmed:'
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-6 control-label text-left' },
                  character.confirmed
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-offset-6 col-sm-6' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default', onClick: function onClick() {
                        _ProfileActions2.default.saveStoredCharacterDetails(_this2.state.storedCharacters[index]);
                      } },
                    'Save'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-offset-6 col-sm-6' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-danger', onClick: function onClick() {
                        _ProfileActions2.default.deleteStoredCharacter(_this2.state.storedCharacters[index]);
                      } },
                    'Delete'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'form-group' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-sm-offset-6 col-sm-6' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-info', onClick: function onClick() {
                        _ProfileActions2.default.updateIlvlForCharacter(_this2.state.storedCharacters[index], index);
                      } },
                    'Update ilvl'
                  )
                )
              )
            )
          );
        });
      }

      return _react2.default.createElement(
        'div',
        { className: 'container' },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-md-2' },
            _react2.default.createElement(
              'div',
              { className: 'btn btn-primary', onClick: _ProfileActions2.default.retrieveProfileCharacters },
              'Retrieve Characters'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-md-10' },
            _react2.default.createElement(
              'h3',
              null,
              'Level 100 Characters'
            ),
            _react2.default.createElement(
              'table',
              { className: 'table' },
              _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Name'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Class'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Race'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Realm'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Rank'
                    )
                  )
                ),
                retrievedCharactersList
              )
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'h3',
            null,
            'Confirmed Characters'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          storedCharactersList
        )
      );
    }
  }]);

  return Profile;
}(_react2.default.Component);

exports.default = Profile;

},{"../../utility/WowClasses":40,"../../utility/WowRaces":41,"../actions/ProfileActions":3,"../stores/NavbarStore":29,"../stores/ProfileStore":30,"react":"react","react-router":"react-router","underscore":"underscore"}],18:[function(require,module,exports){
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
      } else {
        toastr.error("You must supply a name for a Roster to add it", "Silly Pineapple");
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
            'div',
            { className: 'form-group' },
            _react2.default.createElement(
              'label',
              { className: 'col-sm-2 control-label', htmlFor: 'rosterDescription' },
              'Description'
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-sm-10' },
              _react2.default.createElement('textarea', { name: 'description', value: this.state.rosterDescription, onChange: _AddRosterActions2.default.updateRosterDescription })
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

},{"../../actions/admin/AddRosterActions":4,"../../stores/admin/AddRosterStore":31,"react":"react","react-router":"react-router"}],19:[function(require,module,exports){
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

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

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
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_NavbarStore2.default.getState().userRole === 'member' || _NavbarStore2.default.getState().userRole === '') {
        _reactRouter.browserHistory.push('/');
        toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
      }
    }
  }, {
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

},{"../../actions/admin/AdminActions":5,"../../stores/admin/AdminStore":33,"./../../stores/NavbarStore":29,"./AdminSideNav":20,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
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
        { id: 'sidebar-wrapper' },
        _react2.default.createElement(
          'ul',
          { className: 'sidebar-nav' },
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/roster' },
              'Roster Management'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/schedule' },
              'Schedule Management'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/character' },
              'Character Management'
            )
          )
        )
      );
    }
  }]);

  return AdminSideNav;
}(_react2.default.Component);

exports.default = AdminSideNav;

},{"../../actions/admin/AdminSideNavActions":6,"../../stores/admin/AdminSideNavStore":32,"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _CharacterManagementStore = require('./../../stores/admin/CharacterManagementStore');

var _CharacterManagementStore2 = _interopRequireDefault(_CharacterManagementStore);

var _CharacterManagementActions = require('./../../actions/admin/CharacterManagementActions');

var _CharacterManagementActions2 = _interopRequireDefault(_CharacterManagementActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = require('./../../../utility/WowClasses');
var races = require('./../../../utility/WowRaces');

var CharacterManagement = function (_React$Component) {
  _inherits(CharacterManagement, _React$Component);

  function CharacterManagement(props) {
    _classCallCheck(this, CharacterManagement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CharacterManagement).call(this, props));

    _this.state = _CharacterManagementStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(CharacterManagement, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_NavbarStore2.default.getState().userRole === 'member' || _NavbarStore2.default.getState().userRole === '') {
        _reactRouter.browserHistory.push('/');
        toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      _CharacterManagementStore2.default.listen(this.onChange);
      _CharacterManagementActions2.default.getCharactersForConfirmation();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _CharacterManagementStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var characterConfirmationList;

      if (this.state.UserCharacterList) {
        characterConfirmationList = this.state.UserCharacterList.map(function (user, index) {
          var characterList = user.characters.map(function (character, index) {
            var characterClass = _underscore2.default.findWhere(classes, { id: parseInt(character.class) }).name;
            var btn;
            if (character.confirmed == 0) {
              btn = _react2.default.createElement(
                'button',
                { value: character.id, className: 'btn btn-success', onClick: function onClick(e) {
                    _CharacterManagementActions2.default.confirmCharacter(e.target.value);
                  } },
                'Confirm'
              );
            } else {
              btn = _react2.default.createElement(
                'button',
                { value: character.id, className: 'btn btn-danger', onClick: function onClick(e) {
                    _CharacterManagementActions2.default.unconfirmCharacter(e.target.value);
                  } },
                'Unconfirm'
              );
            }
            return _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement(
                'td',
                { key: character.name },
                character.name
              ),
              _react2.default.createElement(
                'td',
                { key: characterClass },
                characterClass
              ),
              _react2.default.createElement(
                'td',
                { key: character.realm },
                character.realm
              ),
              _react2.default.createElement(
                'td',
                { key: character.rank },
                character.rank
              ),
              _react2.default.createElement(
                'td',
                { key: character.main_role + 'main' },
                character.main_role
              ),
              _react2.default.createElement(
                'td',
                { key: character.off_role + 'off' },
                character.off_role
              ),
              _react2.default.createElement(
                'td',
                { key: 'buttons' },
                btn
              )
            );
          });
          return _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'h4',
              null,
              _react2.default.createElement(
                'strong',
                null,
                user.battletag
              )
            ),
            _react2.default.createElement(
              'table',
              { className: 'table' },
              _react2.default.createElement(
                'tbody',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Name'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Class'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Realm'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Rank'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Main Role'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Off Role'
                    )
                  )
                ),
                characterList
              )
            )
          );
        });
      }

      return _react2.default.createElement(
        'div',
        { id: 'wrapper' },
        _react2.default.createElement(_AdminSideNav2.default, null),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'h3',
                null,
                'Character Confirmation'
              )
            ),
            characterConfirmationList
          )
        )
      );
    }
  }]);

  return CharacterManagement;
}(_react2.default.Component);

exports.default = CharacterManagement;

},{"./../../../utility/WowClasses":40,"./../../../utility/WowRaces":41,"./../../actions/admin/CharacterManagementActions":7,"./../../stores/NavbarStore":29,"./../../stores/admin/CharacterManagementStore":34,"./AdminSideNav":20,"react":"react","react-router":"react-router","underscore":"underscore"}],22:[function(require,module,exports){
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

},{"../../actions/admin/RosterControlPanelActions":8,"../../stores/admin/RosterControlPanelStore":35,"../../stores/admin/ViewRostersStore":38,"classnames":39,"react":"react","react-router":"react-router"}],23:[function(require,module,exports){
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

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

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
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (_NavbarStore2.default.getState().userRole === 'member' || _NavbarStore2.default.getState().userRole === '') {
        _reactRouter.browserHistory.push('/');
        toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
      }
    }
  }, {
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
        { className: 'wrapper' },
        _react2.default.createElement(_AdminSideNav2.default, null),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'h3',
                null,
                'Add New Roster'
              ),
              _react2.default.createElement(_AddRoster2.default, null),
              _react2.default.createElement(
                'h3',
                null,
                'ManageRosters'
              )
            )
          )
        )
      );
    }
  }]);

  return RosterManagement;
}(_react2.default.Component);

exports.default = RosterManagement;

},{"../../actions/admin/RosterManagementActions":9,"../../stores/admin/RosterManagementStore":36,"./../../stores/NavbarStore":29,"./AddRoster":18,"./AdminSideNav":20,"./RosterControlPanel":22,"./RosterView":24,"./ViewRosters":25,"react":"react","react-router":"react-router"}],24:[function(require,module,exports){
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

},{"../../actions/admin/RosterViewActions":10,"../../stores/admin/RosterViewStore":37,"../../stores/admin/ViewRostersStore":38,"react":"react","react-router":"react-router"}],25:[function(require,module,exports){
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

},{"../../actions/admin/RosterViewActions":10,"../../actions/admin/ViewRostersActions":11,"../../stores/admin/ViewRostersStore":38,"react":"react","react-router":"react-router"}],26:[function(require,module,exports){
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

},{"./routes":27,"react":"react","react-dom":"react-dom","react-router":"react-router"}],27:[function(require,module,exports){
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

var _Profile = require('./components/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _CharacterManagement = require('./components/admin/CharacterManagement');

var _CharacterManagement2 = _interopRequireDefault(_CharacterManagement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _Profile2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _Admin2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/roster', component: _RosterManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/character', component: _CharacterManagement2.default })
);

},{"./components/App":13,"./components/Home":15,"./components/Profile":17,"./components/admin/Admin":19,"./components/admin/CharacterManagement":21,"./components/admin/RosterManagement":23,"react":"react","react-router":"react-router"}],28:[function(require,module,exports){
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

},{"../actions/FooterActions":1,"../alt":12}],29:[function(require,module,exports){
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
    this.battletag = '';
    this.accessToken = '';
    this.userRole = '';
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
    key: 'onUpdateBattletag',
    value: function onUpdateBattletag(data) {
      this.battletag = data;
    }
  }, {
    key: 'onUpdateAccessToken',
    value: function onUpdateAccessToken(data) {
      this.accessToken = data;
    }
  }, {
    key: 'onCheckLoginFailure',
    value: function onCheckLoginFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onCheckUserSuccess',
    value: function onCheckUserSuccess(role) {
      this.userRole = role;
    }
  }, {
    key: 'onCheckUserFailure',
    value: function onCheckUserFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return NavbarStore;
}();

exports.default = _alt2.default.createStore(NavbarStore);

},{"../actions/NavbarActions":2,"../alt":12}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ProfileActions = require('../actions/ProfileActions');

var _ProfileActions2 = _interopRequireDefault(_ProfileActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileStore = function () {
  function ProfileStore() {
    _classCallCheck(this, ProfileStore);

    this.bindActions(_ProfileActions2.default);
    this.retrievedCharacters = null;
    this.storedCharacters = [];
    this.confirmedAlts = null;
    this.confirmedMain = null;
  }

  _createClass(ProfileStore, [{
    key: 'onPopulateRetrievedCharactersSuccess',
    value: function onPopulateRetrievedCharactersSuccess(data) {
      this.retrievedCharacters = data.characters;
    }
  }, {
    key: 'onPopulateRetrievedCharactersFailure',
    value: function onPopulateRetrievedCharactersFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onConfirmCharacterSuccess',
    value: function onConfirmCharacterSuccess(result) {
      if (result.data.responseCode === 2) {
        toastr.success(result.data.character.name + ' is now a confirmed character', 'Character Confirmed');
      } else if (result.data.responseCode === 1) {
        toastr.warning(result.data.message, 'Character Unconfirmed');
      } else if (result.data.responseCode === 3) {
        toastr.success(result.data.character.name + ' ' + result.data.message, 'Character Confirmed');
      } else if (result.data.responseCode === 4) {
        toastr.warning(result.data.character.name + ' ' + result.data.message, 'Character Not Confirmed');
      }
    }
  }, {
    key: 'onConfirmCharacterFailure',
    value: function onConfirmCharacterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUpdateStoredCharactersSuccess',
    value: function onUpdateStoredCharactersSuccess(characters) {
      this.storedCharacters = characters.data;
    }
  }, {
    key: 'onUpdateStoredCharactersFailure',
    value: function onUpdateStoredCharactersFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onHandleMainRoleChange',
    value: function onHandleMainRoleChange(value) {
      this.storedCharacters[value[1]].main_role = value[0];
    }
  }, {
    key: 'onHandleOffRoleChange',
    value: function onHandleOffRoleChange(value) {
      this.storedCharacters[value[1]].off_role = value[0];
    }
  }, {
    key: 'onSaveStoredCharacterDetailsSuccess',
    value: function onSaveStoredCharacterDetailsSuccess(value) {
      toastr.success(value.data.character.name + ' has been updated', 'Character Data Saved');
    }
  }, {
    key: 'onSaveStoredCharacterDetailsFailure',
    value: function onSaveStoredCharacterDetailsFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onDeleteStoredCharacterSuccess',
    value: function onDeleteStoredCharacterSuccess(value) {
      toastr.success(value + ' has been deleted', 'Character Deleted');
    }
  }, {
    key: 'onDeleteStoredCharacterFailure',
    value: function onDeleteStoredCharacterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onRetrieveAverageIlvlFailure',
    value: function onRetrieveAverageIlvlFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUpdateCharacterIlvl',
    value: function onUpdateCharacterIlvl(values) {
      this.storedCharacters[values[1]].average_ilvl = values[0];
      toastr.success('Character ilvl has been updated', 'Character Confirmed');
    }
  }]);

  return ProfileStore;
}();

exports.default = _alt2.default.createStore(ProfileStore);

},{"../actions/ProfileActions":3,"../alt":12}],31:[function(require,module,exports){
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
    this.rosterDescription = '';
  }

  _createClass(AddRosterStore, [{
    key: 'onUpdateRosterName',
    value: function onUpdateRosterName(e) {
      this.rosterName = e.target.value;
    }
  }, {
    key: 'onUpdateRosterDescription',
    value: function onUpdateRosterDescription(e) {
      this.rosterDescription = e.target.value;
    }
  }, {
    key: 'onAddRosterSuccess',
    value: function onAddRosterSuccess(rosterName) {}
  }, {
    key: 'onAddRosterFailure',
    value: function onAddRosterFailure() {
      this.addRosterResultMessage = 'Unable to add roster';
    }
  }]);

  return AddRosterStore;
}();

exports.default = _alt2.default.createStore(AddRosterStore);

},{"../../actions/admin/AddRosterActions":4,"../../alt":12}],32:[function(require,module,exports){
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

},{"../../actions/admin/AdminSideNavActions":6,"../../alt":12}],33:[function(require,module,exports){
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

},{"../../actions/admin/AdminActions":5,"../../alt":12}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('./../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _CharacterManagementActions = require('./../../actions/admin/CharacterManagementActions');

var _CharacterManagementActions2 = _interopRequireDefault(_CharacterManagementActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CharacterManagementStore = function () {
  function CharacterManagementStore() {
    _classCallCheck(this, CharacterManagementStore);

    this.bindActions(_CharacterManagementActions2.default);
    this.UserCharacterList = null;
  }

  _createClass(CharacterManagementStore, [{
    key: 'onGetCharactersForConfirmationSuccess',
    value: function onGetCharactersForConfirmationSuccess(result) {
      this.UserCharacterList = result.data.users;
    }
  }, {
    key: 'onGetCharactersForConfirmationFailure',
    value: function onGetCharactersForConfirmationFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onConfirmCharacterSuccess',
    value: function onConfirmCharacterSuccess(result) {
      toastr.success(result.data.character.name + ' has been confirmed', "Character Confirmed");
    }
  }, {
    key: 'onConfirmCharacterFailure',
    value: function onConfirmCharacterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUnconfirmCharacterSuccess',
    value: function onUnconfirmCharacterSuccess(result) {
      toastr.success(result.data.character.name + ' has been unconfirmed', "Character Unconfirmed");
    }
  }, {
    key: 'onUnconfirmCharacterFailure',
    value: function onUnconfirmCharacterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return CharacterManagementStore;
}();

exports.default = _alt2.default.createStore(CharacterManagementStore);

},{"./../../actions/admin/CharacterManagementActions":7,"./../../alt":12}],35:[function(require,module,exports){
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

},{"../../actions/admin/RosterControlPanelActions":8,"../../alt":12}],36:[function(require,module,exports){
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

},{"../../actions/admin/RosterManagementActions":9,"../../alt":12}],37:[function(require,module,exports){
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

},{"../../actions/admin/RosterViewActions":10,"../../alt":12}],38:[function(require,module,exports){
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

},{"../../actions/admin/RosterViewActions":10,"../../actions/admin/ViewRostersActions":11,"../../alt":12}],39:[function(require,module,exports){
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

},{}],40:[function(require,module,exports){
"use strict";

module.exports = [{
    "id": 3,
    "mask": 4,
    "powerType": "focus",
    "name": "Hunter",
    "token": "prot"
}, {
    "id": 4,
    "mask": 8,
    "powerType": "energy",
    "name": "Rogue",
    "token": "vanq"
}, {
    "id": 1,
    "mask": 1,
    "powerType": "rage",
    "name": "Warrior",
    "token": "prot"
}, {
    "id": 2,
    "mask": 2,
    "powerType": "mana",
    "name": "Paladin",
    "token": "conq"
}, {
    "id": 7,
    "mask": 64,
    "powerType": "mana",
    "name": "Shaman",
    "token": "prot"
}, {
    "id": 8,
    "mask": 128,
    "powerType": "mana",
    "name": "Mage",
    "token": "vanq"
}, {
    "id": 5,
    "mask": 16,
    "powerType": "mana",
    "name": "Priest",
    "token": "conq"
}, {
    "id": 6,
    "mask": 32,
    "powerType": "runic-power",
    "name": "Death Knight",
    "token": "prot"
}, {
    "id": 11,
    "mask": 1024,
    "powerType": "mana",
    "name": "Druid",
    "token": "vanq"
}, {
    "id": 9,
    "mask": 256,
    "powerType": "mana",
    "name": "Warlock",
    "token": "conq"
}, {
    "id": 10,
    "mask": 512,
    "powerType": "energy",
    "name": "Monk",
    "token": "prot"
}];

},{}],41:[function(require,module,exports){
"use strict";

module.exports = [{
    "id": 1,
    "mask": 1,
    "side": "alliance",
    "name": "Human"
}, {
    "id": 2,
    "mask": 2,
    "side": "horde",
    "name": "Orc"
}, {
    "id": 3,
    "mask": 4,
    "side": "alliance",
    "name": "Dwarf"
}, {
    "id": 4,
    "mask": 8,
    "side": "alliance",
    "name": "Night Elf"
}, {
    "id": 5,
    "mask": 16,
    "side": "horde",
    "name": "Undead"
}, {
    "id": 6,
    "mask": 32,
    "side": "horde",
    "name": "Tauren"
}, {
    "id": 7,
    "mask": 64,
    "side": "alliance",
    "name": "Gnome"
}, {
    "id": 8,
    "mask": 128,
    "side": "horde",
    "name": "Troll"
}, {
    "id": 9,
    "mask": 256,
    "side": "horde",
    "name": "Goblin"
}, {
    "id": 10,
    "mask": 512,
    "side": "horde",
    "name": "Blood Elf"
}, {
    "id": 11,
    "mask": 1024,
    "side": "alliance",
    "name": "Draenei"
}, {
    "id": 22,
    "mask": 2097152,
    "side": "alliance",
    "name": "Worgen"
}, {
    "id": 24,
    "mask": 8388608,
    "side": "neutral",
    "name": "Pandaren"
}, {
    "id": 25,
    "mask": 16777216,
    "side": "alliance",
    "name": "Pandaren"
}, {
    "id": 26,
    "mask": 33554432,
    "side": "horde",
    "name": "Pandaren"
}];

},{}]},{},[26])


//# sourceMappingURL=bundle.js.map
