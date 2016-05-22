import alt from '../alt';
import RegisterActions from '../actions/RegisterActions';

class RegisterStore {
  constructor() {
    this.bindActions(RegisterActions);
    this.test = '';
  }
}

export default alt.createStore(RegisterStore);
