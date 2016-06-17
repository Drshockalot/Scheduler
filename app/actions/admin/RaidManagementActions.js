import alt from '../../alt';

class RaidManagementActions {
  constructor() {
    this.generateActions(
      'updateFormRaidName',
      'updateFormRaidDescription',
      'createRaidSuccess',
      'createRaidFailure'
    );
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
}

export default alt.createActions(RaidManagementActions);
