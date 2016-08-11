import alt from '../alt';
import {assign} from 'underscore';

class HomeActions {
  constructor() {
    this.generateActions(
      'loadComponentDataSuccess',
      'loadComponentDataFailure',
      'restoreState'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/home'
    }).done((result) => {
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      this.loadComponentDataFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(HomeActions);
