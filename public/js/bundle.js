(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterActions = function FooterActions() {
  _classCallCheck(this, FooterActions);

  this.generateActions('placeholder');
};

exports.default = _alt2.default.createActions(FooterActions);

},{"../alt":19}],2:[function(require,module,exports){
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

var HomeActions = function () {
  function HomeActions() {
    _classCallCheck(this, HomeActions);

    this.generateActions('loadComponentDataSuccess', 'loadComponentDataFailure');
  }

  _createClass(HomeActions, [{
    key: 'loadComponentData',
    value: function loadComponentData() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/home'
      }).done(function (result) {
        console.log(result);
        _this.loadComponentDataSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.loadComponentDataFailure(jqXhr);
      });
    }
  }]);

  return HomeActions;
}();

exports.default = _alt2.default.createActions(HomeActions);

},{"../alt":19,"underscore":"underscore"}],3:[function(require,module,exports){
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
      return 0;
    }
  }, {
    key: 'navigateProfile',
    value: function navigateProfile() {
      _reactRouter.browserHistory.push('/profile');
      return 0;
    }
  }]);

  return NavbarActions;
}();

exports.default = _alt2.default.createActions(NavbarActions);

},{"../alt":19,"react-router":"react-router","underscore":"underscore"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileActions = function ProfileActions() {
  _classCallCheck(this, ProfileActions);

  this.generateActions('placeholder');
};

exports.default = _alt2.default.createActions(ProfileActions);

},{"../alt":19,"../stores/NavbarStore":44,"underscore":"underscore"}],5:[function(require,module,exports){
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

var ProfileCharactersActions = function () {
  function ProfileCharactersActions() {
    _classCallCheck(this, ProfileCharactersActions);

    this.generateActions('populateRetrievedCharactersSuccess', 'populateRetrievedCharactersFailure', 'confirmCharacterSuccess', 'confirmCharacterFailure', 'updateStoredCharactersSuccess', 'updateStoredCharactersFailure', 'handleMainRoleChange', 'handleOffRoleChange', 'saveStoredCharacterDetailsSuccess', 'saveStoredCharacterDetailsFailure', 'deleteStoredCharacterSuccess', 'deleteStoredCharacterFailure', 'retrieveAverageIlvlFailure', 'updateCharacterIlvl');
  }

  _createClass(ProfileCharactersActions, [{
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
      return 0;
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
      return 0;
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
      return 0;
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
      return 0;
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
      return 0;
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
      return 0;
    }
  }]);

  return ProfileCharactersActions;
}();

exports.default = _alt2.default.createActions(ProfileCharactersActions);

},{"../alt":19,"../stores/NavbarStore":44,"underscore":"underscore"}],6:[function(require,module,exports){
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

var _ProfileRaidWeeksStore = require('../stores/ProfileRaidWeeksStore');

var _ProfileRaidWeeksStore2 = _interopRequireDefault(_ProfileRaidWeeksStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var ProfileRaidWeeksActions = function () {
  function ProfileRaidWeeksActions() {
    _classCallCheck(this, ProfileRaidWeeksActions);

    this.generateActions('getAllRaidWeekInfoSuccess', 'getAllRaidWeekInfoFailure', 'toggleUserAvailabilityDay', 'saveUserAvailabilitySuccess', 'saveUserAvailabilityFailure', 'createUserAvailabilitySuccess', 'createUserAvailabilityFailure');
  }

  _createClass(ProfileRaidWeeksActions, [{
    key: 'getAllRaidWeekInfo',
    value: function getAllRaidWeekInfo() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/raidweek/user/' + encodeURIComponent(_NavbarStore2.default.getState().battletag)
      }).done(function (result) {
        console.log(result);
        _this.getAllRaidWeekInfoSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.getAllRaidWeekInfoFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'createUserAvailability',
    value: function createUserAvailability(raidweek) {
      var _this2 = this;

      raidweek.battletag = _NavbarStore2.default.getState().battletag;
      $.ajax({
        method: 'POST',
        url: '/api/raidweek/user',
        data: raidweek
      }).done(function (result) {
        console.log(result);
        _this2.createUserAvailabilitySuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.createUserAvailabilityFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'saveUserAvailability',
    value: function saveUserAvailability(ua) {
      var _this3 = this;

      ua.battletag = _NavbarStore2.default.getState().battletag;
      $.ajax({
        method: 'PUT',
        url: '/api/raidweek/user',
        data: ua
      }).done(function (result) {
        console.log(result);
        _this3.saveUserAvailabilitySuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this3.saveUserAvailabilityFailure(jqXhr);
      });
      return 0;
    }
  }]);

  return ProfileRaidWeeksActions;
}();

exports.default = _alt2.default.createActions(ProfileRaidWeeksActions);

},{"../alt":19,"../stores/NavbarStore":44,"../stores/ProfileRaidWeeksStore":46,"underscore":"underscore"}],7:[function(require,module,exports){
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

var ProfileRostersActions = function () {
  function ProfileRostersActions() {
    _classCallCheck(this, ProfileRostersActions);

    this.generateActions('getComponentDataSuccess', 'getComponentDataFailure');
  }

  _createClass(ProfileRostersActions, [{
    key: 'getComponentData',
    value: function getComponentData() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/roster/' + encodeURIComponent(_NavbarStore2.default.getState().battletag)
      }).done(function (result) {
        console.log(result);
        _this.getComponentDataSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.getComponentDataFailure(jqXhr);
      });
    }
  }]);

  return ProfileRostersActions;
}();

exports.default = _alt2.default.createActions(ProfileRostersActions);

},{"../alt":19,"../stores/NavbarStore":44,"underscore":"underscore"}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScheduleViewActions = function ScheduleViewActions() {
  _classCallCheck(this, ScheduleViewActions);

  this.generateActions('setPropValues', 'setFilterType');
};

exports.default = _alt2.default.createActions(ScheduleViewActions);

},{"../alt":19,"../stores/NavbarStore":44,"underscore":"underscore"}],9:[function(require,module,exports){
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

var SingleScheduleViewActions = function () {
  function SingleScheduleViewActions() {
    _classCallCheck(this, SingleScheduleViewActions);

    this.generateActions('loadSingleScheduleSuccess', 'loadSingleScheduleFailure', 'loadUserCharactersSuccess', 'loadUserCharactersFailure');
  }

  _createClass(SingleScheduleViewActions, [{
    key: 'loadSingleSchedule',
    value: function loadSingleSchedule(scheduleId) {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/schedule/single/' + scheduleId
      }).done(function (result) {
        console.log(result);
        _this.loadSingleScheduleSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.loadSingleScheduleFailure(jqXhr);
      });
    }
  }, {
    key: 'loadUserCharacters',
    value: function loadUserCharacters() {
      var _this2 = this;

      $.ajax({
        method: 'GET',
        url: '/api/character/user/' + encodeURIComponent(_NavbarStore2.default.getState().battletag)
      }).done(function (result) {
        console.log(result);
        _this2.loadUserCharactersSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.loadUserCharactersFailure(jqXhr);
      });
    }
  }]);

  return SingleScheduleViewActions;
}();

exports.default = _alt2.default.createActions(SingleScheduleViewActions);

},{"../alt":19,"../stores/NavbarStore":44,"underscore":"underscore"}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _underscore = require('underscore');

var _RosterManagementActions = require('./RosterManagementActions');

var _RosterManagementActions2 = _interopRequireDefault(_RosterManagementActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AddRosterActions = function () {
  function AddRosterActions() {
    _classCallCheck(this, AddRosterActions);

    this.generateActions('updateRosterName', 'updateRosterDescription', 'addRosterSuccess', 'addRosterFailure');
  }

  _createClass(AddRosterActions, [{
    key: 'addRoster',
    value: function addRoster(roster) {
      var _this = this;

      $.ajax({
        method: 'POST',
        url: '/api/roster/admin',
        data: roster
      }).done(function (data) {
        _this.addRosterSuccess(data);
        _RosterManagementActions2.default.getAllRosters();
      }).fail(function () {
        _this.addRosterFailure();
      });
      return 0;
    }
  }]);

  return AddRosterActions;
}();

exports.default = _alt2.default.createActions(AddRosterActions);

},{"../../alt":19,"./RosterManagementActions":17,"underscore":"underscore"}],11:[function(require,module,exports){
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

},{"../../alt":19}],12:[function(require,module,exports){
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

},{"../../alt":19}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttendaceManagementActions = function () {
  function AttendaceManagementActions() {
    _classCallCheck(this, AttendaceManagementActions);

    this.generateActions('loadComponentDataSuccess', 'loadComponentDataFailure', 'updateSelectRaidWeek', 'updateSelectWeekday');
  }

  _createClass(AttendaceManagementActions, [{
    key: 'loadComponentData',
    value: function loadComponentData() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/attendance/admin'
      }).done(function (result) {
        console.log(result);
        _this.loadComponentDataSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.loadComponentDataFailure(jqXhr);
      });
    }
  }]);

  return AttendaceManagementActions;
}();

exports.default = _alt2.default.createActions(AttendaceManagementActions);

},{"../../alt":19}],14:[function(require,module,exports){
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
      return 0;
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
      return 0;
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
      return 0;
    }
  }]);

  return CharacterManagementActions;
}();

exports.default = _alt2.default.createActions(CharacterManagementActions);

},{"./../../alt":19}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RaidManagementActions = function () {
  function RaidManagementActions() {
    _classCallCheck(this, RaidManagementActions);

    this.generateActions('updateFormRaidName', 'updateFormRaidDescription', 'updateFormBossName', 'updateFormBossDescription', 'createRaidSuccess', 'createRaidFailure', 'loadRaidsSuccess', 'loadRaidsFailure', 'updateSelectedRaid', 'createBossSuccess', 'createBossFailure', 'editBoss', 'deleteBossSuccess', 'deleteBossFailure', 'deleteRaidSuccess', 'deleteRaidFailure');
  }

  _createClass(RaidManagementActions, [{
    key: 'loadRaids',
    value: function loadRaids() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/raid'
      }).done(function (result) {
        console.log(result);
        _this.loadRaidsSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.loadRaidsFailure(jqXhr);
      });
    }
  }, {
    key: 'createRaid',
    value: function createRaid(raidName, raidDescription) {
      var _this2 = this;

      var data = {};
      data.name = raidName;
      data.description = raidDescription;
      $.ajax({
        method: 'POST',
        url: '/api/raid/admin',
        data: data
      }).done(function (result) {
        console.log(result);
        _this2.createRaidSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.createRaidFailure(jqXhr);
      });
    }
  }, {
    key: 'deleteRaid',
    value: function deleteRaid(raidId) {
      var _this3 = this;

      $.ajax({
        method: 'DELETE',
        url: '/api/raid/admin/' + raidId
      }).done(function (result) {
        console.log(result);
        _this3.deleteRaidSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this3.deleteRaidFailure(jqXhr);
      });
    }
  }, {
    key: 'createBoss',
    value: function createBoss(bossName, bossDescription, raidId) {
      var _this4 = this;

      var data = {};
      data.name = bossName;
      data.description = bossDescription;
      data.raidId = raidId;
      $.ajax({
        method: 'POST',
        url: '/api/boss/admin',
        data: data
      }).done(function (result) {
        console.log(result);
        _this4.createBossSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this4.createBossFailure(jqXhr);
      });
    }
  }, {
    key: 'deleteBoss',
    value: function deleteBoss(boss) {
      var _this5 = this;

      $.ajax({
        method: 'DELETE',
        url: '/api/boss/admin',
        data: boss
      }).done(function (result) {
        console.log(result);
        _this5.deleteBossSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this5.deleteBossFailure(jqXhr);
      });
    }
  }]);

  return RaidManagementActions;
}();

