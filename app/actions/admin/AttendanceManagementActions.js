import alt from '../../alt';

class AttendaceManagementActions {
  constructor() {
    this.generateActions(
      'loadComponentDataSuccess',
      'loadComponentDataFailure'
    );
  }

  loadComponentData() {

  }
}

export default alt.createActions(AttendaceManagementActions);
