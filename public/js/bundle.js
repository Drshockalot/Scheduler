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

},{"../alt":15}],2:[function(require,module,exports){
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

},{"../alt":15,"react-router":"react-router","underscore":"underscore"}],3:[function(require,module,exports){
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

},{"../alt":15,"../stores/NavbarStore":36,"underscore":"underscore"}],4:[function(require,module,exports){
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

},{"../alt":15,"../stores/NavbarStore":36,"underscore":"underscore"}],5:[function(require,module,exports){
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

},{"../alt":15,"../stores/NavbarStore":36,"../stores/ProfileRaidWeeksStore":38,"underscore":"underscore"}],6:[function(require,module,exports){
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

},{"../alt":15,"../stores/NavbarStore":36,"underscore":"underscore"}],7:[function(require,module,exports){
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

},{"../../alt":15,"./RosterManagementActions":13,"underscore":"underscore"}],8:[function(require,module,exports){
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

},{"../../alt":15}],9:[function(require,module,exports){
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

},{"../../alt":15}],10:[function(require,module,exports){
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

},{"./../../alt":15}],11:[function(require,module,exports){
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

},{"../../alt":15}],12:[function(require,module,exports){
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

},{"./../../alt":15}],13:[function(require,module,exports){
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

},{"../../alt":15,"underscore":"underscore"}],14:[function(require,module,exports){
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

    this.generateActions('updateFormRaidWeek', 'updateFormRoster', 'updateFormScheduleName', 'updateFormScheduleDescription', 'updateSelectedRaidWeekCompleted', 'updateSelectedSchedule', 'updateFormRaid', 'updateFormBoss', 'updateFormTanks', 'updateFormHealers', 'updateFormDPS', 'loadComponentDataSuccess', 'loadComponentDataFailure', 'createScheduleSuccess', 'createScheduleFailure', 'setFormTanks', 'setFormHealers', 'setFormDPS', 'addScheduleBossSuccess', 'addScheduleBossFailure');
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
    }
  }]);

  return ScheduleManagementActions;
}();

exports.default = _alt2.default.createActions(ScheduleManagementActions);

},{"./../../alt":15,"./../../stores/admin/ScheduleManagementStore":48,"underscore":"underscore"}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require('alt');

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _alt2.default();

},{"alt":"alt"}],16:[function(require,module,exports){
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

},{"./Footer":17,"./Navbar":19,"react":"react"}],17:[function(require,module,exports){
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

},{"../actions/FooterActions":1,"../stores/FooterStore":35,"react":"react","react-router":"react-router"}],18:[function(require,module,exports){
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

},{"react":"react"}],19:[function(require,module,exports){
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

},{"../actions/NavbarActions":2,"../stores/NavbarStore":36,"react":"react","react-router":"react-router"}],20:[function(require,module,exports){
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

},{"../actions/ProfileActions":3,"../stores/NavbarStore":36,"../stores/ProfileStore":40,"./ProfileSidenav":24,"react":"react","react-router":"react-router"}],21:[function(require,module,exports){
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

},{"../../utility/WowClasses":322,"../../utility/WowRaces":323,"../actions/ProfileCharactersActions":4,"../stores/NavbarStore":36,"../stores/ProfileCharactersStore":37,"./ProfileSidenav":24,"react":"react","react-router":"react-router","underscore":"underscore"}],22:[function(require,module,exports){
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

},{"../actions/ProfileRaidWeeksActions":5,"../stores/NavbarStore":36,"../stores/ProfileRaidWeeksStore":38,"./ProfileSidenav":24,"moment":150,"react":"react","react-router":"react-router","underscore":"underscore"}],23:[function(require,module,exports){
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

},{"../actions/ProfileRostersActions":6,"../stores/NavbarStore":36,"../stores/ProfileRostersStore":39,"./ProfileSidenav":24,"react":"react","react-router":"react-router"}],24:[function(require,module,exports){
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

},{"react":"react","react-router":"react-router"}],25:[function(require,module,exports){
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

},{"../../actions/admin/AddRosterActions":7,"../../stores/admin/AddRosterStore":41,"react":"react","react-router":"react-router"}],26:[function(require,module,exports){
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

},{"../../actions/admin/AdminActions":8,"../../stores/admin/AdminStore":43,"./../../stores/NavbarStore":36,"./AdminSideNav":27,"react":"react","react-router":"react-router"}],27:[function(require,module,exports){
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
          )
        )
      );
    }
  }]);

  return AdminSideNav;
}(_react2.default.Component);

exports.default = AdminSideNav;

},{"../../actions/admin/AdminSideNavActions":9,"../../stores/admin/AdminSideNavStore":42,"react":"react","react-router":"react-router"}],28:[function(require,module,exports){
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

},{"./../../../utility/WowClasses":322,"./../../../utility/WowRaces":323,"./../../actions/admin/CharacterManagementActions":10,"./../../stores/NavbarStore":36,"./../../stores/admin/CharacterManagementStore":44,"./AdminSideNav":27,"react":"react","react-router":"react-router","underscore":"underscore"}],29:[function(require,module,exports){
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

},{"../../actions/admin/RaidManagementActions":11,"../../stores/admin/RaidManagementStore":45,"./../../stores/NavbarStore":36,"./AdminSideNav":27,"react":"react","react-router":"react-router"}],30:[function(require,module,exports){
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

},{"./../../actions/admin/RaidWeekManagementActions":12,"./../../stores/NavbarStore":36,"./../../stores/admin/RaidWeekManagementStore":46,"./AdminSideNav":27,"moment":150,"react":"react","react-router":"react-router","react-yearly-calendar":316}],31:[function(require,module,exports){
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

},{"../../actions/admin/RosterManagementActions":13,"../../stores/admin/RosterManagementStore":47,"./../../stores/NavbarStore":36,"./AddRoster":25,"./AdminSideNav":27,"react":"react","react-router":"react-router"}],32:[function(require,module,exports){
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

var _reactBootstrap = require('react-bootstrap');

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
          tankRows = sched.roster.characters.map(function (character, index) {
            if (character.main_role == "Tank") {
              // var char = _.findWhere(schedule_boss.characters, {id: character.id});
              // var MButtonClass, OButtonClass, SButtonClass;
              // if(char) {
              //
              // } else {
              //
              // }

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
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    null,
                    _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'ok' })
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default btn-circle' },
                    'O'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default btn-circle' },
                    'S'
                  )
                )
              );
            }
          }, this);

          healerRows = sched.roster.characters.map(function (character, index) {
            if (character.main_role == "Healer") {
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
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default btn-circle' },
                    _react2.default.createElement('i', { className: 'glyphicon glyphicon-ok' })
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default btn-circle' },
                    'O'
                  )
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default btn-circle' },
                    'S'
                  )
                )
              );
            }
          }, this);

          dpsRows = sched.roster.characters.map(function (character, index) {
            if (character.main_role == "DPS") {
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
                  null,
                  _react2.default.createElement('strong', null)
                ),
                _react2.default.createElement(
                  'td',
                  { className: 'col-sm-2 low-padding' },
                  _react2.default.createElement(
                    'button',
                    { className: 'btn btn-default btn-circle' },
                    'S'
                  )
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
                    'Raid'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-1' },
                    'Boss'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-2' },
                    'Tanks (',
                    schedule_boss.tank_count,
                    ')'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    'Healers (',
                    schedule_boss.healer_count,
                    ')'
                  ),
                  _react2.default.createElement(
                    'td',
                    { className: 'col-md-3' },
                    'DPS (',
                    schedule_boss.dps_count,
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

},{"./../../../utility/WowClasses":322,"./../../actions/admin/ScheduleManagementActions":14,"./../../stores/NavbarStore":36,"./../../stores/admin/ScheduleManagementStore":48,"./AdminSideNav":27,"classnames":49,"moment":150,"react":"react","react-bootstrap":243,"react-router":"react-router","underscore":"underscore"}],33:[function(require,module,exports){
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

},{"./routes":34,"react":"react","react-dom":"react-dom","react-router":"react-router"}],34:[function(require,module,exports){
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

var _Profile = require('./components/Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _ProfileCharacters = require('./components/ProfileCharacters');

var _ProfileCharacters2 = _interopRequireDefault(_ProfileCharacters);

var _ProfileRaidWeeks = require('./components/ProfileRaidWeeks');

var _ProfileRaidWeeks2 = _interopRequireDefault(_ProfileRaidWeeks);

var _ProfileRosters = require('./components/ProfileRosters');

var _ProfileRosters2 = _interopRequireDefault(_ProfileRosters);

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
  _react2.default.createElement(_reactRouter.Route, { path: '/admin/raid', component: _RaidManagement2.default })
);

},{"./components/App":16,"./components/Home":18,"./components/Profile":20,"./components/ProfileCharacters":21,"./components/ProfileRaidWeeks":22,"./components/ProfileRosters":23,"./components/admin/Admin":26,"./components/admin/CharacterManagement":28,"./components/admin/RaidManagement":29,"./components/admin/RaidWeekManagement":30,"./components/admin/RosterManagement":31,"./components/admin/ScheduleManagement":32,"react":"react","react-router":"react-router"}],35:[function(require,module,exports){
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

},{"../actions/FooterActions":1,"../alt":15}],36:[function(require,module,exports){
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

},{"../actions/NavbarActions":2,"../alt":15}],37:[function(require,module,exports){
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

},{"../actions/ProfileCharactersActions":4,"../alt":15}],38:[function(require,module,exports){
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

},{"../actions/ProfileRaidWeeksActions":5,"../alt":15}],39:[function(require,module,exports){
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

},{"../actions/ProfileRostersActions":6,"../alt":15}],40:[function(require,module,exports){
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

},{"../actions/ProfileActions":3,"../alt":15}],41:[function(require,module,exports){
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

},{"../../actions/admin/AddRosterActions":7,"../../alt":15}],42:[function(require,module,exports){
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

},{"../../actions/admin/AdminSideNavActions":9,"../../alt":15}],43:[function(require,module,exports){
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

},{"../../actions/admin/AdminActions":8,"../../alt":15}],44:[function(require,module,exports){
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

},{"./../../actions/admin/CharacterManagementActions":10,"./../../alt":15}],45:[function(require,module,exports){
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

},{"../../actions/admin/RaidManagementActions":11,"../../alt":15}],46:[function(require,module,exports){
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

},{"./../../actions/admin/RaidWeekManagementActions":12,"./../../alt":15,"moment":150}],47:[function(require,module,exports){
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

},{"../../actions/admin/RosterManagementActions":13,"../../alt":15}],48:[function(require,module,exports){
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
    key: 'onUpdateFormBossName',
    value: function onUpdateFormBossName(value) {
      this.formBossName = value;
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
  }]);

  return ScheduleManagementStore;
}();

exports.default = _alt2.default.createStore(ScheduleManagementStore);

},{"./../../actions/admin/ScheduleManagementActions":14,"./../../alt":15,"moment":150}],49:[function(require,module,exports){
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

},{}],50:[function(require,module,exports){
'use strict';

var babelHelpers = require('./util/babelHelpers.js');

exports.__esModule = true;

/**
 * document.activeElement
 */
exports['default'] = activeElement;

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

function activeElement() {
  var doc = arguments[0] === undefined ? document : arguments[0];

  try {
    return doc.activeElement;
  } catch (e) {}
}

module.exports = exports['default'];
},{"./ownerDocument":59,"./util/babelHelpers.js":72}],51:[function(require,module,exports){
'use strict';
var hasClass = require('./hasClass');

module.exports = function addClass(element, className) {
  if (element.classList) element.classList.add(className);else if (!hasClass(element)) element.className = element.className + ' ' + className;
};
},{"./hasClass":52}],52:[function(require,module,exports){
'use strict';
module.exports = function hasClass(element, className) {
  if (element.classList) return !!className && element.classList.contains(className);else return (' ' + element.className + ' ').indexOf(' ' + className + ' ') !== -1;
};
},{}],53:[function(require,module,exports){
'use strict';

module.exports = {
  addClass: require('./addClass'),
  removeClass: require('./removeClass'),
  hasClass: require('./hasClass')
};
},{"./addClass":51,"./hasClass":52,"./removeClass":54}],54:[function(require,module,exports){
'use strict';

module.exports = function removeClass(element, className) {
  if (element.classList) element.classList.remove(className);else element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1').replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');
};
},{}],55:[function(require,module,exports){
'use strict';

var contains = require('../query/contains'),
    qsa = require('../query/querySelectorAll');

module.exports = function (selector, handler) {
  return function (e) {
    var top = e.currentTarget,
        target = e.target,
        matches = qsa(top, selector);

    if (matches.some(function (match) {
      return contains(match, target);
    })) handler.call(this, e);
  };
};
},{"../query/contains":60,"../query/querySelectorAll":65}],56:[function(require,module,exports){
'use strict';
var on = require('./on'),
    off = require('./off'),
    filter = require('./filter');

module.exports = { on: on, off: off, filter: filter };
},{"./filter":55,"./off":57,"./on":58}],57:[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');
var off = function off() {};

if (canUseDOM) {

  off = (function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.removeEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.detachEvent('on' + eventName, handler);
    };
  })();
}

module.exports = off;
},{"../util/inDOM":77}],58:[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');
var on = function on() {};

if (canUseDOM) {
  on = (function () {

    if (document.addEventListener) return function (node, eventName, handler, capture) {
      return node.addEventListener(eventName, handler, capture || false);
    };else if (document.attachEvent) return function (node, eventName, handler) {
      return node.attachEvent('on' + eventName, handler);
    };
  })();
}

module.exports = on;
},{"../util/inDOM":77}],59:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = ownerDocument;

function ownerDocument(node) {
  return node && node.ownerDocument || document;
}

module.exports = exports["default"];
},{}],60:[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');

var contains = (function () {
  var root = canUseDOM && document.documentElement;

  return root && root.contains ? function (context, node) {
    return context.contains(node);
  } : root && root.compareDocumentPosition ? function (context, node) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  } : function (context, node) {
    if (node) do {
      if (node === context) return true;
    } while (node = node.parentNode);

    return false;
  };
})();

module.exports = contains;
},{"../util/inDOM":77}],61:[function(require,module,exports){
'use strict';

module.exports = function getWindow(node) {
  return node === node.window ? node : node.nodeType === 9 ? node.defaultView || node.parentWindow : false;
};
},{}],62:[function(require,module,exports){
'use strict';
var contains = require('./contains'),
    getWindow = require('./isWindow'),
    ownerDocument = require('../ownerDocument');

module.exports = function offset(node) {
  var doc = ownerDocument(node),
      win = getWindow(doc),
      docElem = doc && doc.documentElement,
      box = { top: 0, left: 0, height: 0, width: 0 };

  if (!doc) return;

  // Make sure it's not a disconnected DOM node
  if (!contains(docElem, node)) return box;

  if (node.getBoundingClientRect !== undefined) box = node.getBoundingClientRect();

  if (box.width || box.height) {

    box = {
      top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
      left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0),
      width: (box.width == null ? node.offsetWidth : box.width) || 0,
      height: (box.height == null ? node.offsetHeight : box.height) || 0
    };
  }

  return box;
};
},{"../ownerDocument":59,"./contains":60,"./isWindow":61}],63:[function(require,module,exports){
'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = offsetParent;

var _ownerDocument = require('../ownerDocument');

var _ownerDocument2 = babelHelpers.interopRequireDefault(_ownerDocument);

var _style = require('../style');

var _style2 = babelHelpers.interopRequireDefault(_style);

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function offsetParent(node) {
  var doc = (0, _ownerDocument2['default'])(node),
      offsetParent = node && node.offsetParent;

  while (offsetParent && nodeName(node) !== 'html' && (0, _style2['default'])(offsetParent, 'position') === 'static') {
    offsetParent = offsetParent.offsetParent;
  }

  return offsetParent || doc.documentElement;
}

module.exports = exports['default'];
},{"../ownerDocument":59,"../style":69,"../util/babelHelpers.js":72}],64:[function(require,module,exports){
'use strict';

var babelHelpers = require('../util/babelHelpers.js');

exports.__esModule = true;
exports['default'] = position;

var _offset = require('./offset');

var _offset2 = babelHelpers.interopRequireDefault(_offset);

var _offsetParent = require('./offsetParent');

var _offsetParent2 = babelHelpers.interopRequireDefault(_offsetParent);

var _scrollTop = require('./scrollTop');

var _scrollTop2 = babelHelpers.interopRequireDefault(_scrollTop);

var _scrollLeft = require('./scrollLeft');

var _scrollLeft2 = babelHelpers.interopRequireDefault(_scrollLeft);

var _style = require('../style');

var _style2 = babelHelpers.interopRequireDefault(_style);

function nodeName(node) {
  return node.nodeName && node.nodeName.toLowerCase();
}

function position(node, offsetParent) {
  var parentOffset = { top: 0, left: 0 },
      offset;

  // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
  // because it is its only offset parent
  if ((0, _style2['default'])(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    offsetParent = offsetParent || (0, _offsetParent2['default'])(node);
    offset = (0, _offset2['default'])(node);

    if (nodeName(offsetParent) !== 'html') parentOffset = (0, _offset2['default'])(offsetParent);

    parentOffset.top += parseInt((0, _style2['default'])(offsetParent, 'borderTopWidth'), 10) - (0, _scrollTop2['default'])(offsetParent) || 0;
    parentOffset.left += parseInt((0, _style2['default'])(offsetParent, 'borderLeftWidth'), 10) - (0, _scrollLeft2['default'])(offsetParent) || 0;
  }

  // Subtract parent offsets and node margins
  return babelHelpers._extends({}, offset, {
    top: offset.top - parentOffset.top - (parseInt((0, _style2['default'])(node, 'marginTop'), 10) || 0),
    left: offset.left - parentOffset.left - (parseInt((0, _style2['default'])(node, 'marginLeft'), 10) || 0)
  });
}

module.exports = exports['default'];
},{"../style":69,"../util/babelHelpers.js":72,"./offset":62,"./offsetParent":63,"./scrollLeft":66,"./scrollTop":67}],65:[function(require,module,exports){
'use strict';
//     Zepto.js
//     (c) 2010-2015 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.
var simpleSelectorRE = /^[\w-]*$/,
    toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);

module.exports = function qsa(element, selector) {
  var maybeID = selector[0] === '#',
      maybeClass = selector[0] === '.',
      nameOnly = maybeID || maybeClass ? selector.slice(1) : selector,
      isSimple = simpleSelectorRE.test(nameOnly),
      found;

  if (isSimple) {
    if (maybeID) {
      element = element.getElementById ? element : document;
      return (found = element.getElementById(nameOnly)) ? [found] : [];
    }

    if (element.getElementsByClassName && maybeClass) return toArray(element.getElementsByClassName(nameOnly));

    return toArray(element.getElementsByTagName(selector));
  }

  return toArray(element.querySelectorAll(selector));
};
},{}],66:[function(require,module,exports){
'use strict';
var getWindow = require('./isWindow');

module.exports = function scrollTop(node, val) {
  var win = getWindow(node);

  if (val === undefined) return win ? 'pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft : node.scrollLeft;

  if (win) win.scrollTo(val, 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop);else node.scrollLeft = val;
};
},{"./isWindow":61}],67:[function(require,module,exports){
'use strict';
var getWindow = require('./isWindow');

module.exports = function scrollTop(node, val) {
  var win = getWindow(node);

  if (val === undefined) return win ? 'pageYOffset' in win ? win.pageYOffset : win.document.documentElement.scrollTop : node.scrollTop;

  if (win) win.scrollTo('pageXOffset' in win ? win.pageXOffset : win.document.documentElement.scrollLeft, val);else node.scrollTop = val;
};
},{"./isWindow":61}],68:[function(require,module,exports){
'use strict';

var babelHelpers = require('../util/babelHelpers.js');

var _utilCamelizeStyle = require('../util/camelizeStyle');

var _utilCamelizeStyle2 = babelHelpers.interopRequireDefault(_utilCamelizeStyle);

var rposition = /^(top|right|bottom|left)$/;
var rnumnonpx = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;

module.exports = function _getComputedStyle(node) {
  if (!node) throw new TypeError('No Element passed to `getComputedStyle()`');
  var doc = node.ownerDocument;

  return 'defaultView' in doc ? doc.defaultView.opener ? node.ownerDocument.defaultView.getComputedStyle(node, null) : window.getComputedStyle(node, null) : { //ie 8 "magic" from: https://github.com/jquery/jquery/blob/1.11-stable/src/css/curCSS.js#L72
    getPropertyValue: function getPropertyValue(prop) {
      var style = node.style;

      prop = (0, _utilCamelizeStyle2['default'])(prop);

      if (prop == 'float') prop = 'styleFloat';

      var current = node.currentStyle[prop] || null;

      if (current == null && style && style[prop]) current = style[prop];

      if (rnumnonpx.test(current) && !rposition.test(prop)) {
        // Remember the original values
        var left = style.left;
        var runStyle = node.runtimeStyle;
        var rsLeft = runStyle && runStyle.left;

        // Put in the new values to get a computed value out
        if (rsLeft) runStyle.left = node.currentStyle.left;

        style.left = prop === 'fontSize' ? '1em' : current;
        current = style.pixelLeft + 'px';

        // Revert the changed values
        style.left = left;
        if (rsLeft) runStyle.left = rsLeft;
      }

      return current;
    }
  };
};
},{"../util/babelHelpers.js":72,"../util/camelizeStyle":74}],69:[function(require,module,exports){
'use strict';

var camelize = require('../util/camelizeStyle'),
    hyphenate = require('../util/hyphenateStyle'),
    _getComputedStyle = require('./getComputedStyle'),
    removeStyle = require('./removeStyle');

var has = Object.prototype.hasOwnProperty;

module.exports = function style(node, property, value) {
  var css = '',
      props = property;

  if (typeof property === 'string') {

    if (value === undefined) return node.style[camelize(property)] || _getComputedStyle(node).getPropertyValue(hyphenate(property));else (props = {})[property] = value;
  }

  for (var key in props) if (has.call(props, key)) {
    !props[key] && props[key] !== 0 ? removeStyle(node, hyphenate(key)) : css += hyphenate(key) + ':' + props[key] + ';';
  }

  node.style.cssText += ';' + css;
};
},{"../util/camelizeStyle":74,"../util/hyphenateStyle":76,"./getComputedStyle":68,"./removeStyle":70}],70:[function(require,module,exports){
'use strict';

module.exports = function removeStyle(node, key) {
  return 'removeProperty' in node.style ? node.style.removeProperty(key) : node.style.removeAttribute(key);
};
},{}],71:[function(require,module,exports){
'use strict';
var canUseDOM = require('../util/inDOM');

var has = Object.prototype.hasOwnProperty,
    transform = 'transform',
    transition = {},
    transitionTiming,
    transitionDuration,
    transitionProperty,
    transitionDelay;

if (canUseDOM) {
  transition = getTransitionProperties();

  transform = transition.prefix + transform;

  transitionProperty = transition.prefix + 'transition-property';
  transitionDuration = transition.prefix + 'transition-duration';
  transitionDelay = transition.prefix + 'transition-delay';
  transitionTiming = transition.prefix + 'transition-timing-function';
}

module.exports = {
  transform: transform,
  end: transition.end,
  property: transitionProperty,
  timing: transitionTiming,
  delay: transitionDelay,
  duration: transitionDuration
};

function getTransitionProperties() {
  var endEvent,
      prefix = '',
      transitions = {
    O: 'otransitionend',
    Moz: 'transitionend',
    Webkit: 'webkitTransitionEnd',
    ms: 'MSTransitionEnd'
  };

  var element = document.createElement('div');

  for (var vendor in transitions) if (has.call(transitions, vendor)) {
    if (element.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + vendor.toLowerCase() + '-';
      endEvent = transitions[vendor];
      break;
    }
  }

  if (!endEvent && element.style.transitionProperty !== undefined) endEvent = 'transitionend';

  return { end: endEvent, prefix: prefix };
}
},{"../util/inDOM":77}],72:[function(require,module,exports){
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports === "object") {
    factory(exports);
  } else {
    factory(root.babelHelpers = {});
  }
})(this, function (global) {
  var babelHelpers = global;

  babelHelpers.interopRequireDefault = function (obj) {
    return obj && obj.__esModule ? obj : {
      "default": obj
    };
  };

  babelHelpers._extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
})
},{}],73:[function(require,module,exports){
"use strict";

var rHyphen = /-(.)/g;

module.exports = function camelize(string) {
  return string.replace(rHyphen, function (_, chr) {
    return chr.toUpperCase();
  });
};
},{}],74:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/camelizeStyleName.js
 */

'use strict';
var camelize = require('./camelize');
var msPattern = /^-ms-/;

module.exports = function camelizeStyleName(string) {
  return camelize(string.replace(msPattern, 'ms-'));
};
},{"./camelize":73}],75:[function(require,module,exports){
'use strict';

var rUpper = /([A-Z])/g;

module.exports = function hyphenate(string) {
  return string.replace(rUpper, '-$1').toLowerCase();
};
},{}],76:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 * https://github.com/facebook/react/blob/2aeb8a2a6beb00617a4217f7f8284924fa2ad819/src/vendor/core/hyphenateStyleName.js
 */

"use strict";

var hyphenate = require("./hyphenate");
var msPattern = /^ms-/;

module.exports = function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
};
},{"./hyphenate":75}],77:[function(require,module,exports){
'use strict';
module.exports = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
},{}],78:[function(require,module,exports){
'use strict';

var canUseDOM = require('./inDOM');

var size;

module.exports = function (recalc) {
  if (!size || recalc) {
    if (canUseDOM) {
      var scrollDiv = document.createElement('div');

      scrollDiv.style.position = 'absolute';
      scrollDiv.style.top = '-9999px';
      scrollDiv.style.width = '50px';
      scrollDiv.style.height = '50px';
      scrollDiv.style.overflow = 'scroll';

      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }

  return size;
};
},{"./inDOM":77}],79:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":151}],80:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

exports = module.exports = function(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}


/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}],81:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],82:[function(require,module,exports){
var baseEach = require('../internal/baseEach'),
    createFind = require('../internal/createFind');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"../internal/baseEach":91,"../internal/createFind":115}],83:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],84:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./cachePush":111,"./getNative":121}],85:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],86:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],87:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],88:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],89:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    property = require('../utility/property');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":148,"../utility/property":149,"./baseMatches":103,"./baseMatchesProperty":104,"./bindCallback":109}],90:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value, 0) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":99,"./cacheIndexOf":110,"./createCache":114}],91:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    createBaseEach = require('./createBaseEach');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

module.exports = baseEach;

},{"./baseForOwn":97,"./createBaseEach":112}],92:[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],93:[function(require,module,exports){
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],94:[function(require,module,exports){
var arrayPush = require('./arrayPush'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} [isDeep] Specify a deep flatten.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (isObjectLike(value) && isArrayLike(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, isDeep, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":135,"../lang/isArray":136,"./arrayPush":87,"./isArrayLike":123,"./isObjectLike":128}],95:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":113}],96:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":143,"./baseFor":95}],97:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":142,"./baseFor":95}],98:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  object = toObject(object);
  if (pathKey !== undefined && pathKey in object) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = toObject(object)[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":133}],99:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":122}],100:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":139,"./baseIsEqualDeep":101,"./isObjectLike":128}],101:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isHostObject = require('./isHostObject'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":136,"../lang/isTypedArray":141,"./equalArrays":116,"./equalByTag":117,"./equalObjects":118,"./isHostObject":124}],102:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":100,"./toObject":133}],103:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    getMatchData = require('./getMatchData'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      object = toObject(object);
      return object[key] === value && (value !== undefined || (key in object));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

module.exports = baseMatches;

},{"./baseIsMatch":102,"./getMatchData":120,"./toObject":133}],104:[function(require,module,exports){
var baseGet = require('./baseGet'),
    baseIsEqual = require('./baseIsEqual'),
    baseSlice = require('./baseSlice'),
    isArray = require('../lang/isArray'),
    isKey = require('./isKey'),
    isStrictComparable = require('./isStrictComparable'),
    last = require('../array/last'),
    toObject = require('./toObject'),
    toPath = require('./toPath');

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

module.exports = baseMatchesProperty;

},{"../array/last":81,"../lang/isArray":136,"./baseGet":98,"./baseIsEqual":100,"./baseSlice":107,"./isKey":126,"./isStrictComparable":129,"./toObject":133,"./toPath":134}],105:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : toObject(object)[key];
  };
}

module.exports = baseProperty;

},{"./toObject":133}],106:[function(require,module,exports){
var baseGet = require('./baseGet'),
    toPath = require('./toPath');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

module.exports = basePropertyDeep;

},{"./baseGet":98,"./toPath":134}],107:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],108:[function(require,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],109:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":148}],110:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":139}],111:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":139}],112:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

module.exports = createBaseEach;

},{"./getLength":119,"./isLength":127,"./toObject":133}],113:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":133}],114:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    getNative = require('./getNative');

/** Native method references. */
var Set = getNative(global, 'Set');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = getNative(Object, 'create');

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
function createCache(values) {
  return (nativeCreate && Set) ? new SetCache(values) : null;
}

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./SetCache":84,"./getNative":121}],115:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseFind = require('./baseFind'),
    baseFindIndex = require('./baseFindIndex'),
    isArray = require('../lang/isArray');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  };
}

module.exports = createFind;

},{"../lang/isArray":136,"./baseCallback":89,"./baseFind":92,"./baseFindIndex":93}],116:[function(require,module,exports){
var arraySome = require('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":88}],117:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],118:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":142}],119:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":105}],120:[function(require,module,exports){
var isStrictComparable = require('./isStrictComparable'),
    pairs = require('../object/pairs');

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"../object/pairs":145,"./isStrictComparable":129}],121:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":138}],122:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],123:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":119,"./isLength":127}],124:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
var isHostObject = (function() {
  try {
    Object({ 'toString': 0 } + '');
  } catch(e) {
    return function() { return false; };
  }
  return function(value) {
    // IE < 9 presents many host objects as `Object` objects that can coerce
    // to strings despite having improperly defined `toString` methods.
    return typeof value.toString != 'function' && typeof (value + '') == 'string';
  };
}());

module.exports = isHostObject;

},{}],125:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],126:[function(require,module,exports){
var isArray = require('../lang/isArray'),
    toObject = require('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":136,"./toObject":133}],127:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],128:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],129:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"../lang/isObject":139}],130:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * A specialized version of `_.pick` which picks `object` properties specified
 * by `props`.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{"./toObject":133}],131:[function(require,module,exports){
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` which picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":96}],132:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isString = require('../lang/isString'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object) || isString(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":135,"../lang/isArray":136,"../lang/isString":140,"../object/keysIn":143,"./isIndex":125,"./isLength":127}],133:[function(require,module,exports){
var isObject = require('../lang/isObject'),
    isString = require('../lang/isString'),
    support = require('../support');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  if (support.unindexedChars && isString(value)) {
    var index = -1,
        length = value.length,
        result = Object(value);

    while (++index < length) {
      result[index] = value.charAt(index);
    }
    return result;
  }
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":139,"../lang/isString":140,"../support":147}],134:[function(require,module,exports){
var baseToString = require('./baseToString'),
    isArray = require('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":136,"./baseToString":108}],135:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":123,"../internal/isObjectLike":128}],136:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":121,"../internal/isLength":127,"../internal/isObjectLike":128}],137:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":139}],138:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('../internal/isHostObject'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

module.exports = isNative;

},{"../internal/isHostObject":124,"../internal/isObjectLike":128,"./isFunction":137}],139:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],140:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":128}],141:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":127,"../internal/isObjectLike":128}],142:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys'),
    support = require('../support');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object == 'function' ? support.enumPrototypes : isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":121,"../internal/isArrayLike":123,"../internal/shimKeys":132,"../lang/isObject":139,"../support":147}],143:[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isFunction = require('../lang/isFunction'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    isString = require('../lang/isString'),
    support = require('../support');

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/** Used to fix the JScript `[[DontEnum]]` bug. */
var shadowProps = [
  'constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable',
  'toLocaleString', 'toString', 'valueOf'
];

/** Used for native method references. */
var errorProto = Error.prototype,
    objectProto = Object.prototype,
    stringProto = String.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to avoid iterating over non-enumerable properties in IE < 9. */
var nonEnumProps = {};
nonEnumProps[arrayTag] = nonEnumProps[dateTag] = nonEnumProps[numberTag] = { 'constructor': true, 'toLocaleString': true, 'toString': true, 'valueOf': true };
nonEnumProps[boolTag] = nonEnumProps[stringTag] = { 'constructor': true, 'toString': true, 'valueOf': true };
nonEnumProps[errorTag] = nonEnumProps[funcTag] = nonEnumProps[regexpTag] = { 'constructor': true, 'toString': true };
nonEnumProps[objectTag] = { 'constructor': true };

arrayEach(shadowProps, function(key) {
  for (var tag in nonEnumProps) {
    if (hasOwnProperty.call(nonEnumProps, tag)) {
      var props = nonEnumProps[tag];
      props[key] = hasOwnProperty.call(props, key);
    }
  }
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;

  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object) || isString(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      proto = (isFunction(Ctor) && Ctor.prototype) || objectProto,
      isProto = proto === object,
      result = Array(length),
      skipIndexes = length > 0,
      skipErrorProps = support.enumErrorProps && (object === errorProto || object instanceof Error),
      skipProto = support.enumPrototypes && isFunction(object);

  while (++index < length) {
    result[index] = (index + '');
  }
  // lodash skips the `constructor` property when it infers it's iterating
  // over a `prototype` object because IE < 9 can't set the `[[Enumerable]]`
  // attribute of an existing property and the `constructor` property of a
  // prototype defaults to non-enumerable.
  for (var key in object) {
    if (!(skipProto && key == 'prototype') &&
        !(skipErrorProps && (key == 'message' || key == 'name')) &&
        !(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  if (support.nonEnumShadows && object !== objectProto) {
    var tag = object === stringProto ? stringTag : (object === errorProto ? errorTag : objToString.call(object)),
        nonEnums = nonEnumProps[tag] || nonEnumProps[objectTag];

    if (tag == objectTag) {
      proto = objectProto;
    }
    length = shadowProps.length;
    while (length--) {
      key = shadowProps[length];
      var nonEnum = nonEnums[key];
      if (!(isProto && nonEnum) &&
          (nonEnum ? hasOwnProperty.call(object, key) : object[key] !== proto[key])) {
        result.push(key);
      }
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/arrayEach":85,"../internal/isIndex":125,"../internal/isLength":127,"../lang/isArguments":135,"../lang/isArray":136,"../lang/isFunction":137,"../lang/isObject":139,"../lang/isString":140,"../support":147}],144:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseDifference = require('../internal/baseDifference'),
    baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    keysIn = require('./keysIn'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback'),
    restParam = require('../function/restParam');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to omit, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.omit(object, 'age');
 * // => { 'user': 'fred' }
 *
 * _.omit(object, _.isNumber);
 * // => { 'user': 'fred' }
 */
var omit = restParam(function(object, props) {
  if (object == null) {
    return {};
  }
  if (typeof props[0] != 'function') {
    var props = arrayMap(baseFlatten(props), String);
    return pickByArray(object, baseDifference(keysIn(object), props));
  }
  var predicate = bindCallback(props[0], props[1], 3);
  return pickByCallback(object, function(value, key, object) {
    return !predicate(value, key, object);
  });
});

module.exports = omit;

},{"../function/restParam":83,"../internal/arrayMap":86,"../internal/baseDifference":90,"../internal/baseFlatten":94,"../internal/bindCallback":109,"../internal/pickByArray":130,"../internal/pickByCallback":131,"./keysIn":143}],145:[function(require,module,exports){
var keys = require('./keys'),
    toObject = require('../internal/toObject');

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"../internal/toObject":133,"./keys":142}],146:[function(require,module,exports){
var baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback'),
    restParam = require('../function/restParam');

/**
 * Creates an object composed of the picked `object` properties. Property
 * names may be specified as individual arguments or as arrays of property
 * names. If `predicate` is provided it's invoked for each property of `object`
 * picking the properties `predicate` returns truthy for. The predicate is
 * bound to `thisArg` and invoked with three arguments: (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to pick, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.pick(object, 'user');
 * // => { 'user': 'fred' }
 *
 * _.pick(object, _.isString);
 * // => { 'user': 'fred' }
 */
var pick = restParam(function(object, props) {
  if (object == null) {
    return {};
  }
  return typeof props[0] == 'function'
    ? pickByCallback(object, bindCallback(props[0], props[1], 3))
    : pickByArray(object, baseFlatten(props));
});

module.exports = pick;

},{"../function/restParam":83,"../internal/baseFlatten":94,"../internal/bindCallback":109,"../internal/pickByArray":130,"../internal/pickByCallback":131}],147:[function(require,module,exports){
/** Used for native method references. */
var arrayProto = Array.prototype,
    errorProto = Error.prototype,
    objectProto = Object.prototype;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {
  var Ctor = function() { this.x = x; },
      object = { '0': x, 'length': x },
      props = [];

  Ctor.prototype = { 'valueOf': x, 'y': x };
  for (var key in new Ctor) { props.push(key); }

  /**
   * Detect if `name` or `message` properties of `Error.prototype` are
   * enumerable by default (IE < 9, Safari < 5.1).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumErrorProps = propertyIsEnumerable.call(errorProto, 'message') ||
    propertyIsEnumerable.call(errorProto, 'name');

  /**
   * Detect if `prototype` properties are enumerable by default.
   *
   * Firefox < 3.6, Opera > 9.50 - Opera < 11.60, and Safari < 5.1
   * (if the prototype or a property on the prototype has been set)
   * incorrectly set the `[[Enumerable]]` value of a function's `prototype`
   * property to `true`.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.enumPrototypes = propertyIsEnumerable.call(Ctor, 'prototype');

  /**
   * Detect if properties shadowing those on `Object.prototype` are non-enumerable.
   *
   * In IE < 9 an object's own properties, shadowing non-enumerable ones,
   * are made non-enumerable as well (a.k.a the JScript `[[DontEnum]]` bug).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.nonEnumShadows = !/valueOf/.test(props);

  /**
   * Detect if own properties are iterated after inherited properties (IE < 9).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.ownLast = props[0] != 'x';

  /**
   * Detect if `Array#shift` and `Array#splice` augment array-like objects
   * correctly.
   *
   * Firefox < 10, compatibility modes of IE 8, and IE < 9 have buggy Array
   * `shift()` and `splice()` functions that fail to remove the last element,
   * `value[0]`, of array-like objects even though the "length" property is
   * set to `0`. The `shift()` method is buggy in compatibility modes of IE 8,
   * while `splice()` is buggy regardless of mode in IE < 9.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.spliceObjects = (splice.call(object, 0, 1), !object[0]);

  /**
   * Detect lack of support for accessing string characters by index.
   *
   * IE < 8 can't access characters by index. IE 8 can only access characters
   * by index on string literals, not string objects.
   *
   * @memberOf _.support
   * @type boolean
   */
  support.unindexedChars = ('x'[0] + Object('x')[0]) != 'xx';
}(1, 0));

module.exports = support;

},{}],148:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],149:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    basePropertyDeep = require('../internal/basePropertyDeep'),
    isKey = require('../internal/isKey');

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"../internal/baseProperty":105,"../internal/basePropertyDeep":106,"../internal/isKey":126}],150:[function(require,module,exports){
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
},{}],151:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],152:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PanelGroup = require('./PanelGroup');

