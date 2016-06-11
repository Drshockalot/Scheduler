import alt from './../../alt';

class RaidWeekManagementActions {
  constructor() {
    this.generateActions(
      'selectedDayChanged',
      'nextYear',
      'prevYear',
      'goToToday',
      'createNewRaidWeekSuccess',
      'createNewRaidWeekFailure'
    );
  }

  changeSelectedDay(date) {
    this.selectedDayChanged(date);
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
      this.createNewRaidWeekSuccess(result);
      console.log(result);
    }).fail((jqXhr) => {
      this.createNewRaidWeekFailure(jqXhr);
      console.log(jqXhr);
    });
  }
}

export default alt.createActions(RaidWeekManagementActions);