exports.default = _alt2.default.createActions(RaidManagementActions);

},{"../../alt":19}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('./../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RaidWeekManagementActions = function () {
  function RaidWeekManagementActions() {
    _classCallCheck(this, RaidWeekManagementActions);

    this.generateActions('selectedDayChanged', 'nextYear', 'prevYear', 'goToToday', 'createNewRaidWeekSuccess', 'createNewRaidWeekFailure', 'getAllRaidWeeksSuccess', 'getAllRaidWeeksFailure', 'toggleRaidWeekDay', 'deleteRaidWeekSuccess', 'deleteRaidWeekFailure', 'updateRaidWeekSuccess', 'updateRaidWeekFailure');
  }

  _createClass(RaidWeekManagementActions, [{
    key: 'changeSelectedDay',
    value: function changeSelectedDay(date) {
      this.selectedDayChanged(date);
      return 0;
    }
  }, {
    key: 'getAllRaidWeeks',
    value: function getAllRaidWeeks() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/raidweek'
      }).done(function (result) {
        console.log(result);
        _this.getAllRaidWeeksSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.getAllRaidWeeksFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'createNewRaidWeek',
    value: function createNewRaidWeek(startingDate) {
      var _this2 = this;

      var start = startingDate.format('YYYY MM DD');
      var end = startingDate.add(6, 'days').format('YYYY MM DD');
      $.ajax({
        method: 'POST',
        url: '/api/raidweek/admin',
        data: { start: start, end: end }
      }).done(function (result) {
        console.log(result);
        _this2.createNewRaidWeekSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.createNewRaidWeekFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'updateRaidWeek',
    value: function updateRaidWeek(raidweek) {
      var _this3 = this;

      $.ajax({
        method: 'PUT',
        url: '/api/raidweek/admin',
        data: raidweek
      }).done(function (result) {
        console.log(result);
        _this3.updateRaidWeekSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this3.updateRaidWeekFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'deleteRaidWeek',
    value: function deleteRaidWeek(id) {
      var _this4 = this;

      $.ajax({
        method: 'DELETE',
        url: '/api/raidweek/admin/' + id
      }).done(function (result) {
        console.log(result);
        _this4.deleteRaidWeekSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this4.deleteRaidWeekFailure(jqXhr);
      });
      return 0;
    }
  }]);

  return RaidWeekManagementActions;
}();

exports.default = _alt2.default.createActions(RaidWeekManagementActions);

},{"./../../alt":19}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var RosterManagementActions = function () {
  function RosterManagementActions() {
    _classCallCheck(this, RosterManagementActions);

    this.generateActions('getAllRostersSuccess', 'getAllRostersFailure', 'updateSelectedRosterSuccess', 'updateSelectedRosterFailure', 'removeCharacterFromRosterSuccess', 'removeCharacterFromRosterFailure', 'addCharacterToRosterSuccess', 'addCharacterToRosterFailure', 'setSelectedRosterName', 'getSelectedRosterName');
  }

  _createClass(RosterManagementActions, [{
    key: 'getAllRosters',
    value: function getAllRosters() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/roster/admin/all'
      }).done(function (result) {
        _this.getAllRostersSuccess(result);
        _this.setSelectedRosterName(result.data.rosters[0].name);
        _this.updateRosterListAfterCharacterChange(result.data.rosters[0].id);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.getAllRostersFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'updateSelectedRoster',
    value: function updateSelectedRoster(rosterName, rosterList) {
      var _this2 = this;

      $.ajax({
        method: 'GET',
        url: '/api/roster/admin/' + _.findWhere(rosterList, { name: rosterName }).id
      }).done(function (result) {
        console.log(result);
        _this2.updateSelectedRosterSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.updateSelectedRosterFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'updateRosterListAfterCharacterChange',
    value: function updateRosterListAfterCharacterChange(rosterid) {
      var _this3 = this;

      $.ajax({
        method: 'GET',
        url: '/api/roster/admin/' + rosterid
      }).done(function (result) {
        console.log(result);
        _this3.updateSelectedRosterSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this3.updateSelectedRosterFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'removeCharacterFromRoster',
    value: function removeCharacterFromRoster(characterid, rosterid) {
      var _this4 = this;

      $.ajax({
        method: 'PUT',
        url: '/api/roster/admin/unlink/' + characterid + '/' + rosterid
      }).done(function (result) {
        console.log(result);
        _this4.removeCharacterFromRosterSuccess(result);
        _this4.updateRosterListAfterCharacterChange(rosterid);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this4.removeCharacterFromRosterFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'addCharacterToRoster',
    value: function addCharacterToRoster(characterid, rosterid) {
      var _this5 = this;

      $.ajax({
        method: 'PUT',
        url: '/api/roster/admin/link/' + characterid + '/' + rosterid
      }).done(function (result) {
        console.log(result);
        _this5.addCharacterToRosterSuccess(result);
        _this5.updateRosterListAfterCharacterChange(rosterid);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this5.addCharacterToRosterFailure(jqXhr);
      });
      return 0;
    }
  }]);

  return RosterManagementActions;
}();

exports.default = _alt2.default.createActions(RosterManagementActions);

},{"../../alt":19,"underscore":"underscore"}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('./../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ScheduleManagementStore = require('./../../stores/admin/ScheduleManagementStore');

var _ScheduleManagementStore2 = _interopRequireDefault(_ScheduleManagementStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('underscore');

var ScheduleManagementActions = function () {
  function ScheduleManagementActions() {
    _classCallCheck(this, ScheduleManagementActions);

    this.generateActions('updateFormRaidWeek', 'updateFormRoster', 'updateFormScheduleName', 'updateFormScheduleDescription', 'updateSelectedRaidWeekCompleted', 'updateSelectedSchedule', 'updateFormRaid', 'updateFormBoss', 'updateFormTanks', 'updateFormHealers', 'updateFormDPS', 'loadComponentDataSuccess', 'loadComponentDataFailure', 'createScheduleSuccess', 'createScheduleFailure', 'setFormTanks', 'setFormHealers', 'setFormDPS', 'addScheduleBossSuccess', 'addScheduleBossFailure', 'addCharacterToScheduleBossSuccess', 'addCharacterToScheduleBossFailure', 'removeCharacterFromScheduleBossSuccess', 'removeCharacterFromScheduleBossFailure', 'invertSchedulePublishedStateSuccess', 'invertSchedulePublishedStateFailure');
  }

  _createClass(ScheduleManagementActions, [{
    key: 'updateSelectedRaidWeek',
    value: function updateSelectedRaidWeek(newRWId) {
      newRWId = parseInt(newRWId);
      var state = _ScheduleManagementStore2.default.getState();
      var newScheduleList = [];
      for (var i = 0; i < state.schedules.length; i++) {
        if (state.schedules[i].raid_week_id == newRWId) {
          newScheduleList.push(state.schedules[i]);
        }
      }
      var newSelectedSchedule = 0;
      if (newScheduleList.length > 0) {
        newSelectedSchedule = newScheduleList[0].id;
      }
      this.updateSelectedRaidWeekCompleted(newRWId, newSelectedSchedule);
      return 0;
    }
  }, {
    key: 'loadComponentData',
    value: function loadComponentData() {
      var _this = this;

      $.ajax({
        method: 'GET',
        url: '/api/schedule'
      }).done(function (result) {
        console.log(result);
        _this.loadComponentDataSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this.loadComponentDataFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'createSchedule',
    value: function createSchedule(raidWeekId, scheduleName, scheduleDescription) {
      var _this2 = this;

      var data = { rwId: raidWeekId,
        name: scheduleName,
        description: scheduleDescription };
      $.ajax({
        method: 'POST',
        url: '/api/schedule/admin',
        data: data
      }).done(function (result) {
        console.log(result);
        _this2.createScheduleSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this2.createScheduleFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'addScheduleBoss',
    value: function addScheduleBoss(raid, boss, tanks, healers, dps, schedule) {
      var _this3 = this;

      var data = { raid: raid,
        boss: boss,
        tanks: tanks,
        healers: healers,
        dps: dps,
        schedule: schedule };
      $.ajax({
        method: 'POST',
        url: '/api/schedule/admin/boss',
        data: data
      }).done(function (result) {
        console.log(result);
        _this3.addScheduleBossSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this3.addScheduleBossFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'addCharacterToScheduleBoss',
    value: function addCharacterToScheduleBoss(scheduleBossId, characterId) {
      var _this4 = this;

      var data = { scheduleBossId: scheduleBossId,
        characterId: characterId };
      $.ajax({
        method: 'POST',
        url: '/api/schedule/admin/character',
        data: data
      }).done(function (result) {
        console.log(result);
        _this4.addCharacterToScheduleBossSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this4.addCharacterToScheduleBossFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'removeCharacterFromScheduleBoss',
    value: function removeCharacterFromScheduleBoss(scheduleBossId, characterId) {
      var _this5 = this;

      var data = { scheduleBossId: scheduleBossId,
        characterId: characterId };
      $.ajax({
        method: 'DELETE',
        url: '/api/schedule/admin/character',
        data: data
      }).done(function (result) {
        console.log(result);
        _this5.removeCharacterFromScheduleBossSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this5.removeCharacterFromScheduleBossFailure(jqXhr);
      });
      return 0;
    }
  }, {
    key: 'invertSchedulePublishedState',
    value: function invertSchedulePublishedState(scheduleId) {
      var _this6 = this;

      $.ajax({
        method: 'PUT',
        url: '/api/schedule/admin/publish/' + scheduleId
      }).done(function (result) {
        console.log(result);
        _this6.invertSchedulePublishedStateSuccess(result);
      }).fail(function (jqXhr) {
        console.log(jqXhr);
        _this6.invertSchedulePublishedStateFailure(jqXhr);
      });
    }
  }]);

  return ScheduleManagementActions;
}();

exports.default = _alt2.default.createActions(ScheduleManagementActions);

},{"./../../alt":19,"./../../stores/admin/ScheduleManagementStore":59,"underscore":"underscore"}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],20:[function(require,module,exports){
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

},{"./Footer":21,"./Navbar":23,"react":"react"}],21:[function(require,module,exports){
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

},{"../actions/FooterActions":1,"../stores/FooterStore":42,"react":"react","react-router":"react-router"}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _HomeStore = require('../stores/HomeStore');

var _HomeStore2 = _interopRequireDefault(_HomeStore);

var _HomeActions = require('../actions/HomeActions');

var _HomeActions2 = _interopRequireDefault(_HomeActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Home = function (_React$Component) {
  _inherits(Home, _React$Component);

  function Home(props) {
    _classCallCheck(this, Home);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Home).call(this, props));

    _this.state = _HomeStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(Home, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _HomeStore2.default.listen(this.onChange);
      _HomeActions2.default.loadComponentData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _HomeStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var pageContent;
      if (this.state.raidweeks.length > 0) {
        pageContent = this.state.raidweeks.map(function (raidweek, index) {
          var schedules;
          schedules = raidweek.schedules.map(function (schedule) {
            return _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/schedule?type=1&schedule=' + schedule.id },
                schedule.name
              )
            );
          }, this);

          return _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              null,
              _react2.default.createElement(
                'div',
                { className: 'row' },
                _react2.default.createElement(
                  'strong',
                  null,
                  _react2.default.createElement(
                    'u',
                    null,
                    (0, _moment2.default)(raidweek.start).format('MMM Do YYYY')
                  )
                )
              ),
              _react2.default.createElement('br', null),
              schedules,
              _react2.default.createElement('br', null)
            )
          );
        }, this);
      }
      return _react2.default.createElement(
        'div',
        { id: 'page-content-wrapper' },
        _react2.default.createElement(
          'div',
          { className: 'container-fluid-eighty' },
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'h2',
              null,
              'Upcoming Schedules'
            )
          ),
          _react2.default.createElement(
            'table',
            { tableName: 'table-striped' },
            _react2.default.createElement(
              'tbody',
              null,
              pageContent
            )
          )
        )
      );
    }
  }]);

  return Home;
}(_react2.default.Component);

exports.default = Home;

},{"../actions/HomeActions":2,"../stores/HomeStore":43,"../stores/NavbarStore":44,"moment":61,"react":"react","react-router":"react-router"}],23:[function(require,module,exports){
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

},{"../actions/NavbarActions":3,"../stores/NavbarStore":44,"react":"react","react-router":"react-router"}],24:[function(require,module,exports){
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

var _ProfileSidenav = require('./ProfileSidenav');

var _ProfileSidenav2 = _interopRequireDefault(_ProfileSidenav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ProfileStore2.default.unlisten(this.onChange);
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
        { id: 'wrapper' },
        _react2.default.createElement(_ProfileSidenav2.default, null),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement('div', { className: 'row' })
          )
        )
      );
    }
  }]);

  return Profile;
}(_react2.default.Component);

exports.default = Profile;

},{"../actions/ProfileActions":4,"../stores/NavbarStore":44,"../stores/ProfileStore":48,"./ProfileSidenav":28,"react":"react","react-router":"react-router"}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ProfileCharactersStore = require('../stores/ProfileCharactersStore');

var _ProfileCharactersStore2 = _interopRequireDefault(_ProfileCharactersStore);

var _ProfileCharactersActions = require('../actions/ProfileCharactersActions');

var _ProfileCharactersActions2 = _interopRequireDefault(_ProfileCharactersActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _ProfileSidenav = require('./ProfileSidenav');

var _ProfileSidenav2 = _interopRequireDefault(_ProfileSidenav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var classes = require('../../utility/WowClasses');
var races = require('../../utility/WowRaces');
var _ = require('underscore');

var ProfileCharacters = function (_React$Component) {
  _inherits(ProfileCharacters, _React$Component);

  function ProfileCharacters(props) {
    _classCallCheck(this, ProfileCharacters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileCharacters).call(this, props));

    _this.state = _ProfileCharactersStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ProfileCharacters, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ProfileCharactersStore2.default.listen(this.onChange);
      _ProfileCharactersActions2.default.getStoredCharacters();
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

      if (this.state.retrievedCharacters.length > 0) {
        var retrievedCharactersCopy = this.state.retrievedCharacters;
        var arr = [];
        Object.keys(retrievedCharactersCopy).map(function (i) {
          if (retrievedCharactersCopy[i].level === 100 && retrievedCharactersCopy[i].guild === "DarkStorm") {
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
                    _ProfileCharactersActions2.default.confirmCharacter(character);
                  } },
                'Main'
              ),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default', onClick: function onClick() {
                    character.rank = 'alt';
                    _ProfileCharactersActions2.default.confirmCharacter(character);
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
                        _ProfileCharactersActions2.default.handleMainRoleChange(e.target.value, index);
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
                        _ProfileCharactersActions2.default.handleOffRoleChange(e.target.value, index);
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
                        _ProfileCharactersActions2.default.saveStoredCharacterDetails(_this2.state.storedCharacters[index]);
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
                        _ProfileCharactersActions2.default.deleteStoredCharacter(_this2.state.storedCharacters[index]);
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
                        _ProfileCharactersActions2.default.updateIlvlForCharacter(_this2.state.storedCharacters[index], index);
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
        { id: 'wrapper' },
        _react2.default.createElement(_ProfileSidenav2.default, null),
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
                'div',
                { className: 'col-md-2' },
                _react2.default.createElement(
                  'div',
                  { className: 'btn btn-primary', onClick: _ProfileCharactersActions2.default.retrieveProfileCharacters },
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
          )
        )
      );
    }
  }]);

  return ProfileCharacters;
}(_react2.default.Component);

exports.default = ProfileCharacters;

},{"../../utility/WowClasses":69,"../../utility/WowRaces":70,"../actions/ProfileCharactersActions":5,"../stores/NavbarStore":44,"../stores/ProfileCharactersStore":45,"./ProfileSidenav":28,"react":"react","react-router":"react-router","underscore":"underscore"}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ProfileRaidWeeksStore = require('../stores/ProfileRaidWeeksStore');

var _ProfileRaidWeeksStore2 = _interopRequireDefault(_ProfileRaidWeeksStore);

var _ProfileRaidWeeksActions = require('../actions/ProfileRaidWeeksActions');

var _ProfileRaidWeeksActions2 = _interopRequireDefault(_ProfileRaidWeeksActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _ProfileSidenav = require('./ProfileSidenav');

var _ProfileSidenav2 = _interopRequireDefault(_ProfileSidenav);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var ProfileRaidWeeks = function (_React$Component) {
  _inherits(ProfileRaidWeeks, _React$Component);

  function ProfileRaidWeeks(props) {
    _classCallCheck(this, ProfileRaidWeeks);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileRaidWeeks).call(this, props));

    _this.state = _ProfileRaidWeeksStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ProfileRaidWeeks, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ProfileRaidWeeksStore2.default.listen(this.onChange);
      _ProfileRaidWeeksActions2.default.getAllRaidWeekInfo();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ProfileRaidWeeksStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var raidweeklist;
      if (this.state.raidweeks.length > 0) {
        raidweeklist = this.state.raidweeks.map(function (raidweek, index) {
          var _this2 = this;

          var user_availabilityRow;
          var user_availability = _.findWhere(this.state.user_availability, { raid_week_id: raidweek.id });
          if (user_availability) {
            user_availabilityRow = _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.wednesday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'wednesday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.thursday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'thursday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.friday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'friday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.saturday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'saturday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.sunday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'sunday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.monday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'monday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement('input', { type: 'checkbox', checked: user_availability.tuesday, onChange: function onChange() {
                    return _ProfileRaidWeeksActions2.default.toggleUserAvailabilityDay(user_availability.id, 'tuesday');
                  } })
              ),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: function onClick() {
                      return _ProfileRaidWeeksActions2.default.saveUserAvailability(_.findWhere(_this2.state.user_availability, { raid_week_id: raidweek.id }));
                    } },
                  'Save'
                )
              )
            );
          } else {
            user_availabilityRow = _react2.default.createElement(
              'tr',
              null,
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement('td', null),
              _react2.default.createElement(
                'td',
                null,
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-primary', onClick: function onClick() {
                      return _ProfileRaidWeeksActions2.default.createUserAvailability(raidweek);
                    } },
                  'Create'
                )
              )
            );
          }
          return _react2.default.createElement(
            'div',
            { className: 'row' },
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
                      'Start'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'End'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Week No.'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'W'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'T'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'F'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'S'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'S'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'M'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'T'
                    )
                  )
                ),
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    null,
                    (0, _moment2.default)(raidweek.start).format('DD[/]MM[/]YYYY')
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    (0, _moment2.default)(raidweek.end).format('DD[/]MM[/]YYYY')
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    (0, _moment2.default)(raidweek.start).format('W')
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.wednesday, disabled: 'disabled' })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.thursday, disabled: 'disabled' })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.friday, disabled: 'disabled' })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.saturday, disabled: 'disabled' })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.sunday, disabled: 'disabled' })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.monday, disabled: 'disabled' })
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement('input', { type: 'checkbox', checked: raidweek.tuesday, disabled: 'disabled' })
                  )
                ),
                user_availabilityRow
              )
            )
          );
        }, this);
      }

      return _react2.default.createElement(
        'div',
        { id: 'wrapper' },
        _react2.default.createElement(_ProfileSidenav2.default, null),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'h3',
              null,
              'Raid Week Availability'
            ),
            raidweeklist
          )
        )
      );
    }
  }]);

  return ProfileRaidWeeks;
}(_react2.default.Component);

