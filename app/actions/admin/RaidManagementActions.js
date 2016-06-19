import alt from '../../alt';

class RaidManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidName',
      'updateFormRaidDescription',
      'updateFormBossName',
      'updateFormBossDescription',
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
      'deleteRaidFailure'
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

  createBoss(bossName, bossDescription, raidId) {
    var data = {};
    data.name = bossName;
    data.description = bossDescription;
    data.raidId = raidId;
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
}

export default alt.createActions(RaidManagementActions);