var _PanelGroup2 = _interopRequireDefault(_PanelGroup);

var Accordion = _react2['default'].createClass({
  displayName: 'Accordion',

  render: function render() {
    return _react2['default'].createElement(
      _PanelGroup2['default'],
      _extends({}, this.props, { accordion: true }),
      this.props.children
    );
  }
});

exports['default'] = Accordion;
module.exports = exports['default'];
},{"./PanelGroup":225,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"react":"react"}],153:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Alert = _react2['default'].createClass({
  displayName: 'Alert',

  propTypes: {
    onDismiss: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    dismissAfter: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.number, 'No longer supported.'),
    closeLabel: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeLabel: 'Close Alert'
    };
  },

  renderDismissButton: function renderDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'close',
        onClick: this.props.onDismiss,
        'aria-hidden': 'true',
        tabIndex: '-1'
      },
      _react2['default'].createElement(
        'span',
        null,
        '×'
      )
    );
  },

  renderSrOnlyDismissButton: function renderSrOnlyDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'close sr-only',
        onClick: this.props.onDismiss
      },
      this.props.closeLabel
    );
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);
    var isDismissable = !!this.props.onDismiss;

    classes[_utilsBootstrapUtils.prefix(this.props, 'dismissable')] = isDismissable;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'alert',
        className: _classnames2['default'](this.props.className, classes)
      }),
      isDismissable ? this.renderDismissButton() : null,
      this.props.children,
      isDismissable ? this.renderSrOnlyDismissButton() : null
    );
  },

  componentDidMount: function componentDidMount() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
});

exports['default'] = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values(), _styleMaps.State.INFO, _utilsBootstrapUtils.bsClass('alert', Alert));
module.exports = exports['default'];
},{"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/deprecated":308}],154:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var Badge = _react2['default'].createClass({
  displayName: 'Badge',

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pullRight: false,
      bsClass: 'badge'
    };
  },

  hasContent: function hasContent() {
    var children = this.props.children;

    return _utilsValidComponentChildren2['default'].count(children) > 0 || _react2['default'].Children.count(children) > 1 || typeof children === 'string' || typeof children === 'number';
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {
      'pull-right': this.props.pullRight
    }, _classes[_utilsBootstrapUtils.prefix(this.props)] = this.hasContent(), _classes);
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = Badge;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],155:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _BreadcrumbItem = require('./BreadcrumbItem');

var _BreadcrumbItem2 = _interopRequireDefault(_BreadcrumbItem);

var Breadcrumb = _react2['default'].createClass({
  displayName: 'Breadcrumb',

  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'breadcrumb'
    };
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2['default'].createElement(
      'ol',
      _extends({}, props, {
        role: 'navigation',
        'aria-label': 'breadcrumbs',
        className: _classnames2['default'](className, this.props.bsClass) }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderBreadcrumbItem)
    );
  },

  renderBreadcrumbItem: function renderBreadcrumbItem(child, index) {
    return _react.cloneElement(child, { key: child.key || index });
  }
});

Breadcrumb.Item = _BreadcrumbItem2['default'];

exports['default'] = Breadcrumb;
module.exports = exports['default'];
},{"./BreadcrumbItem":156,"./utils/ValidComponentChildren":247,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],156:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var BreadcrumbItem = _react2['default'].createClass({
  displayName: 'BreadcrumbItem',

  propTypes: {
    /**
     * If set to true, renders `span` instead of `a`
     */
    active: _react2['default'].PropTypes.bool,
    /**
     * HTML id for the wrapper `li` element
     */
    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    /**
     * HTML id for the inner `a` element
     */
    linkId: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    /**
     * `href` attribute for the inner `a` element
     */
    href: _react2['default'].PropTypes.string,
    /**
     * `title` attribute for the inner `a` element
     */
    title: _react2['default'].PropTypes.node,
    /**
     * `target` attribute for the inner `a` element
     */
    target: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false
    };
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var className = _props.className;
    var id = _props.id;
    var linkId = _props.linkId;
    var children = _props.children;
    var href = _props.href;
    var title = _props.title;
    var target = _props.target;

    var props = _objectWithoutProperties(_props, ['active', 'className', 'id', 'linkId', 'children', 'href', 'title', 'target']);

    var linkProps = {
      href: href,
      title: title,
      target: target,
      id: linkId
    };

    return _react2['default'].createElement(
      'li',
      { id: id, className: _classnames2['default'](className, { active: active }) },
      active ? _react2['default'].createElement(
        'span',
        props,
        children
      ) : _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, props, linkProps),
        children
      )
    );
  }
});

exports['default'] = BreadcrumbItem;
module.exports = exports['default'];
},{"./SafeAnchor":231,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],157:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var ButtonStyles = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY, _styleMaps.LINK);

var types = ['button', 'reset', 'submit'];

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props, context) {
    _classCallCheck(this, Button);

    _React$Component.call(this, props, context);
  }

  Button.prototype.render = function render() {
    var _extends2;

    var classes = this.props.navDropdown ? {} : _utilsBootstrapUtils.getClassSet(this.props);
    var renderFuncName = undefined;

    var blockClass = _utilsBootstrapUtils.prefix(this.props, 'block');

    classes = _extends((_extends2 = {
      active: this.props.active
    }, _extends2[blockClass] = this.props.block, _extends2), classes);

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ? 'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  };

  Button.prototype.renderAnchor = function renderAnchor(classes) {
    var _props = this.props;
    var disabled = _props.disabled;
    var href = _props.href;

    classes.disabled = disabled;

    return _react2['default'].createElement(
      _SafeAnchor2['default'],
      _extends({}, this.props, {
        href: href || '#',
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  };

  Button.prototype.renderButton = function renderButton(classes) {
    var Component = this.props.componentClass || 'button';

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        type: this.props.type || 'button',
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  };

  Button.prototype.renderNavItem = function renderNavItem(classes) {
    var liClasses = {
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { className: _classnames2['default'](liClasses) },
      this.renderAnchor(classes)
    );
  };

  return Button;
})(_react2['default'].Component);

Button.propTypes = {
  active: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  block: _react2['default'].PropTypes.bool,
  navItem: _react2['default'].PropTypes.bool,
  navDropdown: _react2['default'].PropTypes.bool,
  onClick: _react2['default'].PropTypes.func,
  /**
   * You can use a custom element for this component
   */
  componentClass: _reactPropTypesLibElementType2['default'],
  href: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  /**
   * Defines HTML button type Attribute
   * @type {("button"|"reset"|"submit")}
   * @defaultValue 'button'
   */
  type: _react2['default'].PropTypes.oneOf(types)
};

Button.defaultProps = {
  active: false,
  block: false,
  disabled: false,
  navItem: false,
  navDropdown: false
};

Button.types = types;

exports['default'] = _utilsBootstrapUtils.bsStyles(ButtonStyles, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL, _styleMaps.Sizes.XSMALL], _utilsBootstrapUtils.bsClass('btn', Button)));
module.exports = exports['default'];
},{"./SafeAnchor":231,"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],158:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var ButtonGroup = _react2['default'].createClass({
  displayName: 'ButtonGroup',

  propTypes: {
    vertical: _react2['default'].PropTypes.bool,
    justified: _react2['default'].PropTypes.bool,
    /**
     * Display block buttons, only useful when used with the "vertical" prop.
     * @type {bool}
     */
    block: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (props) {
      if (props.block && !props.vertical) {
        return new Error('The block property requires the vertical property to be set to have any effect');
      }
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      block: false,
      justified: false,
      vertical: false
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    classes[_utilsBootstrapUtils.prefix(this.props)] = !this.props.vertical;
    classes[_utilsBootstrapUtils.prefix(this.props, 'vertical')] = this.props.vertical;
    classes[_utilsBootstrapUtils.prefix(this.props, 'justified')] = this.props.justified;

    // this is annoying, since the class is `btn-block` not `btn-group-block`
    classes[_utilsBootstrapUtils.prefix(_Button2['default'].defaultProps, 'block')] = this.props.block;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('btn-group', ButtonGroup);
module.exports = exports['default'];
},{"./Button":157,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/all":306}],159:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _InputBase2 = require('./InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsChildrenValueInputValidation = require('./utils/childrenValueInputValidation');

var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var ButtonInput = (function (_InputBase) {
  _inherits(ButtonInput, _InputBase);

  function ButtonInput() {
    _classCallCheck(this, ButtonInput);

    _InputBase.apply(this, arguments);
  }

  ButtonInput.prototype.renderFormGroup = function renderFormGroup(children) {
    var _props = this.props;
    var bsStyle = _props.bsStyle;
    var value = _props.value;

    var other = _objectWithoutProperties(_props, ['bsStyle', 'value']);

    return _react2['default'].createElement(
      _FormGroup2['default'],
      other,
      children
    );
  };

  ButtonInput.prototype.renderInput = function renderInput() {
    var _props2 = this.props;
    var children = _props2.children;
    var value = _props2.value;

    var other = _objectWithoutProperties(_props2, ['children', 'value']);

    var val = children ? children : value;
    return _react2['default'].createElement(_Button2['default'], _extends({}, other, { componentClass: 'input', ref: 'input', key: 'input', value: val }));
  };

  return ButtonInput;
})(_InputBase3['default']);

ButtonInput.types = _Button2['default'].types;

ButtonInput.defaultProps = {
  type: 'button'
};

ButtonInput.propTypes = {
  type: _react2['default'].PropTypes.oneOf(ButtonInput.types),
  bsStyle: function bsStyle() {
    // defer to Button propTypes of bsStyle
    return null;
  },
  children: _utilsChildrenValueInputValidation2['default'],
  value: _utilsChildrenValueInputValidation2['default']
};

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(ButtonInput, '`<ButtonInput>`', '`<Button>` directly');
module.exports = exports['default'];
},{"./Button":157,"./FormGroup":180,"./InputBase":186,"./utils/childrenValueInputValidation":250,"./utils/deprecationWarning":252,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"react":"react"}],160:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var ButtonToolbar = _react2['default'].createClass({
  displayName: 'ButtonToolbar',

  propTypes: {
    bsSize: _Button2['default'].propTypes.bsSize
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'btn-toolbar'
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'toolbar',
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = ButtonToolbar;
module.exports = exports['default'];
},{"./Button":157,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],161:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _CarouselCaption = require('./CarouselCaption');

var _CarouselCaption2 = _interopRequireDefault(_CarouselCaption);

var _CarouselItem = require('./CarouselItem');

var _CarouselItem2 = _interopRequireDefault(_CarouselItem);

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var Carousel = _react2['default'].createClass({
  displayName: 'Carousel',

  propTypes: {
    slide: _react2['default'].PropTypes.bool,
    indicators: _react2['default'].PropTypes.bool,
    interval: _react2['default'].PropTypes.number,
    controls: _react2['default'].PropTypes.bool,
    pauseOnHover: _react2['default'].PropTypes.bool,
    wrap: _react2['default'].PropTypes.bool,
    /**
     * Callback fired when the active item changes.
     *
     * ```js
     * (eventKey: any) => any | (eventKey: any, event: Object) => any
     * ```
     *
     * If this callback takes two or more arguments, the second argument will
     * be a persisted event object with `direction` set to the direction of the
     * transition.
     */
    onSelect: _react2['default'].PropTypes.func,
    onSlideEnd: _react2['default'].PropTypes.func,
    activeIndex: _react2['default'].PropTypes.number,
    defaultActiveIndex: _react2['default'].PropTypes.number,
    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
    prevIcon: _react2['default'].PropTypes.node,
    nextIcon: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'carousel',
      slide: true,
      interval: 5000,
      pauseOnHover: true,
      wrap: true,
      indicators: true,
      controls: true,
      prevIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-left' }),
      nextIcon: _react2['default'].createElement(_Glyphicon2['default'], { glyph: 'chevron-right' })
    };
  },

  getInitialState: function getInitialState() {
    return {
      activeIndex: this.props.defaultActiveIndex == null ? 0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },

  getDirection: function getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },

  componentDidMount: function componentDidMount() {
    this.waitForNext();
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timeout);
  },

  next: function next(e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() + 1;
    var count = _utilsValidComponentChildren2['default'].count(this.props.children);

    if (index > count - 1) {
      if (!this.props.wrap) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, e, 'next');
  },

  prev: function prev(e) {
    if (e) {
      e.preventDefault();
    }

    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.wrap) {
        return;
      }
      index = _utilsValidComponentChildren2['default'].count(this.props.children) - 1;
    }

    this.handleSelect(index, e, 'prev');
  },

  pause: function pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },

  play: function play() {
    this.isPaused = false;
    this.waitForNext();
  },

  waitForNext: function waitForNext() {
    if (!this.isPaused && this.props.slide && this.props.interval && this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },

  handleMouseOver: function handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },

  handleMouseOut: function handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props)] = true, _classes.slide = this.props.slide, _classes);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut
      }),
      this.props.indicators ? this.renderIndicators() : null,
      _react2['default'].createElement(
        'div',
        {
          ref: 'inner',
          className: _utilsBootstrapUtils.prefix(this.props, 'inner')
        },
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderItem)
      ),
      this.props.controls ? this.renderControls() : null
    );
  },

  renderPrev: function renderPrev() {
    var classes = 'left ' + _utilsBootstrapUtils.prefix(this.props, 'control');

    return _react2['default'].createElement(
      'a',
      { className: classes, href: '#prev', key: 0, onClick: this.prev },
      this.props.prevIcon
    );
  },

  renderNext: function renderNext() {
    var classes = 'right ' + _utilsBootstrapUtils.prefix(this.props, 'control');

    return _react2['default'].createElement(
      'a',
      { className: classes, href: '#next', key: 1, onClick: this.next },
      this.props.nextIcon
    );
  },

  renderControls: function renderControls() {
    if (!this.props.wrap) {
      var activeIndex = this.getActiveIndex();
      var count = _utilsValidComponentChildren2['default'].count(this.props.children);

      return [activeIndex !== 0 ? this.renderPrev() : null, activeIndex !== count - 1 ? this.renderNext() : null];
    }

    return [this.renderPrev(), this.renderNext()];
  },

  renderIndicator: function renderIndicator(child, index) {
    var _this = this;

    var className = index === this.getActiveIndex() ? 'active' : null;

    return _react2['default'].createElement('li', {
      key: index,
      className: className,
      onClick: function (e) {
        return _this.handleSelect(index, e, null);
      } });
  },

  renderIndicators: function renderIndicators() {
    var _this2 = this;

    var indicators = [];
    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child, index) {
      indicators.push(_this2.renderIndicator(child, index),

      // Force whitespace between indicator elements, bootstrap
      // requires this for correct spacing of elements.
      ' ');
    }, this);

    return _react2['default'].createElement(
      'ol',
      { className: _utilsBootstrapUtils.prefix(this.props, 'indicators') },
      indicators
    );
  },

  getActiveIndex: function getActiveIndex() {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },

  handleItemAnimateOutEnd: function handleItemAnimateOutEnd() {
    var _this3 = this;

    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function () {
      _this3.waitForNext();

      if (_this3.props.onSlideEnd) {
        _this3.props.onSlideEnd();
      }
    });
  },

  renderItem: function renderItem(child, index) {
    var activeIndex = this.getActiveIndex();
    var isActive = index === activeIndex;
    var isPreviousActive = this.state.previousActiveIndex != null && this.state.previousActiveIndex === index && this.props.slide;

    return _react.cloneElement(child, {
      active: isActive,
      ref: child.ref,
      key: child.key ? child.key : index,
      index: index,
      animateOut: isPreviousActive,
      animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
      direction: this.state.direction,
      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
    });
  },

  handleSelect: function handleSelect(index, e, direction) {
    clearTimeout(this.timeout);

    if (this.isMounted()) {
      var previousActiveIndex = this.getActiveIndex();
      direction = direction || this.getDirection(previousActiveIndex, index);

      var onSelect = this.props.onSelect;

      if (onSelect) {
        if (onSelect.length > 1) {
          // React SyntheticEvents are pooled, so we need to remove this event
          // from the pool to add a custom property. To avoid unnecessarily
          // removing objects from the pool, only do this when the listener
          // actually wants the event.
          e.persist();
          e.direction = direction;

          onSelect(index, e);
        } else {
          onSelect(index);
        }
      }

      if (this.props.activeIndex == null && index !== previousActiveIndex) {
        if (this.state.previousActiveIndex != null) {
          // If currently animating don't activate the new index.
          // TODO: look into queuing this canceled call and
          // animating after the current animation has ended.
          return;
        }

        this.setState({
          activeIndex: index,
          previousActiveIndex: previousActiveIndex,
          direction: direction
        });
      }
    }
  }
});

Carousel = _Object$assign(Carousel, { Caption: _CarouselCaption2['default'], Item: _CarouselItem2['default'] });

exports['default'] = Carousel;
module.exports = exports['default'];
},{"./CarouselCaption":162,"./CarouselItem":163,"./Glyphicon":181,"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"babel-runtime/core-js/object/assign":255,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],162:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var CarouselCaption = _react2['default'].createClass({
  displayName: 'Carousel.Caption',
  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'carousel-caption') }),
      this.props.children
    );
  }
});

exports['default'] = CarouselCaption;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],163:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var CarouselItem = _react2['default'].createClass({
  displayName: 'CarouselItem',

  propTypes: {
    direction: _react2['default'].PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: _react2['default'].PropTypes.func,
    active: _react2['default'].PropTypes.bool,
    animateIn: _react2['default'].PropTypes.bool,
    animateOut: _react2['default'].PropTypes.bool,
    caption: _react2['default'].PropTypes.node,
    index: _react2['default'].PropTypes.number
  },

  getInitialState: function getInitialState() {
    return {
      direction: null
    };
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsStyle: 'carousel',
      active: false,
      animateIn: false,
      animateOut: false
    };
  },

  handleAnimateOutEnd: function handleAnimateOutEnd() {
    if (this.props.onAnimateOutEnd && this.isMounted()) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      _utilsTransitionEvents2['default'].addEndEventListener(_reactDom2['default'].findDOMNode(this), this.handleAnimateOutEnd);
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation, 20);
    }
  },

  startAnimation: function startAnimation() {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  },

  render: function render() {
    var classes = {
      item: true,
      active: this.props.active && !this.props.animateIn || this.props.animateOut,
      next: this.props.active && this.props.animateIn && this.props.direction === 'next',
      prev: this.props.active && this.props.animateIn && this.props.direction === 'prev'
    };

    if (this.state.direction && (this.props.animateIn || this.props.animateOut)) {
      classes[this.state.direction] = true;
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children,
      this.props.caption ? this.renderCaption() : null
    );
  },

  renderCaption: function renderCaption() {
    var classes = _utilsBootstrapUtils.prefix(this.props, 'caption');

    return _react2['default'].createElement(
      'div',
      { className: classes },
      this.props.caption
    );
  }
});

exports['default'] = CarouselItem;
module.exports = exports['default'];
},{"./utils/TransitionEvents":246,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-dom":"react-dom"}],164:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  inline: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: _react2['default'].PropTypes.func
};

var defaultProps = {
  inline: false,
  disabled: false
};

var Checkbox = (function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    _React$Component.apply(this, arguments);
  }

  Checkbox.prototype.render = function render() {
    var _props = this.props;
    var inline = _props.inline;
    var disabled = _props.disabled;
    var validationState = _props.validationState;
    var inputRef = _props.inputRef;
    var className = _props.className;
    var style = _props.style;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'children']);

    delete props.bsClass;

    var input = _react2['default'].createElement('input', _extends({}, props, {
      ref: inputRef,
      type: 'checkbox',
      disabled: disabled
    }));

    if (inline) {
      var _classes;

      var _classes2 = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props, 'inline')] = true, _classes.disabled = disabled, _classes);

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!validationState, '`validationState` is ignored on `<Checkbox inline>`. To display ' + 'validation state on an inline checkbox, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : undefined;

      return _react2['default'].createElement(
        'label',
        { className: _classnames2['default'](className, _classes2), style: style },
        input,
        children
      );
    }

    var classes = _extends({}, _utilsBootstrapUtils.getClassSet(this.props), {
      disabled: disabled
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className, classes), style: style },
      _react2['default'].createElement(
        'label',
        null,
        input,
        children
      )
    );
  };

  return Checkbox;
})(_react2['default'].Component);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('checkbox', Checkbox);
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./utils/bootstrapUtils":248,"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","warning":321}],165:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Clearfix = _react2['default'].createClass({
  displayName: 'Clearfix',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default'],
    /**
     * Apply clearfix
     *
     * on Extra small devices Phones
     *
     * adds class `visible-xs-block`
     */
    visibleXsBlock: _react2['default'].PropTypes.bool,
    /**
     * Apply clearfix
     *
     * on Small devices Tablets
     *
     * adds class `visible-sm-block`
     */
    visibleSmBlock: _react2['default'].PropTypes.bool,
    /**
     * Apply clearfix
     *
     * on Medium devices Desktops
     *
     * adds class `visible-md-block`
     */
    visibleMdBlock: _react2['default'].PropTypes.bool,
    /**
     * Apply clearfix
     *
     * on Large devices Desktops
     *
     * adds class `visible-lg-block`
     */
    visibleLgBlock: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _this = this;

    var ComponentClass = this.props.componentClass;

    var classes = {};

    _Object$keys(_styleMaps2['default'].SIZES).forEach(function (key) {
      var size = _styleMaps2['default'].SIZES[key];

      classes['visible-' + size + '-block'] = _this.props['visible' + size.charAt(0).toUpperCase() + size.slice(1) + 'Block'];
    }, this);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'clearfix', classes) }),
      this.props.children
    );
  }
});

exports['default'] = Clearfix;
module.exports = exports['default'];
},{"./styleMaps":244,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],166:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Col = _react2['default'].createClass({
  displayName: 'Col',

  propTypes: {
    /**
     * The number of columns you wish to span
     *
     * for Extra small devices Phones (<768px)
     *
     * class-prefix `col-xs-`
     */
    xs: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Small devices Tablets (≥768px)
     *
     * class-prefix `col-sm-`
     */
    sm: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Medium devices Desktops (≥992px)
     *
     * class-prefix `col-md-`
     */
    md: _react2['default'].PropTypes.number,
    /**
     * The number of columns you wish to span
     *
     * for Large devices Desktops (≥1200px)
     *
     * class-prefix `col-lg-`
     */
    lg: _react2['default'].PropTypes.number,
    /**
     * Hide column
     *
     * on Extra small devices Phones
     *
     * adds class `hidden-xs`
     */
    xsHidden: _react2['default'].PropTypes.bool,
    /**
     * Hide column
     *
     * on Small devices Tablets
     *
     * adds class `hidden-sm`
     */
    smHidden: _react2['default'].PropTypes.bool,
    /**
     * Hide column
     *
     * on Medium devices Desktops
     *
     * adds class `hidden-md`
     */
    mdHidden: _react2['default'].PropTypes.bool,
    /**
     * Hide column
     *
     * on Large devices Desktops
     *
     * adds class `hidden-lg`
     */
    lgHidden: _react2['default'].PropTypes.bool,
    /**
     * Move columns to the right
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-offset-`
     */
    xsOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-offset-`
     */
    smOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-offset-`
     */
    mdOffset: _react2['default'].PropTypes.number,
    /**
     * Move columns to the right
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-offset-`
     */
    lgOffset: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-push-`
     */
    xsPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-push-`
     */
    smPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-push-`
     */
    mdPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the right
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-push-`
     */
    lgPush: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Extra small devices Phones
     *
     * class-prefix `col-xs-pull-`
     */
    xsPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Small devices Tablets
     *
     * class-prefix `col-sm-pull-`
     */
    smPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Medium devices Desktops
     *
     * class-prefix `col-md-pull-`
     */
    mdPull: _react2['default'].PropTypes.number,
    /**
     * Change the order of grid columns to the left
     *
     * for Large devices Desktops
     *
     * class-prefix `col-lg-pull-`
     */
    lgPull: _react2['default'].PropTypes.number,
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _this = this;

    var ComponentClass = this.props.componentClass;
    var classes = {};

    _Object$keys(_styleMaps2['default'].SIZES).forEach(function (key) {
      var size = _styleMaps2['default'].SIZES[key];
      var prop = size;
      var classPart = size + '-';

      if (_this.props[prop]) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }

      classes['hidden-' + size] = _this.props[size + 'Hidden'];

      prop = size + 'Offset';
      classPart = size + '-offset-';
      if (_this.props[prop] >= 0) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }

      prop = size + 'Push';
      classPart = size + '-push-';
      if (_this.props[prop] >= 0) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }

      prop = size + 'Pull';
      classPart = size + '-pull-';
      if (_this.props[prop] >= 0) {
        classes['col-' + classPart + _this.props[prop]] = true;
      }
    }, this);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  }
});

exports['default'] = Col;
module.exports = exports['default'];
},{"./styleMaps":244,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],167:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOverlaysLibTransition = require('react-overlays/lib/Transition');

var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var capitalize = function capitalize(str) {
  return str[0].toUpperCase() + str.substr(1);
};

// reading a dimension prop will cause the browser to recalculate,
// which will let our animations work
var triggerBrowserReflow = function triggerBrowserReflow(node) {
  return node.offsetHeight;
};

var MARGINS = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight']
};

function getDimensionValue(dimension, elem) {
  var value = elem['offset' + capitalize(dimension)];
  var margins = MARGINS[dimension];

  return value + parseInt(_domHelpersStyle2['default'](elem, margins[0]), 10) + parseInt(_domHelpersStyle2['default'](elem, margins[1]), 10);
}

var Collapse = (function (_React$Component) {
  _inherits(Collapse, _React$Component);

  function Collapse(props, context) {
    _classCallCheck(this, Collapse);

    _React$Component.call(this, props, context);

    this.onEnterListener = this.handleEnter.bind(this);
    this.onEnteringListener = this.handleEntering.bind(this);
    this.onEnteredListener = this.handleEntered.bind(this);
    this.onExitListener = this.handleExit.bind(this);
    this.onExitingListener = this.handleExiting.bind(this);
  }

  // Explicitly copied from Transition for doc generation.
  // TODO: Remove duplication once #977 is resolved.

  Collapse.prototype.render = function render() {
    var enter = _utilsCreateChainedFunction2['default'](this.onEnterListener, this.props.onEnter);
    var entering = _utilsCreateChainedFunction2['default'](this.onEnteringListener, this.props.onEntering);
    var entered = _utilsCreateChainedFunction2['default'](this.onEnteredListener, this.props.onEntered);
    var exit = _utilsCreateChainedFunction2['default'](this.onExitListener, this.props.onExit);
    var exiting = _utilsCreateChainedFunction2['default'](this.onExitingListener, this.props.onExiting);

    return _react2['default'].createElement(
      _reactOverlaysLibTransition2['default'],
      _extends({
        ref: 'transition'
      }, this.props, {
        'aria-expanded': this.props.role ? this.props['in'] : null,
        className: _classnames2['default'](this.props.className, { width: this._dimension() === 'width' }),
        exitedClassName: 'collapse',
        exitingClassName: 'collapsing',
        enteredClassName: 'collapse in',
        enteringClassName: 'collapsing',
        onEnter: enter,
        onEntering: entering,
        onEntered: entered,
        onExit: exit,
        onExiting: exiting,
        onExited: this.props.onExited
      }),
      this.props.children
    );
  };

  /* -- Expanding -- */

  Collapse.prototype.handleEnter = function handleEnter(elem) {
    var dimension = this._dimension();
    elem.style[dimension] = '0';
  };

  Collapse.prototype.handleEntering = function handleEntering(elem) {
    var dimension = this._dimension();

    elem.style[dimension] = this._getScrollDimensionValue(elem, dimension);
  };

  Collapse.prototype.handleEntered = function handleEntered(elem) {
    var dimension = this._dimension();
    elem.style[dimension] = null;
  };

  /* -- Collapsing -- */

  Collapse.prototype.handleExit = function handleExit(elem) {
    var dimension = this._dimension();

    elem.style[dimension] = this.props.getDimensionValue(dimension, elem) + 'px';
  };

  Collapse.prototype.handleExiting = function handleExiting(elem) {
    var dimension = this._dimension();

    triggerBrowserReflow(elem);
    elem.style[dimension] = '0';
  };

  Collapse.prototype._dimension = function _dimension() {
    return typeof this.props.dimension === 'function' ? this.props.dimension() : this.props.dimension;
  };

  // for testing

  Collapse.prototype._getTransitionInstance = function _getTransitionInstance() {
    return this.refs.transition;
  };

  Collapse.prototype._getScrollDimensionValue = function _getScrollDimensionValue(elem, dimension) {
    return elem['scroll' + capitalize(dimension)] + 'px';
  };

  return Collapse;
})(_react2['default'].Component);

Collapse.propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: _react2['default'].PropTypes.number,

  /**
   * Callback fired before the component expands
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: _react2['default'].PropTypes.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * _Note: Bootstrap only partially supports 'width'!
   * You will need to supply your own CSS animation for the `.width` CSS class._
   */
  dimension: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['height', 'width']), _react2['default'].PropTypes.func]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   */
  getDimensionValue: _react2['default'].PropTypes.func,

  /**
   * ARIA role of collapsible element
   */
  role: _react2['default'].PropTypes.string
};

Collapse.defaultProps = {
  'in': false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false,

  dimension: 'height',
  getDimensionValue: getDimensionValue
};

exports['default'] = Collapse;
module.exports = exports['default'];
},{"./utils/createChainedFunction":251,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"dom-helpers/style":69,"react":"react","react-overlays/lib/Transition":294}],168:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: _react2['default'].PropTypes.string,
  srOnly: _react2['default'].PropTypes.bool
};

var defaultProps = {
  srOnly: false
};

var contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};

var ControlLabel = (function (_React$Component) {
  _inherits(ControlLabel, _React$Component);

  function ControlLabel() {
    _classCallCheck(this, ControlLabel);

    _React$Component.apply(this, arguments);
  }

  ControlLabel.prototype.render = function render() {
    var formGroup = this.context.$bs_formGroup;
    var controlId = formGroup && formGroup.controlId;

    var _props = this.props;
    var _props$htmlFor = _props.htmlFor;
    var htmlFor = _props$htmlFor === undefined ? controlId : _props$htmlFor;
    var srOnly = _props.srOnly;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['htmlFor', 'srOnly', 'className']);

    process.env.NODE_ENV !== 'production' ? _warning2['default'](controlId == null || htmlFor === controlId, '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.') : undefined;

    delete props.bsClass;

    var classes = _extends({}, _utilsBootstrapUtils.getClassSet(this.props), {
      'sr-only': srOnly
    });

    return _react2['default'].createElement('label', _extends({}, props, {
      htmlFor: htmlFor,
      className: _classnames2['default'](className, classes)
    }));
  };

  return ControlLabel;
})(_react2['default'].Component);

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextTypes = contextTypes;

exports['default'] = _utilsBootstrapUtils.bsClass('control-label', ControlLabel);
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./utils/bootstrapUtils":248,"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","warning":321}],169:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _lodashCompatCollectionFind = require('lodash-compat/collection/find');

var _lodashCompatCollectionFind2 = _interopRequireDefault(_lodashCompatCollectionFind);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

var _DropdownMenu = require('./DropdownMenu');

var _DropdownMenu2 = _interopRequireDefault(_DropdownMenu);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var TOGGLE_ROLE = _DropdownToggle2['default'].defaultProps.bsRole;
var MENU_ROLE = _DropdownMenu2['default'].defaultProps.bsRole;

var Dropdown = (function (_React$Component) {
  _inherits(Dropdown, _React$Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    _React$Component.call(this, props);

    this.Toggle = _DropdownToggle2['default'];

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.extractChildren = this.extractChildren.bind(this);

    this.refineMenu = this.refineMenu.bind(this);
    this.refineToggle = this.refineToggle.bind(this);

    this.childExtractors = [{
      key: 'toggle',
      matches: function matches(child) {
        return child.props.bsRole === TOGGLE_ROLE;
      },
      refine: this.refineToggle
    }, {
      key: 'menu',
      exclusive: true,
      matches: function matches(child) {
        return child.props.bsRole === MENU_ROLE;
      },
      refine: this.refineMenu
    }];

    this.state = {};

    this.lastOpenEventType = null;
  }

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    this.focusNextOnOpen();
  };

  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
    if (!nextProps.open && this.props.open) {
      this._focusInDropdown = _domHelpersQueryContains2['default'](_reactDom2['default'].findDOMNode(this.menu), _domHelpersActiveElement2['default'](document));
    }
  };

  Dropdown.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) {
      this.focusNextOnOpen();
    }

    if (!this.props.open && prevProps.open) {
      // if focus hasn't already moved from the menu lets return it
      // to the toggle
      if (this._focusInDropdown) {
        this._focusInDropdown = false;
        this.focus();
      }
    }
  };

  Dropdown.prototype.render = function render() {
    var _rootClasses;

    var children = this.extractChildren();
    var Component = this.props.componentClass;

    var props = _lodashCompatObjectOmit2['default'](this.props, ['id', 'bsClass', 'role', 'onSelect']);
    var className = _utilsBootstrapUtils.prefix(this.props);

    var rootClasses = (_rootClasses = {
      open: this.props.open,
      disabled: this.props.disabled
    }, _rootClasses[className] = !this.props.dropup, _rootClasses.dropup = this.props.dropup, _rootClasses);

    return _react2['default'].createElement(
      Component,
      _extends({}, props, {
        className: _classnames2['default'](this.props.className, rootClasses)
      }),
      children
    );
  };

  Dropdown.prototype.toggleOpen = function toggleOpen() {
    var eventType = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    var open = !this.props.open;

    if (open) {
      this.lastOpenEventType = eventType;
    }

    if (this.props.onToggle) {
      this.props.onToggle(open);
    }
  };

  Dropdown.prototype.handleClick = function handleClick() {
    if (this.props.disabled) {
      return;
    }

    this.toggleOpen('click');
  };

  Dropdown.prototype.handleKeyDown = function handleKeyDown(event) {
    if (this.props.disabled) {
      return;
    }

    switch (event.keyCode) {
      case _keycode2['default'].codes.down:
        if (!this.props.open) {
          this.toggleOpen('keydown');
        } else if (this.menu.focusNext) {
          this.menu.focusNext();
        }
        event.preventDefault();
        break;
      case _keycode2['default'].codes.esc:
      case _keycode2['default'].codes.tab:
        this.handleClose(event);
        break;
      default:
    }
  };

  Dropdown.prototype.handleClose = function handleClose() {
    if (!this.props.open) {
      return;
    }

    this.toggleOpen();
  };

  Dropdown.prototype.focusNextOnOpen = function focusNextOnOpen() {
    var menu = this.menu;

    if (!menu.focusNext) {
      return;
    }

    if (this.lastOpenEventType === 'keydown' || this.props.role === 'menuitem') {
      menu.focusNext();
    }
  };

  Dropdown.prototype.focus = function focus() {
    var toggle = _reactDom2['default'].findDOMNode(this.toggle);

    if (toggle && toggle.focus) {
      toggle.focus();
    }
  };

  Dropdown.prototype.extractChildren = function extractChildren() {
    var _this = this;

    var open = !!this.props.open;
    var seen = {};

    return _utilsValidComponentChildren2['default'].map(this.props.children, function (child) {
      var extractor = _lodashCompatCollectionFind2['default'](_this.childExtractors, function (x) {
        return x.matches(child);
      });

      if (extractor) {
        if (seen[extractor.key]) {
          return false;
        }

        seen[extractor.key] = extractor.exclusive;
        child = extractor.refine(child, open);
      }

      return child;
    });
  };

  Dropdown.prototype.refineMenu = function refineMenu(menu, open) {
    var _this2 = this;

    var ref = function ref(r) {
      return _this2.menu = r;
    };

    if (typeof menu.ref === 'string') {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'String refs are not supported on `<Dropdown.Menu>` components. ' + 'To apply a ref to the component use the callback signature: \n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : undefined;
    } else {
      ref = _utilsCreateChainedFunction2['default'](menu.ref, ref);
    }

    var menuProps = {
      ref: ref,
      open: open,
      labelledBy: this.props.id,
      pullRight: this.props.pullRight,
      bsClass: this.props.bsClass
    };

    menuProps.onClose = _utilsCreateChainedFunction2['default'](menu.props.onClose, this.props.onClose, this.handleClose);

    menuProps.onSelect = _utilsCreateChainedFunction2['default'](menu.props.onSelect, this.props.onSelect, this.handleClose);

    return _react.cloneElement(menu, menuProps, menu.props.children);
  };

  Dropdown.prototype.refineToggle = function refineToggle(toggle, open) {
    var _this3 = this;

    var ref = function ref(r) {
      return _this3.toggle = r;
    };

    if (typeof toggle.ref === 'string') {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'String refs are not supported on `<Dropdown.Toggle>` components. ' + 'To apply a ref to the component use the callback signature: \n\n ' + 'https://facebook.github.io/react/docs/more-about-refs.html#the-ref-callback-attribute') : undefined;
    } else {
      ref = _utilsCreateChainedFunction2['default'](toggle.ref, ref);
    }

    var toggleProps = {
      ref: ref,
      open: open,
      id: this.props.id,
      role: this.props.role
    };

    toggleProps.onClick = _utilsCreateChainedFunction2['default'](toggle.props.onClick, this.handleClick);

    toggleProps.onKeyDown = _utilsCreateChainedFunction2['default'](toggle.props.onKeyDown, this.handleKeyDown);

    return _react.cloneElement(toggle, toggleProps, toggle.props.children);
  };

  return Dropdown;
})(_react2['default'].Component);

Dropdown.Toggle = _DropdownToggle2['default'];

Dropdown.TOGGLE_ROLE = TOGGLE_ROLE;
Dropdown.MENU_ROLE = MENU_ROLE;

Dropdown.defaultProps = {
  componentClass: _ButtonGroup2['default'],
  bsClass: 'dropdown'
};

