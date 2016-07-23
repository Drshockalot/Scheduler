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
      'checkUserFailure'
    );
  }

  checkLogin() {
    $.ajax({
      url: '/auth/bnet/status'
    }).done((data) => {
      if(data) {
        this.updateBattletag(data.battletag);
        this.updateAccessToken(data.token);
        $.ajax({
          method: 'POST',
          url: '/api/user/log',
          data: { battletag: data.battletag, role: 'member' }
        }).done((result) => {
          this.checkUserSuccess(result.data.user.role);
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
