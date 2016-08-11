import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ProfileCharactersActions {
  constructor() {
    this.generateActions(
      'populateRetrievedCharactersSuccess',
      'populateRetrievedCharactersFailure',
      'confirmCharacterSuccess',
      'confirmCharacterFailure',
      'updateChosenCharactersSuccess',
      'updateChosenCharactersFailure',
      'handleMainRoleChange',
      'handleOffRoleChange',
      'saveChosenCharacterDetailsSuccess',
      'saveChosenCharacterDetailsFailure',
      'deleteChosenCharacterSuccess',
      'deleteChosenCharacterFailure',
      'retrieveAverageIlvlFailure',
      'updateCharacterIlvl',
      'getChosenCharactersSuccess',
      'getChosenCharactersFailure',
      'restoreState'
    );
  }

  retrieveProfileCharacters() {
    $.ajax({
      method: 'GET',
      url: '/api/character/blizzard'
    }).done((data) => {
      this.populateRetrievedCharactersSuccess(data);
    }).fail((jqXhr) => {
      this.populateRetrievedCharactersFailure(jqXhr);
    });
    return 0;
  }

  getChosenCharacters() {
    $.ajax({
      method: 'GET',
      url: '/api/character/confirmed/' + encodeURIComponent(NavbarStore.getState().battletag)
    }).done((result) => {
      this.getChosenCharactersSuccess(result);
    }).fail((jqXhr) => {
      this.getChosenCharactersFailure(jqXhr);
    });
    return 0;
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
      this.getChosenCharacters();
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.confirmCharacterFailure(jqXhr);
    });
    return 0;
  }

  saveChosenCharacterDetails(character) {
    $.ajax({
      method: 'PUT',
      url: '/api/character/' + character.id,
      data: character
    }).done((result) => {
      this.saveChosenCharacterDetailsSuccess(result);
    }).fail((jqXhr) => {
      this.saveChosenCharacterDetailsFailure(jqXhr);
    });
    return 0;
  }

  deleteChosenCharacter(character) {
    $.ajax({
      method: 'DELETE',
      url: '/api/character/' + character.id,
      data: character
    }).done((result) => {
      this.deleteChosenCharacterSuccess(character.name);
      this.getChosenCharacters();
    }).fail((jqXhr) => {
      this.deleteChosenCharacterFailure(jqXhr);
    });
    return 0;
  }

  updateIlvlForCharacter(character, index) {
    $.ajax({
      method: 'GET',
      url: 'https://eu.api.battle.net/wow/character/' + character.realm + '/' + character.name + '?fields=items&locale=en_GB&apikey=8fc24vcgky6r8yzja8a4efxncgu8z77g'
    }).done((result) => {
      character.average_ilvl = result.items.averageItemLevel;
      this.saveChosenCharacterDetails(character);
      this.updateCharacterIlvl(result.items.averageItemLevel, index);
    }).fail((jqXhr) => {
      this.retrieveAverageIlvlFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(ProfileCharactersActions);
