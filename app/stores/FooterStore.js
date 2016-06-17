import alt from '../alt';
import FooterActions from '../actions/FooterActions';

class FooterStore {
  constructor() {
    this.bindActions(FooterActions);
    this.admins = ['Aeristial', 'Derp', 'Macio', 'Trallas', 'Xenorie'];
  }
}

export default alt.createStore(FooterStore);
