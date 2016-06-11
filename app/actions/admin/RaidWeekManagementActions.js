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
    var start = startingDate.format('DD MM YYYY')
    var end = startingDate.add(7, 'days').format('DD MM YYYY');
    $.ajax({
      method: 'POST',
      url: '/api/raidweek/admin',
      data: {start: start, end: end}
    }).done((result) => {
      this.createNewRaidWeekSuccess(result);
    }).fail((jqXhr) => {
      this.createNewRaidWeekFailure(jqXhr);
    });
  }
}

export default alt.createActions(RaidWeekManagementActions);
