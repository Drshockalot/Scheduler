import alt from '../alt';
import {assign} from 'underscore';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateAjaxAnimation',
      'updateSearchQuery',
      'getCharacterCountSuccess',
      'getCharacterCountFail',
      'findCharacterSuccess',
      'findCharacterFail',
      'updateBattletag',
      'updateAccessToken',
      'checkLoginFailure',
      'checkUserSuccess',
      'checkUserFailure',
      'restoreState'
    );
  }

  checkLogin() {
    $.ajax({
      url: '/auth/bnet/status'
    }).done((data) => {
      if(data) {
        this.updateBattletag(data.battletag);
        sessionStorage.battletag = data.battletag;
        $.ajax({
          method: 'POST',
          url: '/api/user/log',
          data: { battletag: data.battletag, role: 'member', token: data.token}
        }).done((result) => {
          this.checkUserSuccess(result.data.user.role);
          sessionStorage.role = result.data.user.role;
          sessionStorage.loggedin = 'y';
        }).fail((jqXhr) => {
          this.checkUserFailure(jqXhr);
        });
      }
    }).fail((jqXhr) => {
      this.checkLoginFailure(jqXhr);
    });
    return 0;
  }

  navigateProfile() {
    browserHistory.push('/profile');
    return 0;
  }
}

export default alt.createActions(NavbarActions);
