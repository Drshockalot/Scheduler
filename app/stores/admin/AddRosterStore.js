import alt from '../../alt'
import AddRosterActions from '../../actions/admin/AddRosterActions';

class AddRosterStore {
  constructor() {
    this.bindActions(AddRosterActions);
    this.rosterName = '';
    this.addRosterResultMessage = '';
  }

  onUpdateRosterName(e) {
    console.log(e.target.value)
    this.rosterName = e.target.value;
  }

  onAddRosterSuccess(rosterName) {
    this.addRosterResultMessage = rosterName + ' has successfully been added';
  }

  onAddRosterFailure() {
    this.addRosterResultMessage = 'Unable to add roster';
  }
}

export default alt.createStore(AddRosterStore);
