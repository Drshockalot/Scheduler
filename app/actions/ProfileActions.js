import alt from '../alt';
import {assign} from 'underscore';
var bnet = require('battlenet-api')(process.env.BNET_ID);
import NavbarStore from '../stores/NavbarStore';

class ProfileActions {
  constructor() {
    this.generateActions(
      'populateRetreivedCharacters'
    );
  }

  retreiveProfileCharacters() {
    bnet.account.wow({ origin: 'eu', access_token: NavbarStore.getState().accessToken }, function(data) {
      this.populateRetreivedCharacters(data);
    });
  }
}

export default alt.createActions(ProfileActions);
