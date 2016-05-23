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
      'checkLoginFailure'
    );
  }

  checkLogin() {
    $.ajax({
      url: '/auth/bnet/status'
    }).done((data) => {
      if(data) {
        this.updateBattletag(data.battletag);
        this.updateAccessToken(data.token);
        // $.ajax({
        //   method: 'POST',
        //   url: ''
        // }).done((data) => {
        //
        // }).fail((jqXhr) => {
        //
        // });
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
