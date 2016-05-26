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
      'updateStoredCharactersFailure',
      'handleMainRoleChange',
      'handleOffRoleChange',
      'saveStoredCharacterDetailsSuccess',
      'saveStoredCharacterDetailsFailure',
      'deleteStoredCharacterSuccess',
      'deleteStoredCharacterFailure',
      'retrieveAverageIlvlFailure',
      'updateCharacterIlvl'
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

  confirmCharacter(character) {
    character.battletag = NavbarStore.getState().battletag;
    $.ajax({
      method: 'POST',
      url: '/api/character/confirm/' + encodeURIComponent(NavbarStore.getState().battletag),
      data: character
    }).done((result) => {
      console.log(result);
      this.confirmCharacterSuccess(result);
      this.getStoredCharacters();
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.confirmCharacterFailure(jqXhr);
    });
  }

  saveStoredCharacterDetails(character) {
    $.ajax({
      method: 'PUT',
      url: '/api/character/' + character.id,
      data: character
    }).done((result) => {
      this.saveStoredCharacterDetailsSuccess(result);
      //this.getStoredCharacters();
    }).fail((jqXhr) => {
      this.saveStoredCharacterDetailsFailure(jqXhr);
    });
  }

  deleteStoredCharacter(character) {
    $.ajax({
      method: 'DELETE',
      url: '/api/character/' + character.id,
      data: character
    }).done((result) => {
      this.deleteStoredCharacterSuccess(character.name);
      this.getStoredCharacters();
    }).fail((jqXhr) => {
      this.deleteStoredCharacterFailure(jqXhr);
    });
  }

  updateIlvlForCharacter(character, index) {
    $.ajax({
      method: 'GET',
      url: 'https://eu.api.battle.net/wow/character/' + character.realm + '/' + character.name + '?fields=items&locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g'
    }).done((result) => {
      character.average_ilvl = result.items.averageItemLevel;
      this.saveStoredCharacterDetails(character);
      this.updateCharacterIlvl(result.items.averageItemLevel, index);
    }).fail((jqXhr) => {
      this.retrieveAverageIlvlFailure(jqXhr);
    });
  }
}

export default alt.createActions(ProfileActions);
