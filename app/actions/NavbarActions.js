import alt from '../alt';
import {assign} from 'underscore';
import { browserHistory } from 'react-router'

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
          console.log(result);
          this.checkUserSuccess(result.user.role);
        }).fail((jqXhr) => {
          this.checkUserFailure(jqXhr);
        });
      }
    }).fail((jqXhr) => {
      this.checkLoginFailure(jqXhr);
    });
  }

  navigateProfile() {
    browserHistory.push('/profile');
  }
}

export default alt.createActions(NavbarActions);
