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
      'updateBossFailure',
      'restoreState'
    );
  }

  loadRaids() {
    $.ajax({
      method: 'GET',
      url: '/api/raid'
    }).done((result) => {
      this.loadRaidsSuccess(result);
    }).fail((jqXhr) => {
      this.loadRaidsFailure(jqXhr);
    });
    return 0;
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
      this.createRaidSuccess(result);
    }).fail((jqXhr) => {
      this.createRaidFailure(jqXhr);
    });
    return 0;
  }

  deleteRaid(raidId) {
    $.ajax({
      method: 'DELETE',
      url: '/api/raid/admin/' + raidId
    }).done((result) => {
      this.deleteRaidSuccess(result);
    }).fail((jqXhr) => {
      this.deleteRaidFailure(jqXhr);
    });
    return 0;
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
      this.createBossSuccess(result);
    }).fail((jqXhr) => {
      this.createBossFailure(jqXhr);
    });
    return 0;
  }

  deleteBoss(boss) {
    $.ajax({
      method: 'DELETE',
      url: '/api/boss/admin',
      data: boss
    }).done((result) => {
      this.deleteBossSuccess(result);
    }).fail((jqXhr) => {
      this.deleteBossFailure(jqXhr);
    });
    return 0;
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
      this.updateBossSuccess(result);
    }).fail((jqXhr) => {
      this.updateBossFailure(jqXhr);
    });
    return 0;
  }
}

export default alt.createActions(RaidManagementActions);
