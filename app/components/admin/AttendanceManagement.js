import React from 'react';
import {Link} from 'react-router';
import AttendanceManagementStore from '../../stores/admin/AttendanceManagementStore';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import _ from 'underscore';
import {RadioGroup, Radio} from 'react-radio-group'
import moment from 'moment';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';

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
  }

  render() {
    var selectRaidWeekOptions, selectWeekdayButtons;
    if(this.state.raidweeks.length > 0) {
      selectRaidWeekOptions = this.state.raidweeks.map(function(raidweek) {
        return (
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        )
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
      )
    }

    return (
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='col-md-10 col-md-offset-1'>
                  <div className='row'>
                    <h2>Select Raid</h2>
                    <div className='form-horizontal'>
                      <div className='form-group'>
                        <label className='col-sm-2 control-label'>Raid Week:</label>
                        <div className='col-sm-5'>
                          <select className='form-control' value={this.state.selectRaidWeek} onChange={e => AttendanceManagementActions.updateSelectRaidWeek(e.target.value)}>
                            {selectRaidWeekOptions}
                          </select>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='col-sm-2 control-label'>Week Day:</label>
                        <div className='col-sm-10'>
                          {selectWeekdayButtons}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='row'>
                    <h3>Upload File</h3>
                    <div className='row'>
                      <div className='col-md-8 col-md-offset-2'>
                        <Dropzone className='dropzone' onDrop={this.onDrop}>
                          <div className="dropzone-content">Drag or click here to upload file (.txt or .csv)</div>
                        </Dropzone>
                      </div>
                    </div>
                    <h3>Upload Text</h3>
                    <div className='row'>
                      <div className='col-md-8 col-md-offset-2'>
                        <div className='dropzone-text'>
                          <textarea className='form-control dropzone-text' />
                          <br />
                          <button className='btn btn-default pull-right'>Upload</button>
                        </div>
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
