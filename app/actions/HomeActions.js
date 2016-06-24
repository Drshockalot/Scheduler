import alt from '../alt';
import {assign} from 'underscore';

class HomeActions {
  constructor() {
    this.generateActions(
      'placeholder'
    );
  }

  loadComponentData() {
    $.ajax({
      method: 'GET',
      url: '/api/home'
    }).done((result) => {
      console.log(result);
      this.loadComponentDataSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadComponentDataFailure(jqXhr);
    });
  }
}

export default alt.createActions(HomeActions);