Dropdown.propTypes = {

  bsClass: _react2['default'].PropTypes.string,

  /**
   * The menu will open above the dropdown button, instead of below it.
   */
  dropup: _react2['default'].PropTypes.bool,

  /**
   * An html id attribute, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

  componentClass: _reactPropTypesLibElementType2['default'],

  /**
   * The children of a Dropdown may be a `<Dropdown.Toggle/>` or a `<Dropdown.Menu/>`.
   * @type {node}
   */
  children: _reactPropTypesLibAll2['default'](_utilsCustomPropTypes2['default'].requiredRoles(TOGGLE_ROLE, MENU_ROLE), _utilsCustomPropTypes2['default'].exclusiveRoles(MENU_ROLE)),

  /**
   * Whether or not component is disabled.
   */
  disabled: _react2['default'].PropTypes.bool,

  /**
   * Align the menu to the right side of the Dropdown toggle
   */
  pullRight: _react2['default'].PropTypes.bool,

  /**
   * Whether or not the Dropdown is visible.
   *
   * @controllable onToggle
   */
  open: _react2['default'].PropTypes.bool,

  /**
   * A callback fired when the Dropdown closes.
   */
  onClose: _react2['default'].PropTypes.func,

  /**
   * A callback fired when the Dropdown wishes to change visibility. Called with the requested
   * `open` value.
   *
   * ```js
   * function(Boolean isOpen) {}
   * ```
   * @controllable open
   */
  onToggle: _react2['default'].PropTypes.func,

  /**
   * A callback fired when a menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: _react2['default'].PropTypes.func,

  /**
   * If `'menuitem'`, causes the dropdown to behave like a menu item rather than
   * a menu button.
   */
  role: _react2['default'].PropTypes.string
};

Dropdown = _uncontrollable2['default'](Dropdown, { open: 'onToggle' });

Dropdown.Toggle = _DropdownToggle2['default'];
Dropdown.Menu = _DropdownMenu2['default'];

exports['default'] = Dropdown;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./ButtonGroup":158,"./DropdownMenu":171,"./DropdownToggle":172,"./utils/CustomPropTypes":245,"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"dom-helpers/activeElement":50,"dom-helpers/query/contains":60,"keycode":80,"lodash-compat/collection/find":82,"lodash-compat/object/omit":144,"react":"react","react-dom":"react-dom","react-prop-types/lib/all":306,"react-prop-types/lib/elementType":309,"react-prop-types/lib/isRequiredForA11y":310,"uncontrollable":319,"warning":321}],170:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var DropdownButton = (function (_React$Component) {
  _inherits(DropdownButton, _React$Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    _React$Component.apply(this, arguments);
  }

  DropdownButton.prototype.render = function render() {
    var _props = this.props;
    var bsStyle = _props.bsStyle;
    var bsSize = _props.bsSize;
    var disabled = _props.disabled;
    var _props2 = this.props;
    var title = _props2.title;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['title', 'children']);

    var dropdownProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));
    var toggleProps = _lodashCompatObjectOmit2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));

    return _react2['default'].createElement(
      _Dropdown2['default'],
      _extends({}, dropdownProps, {
        bsSize: bsSize,
        bsStyle: bsStyle
      }),
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        _extends({}, toggleProps, {
          disabled: disabled
        }),
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return DropdownButton;
})(_react2['default'].Component);

DropdownButton.propTypes = _extends({
  disabled: _react2['default'].PropTypes.bool,
  bsStyle: _Button2['default'].propTypes.bsStyle,
  bsSize: _Button2['default'].propTypes.bsSize,

  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.node.isRequired

}, _Dropdown2['default'].propTypes);

DropdownButton.defaultProps = {
  disabled: false,
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

exports['default'] = DropdownButton;
module.exports = exports['default'];
},{"./Button":157,"./Dropdown":169,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"lodash-compat/object/omit":144,"lodash-compat/object/pick":146,"react":"react"}],171:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _reactOverlaysLibRootCloseWrapper = require('react-overlays/lib/RootCloseWrapper');

var _reactOverlaysLibRootCloseWrapper2 = _interopRequireDefault(_reactOverlaysLibRootCloseWrapper);

var DropdownMenu = (function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    _React$Component.call(this, props);

    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  DropdownMenu.prototype.handleKeyDown = function handleKeyDown(event) {
    switch (event.keyCode) {
      case _keycode2['default'].codes.down:
        this.focusNext();
        event.preventDefault();
        break;
      case _keycode2['default'].codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;
      case _keycode2['default'].codes.esc:
      case _keycode2['default'].codes.tab:
        this.props.onClose(event);
        break;
      default:
    }
  };

  DropdownMenu.prototype.focusNext = function focusNext() {
    var _getItemsAndActiveIndex = this.getItemsAndActiveIndex();

    var items = _getItemsAndActiveIndex.items;
    var activeItemIndex = _getItemsAndActiveIndex.activeItemIndex;

    if (items.length === 0) {
      return;
    }

    if (activeItemIndex === items.length - 1) {
      items[0].focus();
      return;
    }

    items[activeItemIndex + 1].focus();
  };

  DropdownMenu.prototype.focusPrevious = function focusPrevious() {
    var _getItemsAndActiveIndex2 = this.getItemsAndActiveIndex();

    var items = _getItemsAndActiveIndex2.items;
    var activeItemIndex = _getItemsAndActiveIndex2.activeItemIndex;

    if (activeItemIndex === 0) {
      items[items.length - 1].focus();
      return;
    }

    items[activeItemIndex - 1].focus();
  };

  DropdownMenu.prototype.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeElement = document.activeElement;
    var activeItemIndex = items.indexOf(activeElement);

    return { items: items, activeItemIndex: activeItemIndex };
  };

  DropdownMenu.prototype.getFocusableMenuItems = function getFocusableMenuItems() {
    var menuNode = _reactDom2['default'].findDOMNode(this);

    if (menuNode === undefined) {
      return [];
    }

    return [].slice.call(menuNode.querySelectorAll('[tabIndex="-1"]'), 0);
  };

  DropdownMenu.prototype.render = function render() {
    var _classes,
        _this = this;

    var _props = this.props;
    var children = _props.children;
    var onSelect = _props.onSelect;
    var pullRight = _props.pullRight;
    var className = _props.className;
    var labelledBy = _props.labelledBy;
    var open = _props.open;
    var onClose = _props.onClose;

    var props = _objectWithoutProperties(_props, ['children', 'onSelect', 'pullRight', 'className', 'labelledBy', 'open', 'onClose']);

    var items = _utilsValidComponentChildren2['default'].map(children, function (child) {
      var childProps = child.props || {};

      return _react2['default'].cloneElement(child, {
        onKeyDown: _utilsCreateChainedFunction2['default'](childProps.onKeyDown, _this.handleKeyDown),
        onSelect: _utilsCreateChainedFunction2['default'](childProps.onSelect, onSelect)
      }, childProps.children);
    });

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props, 'menu')] = true, _classes[_utilsBootstrapUtils.prefix(this.props, 'menu-right')] = pullRight, _classes);

    var list = _react2['default'].createElement(
      'ul',
      _extends({
        className: _classnames2['default'](className, classes),
        role: 'menu',
        'aria-labelledby': labelledBy
      }, props),
      items
    );

    if (open) {
      list = _react2['default'].createElement(
        _reactOverlaysLibRootCloseWrapper2['default'],
        { noWrap: true, onRootClose: onClose },
        list
      );
    }

    return list;
  };

  return DropdownMenu;
})(_react2['default'].Component);

DropdownMenu.defaultProps = {
  bsRole: 'menu',
  bsClass: 'dropdown',
  pullRight: false
};

DropdownMenu.propTypes = {
  open: _react2['default'].PropTypes.bool,
  pullRight: _react2['default'].PropTypes.bool,
  onClose: _react2['default'].PropTypes.func,
  labelledBy: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  onSelect: _react2['default'].PropTypes.func
};

exports['default'] = DropdownMenu;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"keycode":80,"react":"react","react-dom":"react-dom","react-overlays/lib/RootCloseWrapper":293}],172:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var CARET = _react2['default'].createElement(
  'span',
  null,
  ' ',
  _react2['default'].createElement('span', { className: 'caret' })
);

var DropdownToggle = (function (_React$Component) {
  _inherits(DropdownToggle, _React$Component);

  function DropdownToggle() {
    _classCallCheck(this, DropdownToggle);

    _React$Component.apply(this, arguments);
  }

  DropdownToggle.prototype.render = function render() {
    var caret = this.props.noCaret ? null : CARET;

    var classes = {
      'dropdown-toggle': true
    };

    var Component = this.props.useAnchor ? _SafeAnchor2['default'] : _Button2['default'];

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        className: _classnames2['default'](classes, this.props.className),
        role: 'button',
        'aria-haspopup': true,
        'aria-expanded': this.props.open }),
      this.props.children || this.props.title,
      caret
    );
  };

  return DropdownToggle;
})(_react2['default'].Component);

exports['default'] = DropdownToggle;

DropdownToggle.defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

DropdownToggle.propTypes = {
  bsRole: _react2['default'].PropTypes.string,
  noCaret: _react2['default'].PropTypes.bool,
  open: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.string,
  useAnchor: _react2['default'].PropTypes.bool
};

DropdownToggle.isToggle = true;
DropdownToggle.titleProp = 'title';
DropdownToggle.onClickProp = 'onClick';
module.exports = exports['default'];
},{"./Button":157,"./SafeAnchor":231,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],173:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactOverlaysLibTransition = require('react-overlays/lib/Transition');

var _reactOverlaysLibTransition2 = _interopRequireDefault(_reactOverlaysLibTransition);

var Fade = (function (_React$Component) {
  _inherits(Fade, _React$Component);

  function Fade() {
    _classCallCheck(this, Fade);

    _React$Component.apply(this, arguments);
  }

  // Explicitly copied from Transition for doc generation.
  // TODO: Remove duplication once #977 is resolved.

  Fade.prototype.render = function render() {
    var timeout = this.props.timeout;

    return _react2['default'].createElement(
      _reactOverlaysLibTransition2['default'],
      _extends({}, this.props, {
        timeout: timeout,
        className: _classnames2['default'](this.props.className, 'fade'),
        enteredClassName: 'in',
        enteringClassName: 'in'
      }),
      this.props.children
    );
  };

  return Fade;
})(_react2['default'].Component);

Fade.propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: _react2['default'].PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: _react2['default'].PropTypes.func
};

Fade.defaultProps = {
  'in': false,
  timeout: 300,
  unmountOnExit: false,
  transitionAppear: false
};

exports['default'] = Fade;
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-overlays/lib/Transition":294}],174:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  horizontal: _react2['default'].PropTypes.bool,
  inline: _react2['default'].PropTypes.bool,
  componentClass: _reactPropTypesLibElementType2['default']
};

var defaultProps = {
  horizontal: false,
  inline: false,
  componentClass: 'form'
};

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    _React$Component.apply(this, arguments);
  }

  Form.prototype.render = function render() {
    var _props = this.props;
    var horizontal = _props.horizontal;
    var inline = _props.inline;
    var Component = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['horizontal', 'inline', 'componentClass', 'className']);

    delete props.bsClass;

    var classes = [];
    if (horizontal) {
      classes.push(_utilsBootstrapUtils.prefix(this.props, 'horizontal'));
    }
    if (inline) {
      classes.push(_utilsBootstrapUtils.prefix(this.props, 'inline'));
    }

    return _react2['default'].createElement(Component, _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return Form;
})(_react2['default'].Component);

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('form', Form);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],175:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _FormControlFeedback = require('./FormControlFeedback');

var _FormControlFeedback2 = _interopRequireDefault(_FormControlFeedback);

var _FormControlStatic = require('./FormControlStatic');

var _FormControlStatic2 = _interopRequireDefault(_FormControlStatic);

var propTypes = {
  componentClass: _reactPropTypesLibElementType2['default'],
  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: _react2['default'].PropTypes.string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: _react2['default'].PropTypes.string
};

var defaultProps = {
  componentClass: 'input'
};

var contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};

var FormControl = (function (_React$Component) {
  _inherits(FormControl, _React$Component);

  function FormControl() {
    _classCallCheck(this, FormControl);

    _React$Component.apply(this, arguments);
  }

  FormControl.prototype.render = function render() {
    var formGroup = this.context.$bs_formGroup;
    var controlId = formGroup && formGroup.controlId;

    var _props = this.props;
    var Component = _props.componentClass;
    var type = _props.type;
    var _props$id = _props.id;
    var id = _props$id === undefined ? controlId : _props$id;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'type', 'id', 'className']);

    process.env.NODE_ENV !== 'production' ? _warning2['default'](controlId == null || id === controlId, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : undefined;

    delete props.bsClass;

    // input[type="file"] should not have .form-control.
    var classes = undefined;
    if (type !== 'file') {
      classes = _utilsBootstrapUtils.getClassSet(this.props);
    }

    return _react2['default'].createElement(Component, _extends({}, props, {
      type: type,
      id: id,
      className: _classnames2['default'](className, classes)
    }));
  };

  return FormControl;
})(_react2['default'].Component);

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

FormControl.Feedback = _FormControlFeedback2['default'];
FormControl.Static = _FormControlStatic2['default'];

exports['default'] = _utilsBootstrapUtils.bsClass('form-control', FormControl);
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./FormControlFeedback":176,"./FormControlStatic":177,"./utils/bootstrapUtils":248,"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309,"warning":321}],176:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var defaultProps = {
  bsRole: 'feedback'
};

var contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};

var FormControlFeedback = (function (_React$Component) {
  _inherits(FormControlFeedback, _React$Component);

  function FormControlFeedback() {
    _classCallCheck(this, FormControlFeedback);

    _React$Component.apply(this, arguments);
  }

  FormControlFeedback.prototype.getGlyph = function getGlyph(validationState) {
    switch (validationState) {
      case 'success':
        return 'ok';
      case 'warning':
        return 'warning-sign';
      case 'error':
        return 'remove';
      default:
        return null;
    }
  };

  FormControlFeedback.prototype.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, props) {
    var glyph = this.getGlyph(formGroup && formGroup.validationState);
    if (!glyph) {
      return null;
    }

    return _react2['default'].createElement(_Glyphicon2['default'], _extends({}, props, {
      glyph: glyph,
      className: _classnames2['default'](className, classes)
    }));
  };

  FormControlFeedback.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'children']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    if (!children) {
      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, props);
    }

    var child = _react2['default'].Children.only(children);
    return _react2['default'].cloneElement(child, _extends({}, props, {
      className: _classnames2['default'](child.props.className, className, classes)
    }));
  };

  return FormControlFeedback;
})(_react2['default'].Component);

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

exports['default'] = _utilsBootstrapUtils.bsClass('form-control-feedback', FormControlFeedback);
module.exports = exports['default'];
},{"./Glyphicon":181,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],177:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  componentClass: _reactPropTypesLibElementType2['default']
};

var defaultProps = {
  componentClass: 'p'
};

var FormControlStatic = (function (_React$Component) {
  _inherits(FormControlStatic, _React$Component);

  function FormControlStatic() {
    _classCallCheck(this, FormControlStatic);

    _React$Component.apply(this, arguments);
  }

  FormControlStatic.prototype.render = function render() {
    var _props = this.props;
    var Component = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(Component, _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return FormControlStatic;
})(_react2['default'].Component);

FormControlStatic.propTypes = propTypes;
FormControlStatic.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('form-control-static', FormControlStatic);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],178:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _InputBase2 = require('../InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsChildrenValueInputValidation = require('../utils/childrenValueInputValidation');

var _utilsChildrenValueInputValidation2 = _interopRequireDefault(_utilsChildrenValueInputValidation);

var _utilsDeprecationWarning = require('../utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var Static = (function (_InputBase) {
  _inherits(Static, _InputBase);

  function Static() {
    _classCallCheck(this, Static);

    _InputBase.apply(this, arguments);
  }

  Static.prototype.getValue = function getValue() {
    var _props = this.props;
    var children = _props.children;
    var value = _props.value;

    return children ? children : value;
  };

  Static.prototype.renderInput = function renderInput() {
    var _props2 = this.props;
    var ComponentClass = _props2.componentClass;

    var props = _objectWithoutProperties(_props2, ['componentClass']);

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, props, { className: _classnames2['default'](props.className, 'form-control-static'), ref: 'input', key: 'input' }),
      this.getValue()
    );
  };

  return Static;
})(_InputBase3['default']);

Static.propTypes = {
  value: _utilsChildrenValueInputValidation2['default'],
  /**
   * You can override the default 'p' with a custom element
   */
  componentClass: _reactPropTypesLibElementType2['default'],
  children: _utilsChildrenValueInputValidation2['default']
};

Static.defaultProps = {
  componentClass: 'p'
};

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(Static, '`<FormControls.Static>`', '`<FormControl.Static>`');
module.exports = exports['default'];
},{"../InputBase":186,"../utils/childrenValueInputValidation":250,"../utils/deprecationWarning":252,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],179:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Static2 = require('./Static');

var _Static3 = _interopRequireDefault(_Static2);

exports.Static = _Static3['default'];
},{"./Static":178,"babel-runtime/helpers/interop-require-default":262}],180:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: _react2['default'].PropTypes.string,
  /**
   * @private
   */
  standalone: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use a `<FormControl>` or `<InputGroup>` directly.'),
  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * @private
   */
  bsStyle: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.oneOf(['success', 'warning', 'error']), 'Use `validationState`'),
  /**
   * @private
   */
  hasFeedback: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use a `<FormControl.Feedback>` element.'),
  /**
   * @private
   */
  groupClassName: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.string, 'Use `className`.')
};

var childContextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object.isRequired
};

var FormGroup = (function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  function FormGroup() {
    _classCallCheck(this, FormGroup);

    _React$Component.apply(this, arguments);
  }

  FormGroup.prototype.getChildContext = function getChildContext() {
    var _props = this.props;
    var controlId = _props.controlId;
    var bsStyle = _props.bsStyle;
    var _props$validationState = _props.validationState;
    var validationState = _props$validationState === undefined ? bsStyle : _props$validationState;

    return {
      $bs_formGroup: {
        controlId: controlId,
        validationState: validationState
      }
    };
  };

  FormGroup.prototype.hasFeedback = function hasFeedback(children) {
    var _this = this;

    return _utilsValidComponentChildren2['default'].some(children, function (child) {
      return child.props.bsRole === 'feedback' || child.props.children && _this.hasFeedback(child.props.children);
    });
  };

  FormGroup.prototype.render = function render() {
    var _props2 = this.props;
    var standalone = _props2.standalone;
    var bsStyle = _props2.bsStyle;
    var _props2$validationState = _props2.validationState;
    var validationState = _props2$validationState === undefined ? bsStyle : _props2$validationState;
    var groupClassName = _props2.groupClassName;
    var _props2$className = _props2.className;
    var className = _props2$className === undefined ? groupClassName : _props2$className;
    var children = _props2.children;
    var _props2$hasFeedback = _props2.hasFeedback;
    var hasFeedback = _props2$hasFeedback === undefined ? this.hasFeedback(children) : _props2$hasFeedback;

    var props = _objectWithoutProperties(_props2, ['standalone', 'bsStyle', 'validationState', 'groupClassName', 'className', 'children', 'hasFeedback']);

    delete props.bsClass;
    delete props.bsSize;
    delete props.controlId;

    var classes = _extends({}, !standalone && _utilsBootstrapUtils.getClassSet(this.props), {
      'has-feedback': hasFeedback
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, props, { className: _classnames2['default'](className, classes) }),
      children
    );
  };

  return FormGroup;
})(_react2['default'].Component);

FormGroup.propTypes = propTypes;
FormGroup.childContextTypes = childContextTypes;

exports['default'] = _utilsBootstrapUtils.bsClass('form-group', _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], FormGroup));
module.exports = exports['default'];
},{"./styleMaps":244,"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/deprecated":308}],181:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var Glyphicon = _react2['default'].createClass({
  displayName: 'Glyphicon',

  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: _react2['default'].PropTypes.string,
    /**
     * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
     */
    glyph: _react2['default'].PropTypes.string.isRequired,
    /**
     * Adds 'form-control-feedback' class
     * @private
     */
    formControlFeedback: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use `<FormControl.Feedback>`.')
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'glyphicon'
    };
  },

  render: function render() {
    var _classNames;

    var className = _classnames2['default'](this.props.className, (_classNames = {}, _classNames[this.props.bsClass] = true, _classNames['glyphicon-' + this.props.glyph] = true, _classNames['form-control-feedback'] = this.props.formControlFeedback, _classNames));

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: className }),
      this.props.children
    );
  }
});

exports['default'] = Glyphicon;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/deprecated":308}],182:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Grid = _react2['default'].createClass({
  displayName: 'Grid',

  propTypes: {
    /**
     * Turn any fixed-width grid layout into a full-width layout by this property.
     *
     * Adds `container-fluid` class.
     */
    fluid: _react2['default'].PropTypes.bool,
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div',
      fluid: false
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;
    var className = this.props.fluid ? 'container-fluid' : 'container';

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, className) }),
      this.props.children
    );
  }
});

exports['default'] = Grid;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],183:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var HelpBlock = (function (_React$Component) {
  _inherits(HelpBlock, _React$Component);

  function HelpBlock() {
    _classCallCheck(this, HelpBlock);

    _React$Component.apply(this, arguments);
  }

  HelpBlock.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement('span', _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return HelpBlock;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('help-block', HelpBlock);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],184:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Image = _react2['default'].createClass({
  displayName: 'Image',

  propTypes: {

    /**
     * Sets image as responsive image
     */
    responsive: _react2['default'].PropTypes.bool,

    /**
     * Sets image shape as rounded
     */
    rounded: _react2['default'].PropTypes.bool,

    /**
     * Sets image shape as circle
     */
    circle: _react2['default'].PropTypes.bool,

    /**
     * Sets image shape as thumbnail
     */
    thumbnail: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      responsive: false,
      rounded: false,
      circle: false,
      thumbnail: false
    };
  },

  render: function render() {
    var classes = {
      'img-responsive': this.props.responsive,
      'img-rounded': this.props.rounded,
      'img-circle': this.props.circle,
      'img-thumbnail': this.props.thumbnail
    };

    return _react2['default'].createElement('img', _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }));
  }
});

exports['default'] = Image;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],185:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormControls = require('./FormControls');

var FormControls = _interopRequireWildcard(_FormControls);

var _InputBase2 = require('./InputBase');

var _InputBase3 = _interopRequireDefault(_InputBase2);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var Input = (function (_InputBase) {
  _inherits(Input, _InputBase);

  function Input() {
    _classCallCheck(this, Input);

    _InputBase.apply(this, arguments);
  }

  Input.prototype.render = function render() {
    if (this.props.type === 'static') {
      _utilsDeprecationWarning2['default']('Input type=static', 'FormControls.Static');
      return _react2['default'].createElement(FormControls.Static, this.props);
    }

    return _InputBase.prototype.render.call(this);
  };

  return Input;
})(_InputBase3['default']);

Input.propTypes = {
  type: _react2['default'].PropTypes.string
};

exports['default'] = _utilsDeprecationWarning2['default'].wrapper(Input, '`<Input>`', '`<FormControl>`, `<Checkbox>`, or `<Radio>`, with `<FormGroup>` and/or ' + '`<InputGroup>` as needed');
module.exports = exports['default'];
},{"./FormControls":179,"./InputBase":186,"./utils/deprecationWarning":252,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/interop-require-wildcard":263,"react":"react"}],186:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormGroup = require('./FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var InputBase = (function (_React$Component) {
  _inherits(InputBase, _React$Component);

  function InputBase() {
    _classCallCheck(this, InputBase);

    _React$Component.apply(this, arguments);
  }

  InputBase.prototype.getInputDOMNode = function getInputDOMNode() {
    return this.refs.input;
  };

  InputBase.prototype.getValue = function getValue() {
    if (this.props.type === 'static') {
      return this.props.value;
    } else if (this.props.type) {
      if (this.props.type === 'select' && this.props.multiple) {
        return this.getSelectedOptions();
      }
      return this.getInputDOMNode().value;
    }
    throw new Error('Cannot use getValue without specifying input type.');
  };

  InputBase.prototype.getChecked = function getChecked() {
    return this.getInputDOMNode().checked;
  };

  InputBase.prototype.getSelectedOptions = function getSelectedOptions() {
    var values = [];

    Array.prototype.forEach.call(this.getInputDOMNode().getElementsByTagName('option'), function (option) {
      if (option.selected) {
        var value = option.getAttribute('value') || option.innerHtml;
        values.push(value);
      }
    });

    return values;
  };

  InputBase.prototype.isCheckboxOrRadio = function isCheckboxOrRadio() {
    return this.props.type === 'checkbox' || this.props.type === 'radio';
  };

  InputBase.prototype.isFile = function isFile() {
    return this.props.type === 'file';
  };

  InputBase.prototype.renderInputGroup = function renderInputGroup(children) {
    var addonBefore = this.props.addonBefore ? _react2['default'].createElement(
      'span',
      { className: 'input-group-addon', key: 'addonBefore' },
      this.props.addonBefore
    ) : null;

    var addonAfter = this.props.addonAfter ? _react2['default'].createElement(
      'span',
      { className: 'input-group-addon', key: 'addonAfter' },
      this.props.addonAfter
    ) : null;

    var buttonBefore = this.props.buttonBefore ? _react2['default'].createElement(
      'span',
      { className: 'input-group-btn' },
      this.props.buttonBefore
    ) : null;

    var buttonAfter = this.props.buttonAfter ? _react2['default'].createElement(
      'span',
      { className: 'input-group-btn' },
      this.props.buttonAfter
    ) : null;

    var inputGroupClassName = undefined;
    switch (this.props.bsSize) {
      case 'small':
        inputGroupClassName = 'input-group-sm';break;
      case 'large':
        inputGroupClassName = 'input-group-lg';break;
      default:
    }

    return addonBefore || addonAfter || buttonBefore || buttonAfter ? _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](inputGroupClassName, 'input-group'), key: 'input-group' },
      addonBefore,
      buttonBefore,
      children,
      addonAfter,
      buttonAfter
    ) : children;
  };

  InputBase.prototype.renderIcon = function renderIcon() {
    if (this.props.hasFeedback) {
      if (this.props.feedbackIcon) {
        return _react2['default'].cloneElement(this.props.feedbackIcon, { formControlFeedback: true });
      }

      switch (this.props.bsStyle) {
        case 'success':
          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'ok', key: 'icon' });
        case 'warning':
          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'warning-sign', key: 'icon' });
        case 'error':
          return _react2['default'].createElement(_Glyphicon2['default'], { formControlFeedback: true, glyph: 'remove', key: 'icon' });
        default:
          return _react2['default'].createElement('span', { className: 'form-control-feedback', key: 'icon' });
      }
    } else {
      return null;
    }
  };

  InputBase.prototype.renderHelp = function renderHelp() {
    return this.props.help ? _react2['default'].createElement(
      'span',
      { className: 'help-block', key: 'help' },
      this.props.help
    ) : null;
  };

  InputBase.prototype.renderCheckboxAndRadioWrapper = function renderCheckboxAndRadioWrapper(children) {
    var classes = {
      'checkbox': this.props.type === 'checkbox',
      'radio': this.props.type === 'radio'
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](classes), key: 'checkboxRadioWrapper' },
      children
    );
  };

  InputBase.prototype.renderWrapper = function renderWrapper(children) {
    return this.props.wrapperClassName ? _react2['default'].createElement(
      'div',
      { className: this.props.wrapperClassName, key: 'wrapper' },
      children
    ) : children;
  };

  InputBase.prototype.renderLabel = function renderLabel(children) {
    var classes = {
      'control-label': !this.isCheckboxOrRadio()
    };
    classes[this.props.labelClassName] = this.props.labelClassName;

    return this.props.label ? _react2['default'].createElement(
      'label',
      { htmlFor: this.props.id, className: _classnames2['default'](classes), key: 'label' },
      children,
      this.props.label
    ) : children;
  };

  InputBase.prototype.renderInput = function renderInput() {
    if (!this.props.type) {
      return this.props.children;
    }

    switch (this.props.type) {
      case 'select':
        return _react2['default'].createElement(
          'select',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: 'input', key: 'input' }),
          this.props.children
        );
      case 'textarea':
        return _react2['default'].createElement('textarea', _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control'), ref: 'input', key: 'input' }));
      case 'static':
        return _react2['default'].createElement(
          'p',
          _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'form-control-static'), ref: 'input', key: 'input' }),
          this.props.value
        );
      default:
        var className = this.isCheckboxOrRadio() || this.isFile() ? '' : 'form-control';
        return _react2['default'].createElement('input', _extends({}, this.props, { className: _classnames2['default'](this.props.className, className), ref: 'input', key: 'input' }));
    }
  };

  InputBase.prototype.renderFormGroup = function renderFormGroup(children) {
    return _react2['default'].createElement(
      _FormGroup2['default'],
      this.props,
      children
    );
  };

  InputBase.prototype.renderChildren = function renderChildren() {
    return !this.isCheckboxOrRadio() ? [this.renderLabel(), this.renderWrapper([this.renderInputGroup(this.renderInput()), this.renderIcon(), this.renderHelp()])] : this.renderWrapper([this.renderCheckboxAndRadioWrapper(this.renderLabel(this.renderInput())), this.renderHelp()]);
  };

  InputBase.prototype.render = function render() {
    var children = this.renderChildren();
    return this.renderFormGroup(children);
  };

  return InputBase;
})(_react2['default'].Component);

InputBase.propTypes = {
  type: _react2['default'].PropTypes.string,
  label: _react2['default'].PropTypes.node,
  help: _react2['default'].PropTypes.node,
  addonBefore: _react2['default'].PropTypes.node,
  addonAfter: _react2['default'].PropTypes.node,
  buttonBefore: _react2['default'].PropTypes.node,
  buttonAfter: _react2['default'].PropTypes.node,
  bsSize: _react2['default'].PropTypes.oneOf(['small', 'medium', 'large']),
  bsStyle: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  hasFeedback: _react2['default'].PropTypes.bool,
  feedbackIcon: _react2['default'].PropTypes.node,
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  groupClassName: _react2['default'].PropTypes.string,
  wrapperClassName: _react2['default'].PropTypes.string,
  labelClassName: _react2['default'].PropTypes.string,
  multiple: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  value: _react2['default'].PropTypes.any
};

InputBase.defaultProps = {
  disabled: false,
  hasFeedback: false,
  multiple: false
};

exports['default'] = InputBase;
module.exports = exports['default'];
},{"./FormGroup":180,"./Glyphicon":181,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],187:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _InputGroupAddon = require('./InputGroupAddon');

var _InputGroupAddon2 = _interopRequireDefault(_InputGroupAddon);

var _InputGroupButton = require('./InputGroupButton');

var _InputGroupButton2 = _interopRequireDefault(_InputGroupButton);

var InputGroup = (function (_React$Component) {
  _inherits(InputGroup, _React$Component);

  function InputGroup() {
    _classCallCheck(this, InputGroup);

    _React$Component.apply(this, arguments);
  }

  InputGroup.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.bsClass;
    delete props.bsSize;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement('span', _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return InputGroup;
})(_react2['default'].Component);

InputGroup.Addon = _InputGroupAddon2['default'];
InputGroup.Button = _InputGroupButton2['default'];

exports['default'] = _utilsBootstrapUtils.bsClass('input-group', _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], InputGroup));
module.exports = exports['default'];
},{"./InputGroupAddon":188,"./InputGroupButton":189,"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],188:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var InputGroupAddon = (function (_React$Component) {
  _inherits(InputGroupAddon, _React$Component);

  function InputGroupAddon() {
    _classCallCheck(this, InputGroupAddon);

    _React$Component.apply(this, arguments);
  }

  InputGroupAddon.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement('span', _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return InputGroupAddon;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('input-group-addon', InputGroupAddon);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],189:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var InputGroupButton = (function (_React$Component) {
  _inherits(InputGroupButton, _React$Component);

  function InputGroupButton() {
    _classCallCheck(this, InputGroupButton);

    _React$Component.apply(this, arguments);
  }

  InputGroupButton.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement('span', _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return InputGroupButton;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('input-group-btn', InputGroupButton);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],190:[function(require,module,exports){
// https://www.npmjs.org/package/react-interpolate-component
// TODO: Drop this in favor of es6 string interpolation

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var REGEXP = /\%\((.+?)\)s/;

var Interpolate = _react2['default'].createClass({
  displayName: 'Interpolate',

  propTypes: {
    component: _react2['default'].PropTypes.node,
    format: _react2['default'].PropTypes.string,
    unsafe: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      component: 'span',
      unsafe: false
    };
  },

  render: function render() {
    var format = _utilsValidComponentChildren2['default'].count(this.props.children) > 0 || typeof this.props.children === 'string' ? this.props.children : this.props.format;
    var parent = this.props.component;
    var unsafe = this.props.unsafe === true;
    var props = _extends({}, this.props);

    delete props.children;
    delete props.format;
    delete props.component;
    delete props.unsafe;

    if (unsafe) {
      var content = format.split(REGEXP).reduce(function (memo, match, index) {
        var html = undefined;

        if (index % 2 === 0) {
          html = match;
        } else {
          html = props[match];
          delete props[match];
        }

        if (_react2['default'].isValidElement(html)) {
          throw new Error('cannot interpolate a React component into unsafe text');
        }

        memo += html;

        return memo;
      }, '');

      props.dangerouslySetInnerHTML = { __html: content };

      return _react2['default'].createElement(parent, props);
    }
    var kids = format.split(REGEXP).reduce(function (memo, match, index) {
      var child = undefined;

      if (index % 2 === 0) {
        if (match.length === 0) {
          return memo;
        }

        child = match;
      } else {
        child = props[match];
        delete props[match];
      }

      memo.push(child);

      return memo;
    }, []);

    return _react2['default'].createElement(parent, props, kids);
  }
});

_Object$assign(Interpolate, { REGEXP: REGEXP });

exports['default'] = Interpolate;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":247,"babel-runtime/core-js/object/assign":255,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"react":"react"}],191:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Jumbotron = _react2['default'].createClass({
  displayName: 'Jumbotron',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return { componentClass: 'div' };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'jumbotron') }),
      this.props.children
    );
  }
});

exports['default'] = Jumbotron;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],192:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Label = (function (_React$Component) {
  _inherits(Label, _React$Component);

  function Label() {
    _classCallCheck(this, _Label);

    _React$Component.apply(this, arguments);
  }

  Label.prototype.render = function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  };

  var _Label = Label;
  Label = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY), _styleMaps.DEFAULT)(Label) || Label;
  Label = _utilsBootstrapUtils.bsClass('label')(Label) || Label;
  return Label;
})(_react2['default'].Component);

exports['default'] = Label;
module.exports = exports['default'];
},{"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],193:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ListGroupItem = require('./ListGroupItem');

var _ListGroupItem2 = _interopRequireDefault(_ListGroupItem);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var ListGroup = (function (_React$Component) {
  _inherits(ListGroup, _React$Component);

  function ListGroup() {
    _classCallCheck(this, ListGroup);

    _React$Component.apply(this, arguments);
  }

  ListGroup.prototype.render = function render() {
    var _this = this;

    var items = _utilsValidComponentChildren2['default'].map(this.props.children, function (item, index) {
      return _react.cloneElement(item, { key: item.key ? item.key : index });
    });

    if (this.areCustomChildren(items)) {
      var Component = this.props.componentClass;
      return _react2['default'].createElement(
        Component,
        _extends({}, this.props, {
          className: _classnames2['default'](this.props.className, 'list-group') }),
        items
      );
    }

    var shouldRenderDiv = false;

    if (!this.props.children) {
      shouldRenderDiv = true;
    } else {
      _utilsValidComponentChildren2['default'].forEach(this.props.children, function (child) {
        if (_this.isAnchorOrButton(child.props)) {
          shouldRenderDiv = true;
        }
      });
    }

    return shouldRenderDiv ? this.renderDiv(items) : this.renderUL(items);
  };

  ListGroup.prototype.isAnchorOrButton = function isAnchorOrButton(props) {
    return props.href || props.onClick;
  };

  ListGroup.prototype.areCustomChildren = function areCustomChildren(children) {
    var customChildren = false;

    _utilsValidComponentChildren2['default'].forEach(children, function (child) {
      if (child.type !== _ListGroupItem2['default']) {
        customChildren = true;
      }
    }, this);

    return customChildren;
  };

  ListGroup.prototype.renderUL = function renderUL(items) {
    var listItems = _utilsValidComponentChildren2['default'].map(items, function (item) {
      return _react.cloneElement(item, { listItem: true });
    });

    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'list-group') }),
      listItems
    );
  };

  ListGroup.prototype.renderDiv = function renderDiv(items) {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'list-group') }),
      items
    );
  };

  return ListGroup;
})(_react2['default'].Component);

ListGroup.defaultProps = {
  componentClass: 'div'
};

ListGroup.propTypes = {
  className: _react2['default'].PropTypes.string,
  /**
   * The element for ListGroup if children are
   * user-defined custom components.
   * @type {("ul"|"div")}
   */
  componentClass: _react2['default'].PropTypes.oneOf(['ul', 'div']),
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
};