exports.default = ProfileRaidWeeks;

},{"../actions/ProfileRaidWeeksActions":6,"../stores/NavbarStore":44,"../stores/ProfileRaidWeeksStore":46,"./ProfileSidenav":28,"moment":61,"react":"react","react-router":"react-router","underscore":"underscore"}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ProfileRostersStore = require('../stores/ProfileRostersStore');

var _ProfileRostersStore2 = _interopRequireDefault(_ProfileRostersStore);

var _ProfileRostersActions = require('../actions/ProfileRostersActions');

var _ProfileRostersActions2 = _interopRequireDefault(_ProfileRostersActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _ProfileSidenav = require('./ProfileSidenav');

var _ProfileSidenav2 = _interopRequireDefault(_ProfileSidenav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileRosters = function (_React$Component) {
  _inherits(ProfileRosters, _React$Component);

  function ProfileRosters(props) {
    _classCallCheck(this, ProfileRosters);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileRosters).call(this, props));

    _this.state = _ProfileRostersStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ProfileRosters, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ProfileRostersStore2.default.listen(this.onChange);
      _ProfileRostersActions2.default.getComponentData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ProfileRostersStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var list;
      if (this.state.characters.length > 0) {
        list = this.state.characters.map(function (character, index) {
          var rosters;
          if (character.rosters.length > 0) {
            rosters = character.rosters.map(function (roster, index) {
              return _react2.default.createElement(
                'div',
                { className: 'text-center' },
                _react2.default.createElement(
                  'i',
                  null,
                  roster.name
                )
              );
            });
          } else {
            rosters = _react2.default.createElement(
              'div',
              { className: 'text-center' },
              _react2.default.createElement(
                'i',
                null,
                'No Rosters'
              )
            );
          }

          return _react2.default.createElement(
            'div',
            { className: 'col-md-4' },
            _react2.default.createElement(
              'h4',
              { className: 'text-center' },
              _react2.default.createElement(
                'strong',
                null,
                character.name
              )
            ),
            _react2.default.createElement('br', null),
            rosters
          );
        }, this);
      }

      return _react2.default.createElement(
        'div',
        { id: 'wrapper' },
        _react2.default.createElement(_ProfileSidenav2.default, null),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement(
              'h3',
              null,
              'Character Rosters'
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              list
            )
          )
        )
      );
    }
  }]);

  return ProfileRosters;
}(_react2.default.Component);

exports.default = ProfileRosters;

},{"../actions/ProfileRostersActions":7,"../stores/NavbarStore":44,"../stores/ProfileRostersStore":47,"./ProfileSidenav":28,"react":"react","react-router":"react-router"}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileSidenav = function (_React$Component) {
  _inherits(ProfileSidenav, _React$Component);

  function ProfileSidenav() {
    _classCallCheck(this, ProfileSidenav);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ProfileSidenav).apply(this, arguments));
  }

  _createClass(ProfileSidenav, [{
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
              { to: '/profile' },
              _react2.default.createElement(
                'strong',
                null,
                'Profile'
              )
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/profile/character' },
              'Characters'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/profile/schedule' },
              'Schedules'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/profile/roster' },
              'Rosters'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/profile/raidweek' },
              'Raid Weeks'
            )
          )
        )
      );
    }
  }]);

  return ProfileSidenav;
}(_react2.default.Component);

exports.default = ProfileSidenav;

},{"react":"react","react-router":"react-router"}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ScheduleViewStore = require('../stores/ScheduleViewStore');

var _ScheduleViewStore2 = _interopRequireDefault(_ScheduleViewStore);

var _ScheduleViewActions = require('../actions/ScheduleViewActions');

var _ScheduleViewActions2 = _interopRequireDefault(_ScheduleViewActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _SingleScheduleView = require('./SingleScheduleView');

var _SingleScheduleView2 = _interopRequireDefault(_SingleScheduleView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScheduleView = function (_React$Component) {
  _inherits(ScheduleView, _React$Component);

  function ScheduleView(props) {
    _classCallCheck(this, ScheduleView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScheduleView).call(this, props));

    _this.state = _ScheduleViewStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ScheduleView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _ScheduleViewStore2.default.listen(this.onChange);
      _ScheduleViewActions2.default.setPropValues(this.props.location.query.type, this.props.location.query.schedule);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ScheduleViewStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var scheduleView;

      switch (parseInt(this.state.viewType)) {
        case 1:
          scheduleView = _react2.default.createElement(_SingleScheduleView2.default, { schedule: this.props.location.query.schedule,
            filter: this.state });
          break;
      }

      return _react2.default.createElement(
        'div',
        { id: 'wrapper' },
        _react2.default.createElement(
          'div',
          { id: 'sidebar-wrapper' },
          _react2.default.createElement(
            'ul',
            { className: 'sidebar-nav' },
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'strong',
                null,
                'Filter'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default btn-block', onClick: function onClick() {
                    return _ScheduleViewActions2.default.setFilterType(1);
                  } },
                'All'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'button',
                { className: 'btn btn-default btn-block', onClick: function onClick() {
                    return _ScheduleViewActions2.default.setFilterType(2);
                  } },
                'My Characters'
              )
            ),
            _react2.default.createElement(
              'li',
              null,
              'Raid Week:',
              _react2.default.createElement('br', null)
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            scheduleView
          )
        )
      );
    }
  }]);

  return ScheduleView;
}(_react2.default.Component);

exports.default = ScheduleView;

},{"../actions/ScheduleViewActions":8,"../stores/NavbarStore":44,"../stores/ScheduleViewStore":49,"./SingleScheduleView":30,"react":"react","react-router":"react-router"}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _SingleScheduleViewStore = require('../stores/SingleScheduleViewStore');

var _SingleScheduleViewStore2 = _interopRequireDefault(_SingleScheduleViewStore);

var _SingleScheduleViewActions = require('../actions/SingleScheduleViewActions');

var _SingleScheduleViewActions2 = _interopRequireDefault(_SingleScheduleViewActions);

var _NavbarStore = require('../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var wowClasses = require('./../../utility/WowClasses');

var SingleScheduleView = function (_React$Component) {
  _inherits(SingleScheduleView, _React$Component);

  function SingleScheduleView(props) {
    _classCallCheck(this, SingleScheduleView);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SingleScheduleView).call(this, props));

    _this.state = _SingleScheduleViewStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(SingleScheduleView, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      _SingleScheduleViewStore2.default.listen(this.onChange);
      _SingleScheduleViewActions2.default.loadSingleSchedule(this.props.schedule);
      _SingleScheduleViewActions2.default.loadUserCharacters();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _SingleScheduleViewStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'classColour',
    value: function classColour(character) {
      var currentClass = _underscore2.default.findWhere(wowClasses, { id: parseInt(character.class) }).name;
      var arr = currentClass.split(" ");

      var ret = '';
      for (var i = 0; i < arr.length; ++i) {
        ret += arr[i].toLowerCase();
        ret += '-';
      }

      ret += 'color';
      return (0, _classnames2.default)(ret, { 'col-sm-1': true });;
    }
  }, {
    key: 'render',
    value: function render() {
      var scheduleBossRows, scheduleName, tankRows, healerRows, dpsRows;
      if (this.state.schedule != null) {
        scheduleName = _react2.default.createElement(
          'h3',
          null,
          this.state.schedule.name
        );
        scheduleBossRows = this.state.schedule.schedule_bosses.map(function (schedule_boss, index) {
          var tankCount = 0;
          tankRows = schedule_boss.characters.map(function (character) {
            if (character.main_role == "Tank") {
              tankCount++;
              var classCSS = this.classColour(character);
              return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', { className: classCSS }),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-11 vert-align' },
                  character.name
                )
              );
            }
          }, this);

          var healerCount = 0;
          healerRows = schedule_boss.characters.map(function (character) {
            if (character.main_role == "Healer") {
              healerCount++;
              var classCSS = this.classColour(character);
              return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', { className: classCSS }),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-11 vert-align' },
                  character.name
                )
              );
            }
          }, this);

          var dpsCount = 0;
          dpsRows = schedule_boss.characters.map(function (character) {
            if (character.main_role == "DPS") {
              dpsCount++;
              var classCSS = this.classColour(character);
              return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', { className: classCSS }),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-11 vert-align' },
                  character.name
                )
              );
            }
          }, this);

          return _react2.default.createElement(
            'div',
            { className: 'row' },
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
                    { className: 'col-md-1' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Raid'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Boss'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-2' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Tanks'
                    ),
                    ' (',
                    tankCount,
                    ')'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Healers'
                    ),
                    ' (',
                    healerCount,
                    ')'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'DPS'
                    ),
                    ' (',
                    dpsCount,
                    ')'
                  )
                ),
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    schedule_boss.raid.name
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    schedule_boss.boss.name
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'table',
                      { className: 'table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        tankRows
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'table',
                      { className: 'table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        healerRows
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'table',
                      { className: 'table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        dpsRows
                      )
                    )
                  )
                )
              )
            )
          );
        }, this);
      }

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        scheduleName,
        scheduleBossRows
      );
    }
  }]);

  return SingleScheduleView;
}(_react2.default.Component);

exports.default = SingleScheduleView;

},{"../actions/SingleScheduleViewActions":9,"../stores/NavbarStore":44,"../stores/SingleScheduleViewStore":50,"./../../utility/WowClasses":69,"classnames":60,"react":"react","react-router":"react-router","underscore":"underscore"}],31:[function(require,module,exports){
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
      var rosterDescription = this.state.rosterDescription.trim();

      var roster = {};
      roster.name = rosterName;
      roster.description = rosterDescription;

      if (roster.name != '') {
        _AddRosterActions2.default.addRoster(roster);
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
              _react2.default.createElement('textarea', { className: 'form-control', name: 'description', value: this.state.rosterDescription, onChange: _AddRosterActions2.default.updateRosterDescription })
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

},{"../../actions/admin/AddRosterActions":10,"../../stores/admin/AddRosterStore":51,"react":"react","react-router":"react-router"}],32:[function(require,module,exports){
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
        { id: 'wrapper' },
        _react2.default.createElement(_AdminSideNav2.default, null),
        _react2.default.createElement(
          'div',
          { id: 'page-content-wrapper' },
          _react2.default.createElement(
            'div',
            { className: 'container-fluid' },
            _react2.default.createElement('div', { className: 'row' })
          )
        )
      );
    }
  }]);

  return Admin;
}(_react2.default.Component);

exports.default = Admin;

},{"../../actions/admin/AdminActions":11,"../../stores/admin/AdminStore":53,"./../../stores/NavbarStore":44,"./AdminSideNav":33,"react":"react","react-router":"react-router"}],33:[function(require,module,exports){
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
              { to: '/admin' },
              _react2.default.createElement(
                'strong',
                null,
                'Admin'
              )
            )
          ),
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
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/raidweek' },
              'Raid Week Management'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/raid' },
              'Raid Management'
            )
          ),
          _react2.default.createElement(
            'li',
            null,
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/admin/attendance' },
              'Attendance Management'
            )
          )
        )
      );
    }
  }]);

  return AdminSideNav;
}(_react2.default.Component);

exports.default = AdminSideNav;

},{"../../actions/admin/AdminSideNavActions":12,"../../stores/admin/AdminSideNavStore":52,"react":"react","react-router":"react-router"}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _AttendanceManagementStore = require('../../stores/admin/AttendanceManagementStore');

var _AttendanceManagementStore2 = _interopRequireDefault(_AttendanceManagementStore);

var _AttendanceManagementActions = require('../../actions/admin/AttendanceManagementActions');

