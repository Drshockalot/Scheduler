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
    $.ajax({
      method: 'GET',
      url: 'https://eu.api.battle.net/wow/user/characters?locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g&access_token=' + NavbarStore.getState().accessToken
    }).done((data) => {
      this.populateRetrievedCharactersSuccess(data);
    }).fail((jqXhr) => {
      this.populateRetrievedCharactersFailure(jqXhr);
    });
  }

  confirmMainCharacter(character) {
    console.log(character);
    character.rank = 'main';
    character.battletag = NavbarStore.getState().battletag;
    console.log(character);
    $.ajax({
      method: 'POST',
      url: '/api/character/confirm',
      data: character
    }).done((result) => {
      console.log(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
    });

  }

    confirmAltCharacter(event) {
      console.log(character);
      character.rank = 'alt';
      character.battletag = NavbarStore.getState().battletag;
      console.log(character);
      $.ajax({
        method: 'POST',
        url: '/api/character/confirm',
        data: character
      }).done((result) => {

      }).fail((jqXhr) => {

      });
  }
}

export default alt.createActions(ProfileActions);
