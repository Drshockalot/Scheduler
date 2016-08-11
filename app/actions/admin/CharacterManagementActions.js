import alt from './../../alt';

class CharacterManagementActions {
  constructor() {
    this.generateActions(
      'getCharactersForConfirmationSuccess',
      'getCharactersForConfirmationFailure',
      'confirmCharacterSuccess',
      'confirmCharacterFailure',
      'unconfirmCharacterSuccess',
      'unconfirmCharacterFailure',
      'restoreState'
    );
  }

  getCharactersForConfirmation() {
    $.ajax({
      method: 'GET',
      url: '/api/character/admin/confirmation'
    }).done((result) => {
      this.getCharactersForConfirmationSuccess(result);
    }).fail((jqXhr) => {
      this.getCharactersForConfirmationFailure(jqXhr);
    });
    return 0;
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
    return 0;
  }

  unconfirmCharacter(characterid) {
    $.ajax({
      method: 'DELETE',
      url: '/api/character/admin/unconfirm/' + characterid
    }).done((result) => {
      this.unconfirmCharacterSuccess(result);
      this.getCharactersForConfirmation();
    }).fail((jqXhr) => {
      this.unconfirmCharacterFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(CharacterManagementActions);