var _AttendanceManagementActions2 = _interopRequireDefault(_AttendanceManagementActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _reactRadioGroup = require('react-radio-group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AttendanceManagement = function (_React$Component) {
  _inherits(AttendanceManagement, _React$Component);

  function AttendanceManagement(props) {
    _classCallCheck(this, AttendanceManagement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AttendanceManagement).call(this, props));

    _this.state = _AttendanceManagementStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(AttendanceManagement, [{
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
      _AttendanceManagementStore2.default.listen(this.onChange);
      _AttendanceManagementActions2.default.loadComponentData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _AttendanceManagementStore2.default.unlisten(this.onChange);
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
                'div',
                { className: 'col-md-12' },
                _react2.default.createElement(
                  'div',
                  { className: 'col-md-6 col-md-offset-3' },
                  _react2.default.createElement(
                    'h2',
                    null,
                    'Select Raid'
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'row' },
                    _react2.default.createElement(
                      'div',
                      { className: 'form-horizontal' },
                      _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                          'label',
                          { className: 'col-sm-2 control-label' },
                          'Raid Week:'
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'col-sm-10' },
                          _react2.default.createElement(
                            'select',
                            { value: this.state.selectRaidWeek, onChange: function onChange(e) {
                                return _AttendanceManagementActions2.default.updateSelectRaidWeek(e.target.value);
                              } },
                            selectRaidWeekOptions
                          )
                        )
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                          'label',
                          { className: 'col-sm-2 control-label' },
                          'Week Day:'
                        ),
                        _react2.default.createElement(
                          'div',
                          { className: 'col-sm-10' },
                          _react2.default.createElement(
                            _reactRadioGroup.RadioGroup,
                            { name: 'weekday', selectedValue: this.state.selectWeekday, onChange: function onChange(e) {
                                return _AttendanceManagementActions2.default.updateSelectWeekday(e.target.value);
                              } },
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'sunday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].sunday ? 'disabled' : 'enabled' }),
                            'Sunday',
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'monday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].monday ? 'disabled' : 'enabled' }),
                            'Monday',
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'tuesday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].tuesday ? 'disabled' : 'enabled' }),
                            'Tuesday',
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'wednesday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].wednesday ? 'disabled' : 'enabled' }),
                            'Wednesday',
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'thursday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].thursday ? 'disabled' : 'enabled' }),
                            'Thursday',
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'friday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].friday ? 'disabled' : 'enabled' }),
                            'Friday',
                            _react2.default.createElement(_reactRadioGroup.Radio, { value: 'saturday', disabled: !this.state.raidweeks[this.state.selectRaidWeek].saturday ? 'disabled' : 'enabled' }),
                            'Saturday'
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return AttendanceManagement;
}(_react2.default.Component);

exports.default = AttendanceManagement;

},{"../../actions/admin/AttendanceManagementActions":13,"../../stores/admin/AttendanceManagementStore":54,"./../../stores/NavbarStore":44,"./AdminSideNav":33,"react":"react","react-radio-group":62,"react-router":"react-router"}],35:[function(require,module,exports){
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

},{"./../../../utility/WowClasses":69,"./../../../utility/WowRaces":70,"./../../actions/admin/CharacterManagementActions":14,"./../../stores/NavbarStore":44,"./../../stores/admin/CharacterManagementStore":55,"./AdminSideNav":33,"react":"react","react-router":"react-router","underscore":"underscore"}],36:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RaidManagementStore = require('../../stores/admin/RaidManagementStore');

var _RaidManagementStore2 = _interopRequireDefault(_RaidManagementStore);

var _RaidManagementActions = require('../../actions/admin/RaidManagementActions');

var _RaidManagementActions2 = _interopRequireDefault(_RaidManagementActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RaidManagement = function (_React$Component) {
  _inherits(RaidManagement, _React$Component);

  function RaidManagement(props) {
    _classCallCheck(this, RaidManagement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RaidManagement).call(this, props));

    _this.state = _RaidManagementStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RaidManagement, [{
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
      _RaidManagementStore2.default.listen(this.onChange);
      _RaidManagementActions2.default.loadRaids();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _RaidManagementStore2.default.unlisten(this.onChange);
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

      var currentRaidId;
      var raidOptionList;
      var raidBossList;
      if (this.state.raids.length > 0) {
        raidOptionList = this.state.raids.map(function (raid, index) {
          if (raid.name === this.state.selectedRaid) {
            currentRaidId = raid.id;

            if (raid.bosses && raid.bosses.length > 0) {
              raidBossList = raid.bosses.map(function (boss, index) {
                return _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    null,
                    boss.name
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    boss.description
                  ),
                  _react2.default.createElement(
                    'td',
                    null,
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-danger', onClick: function onClick() {
                          return _RaidManagementActions2.default.deleteBoss(boss);
                        } },
                      'Delete'
                    )
                  )
                );
              });
            }
          }

          return _react2.default.createElement(
            'option',
            { key: raid.id, value: raid.name },
            raid.name
          );
        }, this);
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
                'div',
                { className: 'col-md-6' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'Add Raid'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-horizontal' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'raidName' },
                      'Name'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'raidName', placeholder: '...', value: this.state.formRaidName, onChange: _RaidManagementActions2.default.updateFormRaidName })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'raidDescription' },
                      'Description'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement('textarea', { className: 'form-control', name: 'raidDescription', value: this.state.formRaidDescription, onChange: _RaidManagementActions2.default.updateFormRaidDescription })
                    )
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default pull-right', onClick: function onClick() {
                        return _RaidManagementActions2.default.createRaid(_this2.state.formRaidName, _this2.state.formRaidDescription);
                      } },
                    'Submit'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'Raids'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'row' },
                  _react2.default.createElement(
                    'div',
                    { className: 'col-md-10' },
                    _react2.default.createElement(
                      'select',
                      { className: 'form-control', value: this.state.selectedRaid, onChange: function onChange(e) {
                          return _RaidManagementActions2.default.updateSelectedRaid(e.target.value);
                        } },
                      raidOptionList
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'col-md-2' },
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-danger', onClick: function onClick() {
                          return _RaidManagementActions2.default.deleteRaid(currentRaidId);
                        } },
                      'Delete'
                    )
                  )
                ),
                _react2.default.createElement('br', null),
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
                          'Description'
                        )
                      ),
                      _react2.default.createElement('td', null),
                      _react2.default.createElement('td', null)
                    ),
                    raidBossList
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'Add Boss'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-horizontal' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'bossName' },
                      'Name'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement('input', { type: 'text', className: 'form-control', id: 'bossName', placeholder: '...', value: this.state.formBossName, onChange: _RaidManagementActions2.default.updateFormBossName })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'bossDescription' },
                      'Description'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement('textarea', { className: 'form-control', name: 'bossDescription', value: this.state.formBossDescription, onChange: _RaidManagementActions2.default.updateFormBossDescription })
                    )
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default pull-right', onClick: function onClick() {
                        return _RaidManagementActions2.default.createBoss(_this2.state.formBossName, _this2.state.formBossDescription, currentRaidId);
                      } },
                    'Submit'
                  )
                )
              )
            ),
            _react2.default.createElement('div', { className: 'row' })
          )
        )
      );
    }
  }]);

  return RaidManagement;
}(_react2.default.Component);

exports.default = RaidManagement;

},{"../../actions/admin/RaidManagementActions":15,"../../stores/admin/RaidManagementStore":56,"./../../stores/NavbarStore":44,"./AdminSideNav":33,"react":"react","react-router":"react-router"}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _RaidWeekManagementStore = require('./../../stores/admin/RaidWeekManagementStore');

var _RaidWeekManagementStore2 = _interopRequireDefault(_RaidWeekManagementStore);

var _RaidWeekManagementActions = require('./../../actions/admin/RaidWeekManagementActions');

var _RaidWeekManagementActions2 = _interopRequireDefault(_RaidWeekManagementActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _reactYearlyCalendar = require('react-yearly-calendar');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RaidWeekManagement = function (_React$Component) {
  _inherits(RaidWeekManagement, _React$Component);

  function RaidWeekManagement(props) {
    _classCallCheck(this, RaidWeekManagement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RaidWeekManagement).call(this, props));

    _this.state = _RaidWeekManagementStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(RaidWeekManagement, [{
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
      _RaidWeekManagementStore2.default.listen(this.onChange);
      _RaidWeekManagementActions2.default.getAllRaidWeeks();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _RaidWeekManagementStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var chosenDay = this.state.selectedDay.isoWeekday();
      var copyToAdd = (0, _moment2.default)(this.state.selectedDay);
      var copyToSub = (0, _moment2.default)(this.state.selectedDay);
      var weekBeginning, weekEnd;
      switch (chosenDay) {
        case 1:
          weekBeginning = copyToSub.subtract('days', 5);
          weekEnd = copyToAdd.add('days', 1);
          break;
        case 2:
          weekBeginning = copyToSub.subtract('days', 6);
          weekEnd = copyToAdd.add('days', 0);
          break;
        case 3:
          weekBeginning = copyToSub.subtract('days', 0);
          weekEnd = copyToAdd.add('days', 6);
          break;
        case 4:
          weekBeginning = copyToSub.subtract('days', 1);
          weekEnd = copyToAdd.add('days', 5);
          break;
        case 5:
          weekBeginning = copyToSub.subtract('days', 2);
          weekEnd = copyToAdd.add('days', 4);
          break;
        case 6:
          weekBeginning = copyToSub.subtract('days', 3);
          weekEnd = copyToAdd.add('days', 3);
          break;
        case 7:
          weekBeginning = copyToSub.subtract('days', 4);
          weekEnd = copyToAdd.add('days', 2);
          break;
      }
      var customCSS = {
        selectedweek: {
          start: weekBeginning.format('YYYY[-]MM[-]DD'),
          end: weekEnd.format('YYYY[-]MM[-]DD')
        }
      };

      var raidweeklist = this.state.raidweeks.map(function (raidweek, index) {
        var _this2 = this;

        return _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'td',
            null,
            (0, _moment2.default)(raidweek.start).format('DD[/]MM[/]YYYY')
          ),
          _react2.default.createElement(
            'td',
            null,
            (0, _moment2.default)(raidweek.end).format('DD[/]MM[/]YYYY')
          ),
          _react2.default.createElement(
            'td',
            null,
            (0, _moment2.default)(raidweek.start).format('W')
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].wednesday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'wednesday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].thursday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'thursday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].friday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'friday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].saturday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'saturday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].sunday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'sunday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].monday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'monday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement('input', { type: 'checkbox', checked: this.state.raidweeks[index].tuesday, onChange: function onChange() {
                return _RaidWeekManagementActions2.default.toggleRaidWeekDay(index, 'tuesday');
              } })
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'button',
              { className: 'btn btn-primary', onClick: function onClick() {
                  return _RaidWeekManagementActions2.default.updateRaidWeek(_this2.state.raidweeks[index]);
                } },
              'Save'
            )
          ),
          _react2.default.createElement(
            'td',
            null,
            _react2.default.createElement(
              'button',
              { value: raidweek.id, className: 'btn btn-danger', onClick: function onClick(e) {
                  return _RaidWeekManagementActions2.default.deleteRaidWeek(e.target.value);
                } },
              'Delete'
            )
          )
        );
      }, this);

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
                'Add New Raid Week'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { id: 'calendar' },
                _react2.default.createElement(_reactYearlyCalendar.CalendarControls, {
                  year: this.state.selectedYear,
                  showTodayButton: true,
                  onPrevYear: _RaidWeekManagementActions2.default.prevYear,
                  onNextYear: _RaidWeekManagementActions2.default.nextYear,
                  goToToday: _RaidWeekManagementActions2.default.goToToday
                }),
                _react2.default.createElement(_reactYearlyCalendar.Calendar, { year: this.state.selectedYear,
                  selectedDay: this.state.selectedDay,
                  onPickDate: function onPickDate(date) {
                    return _RaidWeekManagementActions2.default.changeSelectedDay(date);
                  },
                  firstDayOfWeek: 3,
                  customClasses: customCSS
                })
              ),
              _react2.default.createElement('br', null),
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: function onClick() {
                    return _RaidWeekManagementActions2.default.createNewRaidWeek(weekBeginning);
                  } },
                'Add New Raid Week'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'h3',
                null,
                'Manage Raid Weeks'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
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
                        'Start'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'End'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'Week No.'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'W'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'T'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'F'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'S'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'S'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'M'
                      )
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      _react2.default.createElement(
                        'strong',
                        null,
                        'T'
                      )
                    ),
                    _react2.default.createElement('td', null),
                    _react2.default.createElement('td', null)
                  ),
                  raidweeklist
                )
              )
            )
          )
        )
      );
    }
  }]);

  return RaidWeekManagement;
}(_react2.default.Component);

exports.default = RaidWeekManagement;

},{"./../../actions/admin/RaidWeekManagementActions":16,"./../../stores/NavbarStore":44,"./../../stores/admin/RaidWeekManagementStore":57,"./AdminSideNav":33,"moment":61,"react":"react","react-router":"react-router","react-yearly-calendar":67}],38:[function(require,module,exports){
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
      _RosterManagementActions2.default.getAllRosters();
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
      var _this2 = this;

      var currentRosterId;
      var rosterList = this.state.rosterList.map(function (roster, index) {
        if (roster.name === this.state.selectedRoster) {
          currentRosterId = roster.id;
        }
        return _react2.default.createElement(
          'option',
          { key: roster.id },
          roster.name
        );
      }, this);

      var includedCaracters = this.state.includedRosterCaracters.map(function (character, index) {
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
            { key: 'button' },
            _react2.default.createElement(
              'button',
              { value: character.id, className: 'btn btn-danger', onClick: function onClick(e) {
                  _RosterManagementActions2.default.removeCharacterFromRoster(character.id, currentRosterId);
                } },
              'Remove'
            )
          )
        );
      });

      var excludedCharacters = this.state.excludedRosterCharacters.map(function (character, index) {
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
            { key: 'button' },
            _react2.default.createElement(
              'button',
              { value: character.id, className: 'btn btn-success', onClick: function onClick(e) {
                  _RosterManagementActions2.default.addCharacterToRoster(character.id, currentRosterId);
                } },
              'Add'
            )
          )
        );
      });

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
                'Add New Roster'
              ),
              _react2.default.createElement(_AddRoster2.default, null)
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'h3',
                null,
                'Manage Rosters'
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-4' },
                _react2.default.createElement(
                  'div',
                  { className: 'form-group' },
                  _react2.default.createElement(
                    'select',
                    { name: 'roster-list', className: 'form-control', value: this.state.selectedRoster, onChange: function onChange(e) {
                        _RosterManagementActions2.default.updateSelectedRoster(e.target.value, _this2.state.rosterList);
                      } },
                    rosterList
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-sm-6' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Included'
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
                    includedCaracters
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-sm-6' },
                _react2.default.createElement(
                  'h4',
                  null,
                  'Excluded'
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
                    excludedCharacters
                  )
                )
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

},{"../../actions/admin/RosterManagementActions":17,"../../stores/admin/RosterManagementStore":58,"./../../stores/NavbarStore":44,"./AddRoster":31,"./AdminSideNav":33,"react":"react","react-router":"react-router"}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _ScheduleManagementStore = require('./../../stores/admin/ScheduleManagementStore');

var _ScheduleManagementStore2 = _interopRequireDefault(_ScheduleManagementStore);

var _ScheduleManagementActions = require('./../../actions/admin/ScheduleManagementActions');

var _ScheduleManagementActions2 = _interopRequireDefault(_ScheduleManagementActions);

var _AdminSideNav = require('./AdminSideNav');

var _AdminSideNav2 = _interopRequireDefault(_AdminSideNav);

var _NavbarStore = require('./../../stores/NavbarStore');

