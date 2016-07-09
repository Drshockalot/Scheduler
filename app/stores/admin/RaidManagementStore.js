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
    this.formBossPublicNote = '';
    this.formBossOfficerNote = '';
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
    this.showEditBossModal = false;
    this.editFormBossId = 0;
    this.editFormBossName = '';
    this.editFormBossPublicNote = '';
    this.editFormBossOfficerNote = '';
    this.editFormTanks = 0;
    this.editFormHealers = 0;
    this.editFormDPS = 0;
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

  onUpdateFormBossPublicNote(e) {
    this.formBossPublicNote = e.target.value;
  }

  onUpdateFormBossOfficerNote(e) {
    this.formBossOfficerNote = e.target.value;
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
    this.formBossPublicNote = '';
    this.formBossOfficerNote = '';
    this.formTanks = 0;
    this.formHealers = 0;
    this.formDPS = 0;
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

  onEditBoss(boss) {
    this.editFormBossId = boss.id;
    this.editFormBossName = boss.name;
    this.editFormBossPublicNote = boss.public_note;
    this.editFormBossOfficerNote = boss.officer_note;
    this.editFormTanks = boss.tank_count;
    this.editFormHealers = boss.healer_count;
    this.editFormDPS = boss.dps_count;
    this.showEditBossModal = true;
  }

  onShowEditBossModal() {
    this.showEditBossModal = true;
  }

  onCloseEditBossModal() {
    this.showEditBossModal = false;
  }

  onUpdateEditFormTanks(value) {
    this.editFormTanks = value;
  }

  onUpdateEditFormHealers(value) {
    this.editFormHealers = value;
  }

  onUpdateEditFormDPS(value) {
    this.editFormDPS = value;
  }

  onUpdateEditFormBossName(value) {
    this.editFormBossName = value;
  }

  onUpdateEditFormBossPublicNote(value) {
    this.editFormBossPublicNote = value;
  }

  onUpdateEditFormBossOfficerNote(value) {
    this.editFormBossOfficerNote = value;
  }

  onUpdateBossSuccess(result) {
    this.raids = result.data.raids;
    this.editFormBossName = '';
    this.editFormBossPublicNote = '';
    this.editFormBossOfficerNote = '';
    this.editFormTanks = 0;
    this.editFormHealers = 0;
    this.editFormDPS = 0;
    this.showEditBossModal = false;
    toastr.success('Boss updated', 'Success');
  }

  onUpdateBossFailure(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(RaidManagementStore);
