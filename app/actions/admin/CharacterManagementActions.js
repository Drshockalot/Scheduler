import alt from './../../alt';

class CharacterManagementActions {
  constructor() {
    this.generateActions(
      'getCharactersForConfirmationSuccess',
      'getCharactersForConfirmationFailure'
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
}

export default alt.createActions(CharacterManagementActions);
