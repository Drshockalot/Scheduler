import alt from '../alt';
import {assign} from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class ProfileActions {
  constructor() {
    this.generateActions(
      'placeholder'
    );
  }
}

export default alt.createActions(ProfileActions);
