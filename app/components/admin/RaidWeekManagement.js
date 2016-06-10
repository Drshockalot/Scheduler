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
    //RaidWeekManagementActions.goToToday();
  }

  componentWillUnmount() {
    RaidWeekManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var customCSS = {
      holidays: [
        "2016-04-25",
        "2016-05-01",
        "2016-06-02",
        "2016-08-15",
        "2016-11-01"
      ],
      spring: {
        start: "2016-03-21",
        end: "2016-6-20"
      },
      summer: {
        start: "2016-06-21",
        end: "2016-09-22"
      },
      autumn: {
        start: "2016-09-23",
        end: "2016-12-21"
      },
      weekend: "Sat,Sun",
      winter: day => day.isBefore( moment([2016,2,21]) ) || day.isAfter( moment([2016,11,21]))
    }

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
              <button value={this.state.selectedDay} className='btn btn-primary' onClick={(e) => RaidWeekManagementActions.createNewRaidWeek(e.target.value)}>Add New Raid Week</button>
            </div>
            <div className='row'>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RaidWeekManagement;
