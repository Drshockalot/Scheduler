import alt from '../../alt';
import RaidManagementActions from '../../actions/admin/RaidManagementActions';

class RaidManagementStore {
  constructor() {
    this.bindActions(RaidManagementActions);
    this.formRaidName = '';
    this.formRaidDescription = '';
    this.raids = [];
    this.selectedRaid = '';
    this.bossName = '';
    this.bossDescription = '';
  }

  onUpdateFormRaidName(e) {
    this.formRaidName = e.target.value;
  }

  onUpdateFormRaidDescription(e) {
    this.formRaidDescription = e.target.value;
  }

  onUpdateFormBossName(e) {
    this.formBossName = e.target.value;
  }

  onUpdateFormBossDescription(e) {
    this.formBossDescription = e.target.value;
  }

  onUpdateSelectedRaid(value) {
    this.selectedRaid = value;
  }

  onLoadRaidsSuccess(result) {
    this.raids = result.data.raids;
    if(this.raids.length > 0) {
      this.selectedRaid = this.raids[0].name;
    }
  }

  onLoadRaidsFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateRaidSuccess(result) {
    this.raids = result.data.raids;
    toastr.success('Raid created', 'Success');
  }

  onCreateRaidFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateBossSuccess(result) {
    this.raids = result.data.raids;
    toastr.success('Boss created', 'Success');
  }

  onCreateBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(RaidManagementStore);
