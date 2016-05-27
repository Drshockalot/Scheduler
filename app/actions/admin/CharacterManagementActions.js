import alt from './../../alt';

class CharacterManagementActions {
  constructor() {
    this.generateActions(
      'getCharactersForConfirmationSuccess',
      'getCharactersForConfirmationFailure',
      'confirmCharacterSuccess',
      'confirmCharacterFailure',
      'unconfirmCharacterSuccess',
      'unconfirmCharacterFailure'
    );
  }

  getCharactersForConfirmation() {
    $.ajax({
      method: 'GET',
      url: '/api/character/admin/confirmation'
    }).done((result) => {
      console.log(result);
      this.getCharactersForConfirmationSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.getCharactersForConfirmationFailure(jqXhr);
    });
  }

  confirmCharacter(characterid) {
    $.ajax({
      method: 'PUT',
      url: '/api/character/admin/confirm/' + characterid
    }).done((result) => {
      this.confirmCharacterSuccess(result);
      this.getCharactersForConfirmation();
    }).fail((jqXhr) => {
      this.confirmCharacterFailure(jqXhr);
    });
  }

  unconfirmCharacter(chracterid) {
    $.ajax({
      method: 'DELETE',
      url: '/api/character/admin/unconfirm/' + characterid
    }).done((result) => {
      this.unconfirmCharacterSuccess(result);
      this.getCharactersForConfirmation();
    }).fail((jqXhr) => {
      this.unconfirmCharacterFailure(jqXhr);
    });
  }
}

export default alt.createActions(CharacterManagementActions);