var _NavbarStore2 = _interopRequireDefault(_NavbarStore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ = require('underscore');

var wowClasses = require('./../../../utility/WowClasses');

var ScheduleManagement = function (_React$Component) {
  _inherits(ScheduleManagement, _React$Component);

  function ScheduleManagement(props) {
    _classCallCheck(this, ScheduleManagement);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScheduleManagement).call(this, props));

    _this.state = _ScheduleManagementStore2.default.getState();
    _this.onChange = _this.onChange.bind(_this);
    return _this;
  }

  _createClass(ScheduleManagement, [{
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
      _ScheduleManagementStore2.default.listen(this.onChange);
      _ScheduleManagementActions2.default.loadComponentData();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _ScheduleManagementStore2.default.unlisten(this.onChange);
    }
  }, {
    key: 'onChange',
    value: function onChange(state) {
      this.setState(state);
    }
  }, {
    key: 'classColour',
    value: function classColour(character) {
      var currentClass = _.findWhere(wowClasses, { id: parseInt(character.class) }).name;
      var arr = currentClass.split(" ");

      var ret = '';
      for (var i = 0; i < arr.length; ++i) {
        ret += arr[i].toLowerCase();
        ret += '-';
      }

      ret += 'color';
      return (0, _classnames2.default)(ret, { 'col-sm-1': true });;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var raidWeekOptions, selectedRaidWeekOptions, selectedScheduleOptions, formRosterOptions;
      var formRaidWeekId, selectedRaidWeekId, selectedScheduleId, selectedRosterId;

      if (this.state.raidweeks.length > 0) {
        raidWeekOptions = this.state.raidweeks.map(function (raidweek, index) {
          if (raidweek.id === this.state.formRaidWeek) {
            formRaidWeekId = raidweek.id;
          }

          return _react2.default.createElement(
            'option',
            { key: raidweek.id, value: raidweek.id },
            (0, _moment2.default)(raidweek.start).format('W')
          );
        }, this);

        selectedRaidWeekOptions = this.state.raidweeks.map(function (raidweek, index) {
          if (raidweek.id === this.state.selectedRaidWeek) {
            selectedRaidWeekId = raidweek.id;
          }

          return _react2.default.createElement(
            'option',
            { key: raidweek.id, value: raidweek.id },
            (0, _moment2.default)(raidweek.start).format('W')
          );
        }, this);
      }

      if (this.state.rosters.length > 0) {
        formRosterOptions = this.state.rosters.map(function (roster, index) {
          if (roster.id === this.state.formRoster) {
            selectedRosterId = roster.id;
          }

          return _react2.default.createElement(
            'option',
            { key: roster.id, value: roster.id },
            roster.name
          );
        }, this);
      }

      if (this.state.schedules.length > 0) {
        (function () {
          var optionCount = 0;
          selectedScheduleOptions = _this2.state.schedules.map(function (schedule, index) {
            if (schedule.id === this.state.selectedSchedule.id) {
              selectedScheduleId = schedule.id;
            }

            if (schedule.raid_week_id === selectedRaidWeekId) {
              optionCount++;
              return _react2.default.createElement(
                'option',
                { key: schedule.id, value: schedule.id },
                schedule.name
              );
            }
          }, _this2);

          if (optionCount === 0) {
            selectedScheduleOptions = _react2.default.createElement(
              'option',
              null,
              'No Schedules'
            );
          }
        })();
      }

      var formRaidOptions, formBossOptions;

      if (this.state.raids.length > 0) {
        var _optionCount = 0;
        formRaidOptions = this.state.raids.map(function (raid, index) {
          if (raid.id == this.state.formRaid) {
            if (raid.bosses.length > 0) {
              formBossOptions = raid.bosses.map(function (boss, index) {
                return _react2.default.createElement(
                  'option',
                  { key: boss.id, value: boss.id },
                  boss.name
                );
              }, this);
            } else {
              formBossOptions = _react2.default.createElement(
                'option',
                null,
                'No Bosses'
              );
            }

            return _react2.default.createElement(
              'option',
              { key: raid.id, value: raid.id },
              raid.name
            );
          }
        }, this);
      }

      var scheduleBossRows;
      var tankRows, healerRows, dpsRows;

      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////
      /////                 START OF SCHEDULE BOSS PROCESSING                               /////
      ///////////////////////////////////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////////////////////////////////

      if (this.state.schedules.length > 0) {
        var sched;
        for (var i = 0; i < this.state.schedules.length; i++) {
          if (this.state.schedules[i].id == this.state.selectedSchedule) {
            sched = this.state.schedules[i];
          }
        }

        scheduleBossRows = sched.schedule_bosses.map(function (schedule_boss, index) {
          var tankCount = 0;
          tankRows = sched.roster.characters.map(function (character, index) {
            if (character.main_role == "Tank") {
              var char = _.findWhere(schedule_boss.characters, { id: character.id });
              var actionButton;
              if (char) {
                tankCount++;
                actionButton = _react2.default.createElement(
                  'button',
                  { className: 'btn btn-success btn-circle', onClick: function onClick() {
                      return _ScheduleManagementActions2.default.removeCharacterFromScheduleBoss(schedule_boss.id, character.id);
                    } },
                  '✓'
                );
              } else {
                actionButton = _react2.default.createElement('button', { className: 'btn btn-default btn-circle', onClick: function onClick() {
                    return _ScheduleManagementActions2.default.addCharacterToScheduleBoss(schedule_boss.id, character.id);
                  } });
              }

              var classCSS = this.classColour(character);
              return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', { className: classCSS }),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-3 vert-align' },
                  character.name
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 vert-align' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    character.main_role
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 vert-align' },
                  character.off_role
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  actionButton
                )
              );
            }
          }, this);

          var healerCount = 0;
          healerRows = sched.roster.characters.map(function (character, index) {
            if (character.main_role == "Healer") {
              var char = _.findWhere(schedule_boss.characters, { id: character.id });
              var actionButton;
              if (char) {
                healerCount++;
                actionButton = _react2.default.createElement(
                  'button',
                  { className: 'btn btn-success btn-circle', onClick: function onClick() {
                      return _ScheduleManagementActions2.default.removeCharacterFromScheduleBoss(schedule_boss.id, character.id);
                    } },
                  '✓'
                );
              } else {
                actionButton = _react2.default.createElement('button', { className: 'btn btn-default btn-circle', onClick: function onClick() {
                    return _ScheduleManagementActions2.default.addCharacterToScheduleBoss(schedule_boss.id, character.id);
                  } });
              }

              var classCSS = this.classColour(character);
              return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', { className: classCSS }),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-3 vert-align' },
                  character.name
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 vert-align' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    character.main_role
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 vert-align' },
                  character.off_role
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  actionButton
                )
              );
            }
          }, this);

          var dpsCount = 0;
          dpsRows = sched.roster.characters.map(function (character, index) {
            if (character.main_role == "DPS") {
              var char = _.findWhere(schedule_boss.characters, { id: character.id });
              var actionButton;
              if (char) {
                dpsCount++;
                actionButton = _react2.default.createElement(
                  'button',
                  { className: 'btn btn-success btn-circle', onClick: function onClick() {
                      return _ScheduleManagementActions2.default.removeCharacterFromScheduleBoss(schedule_boss.id, character.id);
                    } },
                  '✓'
                );
              } else {
                actionButton = _react2.default.createElement('button', { className: 'btn btn-default btn-circle', onClick: function onClick() {
                    return _ScheduleManagementActions2.default.addCharacterToScheduleBoss(schedule_boss.id, character.id);
                  } });
              }

              var classCSS = this.classColour(character);
              return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement('td', { className: classCSS }),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-3 vert-align' },
                  character.name
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 vert-align' },
                  _react2.default.createElement(
                    'strong',
                    null,
                    character.main_role
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 vert-align' },
                  character.off_role
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  actionButton
                )
              );
            }
          }, this);

          return _react2.default.createElement(
            'div',
            { className: 'row' },
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
                    { className: 'col-md-1' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Raid'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Boss'
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-2' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Tanks'
                    ),
                    ' - Scheduled(',
                    schedule_boss.tank_count,
                    ') - Assigned(',
                    tankCount,
                    ')'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Healers'
                    ),
                    ' - Scheduled(',
                    schedule_boss.healer_count,
                    ') - Assigned(',
                    healerCount,
                    ')'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'strong',
                      null,
                      'DPS'
                    ),
                    ' - Scheduled(',
                    schedule_boss.dps_count,
                    ') - Assigned(',
                    dpsCount,
                    ')'
                  )
                ),
                _react2.default.createElement(
                  'tr',
                  null,
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    schedule_boss.raid.name
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    schedule_boss.boss.name
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'table',
                      { className: 'table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        tankRows
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'table',
                      { className: 'table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        healerRows
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    _react2.default.createElement(
                      'table',
                      { className: 'table' },
                      _react2.default.createElement(
                        'tbody',
                        null,
                        dpsRows
                      )
                    )
                  )
                )
              )
            )
          );
        }, this);

        var published = sched.published;
        var publishedButton;
        if (published) {
          publishedButton = _react2.default.createElement(
            'button',
            { className: 'btn btn-success btn-circle', onClick: function onClick() {
                return _ScheduleManagementActions2.default.invertSchedulePublishedState(_this2.state.selectedSchedule);
              } },
            '✓'
          );
        } else {
          publishedButton = _react2.default.createElement('button', { className: 'btn btn-default btn-circle', onClick: function onClick() {
              return _ScheduleManagementActions2.default.invertSchedulePublishedState(_this2.state.selectedSchedule);
            } });
        }
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
                'Create Schedule'
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6' },
                _react2.default.createElement(
                  'div',
                  { className: 'form-horizontal' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'scheduleRaidWeek' },
                      'Raid Week'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement(
                        'select',
                        { className: 'form-control', id: 'scheduleRaidWeek', value: this.state.formRaidWeek, onChange: function onChange(e) {
                            return _ScheduleManagementActions2.default.updateFormRaidWeek(parseInt(e.target.value));
                          } },
                        raidWeekOptions
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Roster'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement(
                        'select',
                        { className: 'form-control', value: this.state.formRoster, onChange: function onChange(e) {
                            return _ScheduleManagementActions2.default.updateFormRoster(parseInt(e.target.value));
                          } },
                        formRosterOptions
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'scheduleName' },
                      'Name'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement('input', { className: 'form-control', name: 'scheduleName', value: this.state.formScheduleName, onChange: function onChange(e) {
                          return _ScheduleManagementActions2.default.updateFormScheduleName(e.target.value);
                        } })
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label', htmlFor: 'scheduleDescription' },
                      'Description'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement('textarea', { className: 'form-control', name: 'scheduleDescription', value: this.state.formScheduleDescription, onChange: function onChange(e) {
                          return _ScheduleManagementActions2.default.updateFormScheduleDescription(e.target.value);
                        } })
                    )
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-primary pull-right', onClick: function onClick() {
                        return _ScheduleManagementActions2.default.createSchedule(_this2.state.formRaidWeek, _this2.state.formScheduleName, _this2.state.formScheduleDescription);
                      } },
                    'Submit'
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-md-6' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'Manage Schedule'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-horizontal' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Raid Week:'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement(
                        'select',
                        { className: 'form-control', value: this.state.selectedRaidWeek, onChange: function onChange(e) {
                            return _ScheduleManagementActions2.default.updateSelectedRaidWeek(e.target.value);
                          } },
                        selectedRaidWeekOptions
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Schedule: '
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement(
                        'select',
                        { className: 'form-control', value: this.state.selectedSchedule, onChange: function onChange(e) {
                            return _ScheduleManagementActions2.default.updateSelectedSchedule(e.target.value);
                          } },
                        selectedScheduleOptions
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Published: '
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      publishedButton
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-md-6' },
                _react2.default.createElement(
                  'h3',
                  null,
                  'Add Boss'
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'form-horizontal' },
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Raid:'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement(
                        'select',
                        { className: 'form-control', value: this.state.formRaid, onChange: function onChange(e) {
                            return _ScheduleManagementActions2.default.updateFormRaid(e.target.value);
                          } },
                        formRaidOptions
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Boss:'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-10' },
                      _react2.default.createElement(
                        'select',
                        { className: 'form-control', value: this.state.formBoss, onChange: function onChange(e) {
                            return _ScheduleManagementActions2.default.updateFormBoss(e.target.value);
                          } },
                        formBossOptions
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Tanks:'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-2' },
                      _react2.default.createElement('input', { type: 'number', className: 'form-control', value: this.state.formTanks, onChange: function onChange(e) {
                          return _ScheduleManagementActions2.default.updateFormTanks(e.target.value);
                        } })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormTanks(1);
                          } },
                        '1'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormTanks(2);
                          } },
                        '2'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormTanks(3);
                          } },
                        '3'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'Healers:'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-2' },
                      _react2.default.createElement('input', { type: 'number', className: 'form-control', value: this.state.formHealers, onChange: function onChange(e) {
                          return _ScheduleManagementActions2.default.updateFormHealers(e.target.value);
                        } })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormHealers(2);
                          } },
                        '2'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormHealers(3);
                          } },
                        '3'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormHealers(4);
                          } },
                        '4'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormHealers(5);
                          } },
                        '5'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormHealers(6);
                          } },
                        '6'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormHealers(7);
                          } },
                        '7'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                      'label',
                      { className: 'col-sm-2 control-label' },
                      'DPS:'
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-2' },
                      _react2.default.createElement('input', { type: 'number', className: 'form-control', value: this.state.formDPS, onChange: function onChange(e) {
                          return _ScheduleManagementActions2.default.updateFormDPS(e.target.value);
                        } })
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(10);
                          } },
                        '10'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(11);
                          } },
                        '11'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(12);
                          } },
                        '12'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(13);
                          } },
                        '13'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(14);
                          } },
                        '14'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(15);
                          } },
                        '15'
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      { className: 'col-sm-1' },
                      _react2.default.createElement(
                        'button',
                        { className: 'btn btn-default', onClick: function onClick() {
                            return _ScheduleManagementActions2.default.setFormDPS(16);
                          } },
                        '16'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-primary pull-right', onClick: function onClick() {
                        return _ScheduleManagementActions2.default.addScheduleBoss(_this2.state.formRaid, _this2.state.formBoss, _this2.state.formTanks, _this2.state.formHealers, _this2.state.formDPS, _this2.state.selectedSchedule);
                      } },
                    'Submit'
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
                'Schedule Bosses'
              ),
              scheduleBossRows
            )
          )
        )
      );
    }
  }]);

  return ScheduleManagement;
}(_react2.default.Component);

