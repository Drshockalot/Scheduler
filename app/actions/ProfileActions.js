import alt from '../alt';
import {assign} from 'underscore';
var bnet = require('battlenet-api')(process.env.BNET_ID);
import NavbarStore from '../stores/NavbarStore';

class ProfileActions {
  constructor() {
    this.generateActions(
      'populateRetrievedCharactersSuccess',
      'populateRetrievedCharactersFailure'
    );
  }

  retrieveProfileCharacters() {
    // bnet.account.wow({ origin: 'eu', access_token: NavbarStore.getState().accessToken }, function(err, body, res) {
    //   this.populateRetreivedCharacters(data);
    // });
    $.ajax({
      method: 'GET',
      url: 'https://eu.api.battle.net/wow/users/characters?locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g&access_token=' + NavbarStore.getState().accessToken
    }).done((data) => {
      this.populateRetrievedCharactersSuccess(data);
    }).fail((jqXhr) => {
      this.populateRetrievedCharactersFailure(jqXhr);
    });
  }
}

export default alt.createActions(ProfileActions);
