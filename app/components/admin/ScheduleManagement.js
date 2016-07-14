import React from 'react';
import {Link} from 'react-router';
import ScheduleManagementStore from './../../stores/admin/ScheduleManagementStore';
import ScheduleManagementActions from './../../actions/admin/ScheduleManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';
import moment from 'moment';
var _ = require('underscore');
import classNames from 'classnames';
var wowClasses = require('./../../../utility/WowClasses');

import { Modal, OverlayTrigger, Popover } from 'react-bootstrap';

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

  classColour(character) {
    let currentClass = _.findWhere(wowClasses, {id: parseInt(character.class)}).name;
    var arr = currentClass.split(" ");

    var ret = '';
    for (var i = 0; i < arr.length; ++i) {
      ret += arr[i].toLowerCase();
      ret += '-';
    }

    ret += 'color';
    return classNames(ret, { 'col-sm-1' : true});;
  }

  render() {
    var raidWeekOptions, selectedRaidWeekOptions, selectedScheduleOptions, formRosterOptions;
    var formRaidWeekId, selectedRaidWeekId, selectedScheduleId, selectedRosterId;

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

    if(this.state.rosters.length > 0) {
      formRosterOptions = this.state.rosters.map(function(roster, index) {
        if(roster.id === this.state.formRoster) {
          selectedRosterId = roster.id;
        }

        return (
          <option key={roster.id} value={roster.id}>{roster.name}</option>
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

    var formRaidOptions, formBossOptions;

    if(this.state.raids.length > 0) {
      let optionCount = 0;
      formRaidOptions = this.state.raids.map(function(raid, index) {
        if(raid.id == this.state.formRaid) {
          if(raid.bosses.length > 0) {
            formBossOptions = raid.bosses.map(function(boss, index) {
              return (
                <option key={boss.id} value={boss.id}>{boss.name}</option>
              );
            }, this);
          } else {
            formBossOptions = <option>No Bosses</option>;
          }

          return (
            <option key={raid.id} value={raid.id}>{raid.name}</option>
          );
        }
      }, this);
    }

    var scheduleBossRows;
    var tankRows, healerRows, dpsRows;

    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////
    /////                 START OF SCHEDULE BOSS PROCESSING                               /////
    ///////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////

    if(this.state.schedules.length > 0 && _.findWhere(this.state.schedules, {raid_week_id: this.state.selectedRaidWeek})) {
      var sched;
      for(var i = 0; i < this.state.schedules.length; i++) {
        if(this.state.schedules[i].id == this.state.selectedSchedule) {
          sched = this.state.schedules[i];
        }
      }

      scheduleBossRows = _.sortBy(sched.schedule_bosses, 'id').map(function(schedule_boss, index) {
        var tankCount = 0;
        tankRows = sched.roster.characters.map(function(character, index) {
          if(character.main_role == "Tank") {
            var char = _.findWhere(schedule_boss.characters, {id: character.id});
            var availability = _.findWhere(character.user.user_availability, {id: this.state.selectedRaidWeek});
            var availabilityPopover = ScheduleManagementActions.generateAvailabilityPopover(availability, character.name);
            var actionButton;
            if(char) {
              tankCount++;
              actionButton = (
                <button className='btn btn-success btn-circle' onClick={() => ScheduleManagementActions.removeCharacterFromScheduleBoss(schedule_boss.id, character.id)}>&#10003;</button>
              );
            } else {
              actionButton = (
                <button className='btn btn-default btn-circle' onClick={() => ScheduleManagementActions.addCharacterToScheduleBoss(schedule_boss.id, character.id)}></button>
              );
            }

            var classCSS = this.classColour(character);
            return (
              <tr>
                <td className={classCSS} />
                <td className='col-sm-3 vert-align' >
                  {availabilityPopover}
                </td>
                <td className='col-sm-2 vert-align'>
                  <strong>{character.main_role}</strong>
                </td>
                <td className='col-sm-2 vert-align'>
                  {character.off_role}
                </td>
                <td className='col-sm-2 low-padding'>
                  {actionButton}
                </td>
              </tr>
            );
          }
        }, this);

        var healerCount = 0;
        healerRows = sched.roster.characters.map(function(character, index) {
          if(character.main_role == "Healer") {
            var char = _.findWhere(schedule_boss.characters, {id: character.id});
            var availability = _.findWhere(character.user.user_availability, {id: this.state.selectedRaidWeek});
            var availabilityPopover = ScheduleManagementActions.generateAvailabilityPopover(availability, character.name);
            var actionButton;
            if(char) {
              healerCount++;
              actionButton = (
                <button className='btn btn-success btn-circle' onClick={() => ScheduleManagementActions.removeCharacterFromScheduleBoss(schedule_boss.id, character.id)}>&#10003;</button>
              );
            } else {
              actionButton = (
                <button className='btn btn-default btn-circle' onClick={() => ScheduleManagementActions.addCharacterToScheduleBoss(schedule_boss.id, character.id)}></button>
              );
            }

            var classCSS = this.classColour(character);
            return (
              <tr>
                <td className={classCSS} />
                <td className='col-sm-3 vert-align'>
                  {availabilityPopover}
                </td>
                <td className='col-sm-2 vert-align'>
                  <strong>{character.main_role}</strong>
                </td>
                <td className='col-sm-2 vert-align'>
                  {character.off_role}
                </td>
                <td className='col-sm-2 low-padding'>
                  {actionButton}
                </td>
              </tr>
            );
          }
        }, this);

        var dpsCount = 0;
        dpsRows = sched.roster.characters.map(function(character, index) {
          if(character.main_role == "DPS") {
            var char = _.findWhere(schedule_boss.characters, {id: character.id});
            var availability = _.findWhere(character.user.user_availability, {id: this.state.selectedRaidWeek});
            var availabilityPopover = ScheduleManagementActions.generateAvailabilityPopover(availability, character.name);
            var actionButton;
            if(char) {
              dpsCount++;
              actionButton = (
                <button className='btn btn-success btn-circle' onClick={() => ScheduleManagementActions.removeCharacterFromScheduleBoss(schedule_boss.id, character.id)}>&#10003;</button>
              );
            } else {
              actionButton = (
                <button className='btn btn-default btn-circle' onClick={() => ScheduleManagementActions.addCharacterToScheduleBoss(schedule_boss.id, character.id)}></button>
              );
            }

            var classCSS = this.classColour(character);
            return (
              <tr>
                <td className={classCSS} />
                <td className='col-sm-4 vert-align'>
                  {availabilityPopover}
                </td>
                <td className='col-sm-3 vert-align'>
                  <strong>{character.main_role}</strong>
                </td>
                <td className='col-sm-2 low-padding'>
                  {actionButton}
                </td>
              </tr>
            );
          }
        }, this);

        var published = schedule_boss.published;
        var publishedButton;
        if(published) {
          publishedButton = (
            <button className='btn btn-success btn-circle' onClick={() => ScheduleManagementActions.invertScheduleBossPublishedState(schedule_boss.id)}>&#10003;</button>
          );
        } else {
          publishedButton = (
            <button className='btn btn-default btn-circle' onClick={() => ScheduleManagementActions.invertScheduleBossPublishedState(schedule_boss.id)}></button>
          );
        }


        return (
          <div className='row'>
            <table className='table'>
              <tbody>
                <tr>
                  <td className='col-md-1'><strong>Published</strong></td>
                  <td className='col-md-1'><strong>Raid</strong></td>
                  <td className='col-md-1'><strong>Boss</strong></td>
                  <td className='col-md-3'><strong>Tanks</strong> - Scheduled<strong>({schedule_boss.boss.tank_count})</strong> - Assigned<strong>({tankCount})</strong></td>
                  <td className='col-md-3'><strong>Healers</strong> - Scheduled<strong>({schedule_boss.boss.healer_count})</strong> - Assigned<strong>({healerCount})</strong></td>
                  <td className='col-md-3'><strong>DPS</strong> - Scheduled<strong>({schedule_boss.boss.dps_count})</strong> - Assigned<strong>({dpsCount})</strong></td>
                </tr>
                <tr>
                  <td className='col-md-1'>
                    {publishedButton}
                    <br/><br/>
                    <button className='btn btn-danger' onClick={() => ScheduleManagementActions.showDeleteBossModal(schedule_boss.id)}>Delete</button>
                  </td>
                  <td className='col-md-1'>{schedule_boss.raid.name}</td>
                  <td className='col-md-1'>{schedule_boss.boss.name}</td>
                  <td className='col-md-3'>
                  <table className='table'>
                    <tbody>
                      {tankRows}
                    </tbody>
                  </table></td>
                  <td className='col-md-3'>
                    <table className='table'>
                      <tbody>
                        {healerRows}
                      </tbody>
                    </table>
                  </td>
                  <td className='col-md-3'>
                    <table className='table'>
                      <tbody>
                        {dpsRows}
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      }, this);

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
                      <select className='form-control' id='scheduleRaidWeek' value={this.state.formRaidWeek} onChange={e => ScheduleManagementActions.updateFormRaidWeek(parseInt(e.target.value))}>
                        {raidWeekOptions}
                      </select>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Roster</label>
                    <div className='col-sm-10'>
                      <select className='form-control' value={this.state.formRoster} onChange={e => ScheduleManagementActions.updateFormRoster(parseInt(e.target.value))}>
                        {formRosterOptions}
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
                  <button className='btn btn-primary pull-right' onClick={() => ScheduleManagementActions.createSchedule(this.state.formRaidWeek, this.state.formScheduleName, this.state.formScheduleDescription, this.state.formRoster)}>Submit</button>
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
                <h3>Add Bosses from Raid</h3>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label'>Raid:</label>
                    <div className='col-sm-10'>
                      <select className='form-control' value={this.state.formRaid} onChange={e => ScheduleManagementActions.updateFormRaid(e.target.value)}>
                        {formRaidOptions}
                      </select>
                    </div>
                  </div>
                  <button className='btn btn-primary pull-right' onClick={() => ScheduleManagementActions.addScheduleRaidBosses(this.state.formRaid, this.state.selectedSchedule)}>Submit</button>
                </div>
              </div>
            </div>
            <div className='row'>
              <h3>Schedule Bosses</h3>
              {scheduleBossRows}
            </div>
          </div>
        </div>
        <Modal show={this.state.showDeleteBossModal} onHide={ScheduleManagementActions.hideDeleteBossModal}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Schedule Boss</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this boss from the schedule?
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-danger' onClick={() => ScheduleManagementActions.deleteScheduleBoss(this.state.scheduleBossToDelete)}>Delete</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ScheduleManagement;