exports.default = ScheduleManagement;

},{"./../../../utility/WowClasses":69,"./../../actions/admin/ScheduleManagementActions":18,"./../../stores/NavbarStore":44,"./../../stores/admin/ScheduleManagementStore":59,"./AdminSideNav":33,"classnames":60,"moment":61,"react":"react","react-router":"react-router","underscore":"underscore"}],40:[function(require,module,exports){
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

},{"./routes":41,"react":"react","react-dom":"react-dom","react-router":"react-router"}],41:[function(require,module,exports){
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

var _CharacterManagement = require('./components/admin/CharacterManagement');

var _CharacterManagement2 = _interopRequireDefault(_CharacterManagement);

var _ScheduleManagement = require('./components/admin/ScheduleManagement');

var _ScheduleManagement2 = _interopRequireDefault(_ScheduleManagement);

var _RaidWeekManagement = require('./components/admin/RaidWeekManagement');

var _RaidWeekManagement2 = _interopRequireDefault(_RaidWeekManagement);

var _RaidManagement = require('./components/admin/RaidManagement');

var _RaidManagement2 = _interopRequireDefault(_RaidManagement);

var _AttendanceManagement = require('./components/admin/AttendanceManagement');

var _AttendanceManagement2 = _interopRequireDefault(_AttendanceManagement);

var _Profile = require('./components/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _ProfileCharacters = require('./components/ProfileCharacters');

var _ProfileCharacters2 = _interopRequireDefault(_ProfileCharacters);

var _ProfileRaidWeeks = require('./components/ProfileRaidWeeks');

var _ProfileRaidWeeks2 = _interopRequireDefault(_ProfileRaidWeeks);

var _ProfileRosters = require('./components/ProfileRosters');

var _ProfileRosters2 = _interopRequireDefault(_ProfileRosters);

var _ScheduleView = require('./components/ScheduleView');

var _ScheduleView2 = _interopRequireDefault(_ScheduleView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _Home2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _Profile2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile/character', component: _ProfileCharacters2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile/raidweek', component: _ProfileRaidWeeks2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/profile/roster', component: _ProfileRosters2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _Admin2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/roster', component: _RosterManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/character', component: _CharacterManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/schedule', component: _ScheduleManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/raidweek', component: _RaidWeekManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/raid', component: _RaidManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/attendance', component: _AttendanceManagement2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/schedule', component: _ScheduleView2.default })
);

},{"./components/App":20,"./components/Home":22,"./components/Profile":24,"./components/ProfileCharacters":25,"./components/ProfileRaidWeeks":26,"./components/ProfileRosters":27,"./components/ScheduleView":29,"./components/admin/Admin":32,"./components/admin/AttendanceManagement":34,"./components/admin/CharacterManagement":35,"./components/admin/RaidManagement":36,"./components/admin/RaidWeekManagement":37,"./components/admin/RosterManagement":38,"./components/admin/ScheduleManagement":39,"react":"react","react-router":"react-router"}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _FooterActions = require('../actions/FooterActions');

var _FooterActions2 = _interopRequireDefault(_FooterActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FooterStore = function FooterStore() {
  _classCallCheck(this, FooterStore);

  this.bindActions(_FooterActions2.default);
  this.admins = ['Aeristial', 'Derp', 'Macio', 'Trallas', 'Xenorie'];
};

exports.default = _alt2.default.createStore(FooterStore);

},{"../actions/FooterActions":1,"../alt":19}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _HomeActions = require('../actions/HomeActions');

