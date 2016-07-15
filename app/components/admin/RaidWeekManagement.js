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

  dayIsLogged(day, list) {
    for(var i = 0; i < list.length; ++i) {
      if (day.isBetween(list[i].start, list[i].end))
        return true;
    }
    return false;
  }

  render() {
    var chosenDay = this.state.selectedDay.isoWeekday();
    var copyToAdd = moment(this.state.selectedDay);
    var copyToSub = moment(this.state.selectedDay);
    var weekBeginning, weekEnd;
    switch(chosenDay) {
      case 1:
        weekBeginning = copyToSub.subtract('days', 5);
        weekEnd = copyToAdd.add('days', 1);
        break;
      case 2:
        weekBeginning = copyToSub.subtract('days', 6);
        weekEnd = copyToAdd.add('days', 0);
        break;
      case 3:
        weekBeginning = copyToSub.subtract('days', 0);
        weekEnd = copyToAdd.add('days', 6);
        break;
      case 4:
        weekBeginning = copyToSub.subtract('days', 1);
        weekEnd = copyToAdd.add('days', 5);
        break;
      case 5:
        weekBeginning = copyToSub.subtract('days', 2);
        weekEnd = copyToAdd.add('days', 4);
        break;
      case 6:
        weekBeginning = copyToSub.subtract('days', 3);
        weekEnd = copyToAdd.add('days', 3);
        break;
      case 7:
        weekBeginning = copyToSub.subtract('days', 4);
        weekEnd = copyToAdd.add('days', 2);
        break;
    }

    var rwl = this.state.raidweeks.map(function(raidweek) {
      return {start: moment(raidweek.start), end: moment(raidweek.end)};
    });
    console.log(rwl);
    const customCSS = {
      selectedweek: {
        start: weekBeginning.format('YYYY[-]MM[-]DD'),
        end: weekEnd.format('YYYY[-]MM[-]DD')
      },
      loggedDay: day => this.dayIsLogged(moment(day), rwl)
    };

    var raidweeklist = this.state.raidweeks.map(function(raidweek, index) {
      return (
        <tr>
          <td>{moment(raidweek.start).format('DD[/]MM[/]YYYY')}</td>
          <td>{moment(raidweek.end).format('DD[/]MM[/]YYYY')}</td>
          <td>{moment(raidweek.start).format('W')}</td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].wednesday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'wednesday')} /></td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].thursday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'thursday')} /></td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].friday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'friday')} /></td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].saturday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'saturday')} /></td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].sunday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'sunday')} /></td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].monday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'monday')} /></td>
          <td><input type='checkbox' checked={this.state.raidweeks[index].tuesday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'tuesday')} /></td>
          <td>
            <button className='btn btn-primary' onClick={() => RaidWeekManagementActions.updateRaidWeek(this.state.raidweeks[index])}>Save</button>
          </td>
          <td>
            <button value={raidweek.id} className='btn btn-danger' onClick={(e) => RaidWeekManagementActions.deleteRaidWeek(e.target.value)}>Delete</button>
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
                          customClasses={customCSS}
                />
              </div>
              <br />
              <button className='btn btn-primary' onClick={() => RaidWeekManagementActions.createNewRaidWeek(weekBeginning)}>Add New Raid Week</button>
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
                    <td></td>
                  </tr>
                  {raidweeklist}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RaidWeekManagement;
