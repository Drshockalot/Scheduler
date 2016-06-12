import alt from './../../alt';

class RaidWeekManagementActions {
  constructor() {
    this.generateActions(
      'selectedDayChanged',
      'nextYear',
      'prevYear',
      'goToToday',
      'createNewRaidWeekSuccess',
      'createNewRaidWeekFailure',
      'getAllRaidWeeksSuccess',
      'getAllRaidWeeksFailure',
      'toggleRaidWeekDay',
      'deleteRaidWeekSuccess',
      'deleteRaidWeekFailure'
    );
  }

  changeSelectedDay(date) {
    this.selectedDayChanged(date);
    return 0;
  }

  getAllRaidWeeks() {
    $.ajax({
      method: 'GET',
      url: '/api/raidweek',
    }).done((result) => {
      console.log(result);
      this.getAllRaidWeeksSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.getAllRaidWeeksFailure(jqXhr);
    });
    return 0;
  }

  createNewRaidWeek(startingDate) {
    var start = startingDate.format('YYYY MM DD')
    var end = startingDate.add(6, 'days').format('YYYY MM DD');
    $.ajax({
      method: 'POST',
      url: '/api/raidweek/admin',
      data: {start: start, end: end}
    }).done((result) => {
      console.log(result);
      this.createNewRaidWeekSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.createNewRaidWeekFailure(jqXhr);
    });
    return 0;
  }

  deleteRaidWeek(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/raidweek/admin/' + id
    }).done((result) => {
      console.log(result);
      this.deleteRaidWeekSuccess(result);
    }).fail((jqXhr) => {
      console.log(jqXhr);
      this.deleteRaidWeekFailure(jqXhr);
    });
  }
}

export default alt.createActions(RaidWeekManagementActions);