exports['default'] = ListGroup;
module.exports = exports['default'];
},{"./ListGroupItem":194,"./utils/ValidComponentChildren":247,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],194:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var ListGroupItem = (function (_React$Component) {
  _inherits(ListGroupItem, _React$Component);

  function ListGroupItem() {
    _classCallCheck(this, ListGroupItem);

    _React$Component.apply(this, arguments);
  }

  ListGroupItem.prototype.render = function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    classes.active = this.props.active;
    classes.disabled = this.props.disabled;

    if (this.props.href) {
      return this.renderAnchor(classes);
    } else if (this.props.onClick) {
      return this.renderButton(classes);
    } else if (this.props.listItem) {
      return this.renderLi(classes);
    }

    return this.renderSpan(classes);
  };

  ListGroupItem.prototype.renderLi = function renderLi(classes) {
    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderAnchor = function renderAnchor(classes) {
    return _react2['default'].createElement(
      'a',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderButton = function renderButton(classes) {
    return _react2['default'].createElement(
      'button',
      _extends({
        type: 'button'
      }, this.props, {
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderSpan = function renderSpan(classes) {
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.header ? this.renderStructuredContent() : this.props.children
    );
  };

  ListGroupItem.prototype.renderStructuredContent = function renderStructuredContent() {
    var header = undefined;
    var headingClass = _utilsBootstrapUtils.prefix(this.props, 'heading');

    if (_react2['default'].isValidElement(this.props.header)) {
      header = _react.cloneElement(this.props.header, {
        key: 'header',
        className: _classnames2['default'](this.props.header.props.className, headingClass)
      });
    } else {
      header = _react2['default'].createElement(
        'h4',
        { key: 'header', className: headingClass },
        this.props.header
      );
    }

    var content = _react2['default'].createElement(
      'p',
      { key: 'content', className: _utilsBootstrapUtils.prefix(this.props, 'text') },
      this.props.children
    );

    return [header, content];
  };

  return ListGroupItem;
})(_react2['default'].Component);

ListGroupItem.propTypes = {
  className: _react2['default'].PropTypes.string,
  active: _react2['default'].PropTypes.any,
  disabled: _react2['default'].PropTypes.any,
  header: _react2['default'].PropTypes.node,
  listItem: _react2['default'].PropTypes.bool,
  onClick: _react2['default'].PropTypes.func,
  eventKey: _react2['default'].PropTypes.any,
  href: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string
};

ListGroupItem.defaultTypes = {
  listItem: false
};

exports['default'] = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values(), _utilsBootstrapUtils.bsClass('list-group-item', ListGroupItem));
module.exports = exports['default'];
},{"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],195:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _MediaHeading = require('./MediaHeading');

var _MediaHeading2 = _interopRequireDefault(_MediaHeading);

var _MediaBody = require('./MediaBody');

var _MediaBody2 = _interopRequireDefault(_MediaBody);

var _MediaLeft = require('./MediaLeft');

var _MediaLeft2 = _interopRequireDefault(_MediaLeft);

var _MediaRight = require('./MediaRight');

var _MediaRight2 = _interopRequireDefault(_MediaRight);

var _MediaList = require('./MediaList');

var _MediaList2 = _interopRequireDefault(_MediaList);

var _MediaListItem = require('./MediaListItem');

var _MediaListItem2 = _interopRequireDefault(_MediaListItem);

var Media = _react2['default'].createClass({
  displayName: 'Media',
  propTypes: {
    /**
     * You can use a custom element for the media container
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media') }));
  }
});

Media = _Object$assign(Media, { Heading: _MediaHeading2['default'], Body: _MediaBody2['default'], Left: _MediaLeft2['default'], Right: _MediaRight2['default'], List: _MediaList2['default'], ListItem: _MediaListItem2['default'] });

exports['default'] = Media;
module.exports = exports['default'];
},{"./MediaBody":196,"./MediaHeading":197,"./MediaLeft":198,"./MediaList":199,"./MediaListItem":200,"./MediaRight":201,"babel-runtime/core-js/object/assign":255,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],196:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaBody = _react2['default'].createClass({
  displayName: 'Media.Body',
  propTypes: {
    /**
     * You can use a custom element for the media body
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media-body') }));
  }
});

exports['default'] = MediaBody;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],197:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaHeading = _react2['default'].createClass({
  displayName: 'Media.Heading',
  propTypes: {
    /**
     * You can use a custom element for the media heading
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'h4'
    };
  },

  render: function render() {
    var _props = this.props;
    var ComponentClass = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    return _react2['default'].createElement(ComponentClass, _extends({}, props, { className: _classnames2['default'](className, 'media-heading') }));
  }
});

exports['default'] = MediaHeading;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],198:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaLeft = _react2['default'].createClass({
  displayName: 'Media.Left',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render: function render() {
    var _classNames;

    var _props = this.props;
    var align = _props.align;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['align', 'className']);

    var classes = _classnames2['default'](className, 'media-left', (_classNames = {}, _classNames['media-' + align] = Boolean(align), _classNames));

    // Only add the media-alignment class if align is passed in props
    return _react2['default'].createElement('div', _extends({}, props, { className: classes }));
  }
});

exports['default'] = MediaLeft;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],199:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaList = _react2['default'].createClass({
  displayName: 'Media.List',
  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2['default'].createElement('ul', _extends({}, props, { className: _classnames2['default'](className, 'media-list') }));
  }
});

exports['default'] = MediaList;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],200:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaListItem = _react2['default'].createClass({
  displayName: 'Media.ListItem',
  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    return _react2['default'].createElement('li', _extends({}, props, { className: _classnames2['default'](className, 'media') }));
  }
});

exports['default'] = MediaListItem;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],201:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var MediaRight = _react2['default'].createClass({
  displayName: 'Media.Right',
  propTypes: {
    /**
     * Align the media to the top, middle or bottom
     * of the media object
     */
    align: _react2['default'].PropTypes.oneOf(['top', 'middle', 'bottom'])
  },

  render: function render() {
    var _classNames;

    var _props = this.props;
    var align = _props.align;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['align', 'className']);

    var classes = _classnames2['default'](className, 'media-right', (_classNames = {}, _classNames['media-' + align] = Boolean(align), _classNames));

    // Only add the media-alignment class if align is passed in props
    return _react2['default'].createElement('div', _extends({}, props, { className: classes }));
  }
});

exports['default'] = MediaRight;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],202:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var MenuItem = (function (_React$Component) {
  _inherits(MenuItem, _React$Component);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    _React$Component.call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  MenuItem.prototype.handleClick = function handleClick(event) {
    if (!this.props.href || this.props.disabled) {
      event.preventDefault();
    }

    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, event);
    }
  };

  MenuItem.prototype.render = function render() {
    if (this.props.divider) {
      return _react2['default'].createElement('li', {
        role: 'separator',
        className: _classnames2['default']('divider', this.props.className),
        style: this.props.style
      });
    }

    if (this.props.header) {
      var headerClass = _utilsBootstrapUtils.prefix(this.props, 'header');

      return _react2['default'].createElement(
        'li',
        {
          role: 'heading',
          className: _classnames2['default'](headerClass, this.props.className),
          style: this.props.style
        },
        this.props.children
      );
    }

    var _props = this.props;
    var className = _props.className;
    var style = _props.style;
    var onClick = _props.onClick;

    var props = _objectWithoutProperties(_props, ['className', 'style', 'onClick']);

    delete props.onSelect;

    var classes = {
      disabled: this.props.disabled,
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { role: 'presentation',
        className: _classnames2['default'](className, classes),
        style: style
      },
      _react2['default'].createElement(_SafeAnchor2['default'], _extends({}, props, {
        role: 'menuitem',
        tabIndex: '-1',
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick)
      }))
    );
  };

  return MenuItem;
})(_react2['default'].Component);

MenuItem.propTypes = {

  /**
   * Highlight the menu item as active.
   */
  active: _react2['default'].PropTypes.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: _react2['default'].PropTypes.bool,

  /**
   * Styles the menu item as a horizontal rule, providing visual separation between
   * groups of menu items.
   */
  divider: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (props) {
    if (props.divider && props.children) {
      return new Error('Children will not be rendered for dividers');
    }
  }),

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: _react2['default'].PropTypes.any,

  /**
   * Styles the menu item as a header label, useful for describing a group of menu items.
   */
  header: _react2['default'].PropTypes.bool,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: _react2['default'].PropTypes.string,

  /**
   * HTML `target` attribute corresponding to `a.target`.
   */
  target: _react2['default'].PropTypes.string,

  /**
   * HTML `title` attribute corresponding to `a.title`.
   */
  title: _react2['default'].PropTypes.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: _react2['default'].PropTypes.func,

  onKeyDown: _react2['default'].PropTypes.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: _react2['default'].PropTypes.func,

  /**
   * HTML `id` attribute.
   */
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])
};

MenuItem.defaultProps = {
  divider: false,
  disabled: false,
  header: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('dropdown', MenuItem);
module.exports = exports['default'];
},{"./SafeAnchor":231,"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/all":306}],203:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domHelpersEvents = require('dom-helpers/events');

var _domHelpersEvents2 = _interopRequireDefault(_domHelpersEvents);

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

var _domHelpersUtilInDOM = require('dom-helpers/util/inDOM');

var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);

var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');

var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactOverlaysLibModal = require('react-overlays/lib/Modal');

var _reactOverlaysLibModal2 = _interopRequireDefault(_reactOverlaysLibModal);

var _reactOverlaysLibUtilsIsOverflowing = require('react-overlays/lib/utils/isOverflowing');

var _reactOverlaysLibUtilsIsOverflowing2 = _interopRequireDefault(_reactOverlaysLibUtilsIsOverflowing);

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _ModalDialog = require('./ModalDialog');

var _ModalDialog2 = _interopRequireDefault(_ModalDialog);

var _ModalBody = require('./ModalBody');

var _ModalBody2 = _interopRequireDefault(_ModalBody);

var _ModalHeader = require('./ModalHeader');

var _ModalHeader2 = _interopRequireDefault(_ModalHeader);

var _ModalTitle = require('./ModalTitle');

var _ModalTitle2 = _interopRequireDefault(_ModalTitle);

var _ModalFooter = require('./ModalFooter');

var _ModalFooter2 = _interopRequireDefault(_ModalFooter);

/* eslint-disable react/prop-types */
var Modal = _react2['default'].createClass({
  displayName: 'Modal',

  propTypes: _extends({}, _reactOverlaysLibModal2['default'].propTypes, _ModalDialog2['default'].propTypes, {

    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     */
    backdrop: _react2['default'].PropTypes.oneOf(['static', true, false]),

    /**
     * Close the modal when escape key is pressed
     */
    keyboard: _react2['default'].PropTypes.bool,

    /**
     * Open and close the Modal with a slide and fade animation.
     */
    animation: _react2['default'].PropTypes.bool,

    /**
     * A Component type that provides the modal content Markup. This is a useful prop when you want to use your own
     * styles and markup to create a custom modal component.
     */
    dialogComponentClass: _reactPropTypesLibElementType2['default'],

    /**
     * @private
     */
    dialogComponent: _reactPropTypesLibDeprecated2['default'](_reactPropTypesLibElementType2['default'], 'Use `dialogComponentClass`.'),

    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
     * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
     */
    autoFocus: _react2['default'].PropTypes.bool,

    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
     * such as screen readers.
     */
    enforceFocus: _react2['default'].PropTypes.bool,

    /**
     * Hide this from automatic props documentation generation.
     * @private
     */
    bsStyle: _react2['default'].PropTypes.string,

    /**
     * When `true` The modal will show itself.
     */
    show: _react2['default'].PropTypes.bool,

    /**
     * A callback fired when the header closeButton or non-static backdrop is
     * clicked. Required if either are specified.
     */
    onHide: _react2['default'].PropTypes.func,

    /**
     * Callback fired before the Modal transitions in
     */
    onEnter: _react2['default'].PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition in
     */
    onEntering: _react2['default'].PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning in
     */
    onEntered: _react2['default'].PropTypes.func,

    /**
     * Callback fired right before the Modal transitions out
     */
    onExit: _react2['default'].PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition out
     */
    onExiting: _react2['default'].PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: _react2['default'].PropTypes.func
  }),

  childContextTypes: {
    '$bs_onModalHide': _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return _extends({}, _reactOverlaysLibModal2['default'].defaultProps, {
      bsClass: 'modal',
      animation: true,
      dialogComponentClass: _ModalDialog2['default']
    });
  },

  getInitialState: function getInitialState() {
    return {
      modalStyles: {}
    };
  },

  getChildContext: function getChildContext() {
    return {
      $bs_onModalHide: this.props.onHide
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    _domHelpersEvents2['default'].off(window, 'resize', this.handleWindowResize);
  },

  render: function render() {
    var _this = this;

    var _props = this.props;
    var className = _props.className;
    var children = _props.children;
    var dialogClassName = _props.dialogClassName;
    var animation = _props.animation;

    var props = _objectWithoutProperties(_props, ['className', 'children', 'dialogClassName', 'animation']);

    var modalStyles = this.state.modalStyles;

    var inClass = { 'in': props.show && !animation };
    var Dialog = props.dialogComponent || props.dialogComponentClass;

    var parentProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_reactOverlaysLibModal2['default'].propTypes).concat(['onExit', 'onExiting', 'onEnter', 'onEntered']) // the rest are fired in _onHide() and _onShow()
    );

    var modal = _react2['default'].createElement(
      Dialog,
      _extends({
        key: 'modal',
        ref: function (ref) {
          return _this._modal = ref;
        }
      }, props, {
        style: modalStyles,
        className: _classnames2['default'](className, inClass),
        dialogClassName: dialogClassName,
        onClick: props.backdrop === true ? this.handleDialogClick : null
      }),
      this.props.children
    );

    return _react2['default'].createElement(
      _reactOverlaysLibModal2['default'],
      _extends({}, parentProps, {
        show: props.show,
        ref: function (ref) {
          _this._wrapper = ref && ref.refs.modal;
          _this._backdrop = ref && ref.refs.backdrop;
        },
        onEntering: this._onShow,
        onExited: this._onHide,
        backdropClassName: _classnames2['default'](_utilsBootstrapUtils.prefix(props, 'backdrop'), inClass),
        containerClassName: _utilsBootstrapUtils.prefix(props, 'open'),
        transition: animation ? _Fade2['default'] : undefined,
        dialogTransitionTimeout: Modal.TRANSITION_DURATION,
        backdropTransitionTimeout: Modal.BACKDROP_TRANSITION_DURATION
      }),
      modal
    );
  },

  _onShow: function _onShow() {
    _domHelpersEvents2['default'].on(window, 'resize', this.handleWindowResize);

    this.setState(this._getStyles());

    if (this.props.onEntering) {
      var _props2;

      (_props2 = this.props).onEntering.apply(_props2, arguments);
    }
  },

  _onHide: function _onHide() {
    _domHelpersEvents2['default'].off(window, 'resize', this.handleWindowResize);

    if (this.props.onExited) {
      var _props3;

      (_props3 = this.props).onExited.apply(_props3, arguments);
    }
  },

  handleDialogClick: function handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  },

  handleWindowResize: function handleWindowResize() {
    this.setState(this._getStyles());
  },

  _getStyles: function _getStyles() {
    if (!_domHelpersUtilInDOM2['default']) {
      return {};
    }

    var node = _reactDom2['default'].findDOMNode(this._modal);
    var doc = _domHelpersOwnerDocument2['default'](node);

    var scrollHt = node.scrollHeight;
    var bodyIsOverflowing = _reactOverlaysLibUtilsIsOverflowing2['default'](_reactDom2['default'].findDOMNode(this.props.container || doc.body));
    var modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    return {
      modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? _domHelpersUtilScrollbarSize2['default']() : void 0
      }
    };
  }
});

Modal.Body = _ModalBody2['default'];
Modal.Header = _ModalHeader2['default'];
Modal.Title = _ModalTitle2['default'];
Modal.Footer = _ModalFooter2['default'];

Modal.Dialog = _ModalDialog2['default'];

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

exports['default'] = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], _utilsBootstrapUtils.bsClass('modal', Modal));
module.exports = exports['default'];
},{"./Fade":173,"./ModalBody":204,"./ModalDialog":205,"./ModalFooter":206,"./ModalHeader":207,"./ModalTitle":208,"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"dom-helpers/events":56,"dom-helpers/ownerDocument":59,"dom-helpers/util/inDOM":77,"dom-helpers/util/scrollbarSize":78,"lodash-compat/object/pick":146,"react":"react","react-dom":"react-dom","react-overlays/lib/Modal":288,"react-overlays/lib/utils/isOverflowing":299,"react-prop-types/lib/deprecated":308,"react-prop-types/lib/elementType":309}],204:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var ModalBody = (function (_React$Component) {
  _inherits(ModalBody, _React$Component);

  function ModalBody() {
    _classCallCheck(this, ModalBody);

    _React$Component.apply(this, arguments);
  }

  ModalBody.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.prefix(this.props, 'body'))
      }),
      this.props.children
    );
  };

  return ModalBody;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalBody);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],205:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

/* eslint-disable react/prop-types */
var ModalDialog = _react2['default'].createClass({
  displayName: 'ModalDialog',

  propTypes: {
    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: _react2['default'].PropTypes.string
  },

  render: function render() {
    var modalStyle = _extends({
      display: 'block'
    }, this.props.style);
    var bsClassPrefix = _utilsBootstrapUtils.prefix(this.props);
    var dialogClasses = _utilsBootstrapUtils.getClassSet(this.props);

    delete dialogClasses[bsClassPrefix];
    dialogClasses[_utilsBootstrapUtils.prefix(this.props, 'dialog')] = true;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        title: null,
        tabIndex: '-1',
        role: 'dialog',
        style: modalStyle,
        className: _classnames2['default'](this.props.className, bsClassPrefix)
      }),
      _react2['default'].createElement(
        'div',
        { className: _classnames2['default'](this.props.dialogClassName, dialogClasses) },
        _react2['default'].createElement(
          'div',
          { className: _utilsBootstrapUtils.prefix(this.props, 'content'), role: 'document' },
          this.props.children
        )
      )
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], _utilsBootstrapUtils.bsClass('modal', ModalDialog));
module.exports = exports['default'];
},{"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],206:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var ModalFooter = (function (_React$Component) {
  _inherits(ModalFooter, _React$Component);

  function ModalFooter() {
    _classCallCheck(this, ModalFooter);

    _React$Component.apply(this, arguments);
  }

  ModalFooter.prototype.render = function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.prefix(this.props, 'footer'))
      }),
      this.props.children
    );
  };

  return ModalFooter;
})(_react2['default'].Component);

ModalFooter.propTypes = {
  /**
   * A css class applied to the Component
   */
  bsClass: _react2['default'].PropTypes.string
};

ModalFooter.defaultProps = {
  bsClass: 'modal'
};

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalFooter);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],207:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var ModalHeader = (function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _React$Component.apply(this, arguments);
  }

  ModalHeader.prototype.render = function render() {
    var _props = this.props;
    var label = _props['aria-label'];

    var props = _objectWithoutProperties(_props, ['aria-label']);

    var onHide = _utilsCreateChainedFunction2['default'](this.context.$bs_onModalHide, this.props.onHide);

    return _react2['default'].createElement(
      'div',
      _extends({}, props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.prefix(this.props, 'header'))
      }),
      this.props.closeButton && _react2['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          'aria-label': label,
          onClick: onHide },
        _react2['default'].createElement(
          'span',
          { 'aria-hidden': 'true' },
          '×'
        )
      ),
      this.props.children
    );
  };

  return ModalHeader;
})(_react2['default'].Component);

ModalHeader.propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close button.
   * It is used for Assistive Technology when the label text is not readable.
   */
  'aria-label': _react2['default'].PropTypes.string,

  bsClass: _react2['default'].PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: _react2['default'].PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically
   * be propagated up to the parent Modal `onHide`.
   */
  onHide: _react2['default'].PropTypes.func
};

ModalHeader.contextTypes = {
  '$bs_onModalHide': _react2['default'].PropTypes.func
};

ModalHeader.defaultProps = {
  'aria-label': 'Close',
  closeButton: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalHeader);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],208:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var ModalTitle = (function (_React$Component) {
  _inherits(ModalTitle, _React$Component);

  function ModalTitle() {
    _classCallCheck(this, ModalTitle);

    _React$Component.apply(this, arguments);
  }

  ModalTitle.prototype.render = function render() {
    return _react2['default'].createElement(
      'h4',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.prefix(this.props, 'title'))
      }),
      this.props.children
    );
  };

  return ModalTitle;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalTitle);
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],209:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPropTypesLibAll = require('react-prop-types/lib/all');

var _reactPropTypesLibAll2 = _interopRequireDefault(_reactPropTypesLibAll);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsTabUtils = require('./utils/tabUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var Nav = (function (_React$Component) {
  _inherits(Nav, _React$Component);

  function Nav() {
    _classCallCheck(this, Nav);

    _React$Component.apply(this, arguments);
  }

  Nav.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this._needsRefocus) {
      var ul = this.refs.ul && _reactDom2['default'].findDOMNode(this.refs.ul);
      var tabs = ul ? ul.children || [] : [];
      var tabIdx = this.eventKeys().indexOf(this.getActiveKey());

      this._needsRefocus = false;

      if (tabIdx !== -1) {
        var tabNode = tabs[tabIdx];

        if (tabNode && tabNode.firstChild) {
          tabNode.firstChild.focus();
        }
      }
    }
  };

  Nav.prototype.render = function render() {
    var className = this.props.className;

    var isNavbar = this.props.navbar != null ? this.props.navbar : this.context.$bs_navbar;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    classes[_utilsBootstrapUtils.prefix(this.props, 'stacked')] = this.props.stacked;
    classes[_utilsBootstrapUtils.prefix(this.props, 'justified')] = this.props.justified;

    if (isNavbar) {
      var bsClass = this.context.$bs_navbar_bsClass || 'navbar';

      classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'nav')] = true;
      classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'right')] = this.props.pullRight;
      classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'left')] = this.props.pullLeft;
    } else {
      classes['pull-right'] = this.props.pullRight;
      classes['pull-left'] = this.props.pullLeft;
    }

    var list = _react2['default'].createElement(
      'ul',
      _extends({ ref: 'ul'
      }, this.props, {
        role: this.getNavRole(),
        className: _classnames2['default'](className, classes)
      }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderNavItem, this)
    );

    return list;
  };

  Nav.prototype.renderNavItem = function renderNavItem(child, index) {
    var onSelect = _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect);
    var active = this.isChildActive(child);
    var tabProps = this.getTabProps(child, active, onSelect);

    return _react.cloneElement(child, _extends({
      active: active,
      activeKey: this.props.activeKey,
      activeHref: this.props.activeHref,
      onSelect: onSelect,
      key: child.key || index,
      navItem: true
    }, tabProps));
  };

  Nav.prototype.getActiveKey = function getActiveKey() {
    var context = this.context.$bs_tabcontainer;
    if (!context) {
      return this.props.activeKey;
    }

    process.env.NODE_ENV !== 'production' ? _warning2['default'](!(this.props.activeKey != null || this.props.activeHref), 'Specifing a Nav `activeKey` or `activeHref` prop in the context of a `TabContainer` is not supported. ' + 'Instead use `<TabContainer activeKey={' + this.props.activeKey + '} />`') : undefined;

    return context.activeKey;
  };

  Nav.prototype.isChildActive = function isChildActive(child) {
    var activeKey = this.getActiveKey();

    if (this.context.$bs_tabcontainer) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!child.props.active, 'Specifying a NavItem `active` prop in the context of a `TabContainer` is not supported. Instead ' + 'use `<TabContainer activeKey={' + child.props.eventKey + '} />`') : undefined;

      return child.props.eventKey === activeKey;
    }

    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  };

  Nav.prototype.getTabProps = function getTabProps(child, isActive, onSelect) {
    var navRole = this.getNavRole();
    var context = this.context.$bs_tabcontainer;

    if (!context && navRole !== 'tablist') {
      // No tab props here.
      return null;
    }

    var _child$props = child.props;
    var id = _child$props.id;
    var controls = _child$props['aria-controls'];
    var eventKey = _child$props.eventKey;
    var role = _child$props.role;
    var onKeyDown = _child$props.onKeyDown;
    var _child$props$tabIndex = _child$props.tabIndex;
    var tabIndex = _child$props$tabIndex === undefined ? 0 : _child$props$tabIndex;

    if (context && context.getId) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!(id || controls), 'In the context of a TabContainer, NavItems are given generated `id` and `aria-controls` ' + 'attributes for the sake of proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` prop to the parent TabContainer.') : undefined;

      id = context.getId(eventKey, _utilsTabUtils.TAB) || null;
      controls = context.getId(eventKey, _utilsTabUtils.PANE) || null;
      onSelect = _utilsCreateChainedFunction2['default'](onSelect, context.onSelect);
    }

    if (navRole === 'tablist') {
      role = role || 'tab';
      onKeyDown = _utilsCreateChainedFunction2['default'](this.handleTabKeyDown.bind(this, onSelect || function () {}), onKeyDown);
      tabIndex = isActive ? tabIndex : -1;
    }

    return {
      onSelect: onSelect,
      id: id,
      role: role,
      onKeyDown: onKeyDown,
      'aria-controls': controls,
      tabIndex: tabIndex
    };
  };

  Nav.prototype.handleTabKeyDown = function handleTabKeyDown(onSelect, event) {
    var keys = this.eventKeys();
    var currentKey = this.getActiveKey() || keys[0];
    var next = undefined;

    switch (event.keyCode) {

      case _keycode2['default'].codes.left:
      case _keycode2['default'].codes.up:
        next = _utilsTabUtils.nextEnabled(this.props.children, currentKey, keys, false);

        if (next && next !== currentKey) {
          event.preventDefault();
          onSelect(next);
          this._needsRefocus = true;
        }
        break;
      case _keycode2['default'].codes.right:
      case _keycode2['default'].codes.down:
        next = _utilsTabUtils.nextEnabled(this.props.children, currentKey, keys, true);

        if (next && next !== currentKey) {
          event.preventDefault();
          onSelect(next);
          this._needsRefocus = true;
        }
        break;
      default:
    }
  };

  Nav.prototype.eventKeys = function eventKeys() {
    var keys = [];
    _utilsValidComponentChildren2['default'].forEach(this.props.children, function (_ref) {
      var eventKey = _ref.props.eventKey;
      return keys.push(eventKey);
    });
    return keys;
  };

  Nav.prototype.getNavRole = function getNavRole() {
    return this.props.role || (this.context.$bs_tabcontainer ? 'tablist' : null);
  };

  return Nav;
})(_react2['default'].Component);

Nav.propTypes = {

  /**
   * Marks the child NavItem with a matching `href` prop as active.
   */
  activeHref: _react2['default'].PropTypes.string,

  /**
   * Marks the NavItem with a matching `eventKey` as active. Has a
   * higher precedence over `activeHref`.
   */
  activeKey: _react2['default'].PropTypes.any,

  /**
   * NavItems are be positioned vertically.
   */
  stacked: _react2['default'].PropTypes.bool,

  justified: _reactPropTypesLibAll2['default'](_react2['default'].PropTypes.bool, function (_ref2) {
    var justified = _ref2.justified;
    var navbar = _ref2.navbar;
    return justified && navbar ? Error('justified navbar `Nav`s are not supported') : null;
  }),

  /**
   * A callback fired when a NavItem is selected.
   *
   * ```js
   * function (
   * 	Any eventKey,
   * 	SyntheticEvent event?
   * )
   * ```
   */
  onSelect: _react2['default'].PropTypes.func,

  /**
   * CSS classes for the wrapper `nav` element
   */
  className: _react2['default'].PropTypes.string,
  /**
   * HTML id for the wrapper `nav` element
   */
  id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will be set
   * to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is set to "tablist" NavItem focus is managed according to the
   * ARIA authoring practices for tabs: https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role: _react2['default'].PropTypes.string,

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: _react2['default'].PropTypes.bool,

  /**
   * Float the Nav to the right. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullRight: _react2['default'].PropTypes.bool,

  /**
   * Float the Nav to the left. When `navbar` is `true` the appropriate
   * contextual classes are added as well.
   */
  pullLeft: _react2['default'].PropTypes.bool
};

Nav.contextTypes = {
  $bs_navbar: _react2['default'].PropTypes.bool,
  $bs_navbar_bsClass: _react2['default'].PropTypes.string,

  $bs_tabcontainer: _react2['default'].PropTypes.shape({
    activeKey: _react2['default'].PropTypes.any,
    onSelect: _react2['default'].PropTypes.func,
    getId: _react2['default'].PropTypes.func
  })
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('nav', _utilsBootstrapUtils.bsStyles(['tabs', 'pills'], Nav));
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"./utils/tabUtils":254,"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"keycode":80,"react":"react","react-dom":"react-dom","react-prop-types/lib/all":306,"warning":321}],210:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var NavDropdown = (function (_React$Component) {
  _inherits(NavDropdown, _React$Component);

  function NavDropdown() {
    _classCallCheck(this, NavDropdown);

    _React$Component.apply(this, arguments);
  }

  NavDropdown.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var title = _props.title;
    var noCaret = _props.noCaret;

    var props = _objectWithoutProperties(_props, ['children', 'title', 'noCaret']);

    return _react2['default'].createElement(
      _Dropdown2['default'],
      _extends({}, props, { componentClass: 'li' }),
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        {
          useAnchor: true,
          disabled: props.disabled,
          noCaret: noCaret
        },
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return NavDropdown;
})(_react2['default'].Component);

NavDropdown.propTypes = _extends({
  noCaret: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.node.isRequired
}, _Dropdown2['default'].propTypes);

exports['default'] = NavDropdown;
module.exports = exports['default'];
},{"./Dropdown":169,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"react":"react"}],211:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var NavItem = _react2['default'].createClass({
  displayName: 'NavItem',

  propTypes: {
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    role: _react2['default'].PropTypes.string,
    href: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var disabled = _props.disabled;
    var role = _props.role;
    var href = _props.href;
    var onClick = _props.onClick;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['active', 'disabled', 'role', 'href', 'onClick', 'className', 'style']);

    delete props.onSelect;
    delete props.eventKey;

    if (!role) {
      if (href === '#') {
        role = 'button';
      }
    } else if (role === 'tab') {
      props['aria-selected'] = active;
    }

    return _react2['default'].createElement(
      'li',
      {
        role: 'presentation',
        className: _classnames2['default'](className, { active: active, disabled: disabled }),
        style: style
      },
      _react2['default'].createElement(_SafeAnchor2['default'], _extends({}, props, {
        disabled: disabled,
        role: role,
        href: href,
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick)
      }))
    );
  },

  handleClick: function handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }
});

exports['default'] = NavItem;
module.exports = exports['default'];
},{"./SafeAnchor":231,"./utils/createChainedFunction":251,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],212:[function(require,module,exports){
/* eslint react/no-multi-comp: 0 */
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _NavbarBrand = require('./NavbarBrand');

var _NavbarBrand2 = _interopRequireDefault(_NavbarBrand);

var _NavbarCollapse = require('./NavbarCollapse');

var _NavbarCollapse2 = _interopRequireDefault(_NavbarCollapse);

var _NavbarHeader = require('./NavbarHeader');

var _NavbarHeader2 = _interopRequireDefault(_NavbarHeader);

var _NavbarToggle = require('./NavbarToggle');

var _NavbarToggle2 = _interopRequireDefault(_NavbarToggle);

var Navbar = _react2['default'].createClass({
  displayName: 'Navbar',

  propTypes: {
    /**
     * Create a fixed navbar along the top of the screen, that scrolls with the page
     */
    fixedTop: _react2['default'].PropTypes.bool,
    /**
     * Create a fixed navbar along the bottom of the screen, that scrolls with the page
     */
    fixedBottom: _react2['default'].PropTypes.bool,
    /**
     * Create a full-width navbar that scrolls away with the page
     */
    staticTop: _react2['default'].PropTypes.bool,
    /**
     * An alternative dark visual style for the Navbar
     */
    inverse: _react2['default'].PropTypes.bool,
    /**
     * Allow the Navbar to fluidly adjust to the page or container width, instead of at the
     * predefined screen breakpoints
     */
    fluid: _react2['default'].PropTypes.bool,

    /**
     * Set a custom element for this component.
     */
    componentClass: _reactPropTypesLibElementType2['default'],
    /**
     * A callback fired when the `<Navbar>` body collapses or expands.
     * Fired when a `<Navbar.Toggle>` is clicked and called with the new `navExpanded` boolean value.
     *
     * @controllable navExpanded
     */
    onToggle: _react2['default'].PropTypes.func,

    /**
     * Explicitly set the visiblity of the navbar body
     *
     * @controllable onToggle
     */
    expanded: _react2['default'].PropTypes.bool

  },

  childContextTypes: {
    $bs_navbar: _react.PropTypes.bool,
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_onToggle: _react.PropTypes.func,
    $bs_navbar_expanded: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'nav',
      fixedTop: false,
      fixedBottom: false,
      staticTop: false,
      inverse: false,
      fluid: false
    };
  },

  getChildContext: function getChildContext() {
    return {
      $bs_navbar: true,
      $bs_navbar_bsClass: this.props.bsClass,
      $bs_navbar_onToggle: this.handleToggle,
      $bs_navbar_expanded: this.props.expanded
    };
  },

  handleToggle: function handleToggle() {
    this.props.onToggle(!this.props.expanded);
  },

  isNavExpanded: function isNavExpanded() {
    return !!this.props.expanded;
  },

  render: function render() {
    var _props = this.props;
    var fixedTop = _props.fixedTop;
    var fixedBottom = _props.fixedBottom;
    var staticTop = _props.staticTop;
    var inverse = _props.inverse;
    var ComponentClass = _props.componentClass;
    var fluid = _props.fluid;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['fixedTop', 'fixedBottom', 'staticTop', 'inverse', 'componentClass', 'fluid', 'className', 'children']);

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (props.role === undefined && ComponentClass !== 'nav') {
      props.role = 'navigation';
    }

    if (inverse) {
      props.bsStyle = _styleMaps.INVERSE;
    }

    var classes = _utilsBootstrapUtils.getClassSet(props);

    classes[_utilsBootstrapUtils.prefix(this.props, 'fixed-top')] = fixedTop;
    classes[_utilsBootstrapUtils.prefix(this.props, 'fixed-bottom')] = fixedBottom;
    classes[_utilsBootstrapUtils.prefix(this.props, 'static-top')] = staticTop;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, props, { className: _classnames2['default'](className, classes) }),
      _react2['default'].createElement(
        _Grid2['default'],
        { fluid: fluid },
        children
      )
    );
  }
});

var NAVBAR_STATES = [_styleMaps.DEFAULT, _styleMaps.INVERSE];

Navbar = _utilsBootstrapUtils.bsStyles(NAVBAR_STATES, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsClass('navbar', _uncontrollable2['default'](Navbar, { expanded: 'onToggle' })));

function createSimpleWrapper(tag, suffix, displayName) {
  var wrapper = function wrapper(_ref, _ref2) {
    var Tag = _ref.componentClass;
    var className = _ref.className;

    var props = _objectWithoutProperties(_ref, ['componentClass', 'className']);

    var _classNames;

    var _ref2$$bs_navbar_bsClass = _ref2.$bs_navbar_bsClass;
    var bsClass = _ref2$$bs_navbar_bsClass === undefined ? 'navbar' : _ref2$$bs_navbar_bsClass;
    return _react2['default'].createElement(Tag, _extends({}, props, {
      className: _classnames2['default'](className, _utilsBootstrapUtils.prefix({ bsClass: bsClass }, suffix), (_classNames = {}, _classNames[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'right')] = props.pullRight, _classNames[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'left')] = props.pullLeft, _classNames))
    }));
  };

  wrapper.displayName = displayName;

  wrapper.propTypes = {
    componentClass: _reactPropTypesLibElementType2['default'],
    pullRight: _react2['default'].PropTypes.bool,
    pullLeft: _react2['default'].PropTypes.bool
  };
  wrapper.defaultProps = {
    componentClass: tag,
    pullRight: false,
    pullLeft: false
  };

  wrapper.contextTypes = {
    $bs_navbar_bsClass: _react.PropTypes.string
  };

  return wrapper;
}

Navbar.Brand = _NavbarBrand2['default'];
Navbar.Header = _NavbarHeader2['default'];
Navbar.Toggle = _NavbarToggle2['default'];
Navbar.Collapse = _NavbarCollapse2['default'];

Navbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
Navbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
Navbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink');

exports['default'] = Navbar;
module.exports = exports['default'];
},{"./Grid":182,"./NavbarBrand":213,"./NavbarCollapse":214,"./NavbarHeader":215,"./NavbarToggle":216,"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309,"uncontrollable":319}],213:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var NavbarBrand = (function (_React$Component) {
  _inherits(NavbarBrand, _React$Component);

  function NavbarBrand() {
    _classCallCheck(this, NavbarBrand);

    _React$Component.apply(this, arguments);
  }

  NavbarBrand.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'children']);

    var _context$$bs_navbar_bsClass = this.context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;

    var brandClasses = _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'brand');

    if (_react2['default'].isValidElement(children)) {
      return _react2['default'].cloneElement(children, {
        className: _classnames2['default'](children.props.className, className, brandClasses)
      });
    }

    return _react2['default'].createElement(
      'span',
      _extends({}, props, { className: _classnames2['default'](className, brandClasses) }),
      children
    );
  };

  return NavbarBrand;
})(_react2['default'].Component);

NavbarBrand.contextTypes = {
  $bs_navbar_bsClass: _react2['default'].PropTypes.string
};

exports['default'] = NavbarBrand;
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],214:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var NavbarCollapse = _react2['default'].createClass({
  displayName: 'NavbarCollapse',

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_expanded: _react.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['children']);

    var _context = this.context;
    var _context$$bs_navbar_bsClass = _context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;
    var expanded = _context.$bs_navbar_expanded;

    return _react2['default'].createElement(
      _Collapse2['default'],
      _extends({ 'in': expanded }, props),
      _react2['default'].createElement(
        'div',
        { className: _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'collapse') },
        children
      )
    );
  }
});

exports['default'] = NavbarCollapse;
module.exports = exports['default'];
},{"./Collapse":167,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"react":"react"}],215:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var NavbarHeader = _react2['default'].createClass({
  displayName: 'NavbarHeader',

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    var _context$$bs_navbar_bsClass = this.context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;

    var headerClasses = _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'header');

    return _react2['default'].createElement('div', _extends({}, props, { className: _classnames2['default'](className, headerClasses) }));
  }
});

exports['default'] = NavbarHeader;
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],216:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var NavbarToggle = _react2['default'].createClass({
  displayName: 'NavbarToggle',

  propTypes: {
    onClick: _react2['default'].PropTypes.func,
    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: _react.PropTypes.node
  },

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_onToggle: _react.PropTypes.func,
    $bs_navbar_expanded: _react.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var onClick = _props.onClick;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['onClick', 'className', 'children']);

    var _context = this.context;
    var _context$$bs_navbar_bsClass = _context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;
    var onToggle = _context.$bs_navbar_onToggle;
    var expanded = _context.$bs_navbar_expanded;

    var buttonProps = _extends({
      type: 'button'
    }, props, {
      onClick: _utilsCreateChainedFunction2['default'](onClick, onToggle),
      className: _classnames2['default'](className, _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'toggle'), !expanded && 'collapsed')
    });

    if (children) {
      return _react2['default'].createElement(
        'button',
        buttonProps,
        children
      );
    }

    return _react2['default'].createElement(
      'button',
      buttonProps,
      _react2['default'].createElement(
        'span',
        { className: 'sr-only' },
        'Toggle navigation'
      ),
      _react2['default'].createElement('span', { className: 'icon-bar' }),
      _react2['default'].createElement('span', { className: 'icon-bar' }),
      _react2['default'].createElement('span', { className: 'icon-bar' })
    );
  }
});

