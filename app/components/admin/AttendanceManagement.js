import React from 'react';
import {Link} from 'react-router';
import AttendanceManagementStore from '../../stores/admin/AttendanceManagementStore';
import AttendanceManagementActions from '../../actions/admin/AttendanceManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import {RadioGroup, Radio} from 'react-radio-group'

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

  render() {
    var selectRaidWeekOptions, selectWeekdayRadios;
    if(this.state.raidweeks.length > 0) {
      selectRaidWeekOptions = this.state.raidweeks.map(function(raidweek) {
        return (
          <option key={raidweek.id} value={raidweek.id}>{raidweek.id}</option>
        )
      }, this);

      selectWeekdayRadios = (
        <RadioGroup name='weekday' selectedValue={this.state.selectWeekday} onChange={e => AttendanceManagementActions.updateSelectWeekday(e.target.value)}>
          <Radio value='sunday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].sunday ? 'disabled' : 'enabled'}>Sunday</Radio>
          <Radio value='monday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].monday ? 'disabled' : 'enabled'}>Monday</Radio>
          <Radio value='tuesday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].tuesday ? 'disabled' : 'enabled'}>Tuesday</Radio>
          <Radio value='wednesday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].wednesday ? 'disabled' : 'enabled'}>Wednesday</Radio>
          <Radio value='thursday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].thursday ? 'disabled' : 'enabled'}>Thursday</Radio>
          <Radio value='friday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].friday ? 'disabled' : 'enabled'}>Friday</Radio>
          <Radio value='saturday' disabled={!this.state.raidweeks[this.state.selectRaidWeek].saturday ? 'disabled' : 'enabled'}>Saturday</Radio>
        </RadioGroup>
      )
    }

    return (
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='col-md-6 col-md-offset-3'>
                  <h2>Select Raid</h2>
                  <div className='row'>
                    <div className='form-horizontal'>
                      <div className='form-group'>
                        <label className='col-sm-2 control-label'>Raid Week:</label>
                        <div className='col-sm-10'>
                          <select value={this.state.selectRaidWeek} onChange={e => AttendanceManagementActions.updateSelectRaidWeek(e.target.value)}>
                            {selectRaidWeekOptions}
                          </select>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='col-sm-2 control-label'>Week Day:</label>
                        <div className='col-sm-10'>
                          {selectWeekdayRadios}
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
