import alt from '../../alt';
import RaidManagementActions from '../../actions/admin/RaidManagementActions';

class RaidManagementStore {
  constructor() {
    this.bindActions(RaidManagementActions);
    this.formRaidName = '';
    this.formRaidDescription = '';
    this.raids = [];
    this.selectedRaid = '';
    this.formBossName = '';
    this.formBossDescription = '';
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
  }

  onUpdateFormTanks(value) {
    this.formTanks = value;
  }

  onUpdateFormHealers(value) {
    this.formHealers = value;
  }

  onUpdateFormDPS(value) {
    this.formDPS = value;
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
    this.formRaidName = '';
    this.formRaidDescription = '';
    toastr.success('Raid created', 'Success');
  }

  onCreateRaidFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onCreateBossSuccess(result) {
    this.raids = result.data.raids;
    this.formBossName = '';
    this.formBossDescription = '';
    toastr.success('Boss created', 'Success');
  }

  onCreateBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onEditBoss(boss) {
    this.formBossName = boss.name;
    this.formBossDescription = boss.description;
  }

  onDeleteBossSuccess(result) {
    this.raids = result.data.raids;
    toastr.success('Boss deleted', 'Success');
  }

  onDeleteBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }

  onDeleteRaidSuccess(result) {
    this.raids = result.data.raids;
    if(this.raids.length > 0) {
      this.selectedRaid = this.raids[0].name;
    }
    toastr.success('Raid deleted', 'Success');
  }

  onDeleteRaidFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(RaidManagementStore);
