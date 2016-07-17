import React from 'react';
import {Link} from 'react-router';
import AttendanceManagementStore from '../../stores/admin/AttendanceManagementStore';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import {RadioGroup, Radio} from 'react-radio-group';
import moment from 'moment';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
var wowClasses = require('./../../../utility/WowClasses');

class AttendanceManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = AttendanceManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentDidMount() {
    AttendanceManagementStore.listen(this.onChange);
    AttendanceManagementActions.loadComponentData();
  }

  componentWillUnmount() {
    AttendanceManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  onDrop(files) {
    console.log('Received files: ', files);
    console.log(files[0]);
    AttendanceManagementActions.drop(files[0]);
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
    var selectRaidWeekOptions, selectWeekdayButtons, selectRaidOptions, selectRosterOptions;
    if(this.state.raidweeks.length > 0) {
      selectRaidWeekOptions = this.state.raidweeks.map(function(raidweek) {
        return (
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        );
      }, this);

      var currentRaidWeek = _.findWhere(this.state.raidweeks, {id: this.state.selectRaidWeek});

      selectWeekdayButtons = (
        <div>
          <button className={classNames('btn', this.state.selectWeekday == 'monday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('monday')}>Monday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'tuesday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('tuesday')}>Tuesday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'wednesday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('wednesday')}>Wednesday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'thursday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('thursday')}>Tuesday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'friday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('friday')}>Friday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'saturday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('saturday')}>Saturday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'sunday' ? 'btn-success' : 'btn-default')} onClick={() => AttendanceManagementActions.updateSelectWeekday('sunday')}>Sunday</button>
        </div>
      );
    }

    if(this.state.raids.length > 0) {
      selectRaidOptions = this.state.raids.map(function(raid) {
        return (
          <option key={raid.id} value={raid.id}>{raid.name}</option>
        );
      });
    }

    if(this.state.rosters.length > 0) {
      selectRosterOptions = this.state.rosters.map(function(roster) {
        return (
          <option key={roster.id} value={roster.id}>{roster.name}</option>
        );
      });
    }

    if(this.state.selectRoster != 0) {
      var roster = _.findWhere(this.state.rosters, {id: this.state.selectRoster});
      var tankRows = [], healerRows = [], dpsRows = [], standbyRows = [];
      roster.characters.map(function(character) {
        if(character.main_role == "Tank") {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          tankRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
          this.state.rosterAttendanceModel[character.main_role].push({name: character.name, state: true});
        } else if(character.main_role == "Healer") {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          healerRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        } else if(character.main_role == "DPS") {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          dpsRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        } else {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AttendanceManagementActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          standbyRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
            </tr>
          );
        }
      }, this);
    }

    return (
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='col-md-12'>
                  <div className='row'>
                    <h2>Select Raid</h2>
                    <div className='form-horizontal'>
                      <div className='form-group'>
                        <label className='col-sm-1 control-label'>Raid Week:</label>
                        <div className='col-sm-5'>
                          <select className='form-control' value={this.state.selectRaidWeek} onChange={e => AttendanceManagementActions.updateSelectRaidWeek(e.target.value)}>
                            {selectRaidWeekOptions}
                          </select>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='col-sm-1 control-label'>Week Day:</label>
                        <div className='col-sm-10'>
                          {selectWeekdayButtons}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <h3>Upload File</h3>
                    <div className='row'>
                      <div className='col-md-8'>
                        <Dropzone className='dropzone' onDrop={this.onDrop}>
                          <div className="dropzone-content">Drag or click here to upload file (.txt or .csv)</div>
                        </Dropzone>
                      </div>
                    </div>
                    <h3>Upload Text</h3>
                    <div className='row'>
                      <div className='col-md-8'>
                        <div className='dropzone-text'>
                          <textarea className='form-control' />
                          <br />
                          <button className='btn btn-default pull-right'>Upload</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                  <h2>From Roster View</h2>
                    <div className='form-horizontal'>
                      <div className='form-group'>
                        <label className='col-sm-1 control-label'>Raid:</label>
                        <div className='col-sm-5'>
                          <select className='form-control' value={this.state.selectRaid} onChange={e => AttendanceManagementActions.updateSelectRaid(e.target.value)}>
                            {selectRaidOptions}
                          </select>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='col-sm-1 control-label'>Roster:</label>
                        <div className='col-sm-5'>
                          <select className='form-control' value={this.state.selectRoster} onChange={e => AttendanceManagementActions.updateSelectRoster(e.target.value)}>
                            {selectRosterOptions}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-10'>
                        <table className='table'>
                          <tbody>
                            <tr>
                              <td className='col-md-4'><strong>Tanks</strong></td>
                              <td className='col-md-4'><strong>Healers</strong></td>
                              <td className='col-md-4'><strong>DPS</strong></td>
                            </tr>
                            <tr>
                              <td className='col-md-4'>
                              <table className='table'>
                                <tbody>
                                  {tankRows}
                                </tbody>
                              </table></td>
                              <td className='col-md-4'>
                                <table className='table'>
                                  <tbody>
                                    {healerRows}
                                  </tbody>
                                </table>
                              </td>
                              <td className='col-md-4'>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AttendanceManagement;
