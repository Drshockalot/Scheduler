import alt from './../../alt';

class RaidWeekManagementActions {
  constructor() {
    this.generateActions(
      'selectedDayChanged',
      'nextYear',
      'prevYear',
      'goToToday'
    );
  }

  changeSelectedDay(date) {
    this.selectedDayChanged(date);
  }
}

export default alt.createActions(RaidWeekManagementActions);
