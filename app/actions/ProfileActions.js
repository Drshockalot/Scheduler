import alt from '../alt';
import {assign} from 'underscore';
var bnet = require('battlenet-api')(process.env.BNET_ID);
import NavbarStore from '../stores/NavbarStore';

class ProfileActions {
  constructor() {
    this.generateActions(
      'populateRetrievedCharactersSuccess',
      'populateRetrievedCharactersFailure',
      'confirmCharacterSuccess',
      'confirmCharacterFailure',
      'updateStoredCharactersSuccess',
      'updateStoredCharactersFailure'
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

  confirmCharacter(character) {
    character.battletag = NavbarStore.getState().battletag;
    $.ajax({
      method: 'POST',
      url: '/api/character/confirm/' + encodeURIComponent(NavbarStore.getState().battletag),
      data: character
    }).done((result) => {
      console.log(result);
      this.confirmCharacterSuccess(result);
      $.ajax({
        method: 'GET',
        url: '/api/character/confirmed/' + encodeURIComponent(NavbarStore.getState().battletag)
      }).done((result_) => {
        console.log(result_);
        this.updateStoredCharactersSuccess(result_);
      }).fail((jqXhr_) => {
        console.log(jqXhr_);
        this.updateStoredCharactersFailure(jqXhr_);
      });
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.confirmCharacterFailure(jqXhr);
    });
  }

  getStoredCharacters() {
    $.ajax({
      method: 'GET',
      url: '/api/character/confirmed/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      console.log(result);
      this.updateStoredCharactersSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.updateStoredCharactersFailure(jqXhr);
    });
  }
}

export default alt.createActions(ProfileActions);
