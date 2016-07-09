import alt from '../../alt';

class RaidManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidName',
      'updateFormRaidDescription',
      'updateFormBossName',
      'updateFormBossPublicNote',
      'updateFormBossOfficerNote',
      'createRaidSuccess',
      'createRaidFailure',
      'loadRaidsSuccess',
      'loadRaidsFailure',
      'updateSelectedRaid',
      'createBossSuccess',
      'createBossFailure',
      'editBoss',
      'deleteBossSuccess',
      'deleteBossFailure',
      'deleteRaidSuccess',
      'deleteRaidFailure',
      'updateFormTanks',
      'updateFormHealers',
      'updateFormDPS',
      'updateEditFormTanks',
      'updateEditFormHealers',
      'updateEditFormDPS',
      'updateEditFormBossName',
      'updateEditFormBossPublicNote',
      'updateEditFormBossOfficerNote',
      'editBoss',
      'showEditBossModal',
      'closeEditBossModal',
      'updateBossSuccess',
      'updateBossFailure'
    );
  }

  loadRaids() {
    $.ajax({
      method: 'GET',
      url: '/api/raid'
    }).done((result) => {
      console.log(result);
      this.loadRaidsSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.loadRaidsFailure(jqXhr);
    });
  }

  createRaid(raidName, raidDescription) {
    var data = {};
    data.name = raidName;
    data.description = raidDescription;
    $.ajax({
      method: 'POST',
      url: '/api/raid/admin',
      data: data
    }).done((result) => {
      console.log(result);
      this.createRaidSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.createRaidFailure(jqXhr);
    });
  }

  deleteRaid(raidId) {
    $.ajax({
      method: 'DELETE',
      url: '/api/raid/admin/' + raidId
    }).done((result) => {
      console.log(result);
      this.deleteRaidSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.deleteRaidFailure(jqXhr);
    });
  }

  createBoss(bossName, bossPublicNote, bossOfficerNote, raidId, tank_count, healer_count, dps_count) {
    var data = {};
    data.name = bossName;
    data.publicNote = bossPublicNote;
    data.officerNote = bossOfficerNote;
    data.raidId = raidId;
    data.tank_count = tank_count;
    data.healer_count = healer_count;
    data.dps_count = dps_count;
    $.ajax({
      method: 'POST',
      url: '/api/boss/admin',
      data: data
    }).done((result) => {
      console.log(result);
      this.createBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.createBossFailure(jqXhr);
    });
  }

  deleteBoss(boss) {
    $.ajax({
      method: 'DELETE',
      url: '/api/boss/admin',
      data: boss
    }).done((result) => {
      console.log(result);
      this.deleteBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.deleteBossFailure(jqXhr);
    });
  }

  updateBoss(bossId, bossName, bossPublicNote, bossOfficerNote, tank_count, healer_count, dps_count) {
    var data = {};
    data.name = bossName;
    data.publicNote = bossPublicNote;
    data.officerNote = bossOfficerNote;
    data.bossId = bossId;
    data.tank_count = tank_count;
    data.healer_count = healer_count;
    data.dps_count = dps_count;
    $.ajax({
      method: 'PUT',
      url: '/api/boss/admin',
      data: data
    }).done((result) => {
      console.log(result);
      this.updateBossSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.updateBossFailure(jqXhr);
    });
  }
}

export default alt.createActions(RaidManagementActions);
