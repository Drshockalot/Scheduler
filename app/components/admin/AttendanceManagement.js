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
        <RadioGroup className='radio' name='weekday' selectedValue={this.state.selectWeekday} onChange={value => AttendanceManagementActions.updateSelectWeekday(value)}>
          <label className={classNames( {'disabled': !currentRaidWeek.sunday})}><Radio value='sunday'/>Sunday</label>
          <div className={classNames('radio', {'disabled': !currentRaidWeek.monday})}><label><Radio value='monday'/>Monday</label></div>
          <div className={classNames('radio', {'disabled': !currentRaidWeek.tuesday})}><label><Radio value='tuesday'/>Tuesday</label></div>
          <div className={classNames('radio', {'disabled': !currentRaidWeek.wednesday})}><label><Radio value='wednesday'/>Wednesday</label></div>
          <div className={classNames('radio', {'disabled': !currentRaidWeek.thursday})}><label><Radio value='thursday'/>Thursday</label></div>
          <div className={classNames('radio', {'disabled': !currentRaidWeek.friday})}><label><Radio value='friday'/>Friday</label></div>
          <div className={classNames('radio', {'disabled': !currentRaidWeek.saturday})}><label><Radio value='saturday'/>Saturday</label></div>
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
                        <div className='col-sm-5'>
                          <select className='form-control' value={this.state.selectRaidWeek} onChange={e => AttendanceManagementActions.updateSelectRaidWeek(e.target.value)}>
                            {selectRaidWeekOptions}
                          </select>
                        </div>
                      </div>
                      <div className='form-group'>
                        <label className='col-sm-2 control-label'>Week Day:</label>
                        <div className='col-sm-10'>
                          {selectWeekdayRadios}
                          <div>
  <label className='radio-inline'>
    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
    Option two can be something else and selecting it will deselect option one
  </label>
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
      </div>
    );
  }
}

export default AttendanceManagement;
