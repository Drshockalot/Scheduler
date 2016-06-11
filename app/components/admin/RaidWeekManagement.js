import React from 'react';
import {Link} from 'react-router';
import RaidWeekManagementStore from './../../stores/admin/RaidWeekManagementStore';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';
import {Calendar, CalendarControls} from 'react-yearly-calendar';
import moment from 'moment';

class RaidWeekManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = RaidWeekManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentDidMount() {
    RaidWeekManagementStore.listen(this.onChange);
    RaidWeekManagementActions.getAllRaidWeeks();
  }

  componentWillUnmount() {
    RaidWeekManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var raidweeklist = this.state.raidweeks.map(function(raidweek, index) {
      return (
        <tr>
          <td>{moment(raidweek.start).format('DD MM YYYY')}</td>
          <td>{moment(raidweek.end).format('DD MM YYYY')}</td>
          <td>{moment(raidweek.start).format('W')}</td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].wednesday} onChange={() => RaidWeekManagementActions(index, 'wednesday')} /></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <button className='btn btn-primary' onClick={() => RaidWeekManagementActions.saveRaidWeek(this.state.raidweeks[index])}>Save</button>
          </td>
        </tr>
      );
    }, this);

    return (
      <div id='wrapper'>
        <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <h3>Add New Raid Week</h3>
            </div>
            <div className='row'>
              <div id='calendar'>
                <CalendarControls
                          year={this.state.selectedYear}
                          showTodayButton={true}
                          onPrevYear={RaidWeekManagementActions.prevYear}
                          onNextYear={RaidWeekManagementActions.nextYear}
                          goToToday={RaidWeekManagementActions.goToToday}
                />
                <Calendar year={this.state.selectedYear}
                          selectedDay={this.state.selectedDay}
                          onPickDate={(date) => RaidWeekManagementActions.changeSelectedDay(date)}
                          firstDayOfWeek={3}
                />
              </div>
              <br />
              <button className='btn btn-primary' onClick={() => RaidWeekManagementActions.createNewRaidWeek(this.state.selectedDay)}>Add New Raid Week</button>
            </div>
            <div className='row'>
              <h3>Manage Raid Weeks</h3>
            </div>
            <div className='row'>
              <table className='table'>
                <tbody>
                  <tr>
                    <td><strong>Start</strong></td>
                    <td><strong>End</strong></td>
                    <td><strong>Week No.</strong></td>
                    <td><strong>W</strong></td>
                    <td><strong>T</strong></td>
                    <td><strong>F</strong></td>
                    <td><strong>S</strong></td>
                    <td><strong>S</strong></td>
                    <td><strong>M</strong></td>
                    <td><strong>T</strong></td>
                    <td></td>
                  </tr>
                  {raidweeklist}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RaidWeekManagement;