exports['default'] = NavbarToggle;
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],217:[function(require,module,exports){
/* eslint react/prop-types: [2, {ignore: ["container", "containerPadding", "target", "placement", "children"] }] */
/* These properties are validated in 'Portal' and 'Position' components */

'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactOverlaysLibOverlay = require('react-overlays/lib/Overlay');

var _reactOverlaysLibOverlay2 = _interopRequireDefault(_reactOverlaysLibOverlay);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Overlay = (function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay() {
    _classCallCheck(this, Overlay);

    _React$Component.apply(this, arguments);
  }

  Overlay.prototype.render = function render() {
    var _props = this.props;
    var child = _props.children;
    var transition = _props.animation;

    var props = _objectWithoutProperties(_props, ['children', 'animation']);

    if (transition === true) {
      transition = _Fade2['default'];
    }

    if (transition === false) {
      transition = null;
    }

    if (!transition) {
      child = _react.cloneElement(child, {
        className: _classnames2['default']('in', child.props.className)
      });
    }

    return _react2['default'].createElement(
      _reactOverlaysLibOverlay2['default'],
      _extends({}, props, {
        transition: transition
      }),
      child
    );
  };

  return Overlay;
})(_react2['default'].Component);

Overlay.propTypes = _extends({}, _reactOverlaysLibOverlay2['default'].propTypes, {

  /**
   * Set the visibility of the Overlay
   */
  show: _react2['default'].PropTypes.bool,
  /**
   * Specify whether the overlay should trigger onHide when the user clicks outside the overlay
   */
  rootClose: _react2['default'].PropTypes.bool,
  /**
   * A callback invoked by the overlay when it wishes to be hidden. Required if
   * `rootClose` is specified.
   */
  onHide: _react2['default'].PropTypes.func,

  /**
   * Use animation
   */
  animation: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _reactPropTypesLibElementType2['default']]),

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _react2['default'].PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _react2['default'].PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _react2['default'].PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _react2['default'].PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _react2['default'].PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _react2['default'].PropTypes.func
});

Overlay.defaultProps = {
  animation: _Fade2['default'],
  rootClose: false,
  show: false
};

exports['default'] = Overlay;
module.exports = exports['default'];
},{"./Fade":173,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-overlays/lib/Overlay":290,"react-prop-types/lib/elementType":309}],218:[function(require,module,exports){
(function (process){
/* eslint-disable react/prop-types */

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

var OverlayTrigger = _react2['default'].createClass({
  displayName: 'OverlayTrigger',

  propTypes: _extends({}, _Overlay2['default'].propTypes, {

    /**
    * Specify which action or actions trigger Overlay visibility
    */
    trigger: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']), _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),

    /**
     * A millisecond delay amount to show and hide the Overlay once triggered
     */
    delay: _react2['default'].PropTypes.number,
    /**
     * A millisecond delay amount before showing the Overlay once triggered.
     */
    delayShow: _react2['default'].PropTypes.number,
    /**
     * A millisecond delay amount before hiding the Overlay once triggered.
     */
    delayHide: _react2['default'].PropTypes.number,

    /**
     * The initial visibility state of the Overlay, for more nuanced visibility control consider
     * using the Overlay component directly.
     */
    defaultOverlayShown: _react2['default'].PropTypes.bool,

    /**
     * An element or text to overlay next to the target.
     */
    overlay: _react2['default'].PropTypes.node.isRequired,

    /**
     * @private
     */
    onBlur: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onClick: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onFocus: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onMouseEnter: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onMouseLeave: _react2['default'].PropTypes.func,

    // override specific overlay props
    /**
     * @private
     */
    target: function target() {},
    /**
    * @private
    */
    onHide: function onHide() {},
    /**
     * @private
     */
    show: function show() {}
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      defaultOverlayShown: false,
      trigger: ['hover', 'focus']
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown
    };
  },

  show: function show() {
    this.setState({
      isOverlayShown: true
    });
  },

  hide: function hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle: function toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  },

  componentWillMount: function componentWillMount() {
    this.handleMouseOver = this.handleMouseOverOut.bind(null, this.handleDelayedShow);
    this.handleMouseOut = this.handleMouseOverOut.bind(null, this.handleDelayedHide);
  },

  componentDidMount: function componentDidMount() {
    this._mountNode = document.createElement('div');
    this.renderOverlay();
  },

  renderOverlay: function renderOverlay() {
    _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, this._overlay, this._mountNode);
  },

  componentWillUnmount: function componentWillUnmount() {
    _reactDom2['default'].unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverShowDelay);
    clearTimeout(this._hoverHideDelay);
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this._mountNode) {
      this.renderOverlay();
    }
  },

  getOverlayTarget: function getOverlayTarget() {
    return _reactDom2['default'].findDOMNode(this);
  },

  getOverlay: function getOverlay() {
    var overlayProps = _extends({}, _lodashCompatObjectPick2['default'](this.props, _Object$keys(_Overlay2['default'].propTypes)), {
      show: this.state.isOverlayShown,
      onHide: this.hide,
      target: this.getOverlayTarget,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered
    });

    var overlay = _react.cloneElement(this.props.overlay, {
      placement: overlayProps.placement,
      container: overlayProps.container
    });

    return _react2['default'].createElement(
      _Overlay2['default'],
      overlayProps,
      overlay
    );
  },

  render: function render() {
    var trigger = _react2['default'].Children.only(this.props.children);
    var triggerProps = trigger.props;

    var props = {
      'aria-describedby': this.props.overlay.props.id
    };

    // create in render otherwise owner is lost...
    this._overlay = this.getOverlay();

    props.onClick = _utilsCreateChainedFunction2['default'](triggerProps.onClick, this.props.onClick);

    if (isOneOf('click', this.props.trigger)) {
      props.onClick = _utilsCreateChainedFunction2['default'](this.toggle, props.onClick);
    }

    if (isOneOf('hover', this.props.trigger)) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!(this.props.trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.') : undefined;

      props.onMouseOver = _utilsCreateChainedFunction2['default'](this.handleMouseOver, this.props.onMouseOver, triggerProps.onMouseOver);
      props.onMouseOut = _utilsCreateChainedFunction2['default'](this.handleMouseOut, this.props.onMouseOut, triggerProps.onMouseOut);
    }

    if (isOneOf('focus', this.props.trigger)) {
      props.onFocus = _utilsCreateChainedFunction2['default'](this.handleDelayedShow, this.props.onFocus, triggerProps.onFocus);
      props.onBlur = _utilsCreateChainedFunction2['default'](this.handleDelayedHide, this.props.onBlur, triggerProps.onBlur);
    }

    return _react.cloneElement(trigger, props);
  },

  handleDelayedShow: function handleDelayedShow() {
    var _this = this;

    if (this._hoverHideDelay != null) {
      clearTimeout(this._hoverHideDelay);
      this._hoverHideDelay = null;
      return;
    }

    if (this.state.isOverlayShown || this._hoverShowDelay != null) {
      return;
    }

    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverShowDelay = setTimeout(function () {
      _this._hoverShowDelay = null;
      _this.show();
    }, delay);
  },

  handleDelayedHide: function handleDelayedHide() {
    var _this2 = this;

    if (this._hoverShowDelay != null) {
      clearTimeout(this._hoverShowDelay);
      this._hoverShowDelay = null;
      return;
    }

    if (!this.state.isOverlayShown || this._hoverHideDelay != null) {
      return;
    }

    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverHideDelay = setTimeout(function () {
      _this2._hoverHideDelay = null;
      _this2.hide();
    }, delay);
  },

  // Simple implementation of mouseEnter and mouseLeave.
  // React's built version is broken: https://github.com/facebook/react/issues/4251
  // for cases when the trigger is disabled and mouseOut/Over can cause flicker moving
  // from one child element to another.
  handleMouseOverOut: function handleMouseOverOut(handler, e) {
    var target = e.currentTarget;
    var related = e.relatedTarget || e.nativeEvent.toElement;

    if (!related || related !== target && !_domHelpersQueryContains2['default'](target, related)) {
      handler(e);
    }
  }

});

exports['default'] = OverlayTrigger;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Overlay":217,"./utils/createChainedFunction":251,"_process":151,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"dom-helpers/query/contains":60,"lodash-compat/object/pick":146,"react":"react","react-dom":"react-dom","warning":321}],219:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var PageHeader = _react2['default'].createClass({
  displayName: 'PageHeader',

  render: function render() {
    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'page-header') }),
      _react2['default'].createElement(
        'h1',
        null,
        this.props.children
      )
    );
  }
});

exports['default'] = PageHeader;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],220:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var PageItem = _react2['default'].createClass({
  displayName: 'PageItem',

  propTypes: {
    disabled: _react2['default'].PropTypes.bool,
    previous: _react2['default'].PropTypes.bool,
    next: _react2['default'].PropTypes.bool,
    onClick: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      previous: false,
      next: false
    };
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var previous = _props.previous;
    var next = _props.next;
    var onClick = _props.onClick;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['disabled', 'previous', 'next', 'onClick', 'className', 'style']);

    delete props.onSelect;
    delete props.eventKey;

    return _react2['default'].createElement(
      'li',
      {
        className: _classnames2['default'](className, { disabled: disabled, previous: previous, next: next }),
        style: style
      },
      _react2['default'].createElement(_SafeAnchor2['default'], _extends({}, props, {
        disabled: disabled,
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleSelect)
      }))
    );
  },

  handleSelect: function handleSelect(e) {
    if (this.props.onSelect || this.props.disabled) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }
});

exports['default'] = PageItem;
module.exports = exports['default'];
},{"./SafeAnchor":231,"./utils/createChainedFunction":251,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],221:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var Pager = _react2['default'].createClass({
  displayName: 'Pager',

  propTypes: {
    onSelect: _react2['default'].PropTypes.func
  },

  render: function render() {
    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'pager') }),
      _utilsValidComponentChildren2['default'].map(this.props.children, this.renderPageItem)
    );
  },

  renderPageItem: function renderPageItem(child, index) {
    return _react.cloneElement(child, {
      onSelect: _utilsCreateChainedFunction2['default'](child.props.onSelect, this.props.onSelect),
      key: child.key ? child.key : index
    });
  }
});

exports['default'] = Pager;
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":247,"./utils/createChainedFunction":251,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],222:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _PaginationButton = require('./PaginationButton');

var _PaginationButton2 = _interopRequireDefault(_PaginationButton);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var Pagination = _react2['default'].createClass({
  displayName: 'Pagination',

  propTypes: {
    activePage: _react2['default'].PropTypes.number,
    items: _react2['default'].PropTypes.number,
    maxButtons: _react2['default'].PropTypes.number,
    /**
     * When `true`, will display the first and the last button page
     */
    boundaryLinks: _react2['default'].PropTypes.bool,
    /**
     * When `true`, will display the default node value ('&hellip;').
     * Otherwise, will display provided node (when specified).
     */
    ellipsis: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&laquo;').
     * Otherwise, will display provided node (when specified).
     */
    first: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&raquo;').
     * Otherwise, will display provided node (when specified).
     */
    last: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&lsaquo;').
     * Otherwise, will display provided node (when specified).
     */
    prev: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    /**
     * When `true`, will display the default node value ('&rsaquo;').
     * Otherwise, will display provided node (when specified).
     */
    next: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.node]),
    onSelect: _react2['default'].PropTypes.func,
    /**
     * You can use a custom element for the buttons
     */
    buttonComponentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      activePage: 1,
      items: 1,
      maxButtons: 0,
      first: false,
      last: false,
      prev: false,
      next: false,
      ellipsis: true,
      boundaryLinks: false,
      buttonComponentClass: _SafeAnchor2['default'],
      bsClass: 'pagination'
    };
  },

  renderPageButtons: function renderPageButtons() {
    var pageButtons = [];
    var startPage = undefined,
        endPage = undefined,
        hasHiddenPagesAfter = undefined;
    var _props = this.props;
    var maxButtons = _props.maxButtons;
    var activePage = _props.activePage;
    var items = _props.items;
    var onSelect = _props.onSelect;
    var ellipsis = _props.ellipsis;
    var buttonComponentClass = _props.buttonComponentClass;
    var boundaryLinks = _props.boundaryLinks;

    if (maxButtons) {
      var hiddenPagesBefore = activePage - parseInt(maxButtons / 2, 10);
      startPage = hiddenPagesBefore > 1 ? hiddenPagesBefore : 1;
      hasHiddenPagesAfter = startPage + maxButtons <= items;

      if (!hasHiddenPagesAfter) {
        endPage = items;
        startPage = items - maxButtons + 1;
        if (startPage < 1) {
          startPage = 1;
        }
      } else {
        endPage = startPage + maxButtons - 1;
      }
    } else {
      startPage = 1;
      endPage = items;
    }

    for (var pagenumber = startPage; pagenumber <= endPage; pagenumber++) {
      pageButtons.push(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: pagenumber,
          eventKey: pagenumber,
          active: pagenumber === activePage,
          onSelect: onSelect,
          buttonComponentClass: buttonComponentClass
        },
        pagenumber
      ));
    }

    if (boundaryLinks && ellipsis && startPage !== 1) {
      pageButtons.unshift(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'ellipsisFirst',
          disabled: true,
          buttonComponentClass: buttonComponentClass
        },
        _react2['default'].createElement(
          'span',
          { 'aria-label': 'More' },
          this.props.ellipsis === true ? '…' : this.props.ellipsis
        )
      ));

      pageButtons.unshift(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 1,
          eventKey: 1,
          active: false,
          onSelect: onSelect,
          buttonComponentClass: buttonComponentClass
        },
        '1'
      ));
    }

    if (maxButtons && hasHiddenPagesAfter && ellipsis) {
      pageButtons.push(_react2['default'].createElement(
        _PaginationButton2['default'],
        {
          key: 'ellipsis',
          disabled: true,
          buttonComponentClass: buttonComponentClass
        },
        _react2['default'].createElement(
          'span',
          { 'aria-label': 'More' },
          this.props.ellipsis === true ? '…' : this.props.ellipsis
        )
      ));

      if (boundaryLinks && endPage !== items) {
        pageButtons.push(_react2['default'].createElement(
          _PaginationButton2['default'],
          {
            key: items,
            eventKey: items,
            active: false,
            onSelect: onSelect,
            buttonComponentClass: buttonComponentClass
          },
          items
        ));
      }
    }

    return pageButtons;
  },

  renderPrev: function renderPrev() {
    if (!this.props.prev) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'prev',
        eventKey: this.props.activePage - 1,
        disabled: this.props.activePage === 1,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Previous' },
        this.props.prev === true ? '‹' : this.props.prev
      )
    );
  },

  renderNext: function renderNext() {
    if (!this.props.next) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'next',
        eventKey: this.props.activePage + 1,
        disabled: this.props.activePage >= this.props.items,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Next' },
        this.props.next === true ? '›' : this.props.next
      )
    );
  },

  renderFirst: function renderFirst() {
    if (!this.props.first) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'first',
        eventKey: 1,
        disabled: this.props.activePage === 1,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'First' },
        this.props.first === true ? '«' : this.props.first
      )
    );
  },

  renderLast: function renderLast() {
    if (!this.props.last) {
      return null;
    }

    return _react2['default'].createElement(
      _PaginationButton2['default'],
      {
        key: 'last',
        eventKey: this.props.items,
        disabled: this.props.activePage >= this.props.items,
        onSelect: this.props.onSelect,
        buttonComponentClass: this.props.buttonComponentClass
      },
      _react2['default'].createElement(
        'span',
        { 'aria-label': 'Last' },
        this.props.last === true ? '»' : this.props.last
      )
    );
  },

  render: function render() {
    return _react2['default'].createElement(
      'ul',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.getClassSet(this.props))
      }),
      this.renderFirst(),
      this.renderPrev(),
      this.renderPageButtons(),
      this.renderNext(),
      this.renderLast()
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('pagination', Pagination);
module.exports = exports['default'];
},{"./PaginationButton":223,"./SafeAnchor":231,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],223:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var PaginationButton = _react2['default'].createClass({
  displayName: 'PaginationButton',

  propTypes: {
    className: _react2['default'].PropTypes.string,
    eventKey: _react2['default'].PropTypes.any,
    onSelect: _react2['default'].PropTypes.func,
    disabled: _react2['default'].PropTypes.bool,
    active: _react2['default'].PropTypes.bool,
    onClick: _react2['default'].PropTypes.func,
    /**
     * You can use a custom element for this component
     */
    buttonComponentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  handleClick: function handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, event);
    }
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var disabled = _props.disabled;
    var onClick = _props.onClick;
    var ButtonComponentClass = _props.buttonComponentClass;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['active', 'disabled', 'onClick', 'buttonComponentClass', 'className', 'style']);

    delete props.onSelect;

    return _react2['default'].createElement(
      'li',
      {
        className: _classnames2['default'](className, { active: active, disabled: disabled }),
        style: style
      },
      _react2['default'].createElement(ButtonComponentClass, _extends({}, props, {
        disabled: disabled,
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick)
      }))
    );
  }
});

exports['default'] = PaginationButton;
module.exports = exports['default'];
},{"./utils/createChainedFunction":251,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],224:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var Panel = _react2['default'].createClass({
  displayName: 'Panel',

  propTypes: {
    collapsible: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    header: _react2['default'].PropTypes.node,
    id: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    footer: _react2['default'].PropTypes.node,
    defaultExpanded: _react2['default'].PropTypes.bool,
    expanded: _react2['default'].PropTypes.bool,
    eventKey: _react2['default'].PropTypes.any,
    headerRole: _react2['default'].PropTypes.string,
    panelRole: _react2['default'].PropTypes.string,

    onEnter: _Collapse2['default'].propTypes.onEnter,
    onEntering: _Collapse2['default'].propTypes.onEntering,
    onEntered: _Collapse2['default'].propTypes.onEntered,
    onExit: _Collapse2['default'].propTypes.onExit,
    onExiting: _Collapse2['default'].propTypes.onExiting,
    onExited: _Collapse2['default'].propTypes.onExited
  },

  getDefaultProps: function getDefaultProps() {
    return {
      defaultExpanded: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      expanded: this.props.defaultExpanded
    };
  },

  handleSelect: function handleSelect(e) {
    e.persist();
    e.selected = true;

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, e);
    } else {
      e.preventDefault();
    }

    if (e.selected) {
      this.handleToggle();
    }
  },

  handleToggle: function handleToggle() {
    this.setState({ expanded: !this.state.expanded });
  },

  isExpanded: function isExpanded() {
    return this.props.expanded != null ? this.props.expanded : this.state.expanded;
  },

  render: function render() {
    var _props = this.props;
    var headerRole = _props.headerRole;
    var panelRole = _props.panelRole;

    var props = _objectWithoutProperties(_props, ['headerRole', 'panelRole']);

    return _react2['default'].createElement(
      'div',
      _extends({}, props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.getClassSet(this.props)),
        id: this.props.collapsible ? null : this.props.id, onSelect: null
      }),
      this.renderHeading(headerRole),
      this.props.collapsible ? this.renderCollapsibleBody(panelRole) : this.renderBody(),
      this.renderFooter()
    );
  },

  renderCollapsibleBody: function renderCollapsibleBody(panelRole) {
    var collapseProps = {
      onEnter: this.props.onEnter,
      onEntering: this.props.onEntering,
      onEntered: this.props.onEntered,
      onExit: this.props.onExit,
      onExiting: this.props.onExiting,
      onExited: this.props.onExited,
      'in': this.isExpanded()
    };
    var props = {
      className: _utilsBootstrapUtils.prefix(this.props, 'collapse'),
      id: this.props.id,
      ref: 'panel',
      'aria-hidden': !this.isExpanded()
    };
    if (panelRole) {
      props.role = panelRole;
    }

    return _react2['default'].createElement(
      _Collapse2['default'],
      collapseProps,
      _react2['default'].createElement(
        'div',
        props,
        this.renderBody()
      )
    );
  },

  renderBody: function renderBody() {
    var _this = this;

    var allChildren = this.props.children;
    var bodyElements = [];
    var panelBodyChildren = [];
    var bodyClass = _utilsBootstrapUtils.prefix(this.props, 'body');

    function getProps() {
      return { key: bodyElements.length };
    }

    function addPanelChild(child) {
      bodyElements.push(_react.cloneElement(child, getProps()));
    }

    function addPanelBody(children) {
      bodyElements.push(_react2['default'].createElement(
        'div',
        _extends({ className: bodyClass }, getProps()),
        children
      ));
    }

    function maybeRenderPanelBody() {
      if (panelBodyChildren.length === 0) {
        return;
      }

      addPanelBody(panelBodyChildren);
      panelBodyChildren = [];
    }

    // Handle edge cases where we should not iterate through children.
    if (!Array.isArray(allChildren) || allChildren.length === 0) {
      if (this.shouldRenderFill(allChildren)) {
        addPanelChild(allChildren);
      } else {
        addPanelBody(allChildren);
      }
    } else {
      allChildren.forEach(function (child) {
        if (_this.shouldRenderFill(child)) {
          maybeRenderPanelBody();

          // Separately add the filled element.
          addPanelChild(child);
        } else {
          panelBodyChildren.push(child);
        }
      });

      maybeRenderPanelBody();
    }

    return bodyElements;
  },

  shouldRenderFill: function shouldRenderFill(child) {
    return _react2['default'].isValidElement(child) && child.props.fill != null;
  },

  renderHeading: function renderHeading(headerRole) {
    var header = this.props.header;

    if (!header) {
      return null;
    }

    if (!_react2['default'].isValidElement(header) || Array.isArray(header)) {
      header = this.props.collapsible ? this.renderCollapsibleTitle(header, headerRole) : header;
    } else {
      var className = _classnames2['default'](_utilsBootstrapUtils.prefix(this.props, 'title'), header.props.className);

      if (this.props.collapsible) {
        header = _react.cloneElement(header, {
          className: className,
          children: this.renderAnchor(header.props.children, headerRole)
        });
      } else {
        header = _react.cloneElement(header, { className: className });
      }
    }

    return _react2['default'].createElement(
      'div',
      { className: _utilsBootstrapUtils.prefix(this.props, 'heading') },
      header
    );
  },

  renderAnchor: function renderAnchor(header, headerRole) {
    return _react2['default'].createElement(
      'a',
      {
        href: '#' + (this.props.id || ''),
        'aria-controls': this.props.collapsible ? this.props.id : null,
        className: this.isExpanded() ? null : 'collapsed',
        'aria-expanded': this.isExpanded(),
        'aria-selected': this.isExpanded(),
        onClick: this.handleSelect,
        role: headerRole
      },
      header
    );
  },

  renderCollapsibleTitle: function renderCollapsibleTitle(header, headerRole) {
    return _react2['default'].createElement(
      'h4',
      { className: _utilsBootstrapUtils.prefix(this.props, 'title'), role: 'presentation' },
      this.renderAnchor(header, headerRole)
    );
  },

  renderFooter: function renderFooter() {
    if (!this.props.footer) {
      return null;
    }

    return _react2['default'].createElement(
      'div',
      { className: _utilsBootstrapUtils.prefix(this.props, 'footer') },
      this.props.footer
    );
  }
});

var PANEL_STATES = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY);

exports['default'] = _utilsBootstrapUtils.bsStyles(PANEL_STATES, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsClass('panel', Panel));
module.exports = exports['default'];
},{"./Collapse":167,"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],225:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var PanelGroup = _react2['default'].createClass({
  displayName: 'PanelGroup',

  propTypes: {
    accordion: _react2['default'].PropTypes.bool,
    activeKey: _react2['default'].PropTypes.any,
    className: _react2['default'].PropTypes.string,
    children: _react2['default'].PropTypes.node,
    defaultActiveKey: _react2['default'].PropTypes.any,
    onSelect: _react2['default'].PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      accordion: false
    };
  },

  getInitialState: function getInitialState() {
    var defaultActiveKey = this.props.defaultActiveKey;

    return {
      activeKey: defaultActiveKey
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    if (this.props.accordion) {
      props.role = 'tablist';
    }
    return _react2['default'].createElement(
      'div',
      _extends({}, props, { className: _classnames2['default'](className, classes), onSelect: null }),
      _utilsValidComponentChildren2['default'].map(props.children, this.renderPanel)
    );
  },

  renderPanel: function renderPanel(child, index) {
    var activeKey = this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

    var props = {
      bsStyle: child.props.bsStyle || this.props.bsStyle,
      key: child.key ? child.key : index,
      ref: child.ref
    };

    if (this.props.accordion) {
      props.headerRole = 'tab';
      props.panelRole = 'tabpanel';
      props.collapsible = true;
      props.expanded = child.props.eventKey === activeKey;
      props.onSelect = this.handleSelect;
    }

    return _react.cloneElement(child, props);
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleSelect: function handleSelect(key, e) {
    e.preventDefault();

    if (this.props.onSelect) {
      this._isChanging = true;
      this.props.onSelect(key, e);
      this._isChanging = false;
    }

    if (this.state.activeKey === key) {
      key = null;
    }

    this.setState({
      activeKey: key
    });
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('panel-group', PanelGroup);
module.exports = exports['default'];
},{"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],226:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Popover = _react2['default'].createClass({
  displayName: 'Popover',

  propTypes: {

    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

    /**
     * Sets the direction the Popover is positioned towards.
     */
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Popover.
     */
    positionLeft: _react2['default'].PropTypes.number,
    /**
     * The "top" position value for the Popover.
     */
    positionTop: _react2['default'].PropTypes.number,
    /**
     * The "left" position value for the Popover arrow.
     */
    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * The "top" position value for the Popover arrow.
     */
    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * Title text
     */
    title: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right',
      bsClass: 'popover'
    };
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props)] = true, _classes[this.props.placement] = true, _classes);

    var style = _extends({
      left: this.props.positionLeft,
      top: this.props.positionTop,
      display: 'block'
    }, this.props.style);

    // eslint-disable-line react/prop-types
    var arrowStyle = {
      left: this.props.arrowOffsetLeft,
      top: this.props.arrowOffsetTop
    };

    return _react2['default'].createElement(
      'div',
      _extends({
        role: 'tooltip'
      }, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        style: style,
        title: null
      }),
      _react2['default'].createElement('div', { className: 'arrow', style: arrowStyle }),
      this.props.title ? this.renderTitle() : null,
      _react2['default'].createElement(
        'div',
        { className: _utilsBootstrapUtils.prefix(this.props, 'content') },
        this.props.children
      )
    );
  },

  renderTitle: function renderTitle() {
    return _react2['default'].createElement(
      'h3',
      { className: _utilsBootstrapUtils.prefix(this.props, 'title') },
      this.props.title
    );
  }
});

exports['default'] = Popover;
module.exports = exports['default'];
// we don't want to expose the `style` property
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/isRequiredForA11y":310}],227:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _Interpolate = require('./Interpolate');

var _Interpolate2 = _interopRequireDefault(_Interpolate);

/**
 * Custom propTypes checker
 */
function onlyProgressBar(props, propName, componentName) {
  if (props[propName]) {
    var _ret = (function () {
      var error = undefined,
          childIdentifier = undefined;

      _react2['default'].Children.forEach(props[propName], function (child) {
        if (child.type !== ProgressBar) {
          //eslint-disable-line
          childIdentifier = child.type.displayName ? child.type.displayName : child.type;
          error = new Error('Children of ' + componentName + ' can contain only ProgressBar components. Found ' + childIdentifier);
        }
      });

      return {
        v: error
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }
}

var ProgressBar = (function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    _React$Component.apply(this, arguments);
  }

  ProgressBar.prototype.getPercentage = function getPercentage(now, min, max) {
    var roundPrecision = 1000;
    return Math.round((now - min) / (max - min) * 100 * roundPrecision) / roundPrecision;
  };

  ProgressBar.prototype.render = function render() {
    if (this.props.isChild) {
      return this.renderProgressBar();
    }

    var content = undefined;

    if (this.props.children) {
      content = _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChildBar);
    } else {
      content = this.renderProgressBar();
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, 'progress'),
        min: null,
        max: null,
        label: null,
        'aria-valuetext': null
      }),
      content
    );
  };

  ProgressBar.prototype.renderChildBar = function renderChildBar(child, index) {
    return _react.cloneElement(child, {
      isChild: true,
      key: child.key ? child.key : index
    });
  };

  ProgressBar.prototype.renderProgressBar = function renderProgressBar() {
    var _classNames;

    var _props = this.props;
    var className = _props.className;
    var label = _props.label;
    var now = _props.now;
    var min = _props.min;
    var max = _props.max;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['className', 'label', 'now', 'min', 'max', 'style']);

    var percentage = this.getPercentage(now, min, max);

    if (typeof label === 'string') {
      label = this.renderLabel(percentage);
    }

    if (this.props.srOnly) {
      label = _react2['default'].createElement(
        'span',
        { className: 'sr-only' },
        label
      );
    }

    var classes = _classnames2['default'](className, _utilsBootstrapUtils.getClassSet(this.props), (_classNames = {
      active: this.props.active
    }, _classNames[_utilsBootstrapUtils.prefix(this.props, 'striped')] = this.props.active || this.props.striped, _classNames));

    return _react2['default'].createElement(
      'div',
      _extends({}, props, {
        className: classes,
        role: 'progressbar',
        style: _extends({ width: percentage + '%' }, style),
        'aria-valuenow': this.props.now,
        'aria-valuemin': this.props.min,
        'aria-valuemax': this.props.max
      }),
      label
    );
  };

  ProgressBar.prototype.renderLabel = function renderLabel(percentage) {
    var _props2 = this.props;
    var interpolateClass = _props2.interpolateClass;
    var now = _props2.now;
    var min = _props2.min;
    var max = _props2.max;
    var bsStyle = _props2.bsStyle;
    var label = _props2.label;

    var InterpolateClass = interpolateClass || _Interpolate2['default'];

    var REGEXP = InterpolateClass.REGEXP;

    if (REGEXP && REGEXP.exec(label)) {
      _utilsDeprecationWarning2['default']('String interpolation in <ProgressBar label>', 'ES2015 template strings or other patterns');
    }

    return _react2['default'].createElement(
      InterpolateClass,
      {
        now: now,
        min: min,
        max: max,
        percent: percentage,
        bsStyle: bsStyle
      },
      label
    );
  };

  return ProgressBar;
})(_react2['default'].Component);

ProgressBar.propTypes = {
  min: _react.PropTypes.number,
  now: _react.PropTypes.number,
  max: _react.PropTypes.number,
  label: _react.PropTypes.node,
  srOnly: _react.PropTypes.bool,
  striped: _react.PropTypes.bool,
  active: _react.PropTypes.bool,
  children: onlyProgressBar,
  className: _react2['default'].PropTypes.string,
  interpolateClass: _react.PropTypes.node,
  /**
   * @private
   */
  isChild: _react.PropTypes.bool
};

ProgressBar.defaultProps = {
  min: 0,
  max: 100,
  active: false,
  isChild: false,
  srOnly: false,
  striped: false
};

exports['default'] = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values(), _utilsBootstrapUtils.bsClass('progress-bar', ProgressBar));
module.exports = exports['default'];
},{"./Interpolate":190,"./styleMaps":244,"./utils/ValidComponentChildren":247,"./utils/bootstrapUtils":248,"./utils/deprecationWarning":252,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react"}],228:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  inline: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Radio inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: _react2['default'].PropTypes.func
};

var defaultProps = {
  inline: false,
  disabled: false
};

var Radio = (function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio() {
    _classCallCheck(this, Radio);

    _React$Component.apply(this, arguments);
  }

  Radio.prototype.render = function render() {
    var _props = this.props;
    var inline = _props.inline;
    var disabled = _props.disabled;
    var validationState = _props.validationState;
    var inputRef = _props.inputRef;
    var className = _props.className;
    var style = _props.style;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'children']);

    delete props.bsClass;

    var input = _react2['default'].createElement('input', _extends({}, props, {
      ref: inputRef,
      type: 'radio',
      disabled: disabled
    }));

    if (inline) {
      var _classes;

      var _classes2 = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props, 'inline')] = true, _classes.disabled = disabled, _classes);

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!validationState, '`validationState` is ignored on `<Radio inline>`. To display ' + 'validation state on an inline radio, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : undefined;

      return _react2['default'].createElement(
        'label',
        { className: _classnames2['default'](className, _classes2), style: style },
        input,
        children
      );
    }

    var classes = _extends({}, _utilsBootstrapUtils.getClassSet(this.props), {
      disabled: disabled
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className, classes), style: style },
      _react2['default'].createElement(
        'label',
        null,
        input,
        children
      )
    );
  };

  return Radio;
})(_react2['default'].Component);

Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('radio', Radio);
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./utils/bootstrapUtils":248,"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","warning":321}],229:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var ResponsiveEmbed = (function (_React$Component) {
  _inherits(ResponsiveEmbed, _React$Component);

  function ResponsiveEmbed() {
    _classCallCheck(this, ResponsiveEmbed);

    _React$Component.apply(this, arguments);
  }

  ResponsiveEmbed.prototype.render = function render() {
    var _props = this.props;
    var bsClass = _props.bsClass;
    var className = _props.className;
    var a16by9 = _props.a16by9;
    var a4by3 = _props.a4by3;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['bsClass', 'className', 'a16by9', 'a4by3', 'children']);

    process.env.NODE_ENV !== 'production' ? _warning2['default'](!(!a16by9 && !a4by3), '`a16by9` or `a4by3` attribute must be set.') : undefined;
    process.env.NODE_ENV !== 'production' ? _warning2['default'](!(a16by9 && a4by3), 'Either `a16by9` or `a4by3` attribute can be set. Not both.') : undefined;

    var aspectRatio = {
      'embed-responsive-16by9': a16by9,
      'embed-responsive-4by3': a4by3
    };

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](bsClass, aspectRatio) },
      _react.cloneElement(children, _extends({}, props, {
        className: _classnames2['default'](className, 'embed-responsive-item')
      }))
    );
  };

  return ResponsiveEmbed;
})(_react2['default'].Component);

ResponsiveEmbed.defaultProps = {
  bsClass: 'embed-responsive',
  a16by9: false,
  a4by3: false
};

ResponsiveEmbed.propTypes = {
  /**
   * bootstrap className
   * @private
   */
  bsClass: _react.PropTypes.string,
  /**
   * This component accepts only one child element
   */
  children: _react.PropTypes.element.isRequired,
  /**
   * 16by9 aspect ratio
   */
  a16by9: _react.PropTypes.bool,
  /**
   * 4by3 aspect ratio
   */
  a4by3: _react.PropTypes.bool
};

exports['default'] = ResponsiveEmbed;
module.exports = exports['default'];
}).call(this,require('_process'))

},{"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","warning":321}],230:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var Row = _react2['default'].createClass({
  displayName: 'Row',

  propTypes: {
    /**
     * You can use a custom element for this component
     */
    componentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div'
    };
  },

  render: function render() {
    var ComponentClass = this.props.componentClass;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, 'row') }),
      this.props.children
    );
  }
});

exports['default'] = Row;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/elementType":309}],231:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or bootstrap css where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */

var SafeAnchor = (function (_React$Component) {
  _inherits(SafeAnchor, _React$Component);

  function SafeAnchor(props) {
    _classCallCheck(this, SafeAnchor);

    _React$Component.call(this, props);
    this.handleClick = this.handleClick.bind(this);
  }

  SafeAnchor.prototype.render = function render() {
    var _props = this.props;
    var href = _props.href;
    var role = _props.role;
    var tabIndex = _props.tabIndex;
    var disabled = _props.disabled;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['href', 'role', 'tabIndex', 'disabled', 'style']);

    var Component = this.props.componentClass || 'a';

    if (isTrivialHref(href)) {
      role = role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      href = href || '';
    }

    if (disabled) {
      tabIndex = -1;
      style = _extends({ pointerEvents: 'none' }, style);
    }

    return _react2['default'].createElement(Component, _extends({}, props, {
      role: role,
      href: href,
      style: style,
      tabIndex: tabIndex,
      onClick: this.handleClick
    }));
  };

  SafeAnchor.prototype.handleClick = function handleClick(event) {
    var _props2 = this.props;
    var disabled = _props2.disabled;
    var href = _props2.href;
    var onClick = _props2.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return SafeAnchor;
})(_react2['default'].Component);

exports['default'] = SafeAnchor;

SafeAnchor.propTypes = {
  href: _react2['default'].PropTypes.string,
  onClick: _react2['default'].PropTypes.func,
  disabled: _react2['default'].PropTypes.bool,
  role: _react2['default'].PropTypes.string,
  tabIndex: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
  /**
   * this is sort of silly but needed for Button
   */
  componentClass: _reactPropTypesLibElementType2['default']
};
module.exports = exports['default'];
},{"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"react":"react","react-prop-types/lib/elementType":309}],232:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _SplitToggle = require('./SplitToggle');

var _SplitToggle2 = _interopRequireDefault(_SplitToggle);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var SplitButton = (function (_React$Component) {
  _inherits(SplitButton, _React$Component);

  function SplitButton() {
    _classCallCheck(this, SplitButton);

    _React$Component.apply(this, arguments);
  }

  SplitButton.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var title = _props.title;
    var onClick = _props.onClick;
    var target = _props.target;
    var href = _props.href;
    var toggleLabel = _props.toggleLabel;
    var bsSize = _props.bsSize;
    var bsStyle = _props.bsStyle;

    var props = _objectWithoutProperties(_props, ['children', 'title', 'onClick', 'target', 'href', 'toggleLabel', 'bsSize', 'bsStyle']);

    var disabled = props.disabled;

    var dropdownProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));
    var buttonProps = _lodashCompatObjectOmit2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));

    return _react2['default'].createElement(
      _Dropdown2['default'],
      dropdownProps,
      _react2['default'].createElement(
        _Button2['default'],
        _extends({}, buttonProps, {
          onClick: onClick,
          bsStyle: bsStyle,
          bsSize: bsSize,
          disabled: disabled,
          target: target,
          href: href
        }),
        title
      ),
      _react2['default'].createElement(_SplitToggle2['default'], {
        'aria-label': toggleLabel || title,
        bsStyle: bsStyle,
        bsSize: bsSize,
        disabled: disabled
      }),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return SplitButton;
})(_react2['default'].Component);

SplitButton.propTypes = _extends({}, _Dropdown2['default'].propTypes, {
  bsStyle: _Button2['default'].propTypes.bsStyle,

  /**
   * @private
   */
  onClick: function onClick() {},
  target: _react2['default'].PropTypes.string,
  href: _react2['default'].PropTypes.string,
  /**
   * The content of the split button.
   */
  title: _react2['default'].PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: _react2['default'].PropTypes.string
});

SplitButton.defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

SplitButton.Toggle = _SplitToggle2['default'];

exports['default'] = SplitButton;
module.exports = exports['default'];
},{"./Button":157,"./Dropdown":169,"./SplitToggle":233,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"lodash-compat/object/omit":144,"lodash-compat/object/pick":146,"react":"react"}],233:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var SplitToggle = (function (_React$Component) {
  _inherits(SplitToggle, _React$Component);

  function SplitToggle() {
    _classCallCheck(this, SplitToggle);

    _React$Component.apply(this, arguments);
  }

  SplitToggle.prototype.render = function render() {
    return _react2['default'].createElement(_DropdownToggle2['default'], _extends({}, this.props, {
      useAnchor: false,
      noCaret: false
    }));
  };

  return SplitToggle;
})(_react2['default'].Component);

