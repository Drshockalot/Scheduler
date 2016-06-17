import alt from '../../alt';
import RaidManagementActions from '../../actions/admin/RaidManagementActions';

class RaidManagementStore {
  constructor() {
    this.bindActions(RaidManagementActions);
    this.formRaidName = '';
    this.formRaidDescription = '';
    this.raids = [];
  }

  onUpdateFormRaidName(e) {
    this.formRaidName = e.target.value;
  }

  onUpdateFormRaidDescription(e) {
    this.formRaidDescription = e.target.value;
  }

  onCreateRaidSuccess(result) {
    this.raids = result.data.raids;
    toastr.success('Raid Created', 'Success');
  }

  onCreateRaidFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(RaidManagementStore);
