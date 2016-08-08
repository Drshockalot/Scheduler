import React from 'react';
import {Link} from 'react-router';
import AddAttendanceStore from '../../stores/admin/AddAttendanceStore';
import AddAttendanceActions from '../../actions/admin/AddAttendanceActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import {RadioGroup, Radio} from 'react-radio-group';
import moment from 'moment';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
var wowClasses = require('./../../../utility/WowClasses');

import { Modal, OverlayTrigger, Popover } from 'react-bootstrap';

class AddAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddAttendanceStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddAttendanceStore.listen(this.onChange);
    if(sessionStorage.addAttendance)
      AddAttendanceActions.restoreState(JSON.parse(sessionStorage.addAttendance));
    AddAttendanceActions.loadComponentData();
  }

  componentWillUnmount() {
    AddAttendanceStore.unlisten(this.onChange);
    sessionStorage.addAttendance = JSON.stringify(this.state);
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

  readFile(file) {
    var reader = new FileReader();
    var selectRaid = this.state.selectRaid;
    var selectRaidWeek = this.state.selectRaidWeek;
    var selectWeekday = this.state.selectWeekday;
    var selectRoster = this.state.selectRoster;
    reader.onload = function() {
      AddAttendanceActions.uploadFile(this.result, selectRaid, selectRaidWeek, selectWeekday, selectRoster);
    };
    reader.readAsText(file);
  }

  continueUpload() {
    AddAttendanceActions.disableConfirmUploadButton();
    switch(this.state.attemptedUploadType) {
      case 1:
        this.readFile(this.state.uploadFile);
        break;
      case 2:
        AddAttendanceActions.uploadRawText(this.state.uploadText, this.state.selectRaid, this.state.selectRaidWeek, this.state.selectWeekday, this.state.selectRoster);
        break;
      case 3:
        AddAttendanceActions.uploadAttendanceFromRosterForm(this.state.rosterAttendanceModel, this.state.selectRaid, this.state.selectRaidWeek, this.state.selectWeekday, this.state.selectRoster);
        break;
    }
  }

  render() {
    var selectRaidWeekOptions, selectWeekdayButtons, selectRaidOptions, selectRosterOptions;
    var raidWeekModalValue;
    if(this.state.raidweeks.length > 0) {
      raidWeekModalValue = moment(_.findWhere(this.state.raidweeks, {id: Number(this.state.selectRaidWeek)})).format('W');

      selectRaidWeekOptions = this.state.raidweeks.map(function(raidweek) {
        return (
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        );
      }, this);

      var currentRaidWeek = _.findWhere(this.state.raidweeks, {id: this.state.selectRaidWeek});

      selectWeekdayButtons = (
        <div>
          <button className={classNames('btn', this.state.selectWeekday == 'monday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('monday')}>Monday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'tuesday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('tuesday')}>Tuesday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'wednesday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('wednesday')}>Wednesday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'thursday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('thursday')}>Tuesday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'friday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('friday')}>Friday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'saturday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('saturday')}>Saturday</button>
          <button className={classNames('btn', this.state.selectWeekday == 'sunday' ? 'btn-success' : 'btn-default')} onClick={() => AddAttendanceActions.updateSelectWeekday('sunday')}>Sunday</button>
        </div>
      );
    }

    var raidModalValue;
    if(this.state.raids.length > 0) {
      raidModalValue = _.findWhere(this.state.raids, {id: Number(this.state.selectRaid)}).name;
      selectRaidOptions = this.state.raids.map(function(raid) {
        return (
          <option key={raid.id} value={raid.id}>{raid.name}</option>
        );
      });
    }

    var rosterModalValue;
    if(this.state.rosters.length > 0) {
      rosterModalValue = _.findWhere(this.state.rosters, {id: Number(this.state.selectRoster)}).name;
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
              <button className='btn btn-success btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          tankRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
              <td>
                {actionButton}
              </td>
            </tr>
          );
        } else if(character.main_role == "Healer") {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          healerRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
              <td>
                {actionButton}
              </td>
            </tr>
          );
        } else if(character.main_role == "DPS") {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          dpsRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
              <td>
                {actionButton}
              </td>
            </tr>
          );
        } else {
          var classCSS = this.classColour(character);
          var state = _.findWhere(this.state.rosterAttendanceModel[character.main_role], {name: character.name}).state;
          var actionButton;
          if(state) {
            actionButton = (
              <button className='btn btn-success btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}>&#10003;</button>
            );
          } else {
            actionButton = (
              <button className='btn btn-default btn-circle' onClick={() => AddAttendanceActions.toggleCharacterState(character.name, character.main_role)}></button>
            );
          }
          standbyRows.push(
            <tr>
              <td className={classCSS} />
              <td className='col-sm-11 vert-align' >
                {character.name}
              </td>
              <td>
                {actionButton}
              </td>
            </tr>
          );
        }
      }, this);
    }

    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin'))
      return null;

    return (
      <div className='row'>
        <div className='col-md-12'>
          <div className='col-md-12'>
            <div className='row'>
              <h2>Select Raid</h2>
              <div className='form-horizontal'>
                <div className='form-group'>
                  <label className='col-sm-1 control-label'>Raid Week:</label>
                  <div className='col-sm-5'>
                    <select className='form-control' value={this.state.selectRaidWeek} onChange={e => AddAttendanceActions.updateSelectRaidWeek(parseInt(e.target.value))}>
                      {selectRaidWeekOptions}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-sm-1 control-label'>Raid:</label>
                  <div className='col-sm-5'>
                    <select className='form-control' value={this.state.selectRaid} onChange={e => AddAttendanceActions.updateSelectRaid(parseInt(e.target.value))}>
                      {selectRaidOptions}
                    </select>
                  </div>
                </div>
                <div className='form-group'>
                  <label className='col-sm-1 control-label'>Roster:</label>
                  <div className='col-sm-5'>
                    <select className='form-control' value={this.state.selectRoster} onChange={e => AddAttendanceActions.updateSelectRoster(parseInt(e.target.value))}>
                      {selectRosterOptions}
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
                  <Dropzone className='dropzone' onDrop={files => AddAttendanceActions.confirmFileUpload(files[0])}>
                    <div className="dropzone-content">Drag or click here to upload file (.txt or .csv)</div>
                  </Dropzone>
                </div>
              </div>
              <h3>Upload Text</h3>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='dropzone-text'>
                    <textarea className='form-control' value={this.state.uploadText} onChange={e => AddAttendanceActions.updateUploadText(e.target.value)}/>
                    <br />
                    <button className='btn btn-default pull-right' onClick={() => AddAttendanceActions.confirmTextUpload()}>Upload</button>
                  </div>
                </div>
              </div>
            </div>
            <div className='row'>
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
                  <button className='btn btn-default pull-right' onClick={() => AddAttendanceActions.confirmRosterUpload()}>Upload</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.showConfirmUploadModal} onHide={() => AddAttendanceActions.hideConfirmUploadModal()}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Upload Choices</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col-xs-12 text-center'>
                <h4>Attendance Selections</h4>
              </div>
            </div>
            <div className='row'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td className='col-xs-6 vert-align'><strong>Raid Week:</strong></td>
                    <td className='col-xs-6 vert-align'>{raidWeekModalValue}</td>
                  </tr>
                  <tr>
                    <td className='col-xs-6 vert-align'><strong>Raid:</strong></td>
                    <td className='col-xs-6 vert-align'>{raidModalValue}</td>
                  </tr>
                  <tr>
                    <td className='col-xs-6 vert-align'><strong>Roster:</strong></td>
                    <td className='col-xs-6 vert-align'>{rosterModalValue}</td>
                  </tr>
                  <tr>
                    <td className='col-xs-6 vert-align'><strong>Week Day:</strong></td>
                    <td className='col-xs-6 vert-align'>{this.state.selectWeekday.charAt(0).toUpperCase() + this.state.selectWeekday.slice(1)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className='btn btn-success' onClick={() => this.continueUpload()} disabled={this.state.confirmUploadDisabled}>Upload</button>
            &nbsp;&nbsp;
            <button className='btn btn-danger' onClick={() => AddAttendanceActions.hideConfirmUploadModal()}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AddAttendance;