exports['default'] = SplitToggle;

SplitToggle.defaultProps = _DropdownToggle2['default'].defaultProps;
module.exports = exports['default'];
},{"./DropdownToggle":172,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"react":"react"}],234:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabPane = require('./TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _TabContainer = require('./TabContainer');

var _TabContainer2 = _interopRequireDefault(_TabContainer);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    _classCallCheck(this, Tab);

    _React$Component.apply(this, arguments);
  }

  Tab.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var disabled = _props.disabled;
    var tabClassName = _props.tabClassName;

    var props = _objectWithoutProperties(_props, ['title', 'disabled', 'tabClassName']);

    return _react2['default'].createElement(_TabPane2['default'], props);
  };

  return Tab;
})(_react2['default'].Component);

Tab.propTypes = _extends({}, _TabPane2['default'].propTypes, {

  disabled: _react2['default'].PropTypes.bool,

  title: _react2['default'].PropTypes.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: _react2['default'].PropTypes.string
});

Tab.Container = _TabContainer2['default'];
Tab.Content = _TabContent2['default'];
Tab.Pane = _TabPane2['default'];

exports['default'] = Tab;
module.exports = exports['default'];
},{"./TabContainer":235,"./TabContent":236,"./TabPane":237,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"react":"react"}],235:[function(require,module,exports){
'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var idPropType = _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]);

var TabContainer = _react2['default'].createClass({
  displayName: 'TabContainer',

  propTypes: {
    /**
     * HTML id attribute, required if no `generateChildId` prop
     * is specified.
     */
    id: function id(props) {
      var error = null;

      if (!props.generateChildId) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        error = idPropType.apply(undefined, [props].concat(args));

        if (!error && !props.id) {
          error = new Error('In order to properly initialize Tabs in a way that is accessible to assistive technologies ' + '(such as screen readers) an `id` or a `generateChildId` prop to TabContainer is required');
        }
      }
      return error;
    },

    /**
     * A function that takes an eventKey and type and returns a
     * unique id for child tab NavItems and TabPanes. The function _must_ be a pure function,
     * meaning it should always return the _same_ id for the same set of inputs. The default
     * value requires that an `id` to be set for the TabContainer.
     *
     * The `type` argument will either be `"tab"` or `"pane"`.
     *
     * @defaultValue (eventKey, type) => `${this.props.id}-${type}-${key}`
     */
    generateChildId: _react.PropTypes.func,

    /**
     * A callback fired when a tab is selected.
     *
     * @controllable activeKey
     */
    onSelect: _react.PropTypes.func,

    /**
     * The `eventKey` of the currently active tab.
     *
     * @controllable onSelect
     */
    activeKey: _react.PropTypes.any
  },

  childContextTypes: {
    $bs_tabcontainer: _react2['default'].PropTypes.shape({
      activeKey: _react.PropTypes.any,
      onSelect: _react.PropTypes.func,
      getId: _react.PropTypes.func
    })
  },

  getChildContext: function getChildContext() {
    var _props = this.props;
    var activeKey = _props.activeKey;
    var generateChildId = _props.generateChildId;
    var id = _props.id;

    return {
      $bs_tabcontainer: {
        activeKey: activeKey,
        onSelect: this.handleSelect,
        getId: generateChildId || function (key, type) {
          return id ? id + '-' + type + '-' + key : null;
        }
      }
    };
  },

  componentWillUnmount: function componentWillUnmount() {
    // isMounted() isn't `true` at this point;
    this.unmounting = true;
  },

  handleSelect: function handleSelect(key) {
    if (!this.unmounting) {
      this.props.onSelect(key);
    }
  },

  render: function render() {
    var _props2 = this.props;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['children']);

    delete props.generateChildId;
    delete props.onSelect;
    delete props.activeKey;

    return _react2['default'].cloneElement(_react2['default'].Children.only(children), props);
  }
});

exports['default'] = _uncontrollable2['default'](TabContainer, { activeKey: 'onSelect' });
module.exports = exports['default'];
},{"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"react":"react","uncontrollable":319}],236:[function(require,module,exports){
(function (process){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var animationPropType = _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]);

var TabContent = _react2['default'].createClass({
  displayName: 'TabContent',

  propTypes: {

    /**
     * the Component used to render the TabContent
     */
    componentClass: _reactPropTypesLibElementType2['default'],

    /**
     * Sets a default animation strategy for all children TabPanes.
     * Use `false` to disable, `true` to enable the default "Fade"
     * animation or any `<Transition>` component.
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]),

    /**
     * Unmount the tab (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: _react.PropTypes.bool
  },

  contextTypes: {
    $bs_tabcontainer: _react2['default'].PropTypes.shape({
      activeKey: _react2['default'].PropTypes.any,
      onSelect: _react.PropTypes.func
    })
  },

  childContextTypes: {
    $bs_tabcontent: _react.PropTypes.shape({
      bsClass: _react.PropTypes.string,
      animation: animationPropType,
      activeKey: _react.PropTypes.any,
      onExited: _react.PropTypes.func,
      register: _react.PropTypes.func,
      unmountOnExit: _react.PropTypes.bool
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div',
      animation: true,
      unmountOnExit: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      exitingPane: null
    };
  },

  getChildContext: function getChildContext() {
    var exitingPane = this._exitingPane;

    return {
      $bs_tabcontent: {
        bsClass: this.props.bsClass,
        animation: this.props.animation,
        activeKey: exitingPane ? undefined : this.getActiveKey(),
        onExited: this.handlePaneExited,
        register: this.registerPane,
        unmountOnExit: this.props.unmountOnExit
      }
    };
  },

  componentWillMount: function componentWillMount() {
    this.panes = [];
  },

  /**
   * This belongs in `componentWillReceiveProps()` but
   * 0.14.x contains a bug where cwrp isn't called when only context changes.
   * fixed in master, not sure it will make it into any 0.14 release
   */
  componentWillUpdate: function componentWillUpdate(nextProps, _, nextContext) {
    var currentActiveKey = this.getActiveKey();
    var nextActiveKey = this.getActiveKey(nextContext);
    var currentKeyIsStillValid = this.panes.indexOf(currentActiveKey) !== -1;

    if (this.panes.indexOf(this._exitingPane) === -1) {
      this._exitingPane = null;
    }

    if (nextActiveKey !== currentActiveKey && currentKeyIsStillValid) {
      this._exitingPane = currentActiveKey;
    }
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var Component = this.props.componentClass;

    var contentClass = _utilsBootstrapUtils.prefix(this.props, 'content');

    return _react2['default'].createElement(
      Component,
      { className: _classnames2['default'](contentClass, className) },
      children
    );
  },

  handlePaneExited: function handlePaneExited() {
    this._exitingPane = null;
    this.forceUpdate();
  },

  /**
   * This is unfortunately neccessary because the TabContent needs to know if
   * a TabPane is ever going to exit, since it may unmount and just leave the
   * TabContent to wait longingly forever for the handlePaneExited to be called.
   */
  registerPane: function registerPane(eventKey) {
    var _this = this;

    var panes = this.panes;

    !(panes.indexOf(eventKey) === -1) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'You cannot have multiple TabPanes of with the same `eventKey` in the same ' + 'TabContent component. Duplicate eventKey: ' + eventKey) : _invariant2['default'](false) : undefined;

    panes.push(eventKey);

    return function () {
      panes.splice(panes.indexOf(eventKey), 1);

      // #1892
      // new active state can propagate down _before_
      // the tab actually unmounts, so it will map be exiting.
      // since an exiting tab won't complete, clear the bad state
      if (eventKey === _this._exitingPane) {
        _this.handlePaneExited();
      }

      // If the tab was active, we need to tell the container
      // that it no longer exists and as such is not active.
      if (eventKey === _this.getActiveKey()) {
        _this.getContext('$bs_tabcontainer').onSelect();
      }
    };
  },

  getActiveKey: function getActiveKey() {
    var context = arguments.length <= 0 || arguments[0] === undefined ? this.context : arguments[0];

    return this.getContext('$bs_tabcontainer', context).activeKey;
  },

  getContext: function getContext(key) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    return context[key] || {};
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('tab', TabContent);
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./utils/bootstrapUtils":248,"_process":151,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"invariant":79,"react":"react","react-prop-types/lib/elementType":309}],237:[function(require,module,exports){
(function (process){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domHelpersClassAddClass = require('dom-helpers/class/addClass');

var _domHelpersClassAddClass2 = _interopRequireDefault(_domHelpersClassAddClass);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsTabUtils = require('./utils/tabUtils');

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var TabPane = _react2['default'].createClass({
  displayName: 'TabPane',

  propTypes: {

    /**
     * Uniquely identify the TabPane amoung its siblings.
     */
    eventKey: _react.PropTypes.any,

    /**
     * Use animation when showing or hiding TabPanes. Use `false` to disable,
     * `true` to enable the default "Fade" animation or any Transition component.
     *
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]),

    /** @private **/
    id: _react.PropTypes.string,

    /** @private **/
    'aria-labelledby': _react.PropTypes.string,

    /**
     * Transition onEnter callback when animation is not `false`
     */
    onEnter: _react.PropTypes.func,

    /**
     * Transition onEntering callback when animation is not `false`
     */
    onEntering: _react.PropTypes.func,

    /**
     * Transition onEntered callback when animation is not `false`
     */
    onEntered: _react.PropTypes.func,

    /**
     * Transition onExit callback when animation is not `false`
     */
    onExit: _react.PropTypes.func,

    /**
     * Transition onExiting callback when animation is not `false`
     */
    onExiting: _react.PropTypes.func,

    /**
     * Transition onExited callback when animation is not `false`
     */
    onExited: _react.PropTypes.func,

    /**
     * Unmount the tab (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: _react.PropTypes.bool
  },

  contextTypes: {
    $bs_tabcontainer: _react.PropTypes.shape({
      getId: _react.PropTypes.func,
      unmountOnExit: _react.PropTypes.bool
    }),
    $bs_tabcontent: _react.PropTypes.shape({
      bsClass: _react.PropTypes.string,
      animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]),
      activeKey: _react.PropTypes.any,
      onExited: _react.PropTypes.func,
      register: _react.PropTypes.func,
      unmountOnExit: _react.PropTypes.bool
    })
  },

  /**
   * We override the TabContainer context so Navs in TabPanes
   * don't conflict with the top level one.
   */
  childContextTypes: {
    $bs_tabcontainer: _react.PropTypes.oneOf([null])
  },

  componentWillMount: function componentWillMount() {
    this.exited = !this.isActive();
    this.registerWithParent();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.eventKey !== this.props.eventKey) {
      this.unregisterWithParent();
      this.registerWithParent(nextProps, nextContext);
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps, _, nextContext) {
    if (this.isActive(nextProps, nextContext)) {
      this.exited = false;
    } else if (!this.exited && !this.getTransition(nextProps, nextContext)) {
      // Otherwise let handleHidden take care of marking exited.
      this.exited = true;
      this._fireExitedCallback = true;
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this._fireExitedCallback) {
      this._fireExitedCallback = false;
      this.onExited();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unregisterWithParent();
  },

  getChildContext: function getChildContext() {
    return { $bs_tabcontainer: null };
  },

  getTransition: function getTransition() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    context = this.getContext('$bs_tabcontent', context);
    return props.animation != null ? props.animation : context.animation;
  },

  getUnmountOnExit: function getUnmountOnExit() {
    var context = this.getContext('$bs_tabcontent', this.context);
    return this.props.unmountOnExit != null ? this.props.unmountOnExit : context.unmountOnExit;
  },

  isActive: function isActive() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    return this.getContext('$bs_tabcontent', context).activeKey === props.eventKey;
  },

  render: function render() {
    var _classes;

    var active = this.isActive();
    var visible = active || !this.exited;
    var getId = this.getContext('$bs_tabcontainer').getId;
    var bsClass = this.props.bsClass || this.getContext('$bs_tabcontent').bsClass;

    var Transition = this.getTransition();

    if (!visible && !Transition && this.getUnmountOnExit()) {
      return null;
    }

    var classes = (_classes = {
      active: visible
    }, _classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'pane')] = true, _classes);

    var _props = this.props;
    var eventKey = _props.eventKey;
    var id = _props.id;
    var labelledBy = _props['aria-labelledby'];
    var onExit = _props.onExit;
    var onExiting = _props.onExiting;
    var onExited = _props.onExited;
    var onEnter = _props.onEnter;
    var onEntering = _props.onEntering;
    var onEntered = _props.onEntered;

    if (typeof Transition === 'boolean') {
      Transition = Transition ? _Fade2['default'] : null;
    }

    if (getId) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!(id || labelledBy), 'In the context of a TabContainer, TabPanes are given generated `id` and `aria-labelledby` ' + 'attributes for the sake of proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` prop to the parent TabContainer.') : undefined;
      id = getId(eventKey, _utilsTabUtils.PANE) || null;
      labelledBy = getId(eventKey, _utilsTabUtils.TAB) || null;
    }

    var tabPane = _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        id: id,
        role: 'tabpanel',
        'aria-hidden': !visible,
        'aria-labelledby': labelledBy,
        className: _classnames2['default'](this.props.className, classes, { 'in': !Transition })
      }),
      this.props.children
    );

    if (Transition) {
      tabPane = _react2['default'].createElement(
        Transition,
        {
          'in': active,
          onExit: onExit,
          onExiting: onExiting,
          onExited: _utilsCreateChainedFunction2['default'](this.handleExited, onExited),
          onEnter: _utilsCreateChainedFunction2['default'](this.handleEnter, onEnter),
          onEntering: onEntering,
          onEntered: onEntered,
          unmountOnExit: this.getUnmountOnExit()
        },
        tabPane
      );
    }

    return tabPane;
  },

  onExited: function onExited() {
    var context = this.getContext('$bs_tabcontent');
    if (context.onExited) {
      context.onExited(this.props.eventKey);
    }
  },

  handleEnter: function handleEnter(node) {
    // ref: https://github.com/react-bootstrap/react-overlays/issues/40
    if (this.isActive()) {
      _domHelpersClassAddClass2['default'](node, 'active');
      node.offsetWidth; // eslint-disable-line no-unused-expressions
    }
  },

  handleExited: function handleExited() {
    this.exited = true;
    this.onExited();
    this.forceUpdate();
  },

  registerWithParent: function registerWithParent() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    var register = this.getContext('$bs_tabcontent', context).register;

    if (register) {
      this.unregister = register(props.eventKey);
    }
  },

  unregisterWithParent: function unregisterWithParent() {
    if (this.unregister) {
      this.unregister();
    }
  },

  getContext: function getContext(key) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    return context[key] || {};
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('tab', TabPane);
module.exports = exports['default'];
}).call(this,require('_process'))

},{"./Fade":173,"./utils/bootstrapUtils":248,"./utils/createChainedFunction":251,"./utils/tabUtils":254,"_process":151,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"dom-helpers/class/addClass":51,"react":"react","react-prop-types/lib/elementType":309,"warning":321}],238:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Table = _react2['default'].createClass({
  displayName: 'Table',

  propTypes: {
    striped: _react2['default'].PropTypes.bool,
    bordered: _react2['default'].PropTypes.bool,
    condensed: _react2['default'].PropTypes.bool,
    hover: _react2['default'].PropTypes.bool,
    responsive: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bordered: false,
      condensed: false,
      hover: false,
      responsive: false,
      striped: false
    };
  },

  render: function render() {
    var classes = {
      'table': true,
      'table-striped': this.props.striped,
      'table-bordered': this.props.bordered,
      'table-condensed': this.props.condensed,
      'table-hover': this.props.hover
    };
    var table = _react2['default'].createElement(
      'table',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );

    return this.props.responsive ? _react2['default'].createElement(
      'div',
      { className: 'table-responsive' },
      table
    ) : table;
  }
});

exports['default'] = Table;
module.exports = exports['default'];
},{"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],239:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uncontrollable = require('uncontrollable');

var _uncontrollable2 = _interopRequireDefault(_uncontrollable);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Col = require('./Col');

var _Col2 = _interopRequireDefault(_Col);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

var _NavItem = require('./NavItem');

var _NavItem2 = _interopRequireDefault(_NavItem);

var _styleMaps = require('./styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _TabContainer = require('./TabContainer');

var _TabContainer2 = _interopRequireDefault(_TabContainer);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var TabContainer = _TabContainer2['default'].ControlledComponent;

function getDefaultActiveKeyFromChildren(children) {
  var defaultActiveKey = undefined;
  _utilsValidComponentChildren2['default'].forEach(children, function (child) {
    if (defaultActiveKey == null) {
      defaultActiveKey = child.props.eventKey;
    }
  });
  return defaultActiveKey;
}

var Tabs = _react2['default'].createClass({
  displayName: 'Tabs',

  propTypes: {

    /**
     * Mark the Tab with a matching `eventKey` as active.
     *
     * @controllable onSelect
     */
    activeKey: _react2['default'].PropTypes.any,

    /**
     * Navigation style for tabs
     *
     * If not specified, it will be treated as `'tabs'` when vertically
     * positioned and `'pills'` when horizontally positioned.
     */
    bsStyle: _react2['default'].PropTypes.oneOf(['tabs', 'pills']),

    animation: _react2['default'].PropTypes.bool,

    id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

    /**
     * Callback fired when a Tab is selected.
     *
     * ```js
     * function (
     * 	Any eventKey,
     * 	SyntheticEvent event?
     * )
     * ```
     *
     * @controllable activeKey
     */
    onSelect: _react2['default'].PropTypes.func,

    /**
     * Unmount tabs (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: _react2['default'].PropTypes.bool,

    /**
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    position: _react2['default'].PropTypes.oneOf(['top', 'left', 'right']),

    /**
     * Number of grid columns for the tabs if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width.
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    tabWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.object]),
    /**
     * Number of grid columns for the panes if horizontally positioned
     *
     * This accepts either a single width or a mapping of size to width. If not
     * specified, it will be treated as `styleMaps.GRID_COLUMNS` minus
     * `tabWidth`.
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    paneWidth: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.object]),
    /**
     * Render without clearfix if horizontally positioned
     *
     * @deprecated Use TabContainer to create differently shaped tab layouts.
     */
    standalone: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'tab',
      animation: true,
      tabWidth: 2,
      position: 'top',
      standalone: false,
      unmountOnExit: false
    };
  },

  render: function render() {
    var _props = this.props;
    var id = _props.id;
    var className = _props.className;
    var style = _props.style;
    var position = _props.position;
    var bsStyle = _props.bsStyle;
    var tabWidth = _props.tabWidth;
    var paneWidth = _props.paneWidth;
    var standalone = _props.standalone;
    var children = _props.children;
    var onSelect = _props.onSelect;
    var activeKey = _props.activeKey;

    var props = _objectWithoutProperties(_props, ['id', 'className', 'style', 'position', 'bsStyle', 'tabWidth', 'paneWidth', 'standalone', 'children', 'onSelect', 'activeKey']);

    activeKey = this.getActiveKey();

    var isHorizontal = position === 'left' || position === 'right';

    if (bsStyle == null) {
      bsStyle = isHorizontal ? 'pills' : 'tabs';
    }

    var containerProps = { id: id, className: className, style: style, activeKey: activeKey, onSelect: onSelect };

    var tabsProps = _extends({}, props, {
      bsStyle: bsStyle,
      bsClass: undefined,
      stacked: isHorizontal,
      ref: 'tabs',
      role: 'tablist'
    });

    var childTabs = _utilsValidComponentChildren2['default'].map(children, this.renderTab);

    var panesProps = {
      ref: 'panes',
      animation: props.animation,
      unmountOnExit: props.unmountOnExit
    };

    var childPanes = children;

    if (isHorizontal) {
      _utilsDeprecationWarning2['default']({
        message: 'Horizontal Tabs (position "left" or "right") are deprecated in favor ' + 'of the more flexible TabContainer component.'
      });

      if (!standalone) {
        containerProps.className = _classnames2['default'](containerProps.className, 'clearfix');
      }

      var _getColProps = this.getColProps({ tabWidth: tabWidth, paneWidth: paneWidth });

      var tabsColProps = _getColProps.tabsColProps;
      var panesColProps = _getColProps.panesColProps;

      var tabs = _react2['default'].createElement(
        _Col2['default'],
        _extends({ componentClass: _Nav2['default'] }, tabsProps, tabsColProps),
        childTabs
      );
      var panes = _react2['default'].createElement(
        _Col2['default'],
        _extends({ componentClass: _TabContent2['default'] }, panesProps, panesColProps),
        childPanes
      );

      if (position === 'left') {
        return _react2['default'].createElement(
          TabContainer,
          containerProps,
          _react2['default'].createElement(
            'div',
            null,
            tabs,
            panes
          )
        );
      }

      return _react2['default'].createElement(
        TabContainer,
        containerProps,
        _react2['default'].createElement(
          'div',
          null,
          panes,
          tabs
        )
      );
    }

    return _react2['default'].createElement(
      TabContainer,
      containerProps,
      _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(
          _Nav2['default'],
          tabsProps,
          childTabs
        ),
        _react2['default'].createElement(
          _TabContent2['default'],
          panesProps,
          childPanes
        )
      )
    );
  },

  getActiveKey: function getActiveKey() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var activeKey = props.activeKey;
    var children = props.children;

    return activeKey === undefined ? getDefaultActiveKeyFromChildren(children) : activeKey;
  },

  renderPane: function renderPane(child, index) {
    return _react.cloneElement(child, {
      key: child.key ? child.key : index
    });
  },

  renderTab: function renderTab(child) {
    if (child.props.title == null) {
      return null;
    }

    var _child$props = child.props;
    var eventKey = _child$props.eventKey;
    var title = _child$props.title;
    var disabled = _child$props.disabled;
    var tabClassName = _child$props.tabClassName;

    return _react2['default'].createElement(
      _NavItem2['default'],
      {
        eventKey: eventKey,
        disabled: disabled,
        className: tabClassName
      },
      title
    );
  },

  getColProps: function getColProps(_ref) {
    var tabWidth = _ref.tabWidth;
    var paneWidth = _ref.paneWidth;

    var tabsColProps = undefined;
    if (tabWidth instanceof Object) {
      tabsColProps = tabWidth;
    } else {
      tabsColProps = { xs: tabWidth };
    }

    var panesColProps = undefined;
    if (paneWidth == null) {
      panesColProps = {};
      _Object$keys(tabsColProps).forEach(function (size) {
        panesColProps[size] = _styleMaps2['default'].GRID_COLUMNS - tabsColProps[size];
      });
    } else if (paneWidth instanceof Object) {
      panesColProps = paneWidth;
    } else {
      panesColProps = { xs: paneWidth };
    }

    return { tabsColProps: tabsColProps, panesColProps: panesColProps };
  }

});

exports['default'] = _uncontrollable2['default'](Tabs, { activeKey: 'onSelect' });
module.exports = exports['default'];
},{"./Col":166,"./Nav":209,"./NavItem":211,"./TabContainer":235,"./TabContent":236,"./styleMaps":244,"./utils/ValidComponentChildren":247,"./utils/deprecationWarning":252,"babel-runtime/core-js/object/keys":257,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/object-without-properties":264,"classnames":49,"react":"react","react-prop-types/lib/isRequiredForA11y":310,"uncontrollable":319}],240:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var Thumbnail = _react2['default'].createClass({
  displayName: 'Thumbnail',

  propTypes: {
    alt: _react2['default'].PropTypes.string,
    href: _react2['default'].PropTypes.string,
    src: _react2['default'].PropTypes.string
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    if (this.props.href) {
      return _react2['default'].createElement(
        _SafeAnchor2['default'],
        _extends({}, this.props, { href: this.props.href, className: _classnames2['default'](this.props.className, classes) }),
        _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
      );
    }

    if (this.props.children) {
      return _react2['default'].createElement(
        'div',
        _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
        _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt }),
        _react2['default'].createElement(
          'div',
          { className: 'caption' },
          this.props.children
        )
      );
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      _react2['default'].createElement('img', { src: this.props.src, alt: this.props.alt })
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('thumbnail', Thumbnail);
module.exports = exports['default'];
},{"./SafeAnchor":231,"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],241:[function(require,module,exports){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Tooltip = _react2['default'].createClass({
  displayName: 'Tooltip',

  propTypes: {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

    /**
     * Sets the direction the Tooltip is positioned towards.
     */
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Tooltip.
     */
    positionLeft: _react2['default'].PropTypes.number,
    /**
     * The "top" position value for the Tooltip.
     */
    positionTop: _react2['default'].PropTypes.number,
    /**
     * The "left" position value for the Tooltip arrow.
     */
    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * The "top" position value for the Tooltip arrow.
     */
    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * Title text
     */
    title: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'tooltip',
      placement: 'right'
    };
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props)] = true, _classes[this.props.placement] = true, _classes);

    var style = _extends({
      left: this.props.positionLeft,
      top: this.props.positionTop
    }, this.props.style);

    var arrowStyle = {
      left: this.props.arrowOffsetLeft,
      top: this.props.arrowOffsetTop
    };

    return _react2['default'].createElement(
      'div',
      _extends({
        role: 'tooltip'
      }, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        style: style
      }),
      _react2['default'].createElement('div', { className: _utilsBootstrapUtils.prefix(this.props, 'arrow'), style: arrowStyle }),
      _react2['default'].createElement(
        'div',
        { className: _utilsBootstrapUtils.prefix(this.props, 'inner') },
        this.props.children
      )
    );
  }
});

exports['default'] = Tooltip;
module.exports = exports['default'];
},{"./utils/bootstrapUtils":248,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react","react-prop-types/lib/isRequiredForA11y":310}],242:[function(require,module,exports){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Well = (function (_React$Component) {
  _inherits(Well, _React$Component);

  function Well() {
    _classCallCheck(this, _Well);

    _React$Component.apply(this, arguments);
  }

  Well.prototype.render = function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  };

  var _Well = Well;
  Well = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL])(Well) || Well;
  Well = _utilsBootstrapUtils.bsClass('well')(Well) || Well;
  return Well;
})(_react2['default'].Component);

exports['default'] = Well;
module.exports = exports['default'];
},{"./styleMaps":244,"./utils/bootstrapUtils":248,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"classnames":49,"react":"react"}],243:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _Accordion2 = require('./Accordion');

var _Accordion3 = _interopRequireDefault(_Accordion2);

exports.Accordion = _Accordion3['default'];

var _Alert2 = require('./Alert');

var _Alert3 = _interopRequireDefault(_Alert2);

exports.Alert = _Alert3['default'];

var _Badge2 = require('./Badge');

var _Badge3 = _interopRequireDefault(_Badge2);

exports.Badge = _Badge3['default'];

var _Breadcrumb2 = require('./Breadcrumb');

var _Breadcrumb3 = _interopRequireDefault(_Breadcrumb2);

exports.Breadcrumb = _Breadcrumb3['default'];

var _BreadcrumbItem2 = require('./BreadcrumbItem');

var _BreadcrumbItem3 = _interopRequireDefault(_BreadcrumbItem2);

exports.BreadcrumbItem = _BreadcrumbItem3['default'];

var _Button2 = require('./Button');

var _Button3 = _interopRequireDefault(_Button2);

exports.Button = _Button3['default'];

var _ButtonGroup2 = require('./ButtonGroup');

var _ButtonGroup3 = _interopRequireDefault(_ButtonGroup2);

exports.ButtonGroup = _ButtonGroup3['default'];

var _ButtonInput2 = require('./ButtonInput');

var _ButtonInput3 = _interopRequireDefault(_ButtonInput2);

exports.ButtonInput = _ButtonInput3['default'];

var _ButtonToolbar2 = require('./ButtonToolbar');

var _ButtonToolbar3 = _interopRequireDefault(_ButtonToolbar2);

exports.ButtonToolbar = _ButtonToolbar3['default'];

var _Carousel2 = require('./Carousel');

var _Carousel3 = _interopRequireDefault(_Carousel2);

exports.Carousel = _Carousel3['default'];

var _CarouselItem2 = require('./CarouselItem');

var _CarouselItem3 = _interopRequireDefault(_CarouselItem2);

exports.CarouselItem = _CarouselItem3['default'];

var _Checkbox2 = require('./Checkbox');

var _Checkbox3 = _interopRequireDefault(_Checkbox2);

exports.Checkbox = _Checkbox3['default'];

var _Clearfix2 = require('./Clearfix');

var _Clearfix3 = _interopRequireDefault(_Clearfix2);

exports.Clearfix = _Clearfix3['default'];

var _ControlLabel2 = require('./ControlLabel');

var _ControlLabel3 = _interopRequireDefault(_ControlLabel2);

exports.ControlLabel = _ControlLabel3['default'];

var _Col2 = require('./Col');

var _Col3 = _interopRequireDefault(_Col2);

exports.Col = _Col3['default'];

var _Collapse2 = require('./Collapse');

var _Collapse3 = _interopRequireDefault(_Collapse2);

exports.Collapse = _Collapse3['default'];

var _Dropdown2 = require('./Dropdown');

var _Dropdown3 = _interopRequireDefault(_Dropdown2);

exports.Dropdown = _Dropdown3['default'];

var _DropdownButton2 = require('./DropdownButton');

var _DropdownButton3 = _interopRequireDefault(_DropdownButton2);

exports.DropdownButton = _DropdownButton3['default'];

var _Fade2 = require('./Fade');

var _Fade3 = _interopRequireDefault(_Fade2);

exports.Fade = _Fade3['default'];

var _Form2 = require('./Form');

var _Form3 = _interopRequireDefault(_Form2);

exports.Form = _Form3['default'];

var _FormControl2 = require('./FormControl');

var _FormControl3 = _interopRequireDefault(_FormControl2);

exports.FormControl = _FormControl3['default'];

var _FormGroup2 = require('./FormGroup');

var _FormGroup3 = _interopRequireDefault(_FormGroup2);

exports.FormGroup = _FormGroup3['default'];

var _Glyphicon2 = require('./Glyphicon');

var _Glyphicon3 = _interopRequireDefault(_Glyphicon2);

exports.Glyphicon = _Glyphicon3['default'];

var _Grid2 = require('./Grid');

var _Grid3 = _interopRequireDefault(_Grid2);

exports.Grid = _Grid3['default'];

var _HelpBlock2 = require('./HelpBlock');

var _HelpBlock3 = _interopRequireDefault(_HelpBlock2);

exports.HelpBlock = _HelpBlock3['default'];

var _Image2 = require('./Image');

var _Image3 = _interopRequireDefault(_Image2);

exports.Image = _Image3['default'];

var _Input2 = require('./Input');

var _Input3 = _interopRequireDefault(_Input2);

exports.Input = _Input3['default'];

var _InputGroup2 = require('./InputGroup');

var _InputGroup3 = _interopRequireDefault(_InputGroup2);

exports.InputGroup = _InputGroup3['default'];

var _Interpolate2 = require('./Interpolate');

var _Interpolate3 = _interopRequireDefault(_Interpolate2);

exports.Interpolate = _Interpolate3['default'];

var _Jumbotron2 = require('./Jumbotron');

var _Jumbotron3 = _interopRequireDefault(_Jumbotron2);

exports.Jumbotron = _Jumbotron3['default'];

var _Label2 = require('./Label');

var _Label3 = _interopRequireDefault(_Label2);

exports.Label = _Label3['default'];

var _ListGroup2 = require('./ListGroup');

var _ListGroup3 = _interopRequireDefault(_ListGroup2);

exports.ListGroup = _ListGroup3['default'];

var _ListGroupItem2 = require('./ListGroupItem');

var _ListGroupItem3 = _interopRequireDefault(_ListGroupItem2);

exports.ListGroupItem = _ListGroupItem3['default'];

var _Media2 = require('./Media');

var _Media3 = _interopRequireDefault(_Media2);

exports.Media = _Media3['default'];

var _MenuItem2 = require('./MenuItem');

var _MenuItem3 = _interopRequireDefault(_MenuItem2);

exports.MenuItem = _MenuItem3['default'];

var _Modal2 = require('./Modal');

var _Modal3 = _interopRequireDefault(_Modal2);

exports.Modal = _Modal3['default'];

var _ModalBody2 = require('./ModalBody');

var _ModalBody3 = _interopRequireDefault(_ModalBody2);

exports.ModalBody = _ModalBody3['default'];

var _ModalFooter2 = require('./ModalFooter');

var _ModalFooter3 = _interopRequireDefault(_ModalFooter2);

exports.ModalFooter = _ModalFooter3['default'];

var _ModalHeader2 = require('./ModalHeader');

var _ModalHeader3 = _interopRequireDefault(_ModalHeader2);

exports.ModalHeader = _ModalHeader3['default'];

var _ModalTitle2 = require('./ModalTitle');

var _ModalTitle3 = _interopRequireDefault(_ModalTitle2);

exports.ModalTitle = _ModalTitle3['default'];

var _Nav2 = require('./Nav');

var _Nav3 = _interopRequireDefault(_Nav2);

exports.Nav = _Nav3['default'];

var _Navbar2 = require('./Navbar');

var _Navbar3 = _interopRequireDefault(_Navbar2);

exports.Navbar = _Navbar3['default'];

var _NavbarBrand2 = require('./NavbarBrand');

var _NavbarBrand3 = _interopRequireDefault(_NavbarBrand2);

exports.NavbarBrand = _NavbarBrand3['default'];

var _NavDropdown2 = require('./NavDropdown');

var _NavDropdown3 = _interopRequireDefault(_NavDropdown2);

exports.NavDropdown = _NavDropdown3['default'];

var _NavItem2 = require('./NavItem');

var _NavItem3 = _interopRequireDefault(_NavItem2);

exports.NavItem = _NavItem3['default'];

var _Overlay2 = require('./Overlay');

var _Overlay3 = _interopRequireDefault(_Overlay2);

exports.Overlay = _Overlay3['default'];

var _OverlayTrigger2 = require('./OverlayTrigger');

var _OverlayTrigger3 = _interopRequireDefault(_OverlayTrigger2);

exports.OverlayTrigger = _OverlayTrigger3['default'];

var _PageHeader2 = require('./PageHeader');

var _PageHeader3 = _interopRequireDefault(_PageHeader2);

exports.PageHeader = _PageHeader3['default'];

var _PageItem2 = require('./PageItem');

var _PageItem3 = _interopRequireDefault(_PageItem2);

exports.PageItem = _PageItem3['default'];

var _Pager2 = require('./Pager');

var _Pager3 = _interopRequireDefault(_Pager2);

exports.Pager = _Pager3['default'];

var _Pagination2 = require('./Pagination');

var _Pagination3 = _interopRequireDefault(_Pagination2);

exports.Pagination = _Pagination3['default'];

var _Panel2 = require('./Panel');

var _Panel3 = _interopRequireDefault(_Panel2);

exports.Panel = _Panel3['default'];

var _PanelGroup2 = require('./PanelGroup');

var _PanelGroup3 = _interopRequireDefault(_PanelGroup2);

exports.PanelGroup = _PanelGroup3['default'];

var _Popover2 = require('./Popover');

var _Popover3 = _interopRequireDefault(_Popover2);

exports.Popover = _Popover3['default'];

var _ProgressBar2 = require('./ProgressBar');

var _ProgressBar3 = _interopRequireDefault(_ProgressBar2);

exports.ProgressBar = _ProgressBar3['default'];

var _Radio2 = require('./Radio');

var _Radio3 = _interopRequireDefault(_Radio2);

exports.Radio = _Radio3['default'];

var _ResponsiveEmbed2 = require('./ResponsiveEmbed');

var _ResponsiveEmbed3 = _interopRequireDefault(_ResponsiveEmbed2);

exports.ResponsiveEmbed = _ResponsiveEmbed3['default'];

var _Row2 = require('./Row');

var _Row3 = _interopRequireDefault(_Row2);

exports.Row = _Row3['default'];

var _SafeAnchor2 = require('./SafeAnchor');

var _SafeAnchor3 = _interopRequireDefault(_SafeAnchor2);

exports.SafeAnchor = _SafeAnchor3['default'];

var _SplitButton2 = require('./SplitButton');

var _SplitButton3 = _interopRequireDefault(_SplitButton2);

exports.SplitButton = _SplitButton3['default'];

var _Tab2 = require('./Tab');

var _Tab3 = _interopRequireDefault(_Tab2);

exports.Tab = _Tab3['default'];

var _TabContainer2 = require('./TabContainer');

var _TabContainer3 = _interopRequireDefault(_TabContainer2);

exports.TabContainer = _TabContainer3['default'];

var _TabContent2 = require('./TabContent');

var _TabContent3 = _interopRequireDefault(_TabContent2);

exports.TabContent = _TabContent3['default'];

var _Table2 = require('./Table');

var _Table3 = _interopRequireDefault(_Table2);

exports.Table = _Table3['default'];

var _TabPane2 = require('./TabPane');

var _TabPane3 = _interopRequireDefault(_TabPane2);

exports.TabPane = _TabPane3['default'];

var _Tabs2 = require('./Tabs');

var _Tabs3 = _interopRequireDefault(_Tabs2);

exports.Tabs = _Tabs3['default'];

var _Thumbnail2 = require('./Thumbnail');

var _Thumbnail3 = _interopRequireDefault(_Thumbnail2);

exports.Thumbnail = _Thumbnail3['default'];

var _Tooltip2 = require('./Tooltip');

var _Tooltip3 = _interopRequireDefault(_Tooltip2);

exports.Tooltip = _Tooltip3['default'];

var _Well2 = require('./Well');

var _Well3 = _interopRequireDefault(_Well2);

exports.Well = _Well3['default'];

var _FormControls2 = require('./FormControls');

var _FormControls = _interopRequireWildcard(_FormControls2);

exports.FormControls = _FormControls;

var _utils2 = require('./utils');

var _utils = _interopRequireWildcard(_utils2);

