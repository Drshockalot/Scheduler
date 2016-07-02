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
          <option key={raidweek.id} value={raidweek.id}>{moment(raidweek.start).format('W')}</option>
        )
      }, this);

      var currentRaidWeek = _.findWhere(this.state.raidweeks, {id: this.state.selectRaidWeek});

      selectWeekdayRadios = (
        <RadioGroup className='radio' name='weekday' selectedValue={this.state.selectWeekday} onChange={e => AttendanceManagementActions.updateSelectWeekday(e.target.value)}>
          <label><Radio className='form-control' value='sunday' disabled={!currentRaidWeek.sunday ? true : false}/>Sunday</label>
          <label><Radio className='form-control' value='monday' disabled={!currentRaidWeek.monday ? true : false}/>Monday</label>
          <label><Radio className='form-control' value='tuesday' disabled={!currentRaidWeek.tuesday ? true : false}/>Tuesday</label>
          <label><Radio className='form-control' value='wednesday' disabled={!currentRaidWeek.wednesday ? true : false}/>Wednesday</label>
          <label><Radio className='form-control' value='thursday' disabled={!currentRaidWeek.thursday ? true : false}/>Thursday</label>
          <label><Radio className='form-control' value='friday' disabled={!currentRaidWeek.friday ? true : false}/>Friday</label>
          <label><Radio className='form-control' value='saturday' disabled={!currentRaidWeek.saturday ? true : false}/>Saturday</label>
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
                          <select className='form-control' value={this.state.selectRaidWeek} onChange={e => AttendanceManagementActions.updateSelectRaidWeek(e.target.value)}>
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