var _HomeActions2 = _interopRequireDefault(_HomeActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HomeStore = function () {
  function HomeStore() {
    _classCallCheck(this, HomeStore);

    this.bindActions(_HomeActions2.default);
    this.raidweeks = [];
  }

  _createClass(HomeStore, [{
    key: 'onLoadComponentDataSuccess',
    value: function onLoadComponentDataSuccess(result) {
      this.raidweeks = result.data.raidweeks;
    }
  }, {
    key: 'onLoadComponentDataFailure',
    value: function onLoadComponentDataFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return HomeStore;
}();

exports.default = _alt2.default.createStore(HomeStore);

},{"../actions/HomeActions":2,"../alt":19}],44:[function(require,module,exports){
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

},{"../actions/NavbarActions":3,"../alt":19}],45:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ProfileCharactersActions = require('../actions/ProfileCharactersActions');

var _ProfileCharactersActions2 = _interopRequireDefault(_ProfileCharactersActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileCharactersStore = function () {
  function ProfileCharactersStore() {
    _classCallCheck(this, ProfileCharactersStore);

    this.bindActions(_ProfileCharactersActions2.default);
    this.retrievedCharacters = [];
    this.storedCharacters = [];
  }

  _createClass(ProfileCharactersStore, [{
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

  return ProfileCharactersStore;
}();

exports.default = _alt2.default.createStore(ProfileCharactersStore);

},{"../actions/ProfileCharactersActions":5,"../alt":19}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ProfileRaidWeeksActions = require('../actions/ProfileRaidWeeksActions');

var _ProfileRaidWeeksActions2 = _interopRequireDefault(_ProfileRaidWeeksActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileRaidWeeksStore = function () {
  function ProfileRaidWeeksStore() {
    _classCallCheck(this, ProfileRaidWeeksStore);

    this.bindActions(_ProfileRaidWeeksActions2.default);
    this.raidweeks = [];
    this.user_availability = [];
  }

  _createClass(ProfileRaidWeeksStore, [{
    key: 'onGetAllRaidWeekInfoSuccess',
    value: function onGetAllRaidWeekInfoSuccess(result) {
      this.raidweeks = result.data.raidweeks;
      this.user_availability = result.data.user_availability;
    }
  }, {
    key: 'onGetAllRaidWeekInfoFailure',
    value: function onGetAllRaidWeekInfoFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onToggleUserAvailabilityDay',
    value: function onToggleUserAvailabilityDay(values) {
      // var user_availability = _.findWhere(this.user_availability, {id: values[0]});
      // user_availability[day] = !user_availability[day];
      // for(var obj in this.user_availability) {
      //   if(values[0] == obj.id) {
      //     obj[values[1]] = !obj[values[1]];
      //   }
      // }

      for (var i = 0; i < this.user_availability.length; ++i) {
        if (values[0] == this.user_availability[i].id) {
          this.user_availability[i][values[1]] = !this.user_availability[i][values[1]];
        }
      }
    }
  }, {
    key: 'onCreateUserAvailabilitySuccess',
    value: function onCreateUserAvailabilitySuccess(result) {
      this.user_availability = result.data.user_availability;
    }
  }, {
    key: 'onCreateUserAvailabilityFailure',
    value: function onCreateUserAvailabilityFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onSaveUserAvailabilitySuccess',
    value: function onSaveUserAvailabilitySuccess(result) {
      this.user_availability = result.data.user_availability;
    }
  }, {
    key: 'onSaveUserAvailabilityFailure',
    value: function onSaveUserAvailabilityFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return ProfileRaidWeeksStore;
}();

exports.default = _alt2.default.createStore(ProfileRaidWeeksStore);

},{"../actions/ProfileRaidWeeksActions":6,"../alt":19}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ProfileRostersActions = require('../actions/ProfileRostersActions');

var _ProfileRostersActions2 = _interopRequireDefault(_ProfileRostersActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileRostersStore = function () {
  function ProfileRostersStore() {
    _classCallCheck(this, ProfileRostersStore);

    this.bindActions(_ProfileRostersActions2.default);
    this.characters = [];
  }

  _createClass(ProfileRostersStore, [{
    key: 'onGetComponentDataSuccess',
    value: function onGetComponentDataSuccess(result) {
      this.characters = result.data.characters;
    }
  }, {
    key: 'onGetComponentDataFailure',
    value: function onGetComponentDataFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return ProfileRostersStore;
}();

exports.default = _alt2.default.createStore(ProfileRostersStore);

},{"../actions/ProfileRostersActions":7,"../alt":19}],48:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ProfileActions = require('../actions/ProfileActions');

var _ProfileActions2 = _interopRequireDefault(_ProfileActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProfileStore = function ProfileStore() {
  _classCallCheck(this, ProfileStore);

  this.bindActions(_ProfileActions2.default);
};

exports.default = _alt2.default.createStore(ProfileStore);

},{"../actions/ProfileActions":4,"../alt":19}],49:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ScheduleViewActions = require('../actions/ScheduleViewActions');

var _ScheduleViewActions2 = _interopRequireDefault(_ScheduleViewActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScheduleViewStore = function () {
  function ScheduleViewStore() {
    _classCallCheck(this, ScheduleViewStore);

    this.bindActions(_ScheduleViewActions2.default);
    this.requestedSchedule = 0;
    this.viewType = 0;
    this.filterType = 0;
  }

  _createClass(ScheduleViewStore, [{
    key: 'onSetPropValues',
    value: function onSetPropValues(values) {
      this.viewType = values[0];
      this.requestedSchedule = values[1];
    }
  }, {
    key: 'onSetFilterType',
    value: function onSetFilterType(value) {
      this.filterType = value;
    }
  }]);

  return ScheduleViewStore;
}();

exports.default = _alt2.default.createStore(ScheduleViewStore);

},{"../actions/ScheduleViewActions":8,"../alt":19}],50:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../alt');

var _alt2 = _interopRequireDefault(_alt);

var _SingleScheduleViewActions = require('../actions/SingleScheduleViewActions');

var _SingleScheduleViewActions2 = _interopRequireDefault(_SingleScheduleViewActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SingleScheduleViewStore = function () {
  function SingleScheduleViewStore() {
    _classCallCheck(this, SingleScheduleViewStore);

    this.bindActions(_SingleScheduleViewActions2.default);
    this.schedule = null;
    this.characters = [];
  }

  _createClass(SingleScheduleViewStore, [{
    key: 'onLoadSingleScheduleSuccess',
    value: function onLoadSingleScheduleSuccess(result) {
      this.schedule = result.data.schedule;
    }
  }, {
    key: 'onLoadSingleScheduleFailure',
    value: function onLoadSingleScheduleFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onLoadUserCharactersSuccess',
    value: function onLoadUserCharactersSuccess(result) {
      this.characters = result.data.characters;
    }
  }, {
    key: 'onLoadUserCharactersFailure',
    value: function onLoadUserCharactersFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return SingleScheduleViewStore;
}();

exports.default = _alt2.default.createStore(SingleScheduleViewStore);

},{"../actions/SingleScheduleViewActions":9,"../alt":19}],51:[function(require,module,exports){
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
    value: function onAddRosterSuccess(result) {
      toastr.success('Roster: ' + result.data.roster.name + ' has been created', "Roster Creation Successful");
      this.rosterName = '';
      this.rosterDescription = '';
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

},{"../../actions/admin/AddRosterActions":10,"../../alt":19}],52:[function(require,module,exports){
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

},{"../../actions/admin/AdminSideNavActions":12,"../../alt":19}],53:[function(require,module,exports){
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

},{"../../actions/admin/AdminActions":11,"../../alt":19}],54:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _AttendanceManagementActions = require('../../actions/admin/AttendanceManagementActions');

var _AttendanceManagementActions2 = _interopRequireDefault(_AttendanceManagementActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AttendanceManagementStore = function () {
  function AttendanceManagementStore() {
    _classCallCheck(this, AttendanceManagementStore);

    this.bindActions(_AttendanceManagementActions2.default);
    this.raidweeks = [];
    this.selectRaidWeek = 0;
    this.selectWeekday = '';
  }

  _createClass(AttendanceManagementStore, [{
    key: 'onLoadComponentDataSuccess',
    value: function onLoadComponentDataSuccess(result) {
      this.raidweeks = result.data.raidweeks;
      this.selectRaidWeek = this.raidsweeks[0].id;
    }
  }, {
    key: 'onLoadComponentDataFailure',
    value: function onLoadComponentDataFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUpdateSelectRaidWeek',
    value: function onUpdateSelectRaidWeek(value) {
      this.selectRaidWeek = value;
    }
  }, {
    key: 'onUpdateSelectSchedule',
    value: function onUpdateSelectSchedule(value) {
      this.selectWeekday = value;
    }
  }]);

  return AttendanceManagementStore;
}();

exports.default = _alt2.default.createStore(AttendanceManagementStore);

},{"../../actions/admin/AttendanceManagementActions":13,"../../alt":19}],55:[function(require,module,exports){
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

},{"./../../actions/admin/CharacterManagementActions":14,"./../../alt":19}],56:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _RaidManagementActions = require('../../actions/admin/RaidManagementActions');

var _RaidManagementActions2 = _interopRequireDefault(_RaidManagementActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RaidManagementStore = function () {
  function RaidManagementStore() {
    _classCallCheck(this, RaidManagementStore);

    this.bindActions(_RaidManagementActions2.default);
    this.formRaidName = '';
    this.formRaidDescription = '';
    this.raids = [];
    this.selectedRaid = '';
    this.bossName = '';
    this.bossDescription = '';
  }

  _createClass(RaidManagementStore, [{
    key: 'onUpdateFormRaidName',
    value: function onUpdateFormRaidName(e) {
      this.formRaidName = e.target.value;
    }
  }, {
    key: 'onUpdateFormRaidDescription',
    value: function onUpdateFormRaidDescription(e) {
      this.formRaidDescription = e.target.value;
    }
  }, {
    key: 'onUpdateFormBossName',
    value: function onUpdateFormBossName(e) {
      this.formBossName = e.target.value;
    }
  }, {
    key: 'onUpdateFormBossDescription',
    value: function onUpdateFormBossDescription(e) {
      this.formBossDescription = e.target.value;
    }
  }, {
    key: 'onUpdateSelectedRaid',
    value: function onUpdateSelectedRaid(value) {
      this.selectedRaid = value;
    }
  }, {
    key: 'onLoadRaidsSuccess',
    value: function onLoadRaidsSuccess(result) {
      this.raids = result.data.raids;
      if (this.raids.length > 0) {
        this.selectedRaid = this.raids[0].name;
      }
    }
  }, {
    key: 'onLoadRaidsFailure',
    value: function onLoadRaidsFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onCreateRaidSuccess',
    value: function onCreateRaidSuccess(result) {
      this.raids = result.data.raids;
      this.formRaidName = '';
      this.formRaidDescription = '';
      toastr.success('Raid created', 'Success');
    }
  }, {
    key: 'onCreateRaidFailure',
    value: function onCreateRaidFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onCreateBossSuccess',
    value: function onCreateBossSuccess(result) {
      this.raids = result.data.raids;
      this.formBossName = '';
      this.formBossDescription = '';
      toastr.success('Boss created', 'Success');
    }
  }, {
    key: 'onCreateBossFailure',
    value: function onCreateBossFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onEditBoss',
    value: function onEditBoss(boss) {
      this.formBossName = boss.name;
      this.formBossDescription = boss.description;
    }
  }, {
    key: 'onDeleteBossSuccess',
    value: function onDeleteBossSuccess(result) {
      this.raids = result.data.raids;
      toastr.success('Boss deleted', 'Success');
    }
  }, {
    key: 'onDeleteBossFailure',
    value: function onDeleteBossFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onDeleteRaidSuccess',
    value: function onDeleteRaidSuccess(result) {
      this.raids = result.data.raids;
      if (this.raids.length > 0) {
        this.selectedRaid = this.raids[0].name;
      }
      toastr.success('Raid deleted', 'Success');
    }
  }, {
    key: 'onDeleteRaidFailure',
    value: function onDeleteRaidFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return RaidManagementStore;
}();

exports.default = _alt2.default.createStore(RaidManagementStore);

},{"../../actions/admin/RaidManagementActions":15,"../../alt":19}],57:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('./../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _RaidWeekManagementActions = require('./../../actions/admin/RaidWeekManagementActions');

var _RaidWeekManagementActions2 = _interopRequireDefault(_RaidWeekManagementActions);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RaidWeekManagementStore = function () {
  function RaidWeekManagementStore() {
    _classCallCheck(this, RaidWeekManagementStore);

    this.bindActions(_RaidWeekManagementActions2.default);
    this.selectedYear = (0, _moment2.default)().year();
    this.selectedDay = (0, _moment2.default)();
    this.raidweeks = [];
  }

  _createClass(RaidWeekManagementStore, [{
    key: 'onSelectedDayChanged',
    value: function onSelectedDayChanged(date) {
      this.selectedDay = date;
    }
  }, {
    key: 'onNextYear',
    value: function onNextYear() {
      this.selectedYear = this.selectedYear + 1;
    }
  }, {
    key: 'onPrevYear',
    value: function onPrevYear() {
      this.selectedYear = this.selectedYear - 1;
    }
  }, {
    key: 'onGoToToday',
    value: function onGoToToday() {
      var today = (0, _moment2.default)();

      this.selectedDay = today;
      this.selectedYear = today.year();
    }
  }, {
    key: 'onToggleRaidWeekDay',
    value: function onToggleRaidWeekDay(value) {
      this.raidweeks[value[0]][value[1]] = !this.raidweeks[value[0]][value[1]];
    }
  }, {
    key: 'onGetAllRaidWeeksSuccess',
    value: function onGetAllRaidWeeksSuccess(result) {
      this.raidweeks = result.data.raidweeks;
    }
  }, {
    key: 'onGetAllRaidWeeksFailure',
    value: function onGetAllRaidWeeksFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onCreateNewRaidWeekSuccess',
    value: function onCreateNewRaidWeekSuccess(result) {
      this.raidweeks = result.data.raidweeks;
      toastr.success('Raid Week created', 'Success');
    }
  }, {
    key: 'onCreateNewRaidWeekFailure',
    value: function onCreateNewRaidWeekFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUpdateRaidWeekSuccess',
    value: function onUpdateRaidWeekSuccess(result) {
      this.raidweeks = result.data.raidweeks;
      toastr.success('Raid Week updated', 'Success');
    }
  }, {
    key: 'onUpdateRaidWeekFailure',
    value: function onUpdateRaidWeekFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onDeleteRaidWeekSuccess',
    value: function onDeleteRaidWeekSuccess(result) {
      this.raidweeks = result.data.raidweeks;
      toastr.success('Raid Week deleted', 'Success');
    }
  }, {
    key: 'onDeleteRaidWeekFailure',
    value: function onDeleteRaidWeekFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return RaidWeekManagementStore;
}();

exports.default = _alt2.default.createStore(RaidWeekManagementStore);

},{"./../../actions/admin/RaidWeekManagementActions":16,"./../../alt":19,"moment":61}],58:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _RosterManagementActions = require('../../actions/admin/RosterManagementActions');

var _RosterManagementActions2 = _interopRequireDefault(_RosterManagementActions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RosterManagementStore = function () {
  function RosterManagementStore() {
    _classCallCheck(this, RosterManagementStore);

    this.bindActions(_RosterManagementActions2.default);
    this.rosterList = [];
    this.selectedRoster = '';
    this.includedRosterCaracters = [];
    this.excludedRosterCharacters = [];
  }

  _createClass(RosterManagementStore, [{
    key: 'onGetAllRostersSuccess',
    value: function onGetAllRostersSuccess(result) {
      this.rosterList = result.data.rosters;
    }
  }, {
    key: 'onGetAllRostersFailure',
    value: function onGetAllRostersFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onUpdateSelectedRosterSuccess',
    value: function onUpdateSelectedRosterSuccess(result) {
      this.selectedRoster = result.data.roster.name;
      this.includedRosterCaracters = result.data.includedCharacters;
      this.excludedRosterCharacters = result.data.excludedCharacters;
    }
  }, {
    key: 'onUpdateSelectedRosterFailure',
    value: function onUpdateSelectedRosterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onRemoveCharacterFromRosterSuccess',
    value: function onRemoveCharacterFromRosterSuccess(result) {
      toastr.success('Character removed from the ' + result.data.roster.name + ' roster', 'Success');
    }
  }, {
    key: 'onRemoveCharacterFromRosterFailure',
    value: function onRemoveCharacterFromRosterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onAddCharacterToRosterSuccess',
    value: function onAddCharacterToRosterSuccess(result) {
      toastr.success('Character added to the ' + result.data.roster.name + ' roster', 'Success');
    }
  }, {
    key: 'onAddCharacterToRosterFailure',
    value: function onAddCharacterToRosterFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return RosterManagementStore;
}();

exports.default = _alt2.default.createStore(RosterManagementStore);

},{"../../actions/admin/RosterManagementActions":17,"../../alt":19}],59:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _alt = require('./../../alt');

var _alt2 = _interopRequireDefault(_alt);

var _ScheduleManagementActions = require('./../../actions/admin/ScheduleManagementActions');

var _ScheduleManagementActions2 = _interopRequireDefault(_ScheduleManagementActions);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScheduleManagementStore = function () {
  function ScheduleManagementStore() {
    _classCallCheck(this, ScheduleManagementStore);

    this.bindActions(_ScheduleManagementActions2.default);
    this.raidweeks = [];
    this.raids = [];
    this.characters = [];
    this.schedules = [];
    this.rosters = [];

    this.selectedRaidWeek = 0;
    this.selectedSchedule = 0;

    this.formRaidWeek = 0;
    this.formRoster = 0;
    this.formScheduleName = '';
    this.formScheduleDescription = '';

    this.formRaid = 0;
    this.formBoss = 0;
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
  }

  _createClass(ScheduleManagementStore, [{
    key: 'onUpdateFormRaidWeek',
    value: function onUpdateFormRaidWeek(value) {
      this.formRaidWeek = value;
    }
  }, {
    key: 'onUpdateFormRoster',
    value: function onUpdateFormRoster(value) {
      this.formRoster = value;
    }
  }, {
    key: 'onUpdateFormScheduleName',
    value: function onUpdateFormScheduleName(value) {
      this.formScheduleName = value;
    }
  }, {
    key: 'onUpdateFormScheduleDescription',
    value: function onUpdateFormScheduleDescription(value) {
      this.formScheduleDescription = value;
    }
  }, {
    key: 'onUpdateSelectedRaidWeekCompleted',
    value: function onUpdateSelectedRaidWeekCompleted(values) {
      this.selectedRaidWeek = values[0];
      this.selectedSchedule = values[1];
    }
  }, {
    key: 'onUpdateSelectedSchedule',
    value: function onUpdateSelectedSchedule(value) {
      this.selectedSchedule = value;
    }
  }, {
    key: 'onUpdateFormRaidName',
    value: function onUpdateFormRaidName(value) {
      this.formRaidName = value;
    }
  }, {
    key: 'onUpdateFormBoss',
    value: function onUpdateFormBoss(value) {
      this.formBoss = value;
    }
  }, {
    key: 'onUpdateFormTanks',
    value: function onUpdateFormTanks(value) {
      this.formTanks = value;
    }
  }, {
    key: 'onUpdateFormHealers',
    value: function onUpdateFormHealers(value) {
      this.formHealers = value;
    }
  }, {
    key: 'onUpdateFormDPS',
    value: function onUpdateFormDPS(value) {
      this.formDPS = value;
    }
  }, {
    key: 'onLoadComponentDataSuccess',
    value: function onLoadComponentDataSuccess(result) {
      this.raidweeks = result.data.raidweeks;
      this.characters = result.data.characters;
      this.schedules = result.data.schedules;
      this.raids = result.data.raids;
      this.rosters = result.data.rosters;
      this.selectedRaidWeek = this.raidweeks[0].id;
      this.formRaidWeek = this.raidweeks[0].id;
      this.selectedSchedule = 0;

      var newScheduleList = [];
      for (var i = 0; i < this.schedules.length; i++) {
        if (this.schedules[i].raid_week_id === this.selectedRaidWeek) {
          newScheduleList.push(this.schedules[i]);
        }
      }

      if (newScheduleList.length > 0) {
        this.selectedSchedule = newScheduleList[0].id;
      }

      this.formRaid = this.raids[0].id;
      if (this.raids[0].bosses.length > 0) {
        this.formBoss = this.raids[0].bosses[0].id;
      }

      this.formRoster = this.rosters[0].id;
    }
  }, {
    key: 'onLoadComponentDataFailure',
    value: function onLoadComponentDataFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onCreateScheduleSuccess',
    value: function onCreateScheduleSuccess(result) {
      this.schedules = result.data.schedules;
      this.formScheduleName = '';
      this.formScheduleDescription = '';

      var newScheduleList = [];
      for (var i = 0; i < this.schedules.length; i++) {
        if (this.schedules[i].raid_week_id === this.selectedRaidWeek) {
          newScheduleList.push(this.schedules[i]);
        }
      }

      if (newScheduleList.length > 0) {
        this.selectedSchedule = newScheduleList[0].id;
      }
    }
  }, {
    key: 'onCreateScheduleFailure',
    value: function onCreateScheduleFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onSetFormTanks',
    value: function onSetFormTanks(value) {
      this.formTanks = value;
    }
  }, {
    key: 'onSetFormHealers',
    value: function onSetFormHealers(value) {
      this.formHealers = value;
    }
  }, {
    key: 'onSetFormDPS',
    value: function onSetFormDPS(value) {
      this.formDPS = value;
    }
  }, {
    key: 'onAddScheduleBossSuccess',
    value: function onAddScheduleBossSuccess(result) {
      this.schedules = result.data.schedules;
      toastr.success('Boss added', 'Success');
    }
  }, {
    key: 'onAddScheduleBossFailure',
    value: function onAddScheduleBossFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onAddCharacterToScheduleBossSuccess',
    value: function onAddCharacterToScheduleBossSuccess(result) {
      this.schedules = result.data.schedules;
    }
  }, {
    key: 'onAddCharacterToScheduleBossFailure',
    value: function onAddCharacterToScheduleBossFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onRemoveCharacterFromScheduleBossSuccess',
    value: function onRemoveCharacterFromScheduleBossSuccess(result) {
      this.schedules = result.data.schedules;
    }
  }, {
    key: 'onRemoveCharacterFromScheduleBossFailure',
    value: function onRemoveCharacterFromScheduleBossFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }, {
    key: 'onInvertSchedulePublishedStateSuccess',
    value: function onInvertSchedulePublishedStateSuccess(result) {
      this.schedules = result.data.schedules;
    }
  }, {
    key: 'onInvertSchedulePublishedStateFailure',
    value: function onInvertSchedulePublishedStateFailure(jqXhr) {
      toastr.error(jqXhr.responseJSON.message);
    }
  }]);

  return ScheduleManagementStore;
}();

exports.default = _alt2.default.createStore(ScheduleManagementStore);

},{"./../../actions/admin/ScheduleManagementActions":18,"./../../alt":19,"moment":61}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return this._offset ? new Date(this.valueOf()) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.13.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
},{}],62:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Radio = _react2['default'].createClass({
  displayName: 'Radio',

  contextTypes: {
    radioGroup: _react2['default'].PropTypes.object
  },

  render: function render() {
    var _context$radioGroup = this.context.radioGroup;
    var name = _context$radioGroup.name;
    var selectedValue = _context$radioGroup.selectedValue;
    var onChange = _context$radioGroup.onChange;

    var optional = {};
    if (selectedValue !== undefined) {
      optional.checked = this.props.value === selectedValue;
    }
    if (typeof onChange === 'function') {
      optional.onChange = onChange.bind(null, this.props.value);
    }

    return _react2['default'].createElement('input', _extends({}, this.props, {
      type: 'radio',
      name: name
    }, optional));
  }
});

exports.Radio = Radio;
var RadioGroup = _react2['default'].createClass({
  displayName: 'RadioGroup',

  propTypes: {
    name: _react.PropTypes.string,
    selectedValue: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number, _react.PropTypes.bool]),
    onChange: _react.PropTypes.func,
    children: _react.PropTypes.node.isRequired,
    Component: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.func, _react.PropTypes.object])
  },

  getDefaultProps: function getDefaultProps() {
    return {
      Component: "div"
    };
  },

  childContextTypes: {
    radioGroup: _react2['default'].PropTypes.object
  },

  getChildContext: function getChildContext() {
    var _props = this.props;
    var name = _props.name;
    var selectedValue = _props.selectedValue;
    var onChange = _props.onChange;

    return {
      radioGroup: {
        name: name, selectedValue: selectedValue, onChange: onChange
      }
    };
  },

  render: function render() {
    var _props2 = this.props;
    var Component = _props2.Component;
    var name = _props2.name;
    var selectedValue = _props2.selectedValue;
    var onChange = _props2.onChange;
    var children = _props2.children;

    var rest = _objectWithoutProperties(_props2, ['Component', 'name', 'selectedValue', 'onChange', 'children']);

    return _react2['default'].createElement(
      Component,
      rest,
      children
    );
  }
});
exports.RadioGroup = RadioGroup;
},{"react":"react"}],63:[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Month = require('./Month');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  year: _react2.default.PropTypes.number.isRequired,
  forceFullWeeks: _react2.default.PropTypes.bool,
  showDaysOfWeek: _react2.default.PropTypes.bool,
  showWeekSeparators: _react2.default.PropTypes.bool,
  firstDayOfWeek: _react2.default.PropTypes.number,
  selectRange: _react2.default.PropTypes.bool,
  onPickDate: _react2.default.PropTypes.func,
  onPickRange: _react2.default.PropTypes.func,
  customClasses: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.object, _react2.default.PropTypes.func])
};

var defaultProps = {
  year: (0, _moment2.default)().year(),
  forceFullWeeks: false,
  showDaysOfWeek: true,
  showWeekSeparators: true,
  firstDayOfWeek: 0,
  selectRange: false,
  onPickDate: null,
  onPickRange: null,
  selectedDay: (0, _moment2.default)(),
  customClasses: null
};

var Calendar = (function (_React$Component) {
  _inherits(Calendar, _React$Component);

  function Calendar(props) {
    _classCallCheck(this, Calendar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Calendar).call(this, props));

    _this.state = {
      selectingRange: undefined
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: 'dayClicked',
    value: function dayClicked(date) {
      var _state = this.state;
      var selectingRange = _state.selectingRange;
      var useless = _state.useless;
      var _props = this.props;
      var selectRange = _props.selectRange;
      var onPickRange = _props.onPickRange;
      var onPickDate = _props.onPickDate;

      if (!selectRange) {
        onPickDate && onPickDate(date);
        return;
      }

      if (!selectingRange) {
        selectingRange = [date, date];
      } else {
        onPickRange && onPickRange(selectingRange[0], date);
        selectingRange = undefined;
      }

      this.setState({
        selectingRange: selectingRange
      });
    }
  }, {
    key: 'dayHovered',
    value: function dayHovered(hoveredDay) {
      var selectingRange = this.state.selectingRange;

      if (selectingRange) {
        selectingRange[1] = hoveredDay;

        this.setState({
          selectingRange: selectingRange
        });
      }
    }
  }, {
    key: '_daysOfWeek',
    value: function _daysOfWeek() {
      var _props2 = this.props;
      var firstDayOfWeek = _props2.firstDayOfWeek;
      var forceFullWeeks = _props2.forceFullWeeks;
      var showWeekSeparators = _props2.showWeekSeparators;

      var totalDays = forceFullWeeks ? 42 : 37;

      var days = [];
      (0, _utils.range)(firstDayOfWeek, totalDays + firstDayOfWeek).map(function (i) {
        var day = (0, _moment2.default)().weekday(i).format('dd').charAt(0);

        if (showWeekSeparators) {
          if (i % 7 === firstDayOfWeek && days.length) {
            // push week separator
            days.push(_react2.default.createElement('th', { className: 'week-separator' }));
          }
        }
        days.push(_react2.default.createElement(
          'th',
          {
            key: 'weekday-' + i,
            className: i % 7 === 0 ? 'bolder' : ''
          },
          day
        ));
      });

      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          ' '
        ),
        days
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props;
      var year = _props3.year;
      var firstDayOfWeek = _props3.firstDayOfWeek;
      var selectingRange = this.state.selectingRange;

      var months = (0, _utils.range)(0, 12).map(function (month) {
        return _react2.default.createElement(_Month.Month, _extends({
          month: month,
          key: 'month-' + month,
          dayClicked: function dayClicked(d) {
            return _this2.dayClicked(d);
          },
          dayHovered: function dayHovered(d) {
            return _this2.dayHovered(d);
          }
        }, _this2.props, {
          selectingRange: selectingRange
        }));
      });

      return _react2.default.createElement(
        'table',
        { className: 'calendar' },
        _react2.default.createElement(
          'thead',
          { className: 'day-headers' },
          this.props.showDaysOfWeek ? this._daysOfWeek() : null
        ),
        _react2.default.createElement(
          'tbody',
          null,
          months
        )
      );
    }
  }]);

  return Calendar;
})(_react2.default.Component);

exports.default = Calendar;

Calendar.propTypes = propTypes;
Calendar.defaultProps = defaultProps;
},{"./Month":66,"./utils":68,"moment":61,"react":"react"}],64:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  year: _react2.default.PropTypes.number.isRequired,
  onPrevYear: _react2.default.PropTypes.func,
  onNextYear: _react2.default.PropTypes.func,
  goToToday: _react2.default.PropTypes.func,
  showTodayButton: _react2.default.PropTypes.bool
};

