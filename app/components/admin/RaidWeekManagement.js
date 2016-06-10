import React from 'react';
import {Link} from 'react-router';
import RaidWeekManagementStore from './../../stores/admin/RaidWeekManagementStore';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';
import {Calendar, CalendarControls} from 'react-yearly-calendar';

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
  }

  componentWillUnmount() {
    ScheduleManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div id='wrapper'>
        <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <h3>Add New Raid Week</h3>
            </div>
            <div className='row'>
              <div className='col-md-12'>
                <Calendar onDatePicked={RaidWeekManagementActions.selectedRaidWeekChanged} firstDayOfWeek={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default RaidWeekManagement;
