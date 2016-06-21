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
        if(raidweek.id === this.state.formRaidWeek) {
          formRaidWeekId = raidweek.id;
        }

        return (
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        );
      }, this);

      selectedRaidWeekOptions = this.state.raidweeks.map(function(raidweek, index) {
        if(raidweek.id === this.state.selectedRaidWeek) {
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
        if(schedule.id === this.state.selectedSchedule.id) {
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

    var formRaidNameOptions, formBossNameOptions;

    if(this.state.raids)

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
                      <select className='form-control' id='scheduleRaidWeek' value={this.state.formRaidWeek} onChange={e => ScheduleManagementActions.updateFormRaidWeek(parseInt(e.target.value))}>
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
                  <button className='btn btn-default pull-right' onClick={() => ScheduleManagementActions.createSchedule(this.state.formRaidWeek, this.state.formScheduleName, this.state.formScheduleDescription)}>Submit</button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <h3>Manage Schedule</h3>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Raid Week:</label>
                    <div className='col-sm-10'>
                      <select className='form-control' value={this.state.selectedRaidWeek} onChange={e => ScheduleManagementActions.updateSelectedRaidWeek(e.target.value)}>
                        {selectedRaidWeekOptions}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Schedule: </label>
                    <div className='col-sm-10'>
                      <select className='form-control' value={this.state.selectedSchedule} onChange={e => ScheduleManagementActions.updateSelectedSchedule(e.target.value)}>
                        {selectedScheduleOptions}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-6'>
                <h3>Add Boss</h3>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Raid:</label>
                    <div className='col-sm-10'>
                      <select className='form-control' value={this.state.formRaid} onChange={e => ScheduleManagementActions.updateFormRaid(e.target.value)}>
                        {formRaidNameOptions}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Boss:</label>
                    <div className='col-sm-10'>
                      <select className='form-control' value={this.state.formBoss} onChange={e => ScheduleManagementActions.updateFormBoss(e.target.value)}>
                        {formBossNameOptions}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Tanks:</label>
                    <div className='col-sm-2'>
                      <input type='number' className='form-control' value={this.state.formTanks} onChange={e => ScheduleManagementActions.updateFormTanks(e.target.value)} />
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormTanks(1)}>1</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormTanks(2)}>2</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormTanks(3)}>3</button>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Healers:</label>
                    <div className='col-sm-2'>
                      <input type='number' className='form-control' value={this.state.formHealers} onChange={e => ScheduleManagementActions.updateFormHealers(e.target.value)} />
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormHealers(2)}>2</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormHealers(3)}>3</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormHealers(4)}>4</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormHealers(5)}>5</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormHealers(6)}>6</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormHealers(7)}>7</button>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>DPS:</label>
                    <div className='col-sm-2'>
                      <input type='number' className='form-control' value={this.state.formDPS} onChange={e => ScheduleManagementActions.updateFormDPS(e.target.value)} />
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(10)}>10</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(11)}>11</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(12)}>12</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(13)}>13</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(14)}>14</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(15)}>15</button>
                    </div>
                    <div className='col-sm-1'>
                      <button className='btn btn-default' onClick={() => ScheduleManagementActions.setFormDPS(16)}>16</button>
                    </div>
                  </div>
                  <button className='btn btn-primary' onClick={() => ScheduleManagementActions.addBossToSchedule(this.state.formRaid,
                                                                                                                 this.state.formBoss,
                                                                                                                 this.state.formTanks,
                                                                                                                 this.state.formHealers,
                                                                                                                 this.state.formDPS,
                                                                                                                 this.state.selectedSchedule)}>Submit</button>
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
