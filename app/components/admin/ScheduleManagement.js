import React from 'react';
import {Link} from 'react-router';
import ScheduleManagementStore from './../../stores/admin/ScheduleManagementStore';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';
import moment from 'moment';

class ScheduleManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = ScheduleManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentDidMount() {
    ScheduleManagementStore.listen(this.onChange);
    ScheduleManagementActions.loadComponentData();
  }

  componentWillUnmount() {
    ScheduleManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var raidWeekOptions, selectedRaidWeekOptions, selectedScheduleOptions;
    var formRaidWeekId, selectedRaidWeekId, selectedScheduleId;
    if(this.state.raidweeks.length > 0) {
      raidWeekOptions = this.state.raidweeks.map(function(raidweek, index) {
        if(moment(raidweek.start).format('W') === this.state.formRaidWeek) {
          formRaidWeekId = raidweek.id;
        }

        return (
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        );
      }, this);

      selectedRaidWeekOptions = this.state.raidweeks.map(function(raidweek, index) {
        if(moment(raidweek.start).format('W') === this.state.selectedRaidWeek) {
          selectedRaidWeekId = raidweek.id;
        }

        return (
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        );
      }, this);
    }

    if(this.state.schedules.length > 0) {
      let optionCount = 0;
      selectedScheduleOptions = this.state.schedules.map(function(schedule, index) {
        if(schedule.name === this.state.selectedSchedule.name) {
          selectedScheduleId = schedule.id;
        }

        if(schedule.raid_week_id === selectedRaidWeekId) {
          optionCount++;
          return (
            <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
          );
        }
      }, this);

      if(optionCount === 0) {
        selectedScheduleOptions = (
          <option>No Schedules</option>
        );
      }
    }

    return (
      <div id='wrapper'>
        <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <h3>Create Schedule</h3>
              <div className='col-md-6'>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='scheduleRaidWeek'>Raid Week</label>
                    <div className='col-sm-10'>
                      <select className='form-control' id='scheduleRaidWeek' value={this.state.formRaidWeek} onChange={e => ScheduleManagementActions.updateFormRaidWeek(e.target.value)}>
                        {raidWeekOptions}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='scheduleName'>Name</label>
                    <div className='col-sm-10'>
                      <input className='form-control' name='scheduleName' value={this.state.formScheduleName} onChange={e => ScheduleManagementActions.updateFormScheduleName(e.target.value)} />
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='scheduleDescription'>Description</label>
                    <div className='col-sm-10'>
                      <textarea className='form-control' name='scheduleDescription' value={this.state.formScheduleDescription} onChange={e => ScheduleManagementActions.updateFormScheduleDescription(e.target.value)} />
                    </div>
                  </div>
                  <button className='btn btn-default pull-right' onClick={() => ScheduleManagementActions.createSchedule(formRaidWeekId, this.state.formScheduleName, this.state.formScheduleDescription)}>Submit</button>
                </div>
              </div>
            </div>
            <div className='row'>
              <h3>Manage Schedule</h3>
              <div className='row'>
                <div className='col-md-6'>
                  <select className='form-control' value={this.state.selectedRaidWeek} onChange={e => ScheduleManagementActions.updateSelectedRaidWeek(e.target.value)}>
                    {selectedRaidWeekOptions}
                  </select>
                </div>
                <div className='col-md-6'>
                  <select className='form-control' value={this.state.selectedSchedule} onChange={e => ScheduleManagementActions.updateSelectedSchedule(e.target.value)}>
                    {selectedScheduleOptions}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleManagement;
