import alt from '../../alt'
import AddRosterActions from '../../actions/admin/AddRosterActions';

class AddRosterStore {
  constructor() {
    this.bindActions(AddRosterActions);
    this.rosterName = '';
    this.rosterDescription = '';
  }

  onUpdateRosterName(e) {
    this.rosterName = e.target.value;
  }

  onUpdateRosterDescription(e) {
    this.rosterDescription = e.target.value;
  }

  onAddRosterSuccess(rosterName) {
    
  }

  onAddRosterFailure() {
    this.addRosterResultMessage = 'Unable to add roster';
  }
}

export default alt.createStore(AddRosterStore);