exports.utils = _utils;
},{"./Accordion":152,"./Alert":153,"./Badge":154,"./Breadcrumb":155,"./BreadcrumbItem":156,"./Button":157,"./ButtonGroup":158,"./ButtonInput":159,"./ButtonToolbar":160,"./Carousel":161,"./CarouselItem":163,"./Checkbox":164,"./Clearfix":165,"./Col":166,"./Collapse":167,"./ControlLabel":168,"./Dropdown":169,"./DropdownButton":170,"./Fade":173,"./Form":174,"./FormControl":175,"./FormControls":179,"./FormGroup":180,"./Glyphicon":181,"./Grid":182,"./HelpBlock":183,"./Image":184,"./Input":185,"./InputGroup":187,"./Interpolate":190,"./Jumbotron":191,"./Label":192,"./ListGroup":193,"./ListGroupItem":194,"./Media":195,"./MenuItem":202,"./Modal":203,"./ModalBody":204,"./ModalFooter":206,"./ModalHeader":207,"./ModalTitle":208,"./Nav":209,"./NavDropdown":210,"./NavItem":211,"./Navbar":212,"./NavbarBrand":213,"./Overlay":217,"./OverlayTrigger":218,"./PageHeader":219,"./PageItem":220,"./Pager":221,"./Pagination":222,"./Panel":224,"./PanelGroup":225,"./Popover":226,"./ProgressBar":227,"./Radio":228,"./ResponsiveEmbed":229,"./Row":230,"./SafeAnchor":231,"./SplitButton":232,"./Tab":234,"./TabContainer":235,"./TabContent":236,"./TabPane":237,"./Table":238,"./Tabs":239,"./Thumbnail":240,"./Tooltip":241,"./Well":242,"./utils":253,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/interop-require-wildcard":263}],244:[function(require,module,exports){
'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

exports.__esModule = true;

var constant = function constant(obj) {
  return _Object$assign(_Object$create({
    values: function values() {
      var _this = this;

      return _Object$keys(this).map(function (k) {
        return _this[k];
      });
    }
  }), obj);
};

var styleMaps = {

  SIZES: {
    'large': 'lg',
    'medium': 'md',
    'small': 'sm',
    'xsmall': 'xs',
    'lg': 'lg',
    'md': 'md',
    'sm': 'sm',
    'xs': 'xs'
  },
  GRID_COLUMNS: 12
};

var Sizes = constant({
  LARGE: 'large',
  MEDIUM: 'medium',
  SMALL: 'small',
  XSMALL: 'xsmall'
});

exports.Sizes = Sizes;
var State = constant({
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
});

exports.State = State;
var DEFAULT = 'default';
exports.DEFAULT = DEFAULT;
var PRIMARY = 'primary';
exports.PRIMARY = PRIMARY;
var LINK = 'link';
exports.LINK = LINK;
var INVERSE = 'inverse';

exports.INVERSE = INVERSE;
exports['default'] = styleMaps;
},{"babel-runtime/core-js/object/assign":255,"babel-runtime/core-js/object/create":256,"babel-runtime/core-js/object/keys":257}],245:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _reactPropTypesLibCommon = require('react-prop-types/lib/common');

var _childrenToArray = require('./childrenToArray');

var _childrenToArray2 = _interopRequireDefault(_childrenToArray);

exports['default'] = {

  requiredRoles: function requiredRoles() {
    for (var _len = arguments.length, roles = Array(_len), _key = 0; _key < _len; _key++) {
      roles[_key] = arguments[_key];
    }

    return _reactPropTypesLibCommon.createChainableTypeChecker(function requiredRolesValidator(props, propName, component) {
      var missing = undefined;
      var children = _childrenToArray2['default'](props.children);

      var inRole = function inRole(role, child) {
        return role === child.props.bsRole;
      };

      roles.every(function (role) {
        if (!children.some(function (child) {
          return inRole(role, child);
        })) {
          missing = role;
          return false;
        }
        return true;
      });

      if (missing) {
        return new Error('(children) ' + component + ' - Missing a required child with bsRole: ' + missing + '. ' + (component + ' must have at least one child of each of the following bsRoles: ' + roles.join(', ')));
      }
    });
  },

  exclusiveRoles: function exclusiveRoles() {
    for (var _len2 = arguments.length, roles = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      roles[_key2] = arguments[_key2];
    }

    return _reactPropTypesLibCommon.createChainableTypeChecker(function exclusiveRolesValidator(props, propName, component) {
      var children = _childrenToArray2['default'](props.children);
      var duplicate = undefined;

      roles.every(function (role) {
        var childrenWithRole = children.filter(function (child) {
          return child.props.bsRole === role;
        });

        if (childrenWithRole.length > 1) {
          duplicate = role;
          return false;
        }
        return true;
      });

      if (duplicate) {
        return new Error('(children) ' + component + ' - Duplicate children detected of bsRole: ' + duplicate + '. ' + ('Only one child each allowed with the following bsRoles: ' + roles.join(', ')));
      }
    });
  }
};
module.exports = exports['default'];
},{"./childrenToArray":249,"babel-runtime/helpers/interop-require-default":262,"react-prop-types/lib/common":307}],246:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This file contains a modified version of:
 * https://github.com/facebook/react/blob/v0.12.0/src/addons/transitions/ReactTransitionEvents.js
 *
 * This source code is licensed under the BSD-style license found here:
 * https://github.com/facebook/react/blob/v0.12.0/LICENSE
 * An additional grant of patent rights can be found here:
 * https://github.com/facebook/react/blob/v0.12.0/PATENTS
 */

'use strict';

exports.__esModule = true;
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    // eslint-disable-line guard-for-in
    var baseEvents = EVENT_NAME_MAP[baseEventName];
    for (var styleName in baseEvents) {
      if (styleName in style) {
        endEvents.push(baseEvents[styleName]);
        break;
      }
    }
  }
}

if (canUseDOM) {
  detectEvents();
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var ReactTransitionEvents = {
  addEndEventListener: function addEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function (endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },

  removeEndEventListener: function removeEndEventListener(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function (endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

exports['default'] = ReactTransitionEvents;
module.exports = exports['default'];
},{}],247:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

// FIXME: This should really be ValidElementChildren.

/**
 * Iterates through children that are typically specified as `props.children`,
 * but only maps over children that are "valid components".
 *
 * The mapFunction provided index will be normalised to the components mapped,
 * so an invalid component would not increase the index.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for func.
 * @return {object} Object containing the ordered map of results.
 */
function map(children, func, context) {
  var index = 0;

  return _react2['default'].Children.map(children, function (child) {
    if (!_react2['default'].isValidElement(child)) {
      return child;
    }

    return func.call(context, child, index++);
  });
}

/**
 * Iterates through children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for context.
 */
function forEach(children, func, context) {
  var index = 0;

  _react2['default'].Children.forEach(children, function (child) {
    if (!_react2['default'].isValidElement(child)) {
      return;
    }

    func.call(context, child, index++);
  });
}

/**
 * Count the number of "valid components" in the Children container.
 *
 * @param {?*} children Children tree container.
 * @returns {number}
 */
function count(children) {
  var result = 0;

  _react2['default'].Children.forEach(children, function (child) {
    if (!_react2['default'].isValidElement(child)) {
      return;
    }

    ++result;
  });

  return result;
}

/**
 * Finds children that are typically specified as `props.children`,
 * but only iterates over children that are "valid components".
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child with the index reflecting the position relative to "valid components".
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func.
 * @param {*} context Context for func.
 * @returns {array} of children that meet the func return statement
 */
function filter(children, func, context) {
  var index = 0;
  var result = [];

  _react2['default'].Children.forEach(children, function (child) {
    if (!_react2['default'].isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result.push(child);
    }
  });

  return result;
}

function find(children, func, context) {
  var index = 0;
  var result = undefined;

  _react2['default'].Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    if (!_react2['default'].isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result = child;
    }
  });

  return result;
}

function some(children, func, context) {
  var index = 0;
  var result = false;

  _react2['default'].Children.forEach(children, function (child) {
    if (result) {
      return;
    }
    if (!_react2['default'].isValidElement(child)) {
      return;
    }

    if (func.call(context, child, index++)) {
      result = true;
    }
  });

  return result;
}

exports['default'] = {
  map: map,
  forEach: forEach,
  count: count,
  find: find,
  filter: filter,
  some: some
};
module.exports = exports['default'];
},{"babel-runtime/helpers/interop-require-default":262,"react":"react"}],248:[function(require,module,exports){
(function (process){
'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.prefix = prefix;
exports.getClassSet = getClassSet;
exports.addStyle = addStyle;

var _react = require('react');

var _styleMaps = require('../styleMaps');

var _styleMaps2 = _interopRequireDefault(_styleMaps);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function curry(fn) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var last = args[args.length - 1];
    if (typeof last === 'function') {
      return fn.apply(undefined, args);
    }
    return function (Component) {
      return fn.apply(undefined, args.concat([Component]));
    };
  };
}

function prefix(props, variant) {
  if (props === undefined) props = {};

  !(props.bsClass || '').trim() ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'A `bsClass` prop is required for this component') : _invariant2['default'](false) : undefined;
  return props.bsClass + (variant ? '-' + variant : '');
}

var bsClass = curry(function (defaultClass, Component) {
  var propTypes = Component.propTypes || (Component.propTypes = {});
  var defaultProps = Component.defaultProps || (Component.defaultProps = {});

  propTypes.bsClass = _react.PropTypes.string;
  defaultProps.bsClass = defaultClass;

  return Component;
});

exports.bsClass = bsClass;
var bsStyles = curry(function (styles, defaultStyle, Component) {
  if (typeof defaultStyle !== 'string') {
    Component = defaultStyle;
    defaultStyle = undefined;
  }

  var existing = Component.STYLES || [];
  var propTypes = Component.propTypes || {};

  styles.forEach(function (style) {
    if (existing.indexOf(style) === -1) {
      existing.push(style);
    }
  });

  var propType = _react.PropTypes.oneOf(existing);

  // expose the values on the propType function for documentation
  Component.STYLES = propType._values = existing;

  Component.propTypes = _extends({}, propTypes, {
    bsStyle: propType
  });

  if (defaultStyle !== undefined) {
    var defaultProps = Component.defaultProps || (Component.defaultProps = {});
    defaultProps.bsStyle = defaultStyle;
  }

  return Component;
});

exports.bsStyles = bsStyles;
var bsSizes = curry(function (sizes, defaultSize, Component) {
  if (typeof defaultSize !== 'string') {
    Component = defaultSize;
    defaultSize = undefined;
  }

  var existing = Component.SIZES || [];
  var propTypes = Component.propTypes || {};

  sizes.forEach(function (size) {
    if (existing.indexOf(size) === -1) {
      existing.push(size);
    }
  });

  var values = [];
  existing.forEach(function (size) {
    var mappedSize = _styleMaps2['default'].SIZES[size];
    if (mappedSize && mappedSize !== size) {
      values.push(mappedSize);
    }

    values.push(size);
  });

  var propType = _react.PropTypes.oneOf(values);
  propType._values = values;

  // expose the values on the propType function for documentation
  Component.SIZES = existing;

  Component.propTypes = _extends({}, propTypes, {
    bsSize: propType
  });

  if (defaultSize !== undefined) {
    if (!Component.defaultProps) {
      Component.defaultProps = {};
    }
    Component.defaultProps.bsSize = defaultSize;
  }

  return Component;
});

exports.bsSizes = bsSizes;

function getClassSet(props) {
  var _classes;

  var classes = (_classes = {}, _classes[prefix(props)] = true, _classes);

  if (props.bsSize) {
    var bsSize = _styleMaps2['default'].SIZES[props.bsSize] || bsSize;
    classes[prefix(props, bsSize)] = true;
  }

  if (props.bsStyle) {
    classes[prefix(props, props.bsStyle)] = true;
  }

  return classes;
}

/**
 * Add a style variant to a Component. Mutates the propTypes of the component
 * in order to validate the new variant.
 */

function addStyle(Component) {
  for (var _len2 = arguments.length, styleVariant = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    styleVariant[_key2 - 1] = arguments[_key2];
  }

  bsStyles(styleVariant, Component);
}

var _curry = curry;
exports._curry = _curry;
}).call(this,require('_process'))

},{"../styleMaps":244,"_process":151,"babel-runtime/helpers/extends":260,"babel-runtime/helpers/interop-require-default":262,"invariant":79,"react":"react"}],249:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = childrenAsArray;

var _ValidComponentChildren = require('./ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

function childrenAsArray(children) {
  var result = [];

  if (children === undefined) {
    return result;
  }

  _ValidComponentChildren2['default'].forEach(children, function (child) {
    result.push(child);
  });

  return result;
}

module.exports = exports['default'];
},{"./ValidComponentChildren":247,"babel-runtime/helpers/interop-require-default":262}],250:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = valueValidation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibSinglePropFrom = require('react-prop-types/lib/singlePropFrom');

var _reactPropTypesLibSinglePropFrom2 = _interopRequireDefault(_reactPropTypesLibSinglePropFrom);

function valueValidation(props, propName, componentName) {
  var error = _reactPropTypesLibSinglePropFrom2['default']('children', 'value')(props, propName, componentName);

  if (!error) {
    error = _react2['default'].PropTypes.node(props, propName, componentName);
  }

  return error;
}

module.exports = exports['default'];
},{"babel-runtime/helpers/interop-require-default":262,"react":"react","react-prop-types/lib/singlePropFrom":311}],251:[function(require,module,exports){
/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} functions to chain
 * @returns {function|null}
 */
'use strict';

exports.__esModule = true;
function createChainedFunction() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  return funcs.filter(function (f) {
    return f != null;
  }).reduce(function (acc, f) {
    if (typeof f !== 'function') {
      throw new Error('Invalid Argument Type, must only provide functions, undefined, or null.');
    }

    if (acc === null) {
      return f;
    }

    return function chainedFunction() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      acc.apply(this, args);
      f.apply(this, args);
    };
  }, null);
}

exports['default'] = createChainedFunction;
module.exports = exports['default'];
},{}],252:[function(require,module,exports){
(function (process){
'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports._resetWarned = _resetWarned;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var warned = {};

function deprecationWarning(oldname, newname, link) {
  var message = undefined;

  if (typeof oldname === 'object') {
    message = oldname.message;
  } else {
    message = oldname + ' is deprecated. Use ' + newname + ' instead.';

    if (link) {
      message += '\nYou can read more about it at ' + link;
    }
  }

  if (warned[message]) {
    return;
  }

  process.env.NODE_ENV !== 'production' ? _warning2['default'](false, message) : undefined;
  warned[message] = true;
}

deprecationWarning.wrapper = function (Component) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return (function (_Component) {
    _inherits(DeprecatedComponent, _Component);

    function DeprecatedComponent() {
      _classCallCheck(this, DeprecatedComponent);

      _Component.apply(this, arguments);
    }

    DeprecatedComponent.prototype.componentWillMount = function componentWillMount() {
      deprecationWarning.apply(undefined, args);

      if (_Component.prototype.componentWillMount) {
        var _Component$prototype$componentWillMount;

        for (var _len2 = arguments.length, methodArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          methodArgs[_key2] = arguments[_key2];
        }

        (_Component$prototype$componentWillMount = _Component.prototype.componentWillMount).call.apply(_Component$prototype$componentWillMount, [this].concat(methodArgs));
      }
    };

    return DeprecatedComponent;
  })(Component);
};

exports['default'] = deprecationWarning;

function _resetWarned() {
  warned = {};
}
}).call(this,require('_process'))

},{"_process":151,"babel-runtime/helpers/class-call-check":259,"babel-runtime/helpers/inherits":261,"babel-runtime/helpers/interop-require-default":262,"warning":321}],253:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _bootstrapUtils2 = require('./bootstrapUtils');

var _bootstrapUtils = _interopRequireWildcard(_bootstrapUtils2);

exports.bootstrapUtils = _bootstrapUtils;

var _childrenValueInputValidation2 = require('./childrenValueInputValidation');

var _childrenValueInputValidation3 = _interopRequireDefault(_childrenValueInputValidation2);

exports.childrenValueInputValidation = _childrenValueInputValidation3['default'];

var _createChainedFunction2 = require('./createChainedFunction');

var _createChainedFunction3 = _interopRequireDefault(_createChainedFunction2);

exports.createChainedFunction = _createChainedFunction3['default'];

var _ValidComponentChildren2 = require('./ValidComponentChildren');

var _ValidComponentChildren3 = _interopRequireDefault(_ValidComponentChildren2);

exports.ValidComponentChildren = _ValidComponentChildren3['default'];
},{"./ValidComponentChildren":247,"./bootstrapUtils":248,"./childrenValueInputValidation":250,"./createChainedFunction":251,"babel-runtime/helpers/interop-require-default":262,"babel-runtime/helpers/interop-require-wildcard":263}],254:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.nextEnabled = nextEnabled;

var _ValidComponentChildren = require('./ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

var findChild = _ValidComponentChildren2['default'].find;

var TAB = 'tab';
exports.TAB = TAB;
var PANE = 'pane';

exports.PANE = PANE;

function nextEnabled(children, currentKey, keys, moveNext) {
  var lastIdx = keys.length - 1;
  var stopAt = keys[moveNext ? Math.max(lastIdx, 0) : 0];
  var nextKey = currentKey;

  function getNext() {
    var idx = keys.indexOf(nextKey);
    nextKey = moveNext ? keys[Math.min(lastIdx, idx + 1)] : keys[Math.max(0, idx - 1)];

    return findChild(children, function (_child) {
      return _child.props.eventKey === nextKey;
    });
  }

  var next = getNext();

  while (next.props.eventKey !== stopAt && next.props.disabled) {
    next = getNext();
  }

  return next.props.disabled ? currentKey : next.props.eventKey;
}
},{"./ValidComponentChildren":247,"babel-runtime/helpers/interop-require-default":262}],255:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":265}],256:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":266}],257:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":267}],258:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":268}],259:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],260:[function(require,module,exports){
"use strict";

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports["default"] = _Object$assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/assign":255}],261:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":256,"babel-runtime/core-js/object/set-prototype-of":258}],262:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],263:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],264:[function(require,module,exports){
"use strict";

exports["default"] = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

exports.__esModule = true;
},{}],265:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":272,"../../modules/es6.object.assign":285}],266:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":280}],267:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":272,"../../modules/es6.object.keys":286}],268:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":272,"../../modules/es6.object.set-prototype-of":287}],269:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],270:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":279}],271:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],272:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],273:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":269}],274:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],275:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":272,"./$.ctx":273,"./$.global":277}],276:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],277:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],278:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":271}],279:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],280:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],281:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":280,"./$.fails":276,"./$.iobject":278,"./$.to-object":284}],282:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":272,"./$.export":275,"./$.fails":276}],283:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":280,"./$.an-object":270,"./$.ctx":273,"./$.is-object":279}],284:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":274}],285:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":275,"./$.object-assign":281}],286:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":282,"./$.to-object":284}],287:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":275,"./$.set-proto":283}],288:[function(require,module,exports){
/*eslint-disable react/prop-types */
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _reactPropTypesLibMountable = require('react-prop-types/lib/mountable');

var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _ModalManager = require('./ModalManager');

var _ModalManager2 = _interopRequireDefault(_ModalManager);

var _utilsOwnerDocument = require('./utils/ownerDocument');

var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);

var _utilsAddEventListener = require('./utils/addEventListener');

var _utilsAddEventListener2 = _interopRequireDefault(_utilsAddEventListener);

var _utilsAddFocusListener = require('./utils/addFocusListener');

var _utilsAddFocusListener2 = _interopRequireDefault(_utilsAddFocusListener);

var _domHelpersUtilInDOM = require('dom-helpers/util/inDOM');

var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var _utilsGetContainer = require('./utils/getContainer');

var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);

var modalManager = new _ModalManager2['default']();

/**
 * Love them or hate them, `<Modal/>` provides a solid foundation for creating dialogs, lightboxes, or whatever else.
 * The Modal component renders its `children` node in front of a backdrop component.
 *
 * The Modal offers a few helpful features over using just a `<Portal/>` component and some styles:
 *
 * - Manages dialog stacking when one-at-a-time just isn't enough.
 * - Creates a backdrop, for disabling interaction below the modal.
 * - It properly manages focus; moving to the modal content, and keeping it there until the modal is closed.
 * - It disables scrolling of the page content while open.
 * - Adds the appropriate ARIA roles are automatically.
 * - Easily pluggable animations via a `<Transition/>` component.
 *
 * Note that, in the same way the backdrop element prevents users from clicking or interacting
 * with the page content underneath the Modal, Screen readers also need to be signaled to not to
 * interact with page content while the Modal is open. To do this, we use a common technique of applying
 * the `aria-hidden='true'` attribute to the non-Modal elements in the Modal `container`. This means that for
 * a Modal to be truly modal, it should have a `container` that is _outside_ your app's
 * React hierarchy (such as the default: document.body).
 */
var Modal = _react2['default'].createClass({
  displayName: 'Modal',

  propTypes: _extends({}, _Portal2['default'].propTypes, {

    /**
     * Set the visibility of the Modal
     */
    show: _react2['default'].PropTypes.bool,

    /**
     * A Node, Component instance, or function that returns either. The Modal is appended to it's container element.
     *
     * For the sake of assistive technologies, the container should usually be the document body, so that the rest of the
     * page content can be placed behind a virtual backdrop as well as a visual one.
     */
    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func]),

    /**
     * A callback fired when the Modal is opening.
     */
    onShow: _react2['default'].PropTypes.func,

    /**
     * A callback fired when either the backdrop is clicked, or the escape key is pressed.
     *
     * The `onHide` callback only signals intent from the Modal,
     * you must actually set the `show` prop to `false` for the Modal to close.
     */
    onHide: _react2['default'].PropTypes.func,

    /**
     * Include a backdrop component.
     */
    backdrop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.bool, _react2['default'].PropTypes.oneOf(['static'])]),

    /**
     * A callback fired when the escape key, if specified in `keyboard`, is pressed.
     */
    onEscapeKeyUp: _react2['default'].PropTypes.func,

    /**
     * A callback fired when the backdrop, if specified, is clicked.
     */
    onBackdropClick: _react2['default'].PropTypes.func,

    /**
     * A style object for the backdrop component.
     */
    backdropStyle: _react2['default'].PropTypes.object,

    /**
     * A css class or classes for the backdrop component.
     */
    backdropClassName: _react2['default'].PropTypes.string,

    /**
     * A css class or set of classes applied to the modal container when the modal is open,
     * and removed when it is closed.
     */
    containerClassName: _react2['default'].PropTypes.string,

    /**
     * Close the modal when escape key is pressed
     */
    keyboard: _react2['default'].PropTypes.bool,

    /**
     * A `<Transition/>` component to use for the dialog and backdrop components.
     */
    transition: _reactPropTypesLibElementType2['default'],

    /**
     * The `timeout` of the dialog transition if specified. This number is used to ensure that
     * transition callbacks are always fired, even if browser transition events are canceled.
     *
     * See the Transition `timeout` prop for more infomation.
     */
    dialogTransitionTimeout: _react2['default'].PropTypes.number,

    /**
     * The `timeout` of the backdrop transition if specified. This number is used to
     * ensure that transition callbacks are always fired, even if browser transition events are canceled.
     *
     * See the Transition `timeout` prop for more infomation.
     */
    backdropTransitionTimeout: _react2['default'].PropTypes.number,

    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and
     * replace it to the last focused element when it closes. This also
     * works correctly with any Modal children that have the `autoFocus` prop.
     *
     * Generally this should never be set to `false` as it makes the Modal less
     * accessible to assistive technologies, like screen readers.
     */
    autoFocus: _react2['default'].PropTypes.bool,

    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     *
     * Generally this should never be set to `false` as it makes the Modal less
     * accessible to assistive technologies, like screen readers.
     */
    enforceFocus: _react2['default'].PropTypes.bool,

    /**
     * Callback fired before the Modal transitions in
     */
    onEnter: _react2['default'].PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition in
     */
    onEntering: _react2['default'].PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning in
     */
    onEntered: _react2['default'].PropTypes.func,

    /**
     * Callback fired right before the Modal transitions out
     */
    onExit: _react2['default'].PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition out
     */
    onExiting: _react2['default'].PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: _react2['default'].PropTypes.func

  }),

  getDefaultProps: function getDefaultProps() {
    var noop = function noop() {};

    return {
      show: false,
      backdrop: true,
      keyboard: true,
      autoFocus: true,
      enforceFocus: true,
      onHide: noop
    };
  },

  getInitialState: function getInitialState() {
    return { exited: !this.props.show };
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;
    var Transition = _props.transition;
    var backdrop = _props.backdrop;
    var dialogTransitionTimeout = _props.dialogTransitionTimeout;

    var props = _objectWithoutProperties(_props, ['children', 'transition', 'backdrop', 'dialogTransitionTimeout']);

    var onExit = props.onExit;
    var onExiting = props.onExiting;
    var onEnter = props.onEnter;
    var onEntering = props.onEntering;
    var onEntered = props.onEntered;

    var show = !!props.show;
    var dialog = _react2['default'].Children.only(this.props.children);

    var mountModal = show || Transition && !this.state.exited;

    if (!mountModal) {
      return null;
    }

    var _dialog$props = dialog.props;
    var role = _dialog$props.role;
    var tabIndex = _dialog$props.tabIndex;

    if (role === undefined || tabIndex === undefined) {
      dialog = _react.cloneElement(dialog, {
        role: role === undefined ? 'document' : role,
        tabIndex: tabIndex == null ? '-1' : tabIndex
      });
    }

    if (Transition) {
      dialog = _react2['default'].createElement(
        Transition,
        {
          transitionAppear: true,
          unmountOnExit: true,
          'in': show,
          timeout: dialogTransitionTimeout,
          onExit: onExit,
          onExiting: onExiting,
          onExited: this.handleHidden,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        },
        dialog
      );
    }

    return _react2['default'].createElement(
      _Portal2['default'],
      {
        ref: this.setMountNode,
        container: props.container
      },
      _react2['default'].createElement(
        'div',
        {
          ref: 'modal',
          role: props.role || 'dialog',
          style: props.style,
          className: props.className
        },
        backdrop && this.renderBackdrop(),
        dialog
      )
    );
  },

  renderBackdrop: function renderBackdrop() {
    var _props2 = this.props;
    var Transition = _props2.transition;
    var backdropTransitionTimeout = _props2.backdropTransitionTimeout;

    var backdrop = _react2['default'].createElement('div', { ref: 'backdrop',
      style: this.props.backdropStyle,
      className: this.props.backdropClassName,
      onClick: this.handleBackdropClick
    });

    if (Transition) {
      backdrop = _react2['default'].createElement(
        Transition,
        { transitionAppear: true,
          'in': this.props.show,
          timeout: backdropTransitionTimeout
        },
        backdrop
      );
    }

    return backdrop;
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps) {
    if (nextProps.show) {
      this.checkForFocus();
    }
  },

  componentDidMount: function componentDidMount() {
    if (this.props.show) {
      this.onShow();
    }
  },

  componentDidUpdate: function componentDidUpdate(prevProps) {
    var transition = this.props.transition;

    if (prevProps.show && !this.props.show && !transition) {
      // Otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    var _props3 = this.props;
    var show = _props3.show;
    var transition = _props3.transition;

    if (show || transition && !this.state.exited) {
      this.onHide();
    }
  },

  onShow: function onShow() {
    var doc = _utilsOwnerDocument2['default'](this);
    var container = _utilsGetContainer2['default'](this.props.container, doc.body);

    modalManager.add(this, container, this.props.containerClassName);

    this._onDocumentKeyupListener = _utilsAddEventListener2['default'](doc, 'keyup', this.handleDocumentKeyUp);

    this._onFocusinListener = _utilsAddFocusListener2['default'](this.enforceFocus);

    this.focus();

    if (this.props.onShow) {
      this.props.onShow();
    }
  },

  onHide: function onHide() {
    modalManager.remove(this);

    this._onDocumentKeyupListener.remove();

    this._onFocusinListener.remove();

    this.restoreLastFocus();
  },

  setMountNode: function setMountNode(ref) {
    this.mountNode = ref ? ref.getMountNode() : ref;
  },

  handleHidden: function handleHidden() {
    this.setState({ exited: true });
    this.onHide();

    if (this.props.onExited) {
      var _props4;

      (_props4 = this.props).onExited.apply(_props4, arguments);
    }
  },

  handleBackdropClick: function handleBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    if (this.props.onBackdropClick) {
      this.props.onBackdropClick(e);
    }

    if (this.props.backdrop === true) {
      this.props.onHide();
    }
  },

  handleDocumentKeyUp: function handleDocumentKeyUp(e) {
    if (this.props.keyboard && e.keyCode === 27 && this.isTopModal()) {
      if (this.props.onEscapeKeyUp) {
        this.props.onEscapeKeyUp(e);
      }
      this.props.onHide();
    }
  },

  checkForFocus: function checkForFocus() {
    if (_domHelpersUtilInDOM2['default']) {
      this.lastFocus = _domHelpersActiveElement2['default']();
    }
  },

  focus: function focus() {
    var autoFocus = this.props.autoFocus;
    var modalContent = this.getDialogElement();
    var current = _domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));
    var focusInModal = current && _domHelpersQueryContains2['default'](modalContent, current);

    if (modalContent && autoFocus && !focusInModal) {
      this.lastFocus = current;

      if (!modalContent.hasAttribute('tabIndex')) {
        modalContent.setAttribute('tabIndex', -1);
        _warning2['default'](false, 'The modal content node does not accept focus. ' + 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".');
      }

      modalContent.focus();
    }
  },

  restoreLastFocus: function restoreLastFocus() {
    // Support: <=IE11 doesn't support `focus()` on svg elements (RB: #917)
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  },

  enforceFocus: function enforceFocus() {
    var enforceFocus = this.props.enforceFocus;

    if (!enforceFocus || !this.isMounted() || !this.isTopModal()) {
      return;
    }

    var active = _domHelpersActiveElement2['default'](_utilsOwnerDocument2['default'](this));
    var modal = this.getDialogElement();

    if (modal && modal !== active && !_domHelpersQueryContains2['default'](modal, active)) {
      modal.focus();
    }
  },

  //instead of a ref, which might conflict with one the parent applied.
  getDialogElement: function getDialogElement() {
    var node = this.refs.modal;
    return node && node.lastChild;
  },

  isTopModal: function isTopModal() {
    return modalManager.isTopModal(this);
  }

});

Modal.manager = modalManager;

exports['default'] = Modal;
module.exports = exports['default'];
},{"./ModalManager":289,"./Portal":291,"./utils/addEventListener":295,"./utils/addFocusListener":296,"./utils/getContainer":298,"./utils/ownerDocument":302,"dom-helpers/activeElement":50,"dom-helpers/query/contains":60,"dom-helpers/util/inDOM":77,"react":"react","react-prop-types/lib/elementType":304,"react-prop-types/lib/mountable":305,"warning":321}],289:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);

var _domHelpersClass = require('dom-helpers/class');

var _domHelpersClass2 = _interopRequireDefault(_domHelpersClass);

var _domHelpersUtilScrollbarSize = require('dom-helpers/util/scrollbarSize');

var _domHelpersUtilScrollbarSize2 = _interopRequireDefault(_domHelpersUtilScrollbarSize);

var _utilsIsOverflowing = require('./utils/isOverflowing');

var _utilsIsOverflowing2 = _interopRequireDefault(_utilsIsOverflowing);

var _utilsManageAriaHidden = require('./utils/manageAriaHidden');

function findIndexOf(arr, cb) {
  var idx = -1;
  arr.some(function (d, i) {
    if (cb(d, i)) {
      idx = i;
      return true;
    }
  });
  return idx;
}

function findContainer(data, modal) {
  return findIndexOf(data, function (d) {
    return d.modals.indexOf(modal) !== -1;
  });
}

/**
 * Proper state managment for containers and the modals in those containers.
 *
 * @internal Used by the Modal to ensure proper styling of containers.
 */

var ModalManager = (function () {
  function ModalManager() {
    var hideSiblingNodes = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

    _classCallCheck(this, ModalManager);

    this.hideSiblingNodes = hideSiblingNodes;
    this.modals = [];
    this.containers = [];
    this.data = [];
  }

  ModalManager.prototype.add = function add(modal, container, className) {
    var modalIdx = this.modals.indexOf(modal);
    var containerIdx = this.containers.indexOf(container);

    if (modalIdx !== -1) {
      return modalIdx;
    }

    modalIdx = this.modals.length;
    this.modals.push(modal);

    if (this.hideSiblingNodes) {
      _utilsManageAriaHidden.hideSiblings(container, modal.mountNode);
    }

    if (containerIdx !== -1) {
      this.data[containerIdx].modals.push(modal);
      return modalIdx;
    }

    var data = {
      modals: [modal],
      //right now only the first modal of a container will have its classes applied
      classes: className ? className.split(/\s+/) : [],
      //we are only interested in the actual `style` here becasue we will override it
      style: {
        overflow: container.style.overflow,
        paddingRight: container.style.paddingRight
      }
    };

    var style = { overflow: 'hidden' };

    data.overflowing = _utilsIsOverflowing2['default'](container);

    if (data.overflowing) {
      // use computed style, here to get the real padding
      // to add our scrollbar width
      style.paddingRight = parseInt(_domHelpersStyle2['default'](container, 'paddingRight') || 0, 10) + _domHelpersUtilScrollbarSize2['default']() + 'px';
    }

    _domHelpersStyle2['default'](container, style);

    data.classes.forEach(_domHelpersClass2['default'].addClass.bind(null, container));

    this.containers.push(container);
    this.data.push(data);

    return modalIdx;
  };

  ModalManager.prototype.remove = function remove(modal) {
    var modalIdx = this.modals.indexOf(modal);

    if (modalIdx === -1) {
      return;
    }

    var containerIdx = findContainer(this.data, modal);
    var data = this.data[containerIdx];
    var container = this.containers[containerIdx];

    data.modals.splice(data.modals.indexOf(modal), 1);

    this.modals.splice(modalIdx, 1);

    // if that was the last modal in a container,
    // clean up the container stylinhg.
    if (data.modals.length === 0) {
      Object.keys(data.style).forEach(function (key) {
        return container.style[key] = data.style[key];
      });

      data.classes.forEach(_domHelpersClass2['default'].removeClass.bind(null, container));

      if (this.hideSiblingNodes) {
        _utilsManageAriaHidden.showSiblings(container, modal.mountNode);
      }
      this.containers.splice(containerIdx, 1);
      this.data.splice(containerIdx, 1);
    } else if (this.hideSiblingNodes) {
      //otherwise make sure the next top modal is visible to a SR
      _utilsManageAriaHidden.ariaHidden(false, data.modals[data.modals.length - 1].mountNode);
    }
  };

  ModalManager.prototype.isTopModal = function isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  };

  return ModalManager;
})();

exports['default'] = ModalManager;
module.exports = exports['default'];
},{"./utils/isOverflowing":299,"./utils/manageAriaHidden":300,"dom-helpers/class":53,"dom-helpers/style":69,"dom-helpers/util/scrollbarSize":78}],290:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _Position = require('./Position');

var _Position2 = _interopRequireDefault(_Position);

var _RootCloseWrapper = require('./RootCloseWrapper');

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

/**
 * Built on top of `<Position/>` and `<Portal/>`, the overlay component is great for custom tooltip overlays.
 */

var Overlay = (function (_React$Component) {
  _inherits(Overlay, _React$Component);

  function Overlay(props, context) {
    _classCallCheck(this, Overlay);

    _React$Component.call(this, props, context);

    this.state = { exited: !props.show };
    this.onHiddenListener = this.handleHidden.bind(this);
  }

  Overlay.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({ exited: false });
    } else if (!nextProps.transition) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({ exited: true });
    }
  };

  Overlay.prototype.render = function render() {
    var _props = this.props;
    var container = _props.container;
    var containerPadding = _props.containerPadding;
    var target = _props.target;
    var placement = _props.placement;
    var shouldUpdatePosition = _props.shouldUpdatePosition;
    var rootClose = _props.rootClose;
    var children = _props.children;
    var Transition = _props.transition;

    var props = _objectWithoutProperties(_props, ['container', 'containerPadding', 'target', 'placement', 'shouldUpdatePosition', 'rootClose', 'children', 'transition']);

    // Don't un-render the overlay while it's transitioning out.
    var mountOverlay = props.show || Transition && !this.state.exited;
    if (!mountOverlay) {
      // Don't bother showing anything if we don't have to.
      return null;
    }

    var child = children;

    // Position is be inner-most because it adds inline styles into the child,
    // which the other wrappers don't forward correctly.
    child = _react2['default'].createElement(
      _Position2['default'],
      { container: container, containerPadding: containerPadding, target: target, placement: placement, shouldUpdatePosition: shouldUpdatePosition },
      child
    );

    if (Transition) {
      var onExit = props.onExit;
      var onExiting = props.onExiting;
      var onEnter = props.onEnter;
      var onEntering = props.onEntering;
      var onEntered = props.onEntered;

      // This animates the child node by injecting props, so it must precede
      // anything that adds a wrapping div.
      child = _react2['default'].createElement(
        Transition,
        {
          'in': props.show,
          transitionAppear: true,
          onExit: onExit,
          onExiting: onExiting,
          onExited: this.onHiddenListener,
          onEnter: onEnter,
          onEntering: onEntering,
          onEntered: onEntered
        },
        child
      );
    }

    // This goes after everything else because it adds a wrapping div.
    if (rootClose) {
      child = _react2['default'].createElement(
        _RootCloseWrapper2['default'],
        { onRootClose: props.onHide },
        child
      );
    }

    return _react2['default'].createElement(
      _Portal2['default'],
      { container: container },
      child
    );
  };

  Overlay.prototype.handleHidden = function handleHidden() {
    this.setState({ exited: true });

    if (this.props.onExited) {
      var _props2;

      (_props2 = this.props).onExited.apply(_props2, arguments);
    }
  };

  return Overlay;
})(_react2['default'].Component);

Overlay.propTypes = _extends({}, _Portal2['default'].propTypes, _Position2['default'].propTypes, {

  /**
   * Set the visibility of the Overlay
   */
  show: _react2['default'].PropTypes.bool,

  /**
   * Specify whether the overlay should trigger `onHide` when the user clicks outside the overlay
   */
  rootClose: _react2['default'].PropTypes.bool,

  /**
   * A Callback fired by the Overlay when it wishes to be hidden.
   *
   * __required__ when `rootClose` is `true`.
   *
   * @type func
   */
  onHide: function onHide(props, name, cname) {
    var pt = _react2['default'].PropTypes.func;

    if (props.rootClose) pt = pt.isRequired;
    return pt(props, name, cname);
  },

  /**
   * A `<Transition/>` component used to animate the overlay changes visibility.
   */
  transition: _reactPropTypesLibElementType2['default'],

  /**
   * Callback fired before the Overlay transitions in
   */
  onEnter: _react2['default'].PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition in
   */
  onEntering: _react2['default'].PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning in
   */
  onEntered: _react2['default'].PropTypes.func,

  /**
   * Callback fired right before the Overlay transitions out
   */
  onExit: _react2['default'].PropTypes.func,

  /**
   * Callback fired as the Overlay begins to transition out
   */
  onExiting: _react2['default'].PropTypes.func,

  /**
   * Callback fired after the Overlay finishes transitioning out
   */
  onExited: _react2['default'].PropTypes.func
});