var CalendarControls = (function (_React$Component) {
  _inherits(CalendarControls, _React$Component);

  function CalendarControls() {
    _classCallCheck(this, CalendarControls);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(CalendarControls).apply(this, arguments));
  }

  _createClass(CalendarControls, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var showTodayButton = _props.showTodayButton;
      var goToToday = _props.goToToday;
      var onPrevYear = _props.onPrevYear;
      var onNextYear = _props.onNextYear;

      var todayButton = undefined;
      if (showTodayButton) {
        todayButton = _react2.default.createElement(
          'div',
          {
            className: 'control today',
            onClick: function onClick() {
              return goToToday();
            }
          },
          'Today'
        );
      }

      return _react2.default.createElement(
        'div',
        { className: 'calendar-controls' },
        _react2.default.createElement(
          'div',
          {
            className: 'control',
            onClick: function onClick() {
              return onPrevYear();
            }
          },
          '«'
        ),
        _react2.default.createElement(
          'div',
          { className: 'current-year' },
          this.props.year
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'control',
            onClick: function onClick() {
              return onNextYear();
            }
          },
          '»'
        ),
        todayButton
      );
    }
  }]);

  return CalendarControls;
})(_react2.default.Component);

exports.default = CalendarControls;

CalendarControls.propTypes = propTypes;
},{"react":"react"}],65:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Day = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {
  classes: _react2.default.PropTypes.string,
  dayClicked: _react2.default.PropTypes.func,
  dayHovered: _react2.default.PropTypes.func
};

var defaultProps = {
  classes: ''
};

var Day = exports.Day = (function (_React$Component) {
  _inherits(Day, _React$Component);

  function Day() {
    _classCallCheck(this, Day);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Day).apply(this, arguments));
  }

  _createClass(Day, [{
    key: '_onClick',
    value: function _onClick() {
      var _props = this.props;
      var dayClicked = _props.dayClicked;
      var day = _props.day;

      dayClicked(day);
    }
  }, {
    key: '_onHover',
    value: function _onHover() {
      var _props2 = this.props;
      var dayHovered = _props2.dayHovered;
      var day = _props2.day;

      dayHovered(day);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props;
      var classes = _props3.classes;
      var day = _props3.day;

      return _react2.default.createElement(
        'td',
        {
          onClick: function onClick() {
            return _this2._onClick();
          },
          onMouseEnter: function onMouseEnter() {
            return _this2._onHover();
          },
          className: classes
        },
        _react2.default.createElement(
          'span',
          { className: 'day-number' },
          isNaN(day.date()) ? "" : day.date()
        )
      );
    }
  }]);

  return Day;
})(_react2.default.Component);

Day.propTypes = propTypes;
Day.defaultProps = defaultProps;
},{"react":"react"}],66:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Month = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _Day = require('./Day');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var propTypes = {};
var defaultProps = {};

var Month = exports.Month = (function (_React$Component) {
  _inherits(Month, _React$Component);

  function Month(props) {
    _classCallCheck(this, Month);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Month).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(Month, [{
    key: '_dayClicked',
    value: function _dayClicked(day) {
      this.props.dayClicked(day);
    }
  }, {
    key: '_dayHovered',
    value: function _dayHovered(day) {
      var _props = this.props;
      var selectRange = _props.selectRange;
      var dayHovered = _props.dayHovered;

      if (selectRange) {
        dayHovered(day);
      }
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _props2 = this.props;
      var month = _props2.month;
      var selectingRange = _props2.selectingRange;
      var selectedRange = _props2.selectedRange;
      var _state = this.state;
      var selectingRangeStart = _state.selectingRangeStart;
      var selectingRangeEnd = _state.selectingRangeEnd;

      //full repaint for some global-affecting rendering props

      if (this.props.year !== nextProps.year || this.props.forceFullWeeks !== nextProps.forceFullWeeks || this.props.showWeekSeparators !== nextProps.showWeekSeparators || this.props.firstDayOfWeek !== nextProps.firstDayOfWeek || this.props.selectRange !== nextProps.selectRange || this.props.customClasses !== nextProps.customClasses) {
        return true;
      }

      // if we get to this point and we are in 'selectRange' mode then it's likely that we have a change in selectingRange
      if (this.props.selectRange) {
        if (selectingRange == undefined) {
          var oldRangeStart = selectedRange[0].month();
          var oldRangeEnd = selectedRange[1].month();
          if (oldRangeStart > oldRangeEnd) {
            ;

            var _ref = [oldRangeEnd, oldRangeStart];
            oldRangeStart = _ref[0];
            oldRangeEnd = _ref[1];
          }var newRangeStart = nextProps.selectingRange[0].month();
          var newRangeEnd = nextProps.selectingRange[1].month();
          if (newRangeStart > newRangeEnd) {
            ;

            var _ref2 = [newRangeEnd, newRangeStart];
            newRangeStart = _ref2[0];
            newRangeEnd = _ref2[1];
          } // first time it's called, repaint months in old selectedRange and next selectingRange
          return oldRangeStart <= month && month <= oldRangeEnd || newRangeStart <= month && month <= newRangeEnd;
        } else if (nextProps.selectingRange == undefined) {
          // last time it's called, repaint months in previous selectingRange
          var oldRangeStart = selectingRangeStart;
          var oldRangeEnd = selectingRangeEnd;
          if (oldRangeStart > oldRangeEnd) {
            ;

            var _ref3 = [oldRangeEnd, oldRangeStart];
            oldRangeStart = _ref3[0];
            oldRangeEnd = _ref3[1];
          }var newRangeStart = nextProps.selectedRange[0].month();
          var newRangeEnd = nextProps.selectedRange[1].month();
          if (newRangeStart > newRangeEnd) {
            ;

            var _ref4 = [newRangeEnd, newRangeStart];
            newRangeStart = _ref4[0];
            newRangeEnd = _ref4[1];
          } // called on day hovering changed
          return oldRangeStart <= month && month <= oldRangeEnd || newRangeStart <= month && month <= newRangeEnd;
        } else {
          // called on day hovering changed
          var oldRangeStart = selectingRangeStart;
          var oldRangeEnd = selectingRangeEnd;
          if (oldRangeStart > oldRangeEnd) {
            ;

            var _ref5 = [oldRangeEnd, oldRangeStart];
            oldRangeStart = _ref5[0];
            oldRangeEnd = _ref5[1];
          }var newRangeStart = nextProps.selectingRange[0].month();
          var newRangeEnd = nextProps.selectingRange[1].month();
          if (newRangeStart > newRangeEnd) {
            ;

            var _ref6 = [newRangeEnd, newRangeStart];
            newRangeStart = _ref6[0];
            newRangeEnd = _ref6[1];
          }return oldRangeStart <= month && month <= oldRangeEnd || newRangeStart <= month && month <= newRangeEnd;
        }
      }
      // single selectedDay changed: repaint months where selectedDay was and where will be
      else if (this.props.selectedDay.month() == month || nextProps.selectedDay.month() == month) {
          return true;
        }

      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.selectingRange !== undefined) {
        this.setState({
          selectingRangeStart: nextProps.selectingRange[0].month(),
          selectingRangeEnd: nextProps.selectingRange[1].month()
        });
      }
    }
  }, {
    key: '_monthDays',
    value: function _monthDays() {
      var _this2 = this;

      var _props3 = this.props;
      var year = _props3.year;
      var month = _props3.month;
      var forceFullWeeks = _props3.forceFullWeeks;
      var showWeekSeparators = _props3.showWeekSeparators;
      var selectedDay = _props3.selectedDay;
      var onPickDate = _props3.onPickDate;
      var firstDayOfWeek = _props3.firstDayOfWeek;
      var selectingRange = _props3.selectingRange;
      var selectRange = _props3.selectRange;
      var selectedRange = _props3.selectedRange;
      var customClasses = _props3.customClasses;

      var monthStart = (0, _moment2.default)([year, month, 1]); // current day

      // number of days to insert before the first of the month to correctly align the weekdays
      var prevMonthDaysCount = monthStart.weekday();
      while (prevMonthDaysCount < firstDayOfWeek) {
        prevMonthDaysCount += 7;
      }
      // days in month
      var numberOfDays = monthStart.daysInMonth();
      // insert days at the end to match up 37 (max number of days in a month + 6)
      // or 42 (if user prefers seeing the week closing with Sunday)
      var totalDays = forceFullWeeks ? 42 : 37;

      // day-generating loop
      var days = [];
      (0, _utils.range)(firstDayOfWeek + 1, totalDays + firstDayOfWeek + 1).map(function (i) {
        var day = (0, _moment2.default)([year, month, i - prevMonthDaysCount]);

        // pick appropriate classes
        var classes = [];
        if (i <= prevMonthDaysCount) {
          classes.push('prev-month');
        } else if (i > numberOfDays + prevMonthDaysCount) {
          classes.push('next-month');
        } else {
          if (selectRange) {
            // selectingRange is used while user is selecting a range
            // (has clicked on start day, and is hovering end day - but not yet clicked)
            var start = (selectingRange || selectedRange)[0];
            var end = (selectingRange || selectedRange)[1];

            // validate range
            if (end.isBefore(start)) {
              start = (selectingRange || selectedRange)[1];
              end = (selectingRange || selectedRange)[0];
            }

            if (day.isBetween(start, end, 'day')) {
              classes.push('range');
            }

            if (day.isSame(start, 'day')) {
              classes.push('range');
              classes.push('range-left');
            } else if (day.isSame(end, 'day')) {
              classes.push('range');
              classes.push('range-right');
            }
          } else {
            if (day.isSame(selectedDay, 'day')) {
              classes.push('selected');
            }
          }

          // call here customClasses function to avoid giving improper classses to prev/next month
          if (customClasses instanceof Function) {
            classes.push(customClasses(day));
          }
        }

        if ((i - 1) % 7 === 0) {
          // sunday
          classes.push('bolder');
        }

        if (customClasses) {
          Object.keys(customClasses).map(function (k) {
            var obj = customClasses[k];
            // Order here is important! Everything is instance of Object in js
            if (typeof obj === "string") {
              if (obj.indexOf(day.format('ddd')) > -1) {
                classes.push(k);
              }
            } else if (obj instanceof Array) {
              obj.map(function (d) {
                if (day.format("YYYY-MM-DD") === d) classes.push(k);
              });
            } else if (obj instanceof Function) {
              if (obj(day)) {
                classes.push(k);
              }
            } else /*if( obj instanceof Object )*/{
                if (obj.start && obj.end) {
                  var startDate = (0, _moment2.default)(obj.start, "YYYY-MM-DD").add(-1, 'days');
                  var endDate = (0, _moment2.default)(obj.end, "YYYY-MM-DD").add(1, 'days');
                  if (day.isBetween(startDate, endDate)) {
                    classes.push(k);
                  }
                }
              }
          });
        }

        if (showWeekSeparators) {
          if ((i - 1) % 7 === firstDayOfWeek && days.length) {
            // push week separator
            days.push(_react2.default.createElement('td', { className: 'week-separator' }));
          }
        }
        days.push(_react2.default.createElement(_Day.Day, {
          key: 'day-' + i,
          day: day,
          classes: classes.join(' '),
          dayClicked: function dayClicked(d) {
            return _this2._dayClicked(d);
          },
          dayHovered: function dayHovered(d) {
            return _this2._dayHovered(d);
          }
        }));
      });

      return days;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var month = _props4.month;
      var year = _props4.year;

      return _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { className: 'month-name' },
          (0, _moment2.default)([year, month, 1]).format('MMM')
        ),
        this._monthDays()
      );
    }
  }]);

  return Month;
})(_react2.default.Component);

Month.propTypes = propTypes;
Month.defaultProps = defaultProps;
},{"./Day":65,"./utils":68,"moment":61,"react":"react"}],67:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Calendar = require('./Calendar');

Object.defineProperty(exports, 'Calendar', {
  enumerable: true,
  get: function get() {
    return _Calendar.default;
  }
});

var _CalendarControls = require('./CalendarControls');

Object.defineProperty(exports, 'CalendarControls', {
  enumerable: true,
  get: function get() {
    return _CalendarControls.default;
  }
});
},{"./Calendar":63,"./CalendarControls":64}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
// Grabbed from the underscore.js source code (https://github.com/jashkenas/underscore/blob/master/underscore.js#L691)
function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  step = step || 1;

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
};
},{}],69:[function(require,module,exports){
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

},{}],70:[function(require,module,exports){
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

},{}]},{},[40])


//# sourceMappingURL=bundle.js.map