exports['default'] = Overlay;
module.exports = exports['default'];
},{"./Portal":291,"./Position":292,"./RootCloseWrapper":293,"react":"react","react-prop-types/lib/elementType":304}],291:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactPropTypesLibMountable = require('react-prop-types/lib/mountable');

var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);

var _utilsOwnerDocument = require('./utils/ownerDocument');

var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);

var _utilsGetContainer = require('./utils/getContainer');

var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);

/**
 * The `<Portal/>` component renders its children into a new "subtree" outside of current component hierarchy.
 * You can think of it as a declarative `appendChild()`, or jQuery's `$.fn.appendTo()`.
 * The children of `<Portal/>` component will be appended to the `container` specified.
 */
var Portal = _react2['default'].createClass({

  displayName: 'Portal',

  propTypes: {
    /**
     * A Node, Component instance, or function that returns either. The `container` will have the Portal children
     * appended to it.
     */
    container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func])
  },

  componentDidMount: function componentDidMount() {
    this._renderOverlay();
  },

  componentDidUpdate: function componentDidUpdate() {
    this._renderOverlay();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this._overlayTarget && nextProps.container !== this.props.container) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._portalContainerNode = _utilsGetContainer2['default'](nextProps.container, _utilsOwnerDocument2['default'](this).body);
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this._unrenderOverlay();
    this._unmountOverlayTarget();
  },

  _mountOverlayTarget: function _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div');
      this._portalContainerNode = _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  },

  _unmountOverlayTarget: function _unmountOverlayTarget() {
    if (this._overlayTarget) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
    this._portalContainerNode = null;
  },

  _renderOverlay: function _renderOverlay() {

    var overlay = !this.props.children ? null : _react2['default'].Children.only(this.props.children);

    // Save reference for future access.
    if (overlay !== null) {
      this._mountOverlayTarget();
      this._overlayInstance = _reactDom2['default'].unstable_renderSubtreeIntoContainer(this, overlay, this._overlayTarget);
    } else {
      // Unrender if the component is null for transitions to null
      this._unrenderOverlay();
      this._unmountOverlayTarget();
    }
  },

  _unrenderOverlay: function _unrenderOverlay() {
    if (this._overlayTarget) {
      _reactDom2['default'].unmountComponentAtNode(this._overlayTarget);
      this._overlayInstance = null;
    }
  },

  render: function render() {
    return null;
  },

  getMountNode: function getMountNode() {
    return this._overlayTarget;
  },

  getOverlayDOMNode: function getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
    }

    if (this._overlayInstance) {
      if (this._overlayInstance.getWrappedDOMNode) {
        return this._overlayInstance.getWrappedDOMNode();
      } else {
        return _reactDom2['default'].findDOMNode(this._overlayInstance);
      }
    }

    return null;
  }

});

exports['default'] = Portal;
module.exports = exports['default'];
},{"./utils/getContainer":298,"./utils/ownerDocument":302,"react":"react","react-dom":"react-dom","react-prop-types/lib/mountable":305}],292:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsOwnerDocument = require('./utils/ownerDocument');

var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);

var _utilsGetContainer = require('./utils/getContainer');

var _utilsGetContainer2 = _interopRequireDefault(_utilsGetContainer);

var _utilsOverlayPositionUtils = require('./utils/overlayPositionUtils');

var _reactPropTypesLibMountable = require('react-prop-types/lib/mountable');

var _reactPropTypesLibMountable2 = _interopRequireDefault(_reactPropTypesLibMountable);

/**
 * The Position component calculates the coordinates for its child, to
 * position it relative to a `target` component or node. Useful for creating callouts and tooltips,
 * the Position component injects a `style` props with `left` and `top` values for positioning your component.
 *
 * It also injects "arrow" `left`, and `top` values for styling callout arrows for giving your components
 * a sense of directionality.
 */

var Position = (function (_React$Component) {
  _inherits(Position, _React$Component);

  function Position(props, context) {
    _classCallCheck(this, Position);

    _React$Component.call(this, props, context);

    this.state = {
      positionLeft: 0,
      positionTop: 0,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };

    this._needsFlush = false;
    this._lastTarget = null;
  }

  Position.prototype.componentDidMount = function componentDidMount() {
    this.updatePosition();
  };

  Position.prototype.componentWillReceiveProps = function componentWillReceiveProps() {
    this._needsFlush = true;
  };

  Position.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this._needsFlush) {
      this._needsFlush = false;
      this.updatePosition(prevProps.placement !== this.props.placement);
    }
  };

  Position.prototype.componentWillUnmount = function componentWillUnmount() {
    // Probably not necessary, but just in case holding a reference to the
    // target causes problems somewhere.
    this._lastTarget = null;
  };

  Position.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['children', 'className']);

    var _state = this.state;
    var positionLeft = _state.positionLeft;
    var positionTop = _state.positionTop;

    var arrowPosition = _objectWithoutProperties(_state, ['positionLeft', 'positionTop']);

    // These should not be forwarded to the child.
    delete props.target;
    delete props.container;
    delete props.containerPadding;

    var child = _react2['default'].Children.only(children);
    return _react.cloneElement(child, _extends({}, props, arrowPosition, {
      //do we need to also forward positionLeft and positionTop if they are set to style?
      positionLeft: positionLeft,
      positionTop: positionTop,
      className: _classnames2['default'](className, child.props.className),
      style: _extends({}, child.props.style, {
        left: positionLeft,
        top: positionTop
      })
    }));
  };

  Position.prototype.getTargetSafe = function getTargetSafe() {
    if (!this.props.target) {
      return null;
    }

    var target = this.props.target(this.props);
    if (!target) {
      // This is so we can just use === check below on all falsy targets.
      return null;
    }

    return target;
  };

  Position.prototype.updatePosition = function updatePosition(placementChanged) {
    var target = this.getTargetSafe();

    if (!this.props.shouldUpdatePosition && target === this._lastTarget && !placementChanged) {
      return;
    }

    this._lastTarget = target;

    if (!target) {
      this.setState({
        positionLeft: 0,
        positionTop: 0,
        arrowOffsetLeft: null,
        arrowOffsetTop: null
      });

      return;
    }

    var overlay = _reactDom2['default'].findDOMNode(this);
    var container = _utilsGetContainer2['default'](this.props.container, _utilsOwnerDocument2['default'](this).body);

    this.setState(_utilsOverlayPositionUtils.calcOverlayPosition(this.props.placement, overlay, target, container, this.props.containerPadding));
  };

  return Position;
})(_react2['default'].Component);

Position.propTypes = {
  /**
   * Function mapping props to a DOM node the component is positioned next to
   *
   */
  target: _react2['default'].PropTypes.func,

  /**
   * "offsetParent" of the component
   */
  container: _react2['default'].PropTypes.oneOfType([_reactPropTypesLibMountable2['default'], _react2['default'].PropTypes.func]),
  /**
   * Minimum spacing in pixels between container border and component border
   */
  containerPadding: _react2['default'].PropTypes.number,
  /**
   * How to position the component relative to the target
   */
  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * Whether the position should be changed on each update
   */
  shouldUpdatePosition: _react2['default'].PropTypes.bool
};

Position.displayName = 'Position';

Position.defaultProps = {
  containerPadding: 0,
  placement: 'right',
  shouldUpdatePosition: false
};

exports['default'] = Position;
module.exports = exports['default'];
},{"./utils/getContainer":298,"./utils/overlayPositionUtils":301,"./utils/ownerDocument":302,"classnames":49,"react":"react","react-dom":"react-dom","react-prop-types/lib/mountable":305}],293:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsAddEventListener = require('./utils/addEventListener');

var _utilsAddEventListener2 = _interopRequireDefault(_utilsAddEventListener);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsOwnerDocument = require('./utils/ownerDocument');

var _utilsOwnerDocument2 = _interopRequireDefault(_utilsOwnerDocument);

// TODO: Consider using an ES6 symbol here, once we use babel-runtime.
var CLICK_WAS_INSIDE = '__click_was_inside';

var counter = 0;

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

function getSuppressRootClose() {
  var id = CLICK_WAS_INSIDE + '_' + counter++;
  return {
    id: id,
    suppressRootClose: function suppressRootClose(event) {
      // Tag the native event to prevent the root close logic on document click.
      // This seems safer than using event.nativeEvent.stopImmediatePropagation(),
      // which is only supported in IE >= 9.
      event.nativeEvent[id] = true;
    }
  };
}

var RootCloseWrapper = (function (_React$Component) {
  _inherits(RootCloseWrapper, _React$Component);

  function RootCloseWrapper(props) {
    _classCallCheck(this, RootCloseWrapper);

    _React$Component.call(this, props);

    this.handleDocumentClick = this.handleDocumentClick.bind(this);
    this.handleDocumentKeyUp = this.handleDocumentKeyUp.bind(this);

    var _getSuppressRootClose = getSuppressRootClose();

    var id = _getSuppressRootClose.id;
    var suppressRootClose = _getSuppressRootClose.suppressRootClose;

    this._suppressRootId = id;

    this._suppressRootCloseHandler = suppressRootClose;
  }

  RootCloseWrapper.prototype.bindRootCloseHandlers = function bindRootCloseHandlers() {
    var doc = _utilsOwnerDocument2['default'](this);

    this._onDocumentClickListener = _utilsAddEventListener2['default'](doc, 'click', this.handleDocumentClick);

    this._onDocumentKeyupListener = _utilsAddEventListener2['default'](doc, 'keyup', this.handleDocumentKeyUp);
  };

  RootCloseWrapper.prototype.handleDocumentClick = function handleDocumentClick(e) {
    // This is now the native event.
    if (e[this._suppressRootId]) {
      return;
    }

    if (isModifiedEvent(e) || !isLeftClickEvent(e)) {
      return;
    }

    this.props.onRootClose();
  };

  RootCloseWrapper.prototype.handleDocumentKeyUp = function handleDocumentKeyUp(e) {
    if (e.keyCode === 27) {
      this.props.onRootClose();
    }
  };

  RootCloseWrapper.prototype.unbindRootCloseHandlers = function unbindRootCloseHandlers() {
    if (this._onDocumentClickListener) {
      this._onDocumentClickListener.remove();
    }

    if (this._onDocumentKeyupListener) {
      this._onDocumentKeyupListener.remove();
    }
  };

  RootCloseWrapper.prototype.componentDidMount = function componentDidMount() {
    this.bindRootCloseHandlers();
  };

  RootCloseWrapper.prototype.render = function render() {
    var _props = this.props;
    var noWrap = _props.noWrap;
    var children = _props.children;

    var child = _react2['default'].Children.only(children);

    if (noWrap) {
      return _react2['default'].cloneElement(child, {
        onClick: _utilsCreateChainedFunction2['default'](this._suppressRootCloseHandler, child.props.onClick)
      });
    }

    // Wrap the child in a new element, so the child won't have to handle
    // potentially combining multiple onClick listeners.
    return _react2['default'].createElement(
      'div',
      { onClick: this._suppressRootCloseHandler },
      child
    );
  };

  RootCloseWrapper.prototype.getWrappedDOMNode = function getWrappedDOMNode() {
    // We can't use a ref to identify the wrapped child, since we might be
    // stealing the ref from the owner, but we know exactly the DOM structure
    // that will be rendered, so we can just do this to get the child's DOM
    // node for doing size calculations in OverlayMixin.
    var node = _reactDom2['default'].findDOMNode(this);
    return this.props.noWrap ? node : node.firstChild;
  };

  RootCloseWrapper.prototype.componentWillUnmount = function componentWillUnmount() {
    this.unbindRootCloseHandlers();
  };

  return RootCloseWrapper;
})(_react2['default'].Component);

exports['default'] = RootCloseWrapper;

RootCloseWrapper.displayName = 'RootCloseWrapper';

RootCloseWrapper.propTypes = {
  onRootClose: _react2['default'].PropTypes.func.isRequired,

  /**
   * Passes the suppress click handler directly to the child component instead
   * of placing it on a wrapping div. Only use when you can be sure the child
   * properly handle the click event.
   */
  noWrap: _react2['default'].PropTypes.bool
};
module.exports = exports['default'];
},{"./utils/addEventListener":295,"./utils/createChainedFunction":297,"./utils/ownerDocument":302,"react":"react","react-dom":"react-dom"}],294:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domHelpersTransitionProperties = require('dom-helpers/transition/properties');

var _domHelpersTransitionProperties2 = _interopRequireDefault(_domHelpersTransitionProperties);

var _domHelpersEventsOn = require('dom-helpers/events/on');

var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var transitionEndEvent = _domHelpersTransitionProperties2['default'].end;

var UNMOUNTED = 0;
exports.UNMOUNTED = UNMOUNTED;
var EXITED = 1;
exports.EXITED = EXITED;
var ENTERING = 2;
exports.ENTERING = ENTERING;
var ENTERED = 3;
exports.ENTERED = ENTERED;
var EXITING = 4;

exports.EXITING = EXITING;
/**
 * The Transition component lets you define and run css transitions with a simple declarative api.
 * It works similar to React's own [CSSTransitionGroup](http://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup)
 * but is specifically optimized for transitioning a single child "in" or "out".
 *
 * You don't even need to use class based css transitions if you don't want to (but it is easiest).
 * The extensive set of lifecyle callbacks means you have control over
 * the transitioning now at each step of the way.
 */

var Transition = (function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    _React$Component.call(this, props, context);

    var initialStatus = undefined;
    if (props['in']) {
      // Start enter transition in componentDidMount.
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }
    this.state = { status: initialStatus };

    this.nextCallback = null;
  }

  Transition.prototype.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear && this.props['in']) {
      this.performEnter(this.props);
    }
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps['in'] && this.props.unmountOnExit) {
      if (this.state.status === UNMOUNTED) {
        // Start enter transition in componentDidUpdate.
        this.setState({ status: EXITED });
      }
    } else {
      this._needsUpdate = true;
    }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    var status = this.state.status;

    if (this.props.unmountOnExit && status === EXITED) {
      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
      // when using unmountOnExit.
      if (this.props['in']) {
        this.performEnter(this.props);
      } else {
        this.setState({ status: UNMOUNTED });
      }

      return;
    }

    // guard ensures we are only responding to prop changes
    if (this._needsUpdate) {
      this._needsUpdate = false;

      if (this.props['in']) {
        if (status === EXITING) {
          this.performEnter(this.props);
        } else if (status === EXITED) {
          this.performEnter(this.props);
        }
        // Otherwise we're already entering or entered.
      } else {
          if (status === ENTERING || status === ENTERED) {
            this.performExit(this.props);
          }
          // Otherwise we're already exited or exiting.
        }
    }
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.performEnter = function performEnter(props) {
    var _this = this;

    this.cancelNextCallback();
    var node = _reactDom2['default'].findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onEnter(node);

    this.safeSetState({ status: ENTERING }, function () {
      _this.props.onEntering(node);

      _this.onTransitionEnd(node, function () {
        _this.safeSetState({ status: ENTERED }, function () {
          _this.props.onEntered(node);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(props) {
    var _this2 = this;

    this.cancelNextCallback();
    var node = _reactDom2['default'].findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this2.props.onExiting(node);

      _this2.onTransitionEnd(node, function () {
        _this2.safeSetState({ status: EXITED }, function () {
          _this2.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this3 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this3.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, handler) {
    this.setNextCallback(handler);

    if (node) {
      _domHelpersEventsOn2['default'](node, transitionEndEvent, this.nextCallback);
      setTimeout(this.nextCallback, this.props.timeout);
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var childProps = _objectWithoutProperties(_props, ['children', 'className']);

    Object.keys(Transition.propTypes).forEach(function (key) {
      return delete childProps[key];
    });

    var transitionClassName = undefined;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    var child = _react2['default'].Children.only(children);
    return _react2['default'].cloneElement(child, _extends({}, childProps, {
      className: _classnames2['default'](child.props.className, className, transitionClassName)
    }));
  };

  return Transition;
})(_react2['default'].Component);

Transition.propTypes = {
  /**
   * Show the component; triggers the enter or exit animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is not shown
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * A Timeout for the animation, in milliseconds, to ensure that a node doesn't
   * transition indefinately if the browser transitionEnd events are
   * canceled or interrupted.
   *
   * By default this is set to a high number (5 seconds) as a failsafe. You should consider
   * setting this to the duration of your animation (or a bit above it).
   */
  timeout: _react2['default'].PropTypes.number,

  /**
   * CSS class or classes applied when the component is exited
   */
  exitedClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied while the component is exiting
   */
  exitingClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied when the component is entered
   */
  enteredClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied while the component is entering
   */
  enteringClassName: _react2['default'].PropTypes.string,

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited: _react2['default'].PropTypes.func
};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.displayName = 'Transition';

Transition.defaultProps = {
  'in': false,
  unmountOnExit: false,
  transitionAppear: false,

  timeout: 5000,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

exports['default'] = Transition;
},{"classnames":49,"dom-helpers/events/on":58,"dom-helpers/transition/properties":71,"react":"react","react-dom":"react-dom"}],295:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domHelpersEventsOn = require('dom-helpers/events/on');

var _domHelpersEventsOn2 = _interopRequireDefault(_domHelpersEventsOn);

var _domHelpersEventsOff = require('dom-helpers/events/off');

var _domHelpersEventsOff2 = _interopRequireDefault(_domHelpersEventsOff);

exports['default'] = function (node, event, handler) {
  _domHelpersEventsOn2['default'](node, event, handler);
  return {
    remove: function remove() {
      _domHelpersEventsOff2['default'](node, event, handler);
    }
  };
};

module.exports = exports['default'];
},{"dom-helpers/events/off":57,"dom-helpers/events/on":58}],296:[function(require,module,exports){
/**
 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
 *
 * We only allow one Listener at a time to avoid stack overflows
 */
'use strict';

exports.__esModule = true;
exports['default'] = addFocusListener;

function addFocusListener(handler) {
  var useFocusin = !document.addEventListener;
  var remove = undefined;

  if (useFocusin) {
    document.attachEvent('onfocusin', handler);
    remove = function () {
      return document.detachEvent('onfocusin', handler);
    };
  } else {
    document.addEventListener('focus', handler, true);
    remove = function () {
      return document.removeEventListener('focus', handler, true);
    };
  }

  return { remove: remove };
}

module.exports = exports['default'];
},{}],297:[function(require,module,exports){
arguments[4][251][0].apply(exports,arguments)
},{"dup":251}],298:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = getContainer;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function getContainer(container, defaultContainer) {
  container = typeof container === 'function' ? container() : container;
  return _reactDom2['default'].findDOMNode(container) || defaultContainer;
}

module.exports = exports['default'];
},{"react-dom":"react-dom"}],299:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = isOverflowing;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _domHelpersQueryIsWindow = require('dom-helpers/query/isWindow');

var _domHelpersQueryIsWindow2 = _interopRequireDefault(_domHelpersQueryIsWindow);

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

function isBody(node) {
  return node && node.tagName.toLowerCase() === 'body';
}

function bodyIsOverflowing(node) {
  var doc = _domHelpersOwnerDocument2['default'](node);
  var win = _domHelpersQueryIsWindow2['default'](doc);
  var fullWidth = win.innerWidth;

  // Support: ie8, no innerWidth
  if (!fullWidth) {
    var documentElementRect = doc.documentElement.getBoundingClientRect();
    fullWidth = documentElementRect.right - Math.abs(documentElementRect.left);
  }

  return doc.body.clientWidth < fullWidth;
}

function isOverflowing(container) {
  var win = _domHelpersQueryIsWindow2['default'](container);

  return win || isBody(container) ? bodyIsOverflowing(container) : container.scrollHeight > container.clientHeight;
}

module.exports = exports['default'];
},{"dom-helpers/ownerDocument":59,"dom-helpers/query/isWindow":61}],300:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ariaHidden = ariaHidden;
exports.hideSiblings = hideSiblings;
exports.showSiblings = showSiblings;

var BLACKLIST = ['template', 'script', 'style'];

var isHidable = function isHidable(_ref) {
  var nodeType = _ref.nodeType;
  var tagName = _ref.tagName;
  return nodeType === 1 && BLACKLIST.indexOf(tagName.toLowerCase()) === -1;
};

var siblings = function siblings(container, mount, cb) {
  mount = [].concat(mount);

  [].forEach.call(container.children, function (node) {
    if (mount.indexOf(node) === -1 && isHidable(node)) {
      cb(node);
    }
  });
};

function ariaHidden(show, node) {
  if (!node) {
    return;
  }
  if (show) {
    node.setAttribute('aria-hidden', 'true');
  } else {
    node.removeAttribute('aria-hidden');
  }
}

function hideSiblings(container, mountNode) {
  siblings(container, mountNode, function (node) {
    return ariaHidden(true, node);
  });
}

function showSiblings(container, mountNode) {
  siblings(container, mountNode, function (node) {
    return ariaHidden(false, node);
  });
}
},{}],301:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ownerDocument = require('./ownerDocument');

var _ownerDocument2 = _interopRequireDefault(_ownerDocument);

var _domHelpersQueryOffset = require('dom-helpers/query/offset');

var _domHelpersQueryOffset2 = _interopRequireDefault(_domHelpersQueryOffset);

var _domHelpersQueryPosition = require('dom-helpers/query/position');

var _domHelpersQueryPosition2 = _interopRequireDefault(_domHelpersQueryPosition);

var _domHelpersQueryScrollTop = require('dom-helpers/query/scrollTop');

var _domHelpersQueryScrollTop2 = _interopRequireDefault(_domHelpersQueryScrollTop);

var utils = {

  getContainerDimensions: function getContainerDimensions(containerNode) {
    var width = undefined,
        height = undefined,
        scroll = undefined;

    if (containerNode.tagName === 'BODY') {
      width = window.innerWidth;
      height = window.innerHeight;

      scroll = _domHelpersQueryScrollTop2['default'](_ownerDocument2['default'](containerNode).documentElement) || _domHelpersQueryScrollTop2['default'](containerNode);
    } else {
      var _getOffset = _domHelpersQueryOffset2['default'](containerNode);

      width = _getOffset.width;
      height = _getOffset.height;

      scroll = _domHelpersQueryScrollTop2['default'](containerNode);
    }

    return { width: width, height: height, scroll: scroll };
  },

  getPosition: function getPosition(target, container) {
    var offset = container.tagName === 'BODY' ? _domHelpersQueryOffset2['default'](target) : _domHelpersQueryPosition2['default'](target, container);

    return offset;
  },

  calcOverlayPosition: function calcOverlayPosition(placement, overlayNode, target, container, padding) {
    var childOffset = utils.getPosition(target, container);

    var _getOffset2 = _domHelpersQueryOffset2['default'](overlayNode);

    var overlayHeight = _getOffset2.height;
    var overlayWidth = _getOffset2.width;

    var positionLeft = undefined,
        positionTop = undefined,
        arrowOffsetLeft = undefined,
        arrowOffsetTop = undefined;

    if (placement === 'left' || placement === 'right') {
      positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;

      if (placement === 'left') {
        positionLeft = childOffset.left - overlayWidth;
      } else {
        positionLeft = childOffset.left + childOffset.width;
      }

      var topDelta = getTopDelta(positionTop, overlayHeight, container, padding);

      positionTop += topDelta;
      arrowOffsetTop = 50 * (1 - 2 * topDelta / overlayHeight) + '%';
      arrowOffsetLeft = void 0;
    } else if (placement === 'top' || placement === 'bottom') {
      positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;

      if (placement === 'top') {
        positionTop = childOffset.top - overlayHeight;
      } else {
        positionTop = childOffset.top + childOffset.height;
      }

      var leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
      positionLeft += leftDelta;
      arrowOffsetLeft = 50 * (1 - 2 * leftDelta / overlayWidth) + '%';
      arrowOffsetTop = void 0;
    } else {
      throw new Error('calcOverlayPosition(): No such placement of "' + placement + '" found.');
    }

    return { positionLeft: positionLeft, positionTop: positionTop, arrowOffsetLeft: arrowOffsetLeft, arrowOffsetTop: arrowOffsetTop };
  }
};

function getTopDelta(top, overlayHeight, container, padding) {
  var containerDimensions = utils.getContainerDimensions(container);
  var containerScroll = containerDimensions.scroll;
  var containerHeight = containerDimensions.height;

  var topEdgeOffset = top - padding - containerScroll;
  var bottomEdgeOffset = top + padding - containerScroll + overlayHeight;

  if (topEdgeOffset < 0) {
    return -topEdgeOffset;
  } else if (bottomEdgeOffset > containerHeight) {
    return containerHeight - bottomEdgeOffset;
  } else {
    return 0;
  }
}

function getLeftDelta(left, overlayWidth, container, padding) {
  var containerDimensions = utils.getContainerDimensions(container);
  var containerWidth = containerDimensions.width;

  var leftEdgeOffset = left - padding;
  var rightEdgeOffset = left + padding + overlayWidth;

  if (leftEdgeOffset < 0) {
    return -leftEdgeOffset;
  } else if (rightEdgeOffset > containerWidth) {
    return containerWidth - rightEdgeOffset;
  } else {
    return 0;
  }
}
exports['default'] = utils;
module.exports = exports['default'];
},{"./ownerDocument":302,"dom-helpers/query/offset":62,"dom-helpers/query/position":64,"dom-helpers/query/scrollTop":67}],302:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

exports['default'] = function (componentOrElement) {
  return _domHelpersOwnerDocument2['default'](_reactDom2['default'].findDOMNode(componentOrElement));
};

module.exports = exports['default'];
},{"dom-helpers/ownerDocument":59,"react-dom":"react-dom"}],303:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.errMsg = errMsg;
exports.createChainableTypeChecker = createChainableTypeChecker;

function errMsg(props, propName, componentName, msgContinuation) {
  return 'Invalid prop \'' + propName + '\' of value \'' + props[propName] + '\'' + (' supplied to \'' + componentName + '\'' + msgContinuation);
}

/**
 * Create chain-able isRequired validator
 *
 * Largely copied directly from:
 *  https://github.com/facebook/react/blob/0.11-stable/src/core/ReactPropTypes.js#L94
 */

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error('Required prop \'' + propName + '\' was not specified in \'' + componentName + '\'.');
      }
    } else {
      return validate(props, propName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}
},{}],304:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _common = require('./common');

/**
 * Checks whether a prop provides a type of element.
 *
 * The type of element can be provided in two forms:
 * - tag name (string)
 * - a return value of React.createClass(...)
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function validate(props, propName, componentName) {
  var errBeginning = _common.errMsg(props, propName, componentName, '. Expected an Element `type`');

  if (typeof props[propName] !== 'function') {
    if (_react2['default'].isValidElement(props[propName])) {
      return new Error(errBeginning + ', not an actual Element');
    }

    if (typeof props[propName] !== 'string') {
      return new Error(errBeginning + ' such as a tag name or return value of React.createClass(...)');
    }
  }
}

exports['default'] = _common.createChainableTypeChecker(validate);
module.exports = exports['default'];
},{"./common":303,"react":"react"}],305:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _common = require('./common');

/**
 * Checks whether a prop provides a DOM element
 *
 * The element can be provided in two forms:
 * - Directly passed
 * - Or passed an object that has a `render` method
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */

function validate(props, propName, componentName) {
  if (typeof props[propName] !== 'object' || typeof props[propName].render !== 'function' && props[propName].nodeType !== 1) {
    return new Error(_common.errMsg(props, propName, componentName, ', expected a DOM element or an object that has a `render` method'));
  }
}

exports['default'] = _common.createChainableTypeChecker(validate);
module.exports = exports['default'];
},{"./common":303}],306:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = all;

var _common = require('./common');

function all() {
  for (var _len = arguments.length, propTypes = Array(_len), _key = 0; _key < _len; _key++) {
    propTypes[_key] = arguments[_key];
  }

  if (propTypes === undefined) {
    throw new Error('No validations provided');
  }

  if (propTypes.some(function (propType) {
    return typeof propType !== 'function';
  })) {
    throw new Error('Invalid arguments, must be functions');
  }

  if (propTypes.length === 0) {
    throw new Error('No validations provided');
  }

  function validate(props, propName, componentName) {
    for (var i = 0; i < propTypes.length; i++) {
      var result = propTypes[i](props, propName, componentName);

      if (result !== undefined && result !== null) {
        return result;
      }
    }
  }

  return _common.createChainableTypeChecker(validate);
}

module.exports = exports['default'];
},{"./common":307}],307:[function(require,module,exports){
arguments[4][303][0].apply(exports,arguments)
},{"dup":303}],308:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = deprecated;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var warned = {};

function deprecated(propType, explanation) {
  return function validate(props, propName, componentName) {
    if (props[propName] != null) {
      var message = '"' + propName + '" property of "' + componentName + '" has been deprecated.\n' + explanation;
      if (!warned[message]) {
        _warning2['default'](false, message);
        warned[message] = true;
      }
    }

    return propType(props, propName, componentName);
  };
}

function _resetWarned() {
  warned = {};
}

deprecated._resetWarned = _resetWarned;
module.exports = exports['default'];
},{"warning":321}],309:[function(require,module,exports){
arguments[4][304][0].apply(exports,arguments)
},{"./common":307,"dup":304,"react":"react"}],310:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = isRequiredForA11y;

function isRequiredForA11y(propType) {
  return function validate(props, propName, componentName) {
    if (props[propName] == null) {
      return new Error("The prop '" + propName + "' is required to make '" + componentName + "' accessible" + " for users using assistive technologies such as screen readers");
    }

    return propType(props, propName, componentName);
  };
}

module.exports = exports["default"];
},{}],311:[function(require,module,exports){
/**
 * Checks if only one of the listed properties is in use. An error is given
 * if multiple have a value
 *
 * @param props
 * @param propName
 * @param componentName
 * @returns {Error|undefined}
 */
'use strict';

exports.__esModule = true;
exports['default'] = createSinglePropFromChecker;

function createSinglePropFromChecker() {
  for (var _len = arguments.length, arrOfProps = Array(_len), _key = 0; _key < _len; _key++) {
    arrOfProps[_key] = arguments[_key];
  }

  function validate(props, propName) {
    var usedPropCount = arrOfProps.map(function (listedProp) {
      return props[listedProp];
    }).reduce(function (acc, curr) {
      return acc + (curr !== undefined ? 1 : 0);
    }, 0);

    if (usedPropCount > 1) {
      var first = arrOfProps[0];
      var others = arrOfProps.slice(1);

      var message = others.join(', ') + ' and ' + first;
      return new Error('Invalid prop \'' + propName + '\', only one of the following ' + ('may be provided: ' + message));
    }
  }
  return validate;
}

module.exports = exports['default'];
},{}],312:[function(require,module,exports){
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
},{"./Month":315,"./utils":317,"moment":150,"react":"react"}],313:[function(require,module,exports){
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
},{"react":"react"}],314:[function(require,module,exports){
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
},{"react":"react"}],315:[function(require,module,exports){
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
},{"./Day":314,"./utils":317,"moment":150,"react":"react"}],316:[function(require,module,exports){
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
},{"./Calendar":312,"./CalendarControls":313}],317:[function(require,module,exports){
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
},{}],318:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createUncontrollable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function createUncontrollable(mixins, set) {

  return uncontrollable;

  function uncontrollable(Component, controlledValues) {
    var methods = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

    var displayName = Component.displayName || Component.name || 'Component',
        basePropTypes = utils.getType(Component).propTypes,
        isCompositeComponent = utils.isReactComponent(Component),
        propTypes;

    propTypes = utils.uncontrolledPropTypes(controlledValues, basePropTypes, displayName);

    (0, _invariant2.default)(isCompositeComponent || !methods.length, '[uncontrollable] stateless function components cannot pass through methods ' + 'becasue they have no associated instances. Check component: ' + displayName + ', ' + 'attempting to pass through methods: ' + methods.join(', '));
    methods = utils.transform(methods, function (obj, method) {
      obj[method] = function () {
        var _refs$inner;

        return (_refs$inner = this.refs.inner)[method].apply(_refs$inner, arguments);
      };
    }, {});

    var component = _react2.default.createClass(_extends({

      displayName: 'Uncontrolled(' + displayName + ')',

      mixins: mixins,

      propTypes: propTypes

    }, methods, {
      componentWillMount: function componentWillMount() {
        var props = this.props,
            keys = Object.keys(controlledValues);

        this._values = utils.transform(keys, function (values, key) {
          values[key] = props[utils.defaultKey(key)];
        }, {});
      },


      /**
       * If a prop switches from controlled to Uncontrolled
       * reset its value to the defaultValue
       */
      componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var _this = this;

        var props = this.props,
            keys = Object.keys(controlledValues);

        keys.forEach(function (key) {
          if (utils.getValue(nextProps, key) === undefined && utils.getValue(props, key) !== undefined) {
            _this._values[key] = nextProps[utils.defaultKey(key)];
          }
        });
      },
      render: function render() {
        var _this2 = this;

        var newProps = {};
        var _props = this.props;
        var valueLink = _props.valueLink;
        var checkedLink = _props.checkedLink;

        var props = _objectWithoutProperties(_props, ['valueLink', 'checkedLink']);

        utils.each(controlledValues, function (handle, propName) {
          var linkPropName = utils.getLinkName(propName),
              prop = _this2.props[propName];

          if (linkPropName && !isProp(_this2.props, propName) && isProp(_this2.props, linkPropName)) {
            prop = _this2.props[linkPropName].value;
          }

          newProps[propName] = prop !== undefined ? prop : _this2._values[propName];

          newProps[handle] = setAndNotify.bind(_this2, propName);
        });

        newProps = _extends({}, props, newProps, {
          ref: isCompositeComponent ? 'inner' : null
        });

        return _react2.default.createElement(Component, newProps);
      }
    }));

    component.ControlledComponent = Component;

    /**
     * useful when wrapping a Component and you want to control
     * everything
     */
    component.deferControlTo = function (newComponent) {
      var additions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
      var nextMethods = arguments[2];

      return uncontrollable(newComponent, _extends({}, controlledValues, additions), nextMethods);
    };

    return component;

    function setAndNotify(propName, value) {
      var linkName = utils.getLinkName(propName),
          handler = this.props[controlledValues[propName]];

      if (linkName && isProp(this.props, linkName) && !handler) {
        handler = this.props[linkName].requestChange;
      }

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      set(this, propName, handler, value, args);
    }

    function isProp(props, prop) {
      return props[prop] !== undefined;
    }
  }
}
module.exports = exports['default'];
},{"./utils":320,"invariant":79,"react":"react"}],319:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _createUncontrollable = require('./createUncontrollable');

var _createUncontrollable2 = _interopRequireDefault(_createUncontrollable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mixin = {
  shouldComponentUpdate: function shouldComponentUpdate() {
    //let the forceUpdate trigger the update
    return !this._notifying;
  }
};

function set(component, propName, handler, value, args) {
  if (handler) {
    component._notifying = true;
    handler.call.apply(handler, [component, value].concat(args));
    component._notifying = false;
  }

  component._values[propName] = value;

  if (component.isMounted()) component.forceUpdate();
}

exports.default = (0, _createUncontrollable2.default)([mixin], set);
module.exports = exports['default'];
},{"./createUncontrollable":318}],320:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.version = undefined;
exports.customPropType = customPropType;
exports.uncontrolledPropTypes = uncontrolledPropTypes;
exports.getType = getType;
exports.getValue = getValue;
exports.getLinkName = getLinkName;
exports.defaultKey = defaultKey;
exports.chain = chain;
exports.transform = transform;
exports.each = each;
exports.isReactComponent = isReactComponent;
exports.has = has;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function customPropType(handler, propType, name) {

  return function (props, propName) {

    if (props[propName] !== undefined) {
      if (!props[handler]) {
        return new Error('You have provided a `' + propName + '` prop to ' + '`' + name + '` without an `' + handler + '` handler. This will render a read-only field. ' + 'If the field should be mutable use `' + defaultKey(propName) + '`. Otherwise, set `' + handler + '`');
      }

      return propType && propType(props, propName, name);
    }
  };
}

function uncontrolledPropTypes(controlledValues, basePropTypes, displayName) {
  var propTypes = {};

  if (process.env.NODE_ENV !== 'production' && basePropTypes) {
    transform(controlledValues, function (obj, handler, prop) {
      var type = basePropTypes[prop];

      (0, _invariant2.default)(typeof handler === 'string' && handler.trim().length, 'Uncontrollable - [%s]: the prop `%s` needs a valid handler key name in order to make it uncontrollable', displayName, prop);

      obj[prop] = customPropType(handler, type, displayName);

      if (type !== undefined) obj[defaultKey(prop)] = type;
    }, propTypes);
  }

  return propTypes;
}

var version = exports.version = _react2.default.version.split('.').map(parseFloat);

function getType(component) {
  if (version[0] >= 15 || version[0] === 0 && version[1] >= 13) return component;

  return component.type;
}

function getValue(props, name) {
  var linkPropName = getLinkName(name);

  if (linkPropName && !isProp(props, name) && isProp(props, linkPropName)) return props[linkPropName].value;

  return props[name];
}

function isProp(props, prop) {
  return props[prop] !== undefined;
}

function getLinkName(name) {
  return name === 'value' ? 'valueLink' : name === 'checked' ? 'checkedLink' : null;
}

function defaultKey(key) {
  return 'default' + key.charAt(0).toUpperCase() + key.substr(1);
}

function chain(thisArg, a, b) {
  return function chainedFunction() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    a && a.call.apply(a, [thisArg].concat(args));
    b && b.call.apply(b, [thisArg].concat(args));
  };
}

function transform(obj, cb, seed) {
  each(obj, cb.bind(null, seed = seed || (Array.isArray(obj) ? [] : {})));
  return seed;
}

function each(obj, cb, thisArg) {
  if (Array.isArray(obj)) return obj.forEach(cb, thisArg);

  for (var key in obj) {
    if (has(obj, key)) cb.call(thisArg, obj[key], key, obj);
  }
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}

function has(o, k) {
  return o ? Object.prototype.hasOwnProperty.call(o, k) : false;
}
}).call(this,require('_process'))

},{"_process":151,"invariant":79,"react":"react"}],321:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = function() {};

if (process.env.NODE_ENV !== 'production') {
  warning = function(condition, format, args) {
    var len = arguments.length;
    args = new Array(len > 2 ? len - 2 : 0);
    for (var key = 2; key < len; key++) {
      args[key - 2] = arguments[key];
    }
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
      throw new Error(
        'The warning format should be able to uniquely identify this ' +
        'warning. Please, use a more descriptive format than: ' + format
      );
    }

    if (!condition) {
      var argIndex = 0;
      var message = 'Warning: ' +
        format.replace(/%s/g, function() {
          return args[argIndex++];
        });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch(x) {}
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"_process":151}],322:[function(require,module,exports){
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

},{}],323:[function(require,module,exports){
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

},{}]},{},[33])


//# sourceMappingURL=bundle.js.map
