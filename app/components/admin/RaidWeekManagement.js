import React from 'react';
import {Link} from 'react-router';
import RaidWeekManagementStore from './../../stores/admin/RaidWeekManagementStore';
import RaidWeekManagementActions from './../../actions/admin/RaidWeekManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';
import {Calendar, CalendarControls} from 'react-yearly-calendar';
import moment from 'moment';
import { Accordion, Panel } from 'react-bootstrap';
import _ from 'underscore';
import monthOrders from './../../../utility/MonthOrders';

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
      var sStart = moment(list[i].start);
      if (day.isSameOrAfter(sStart.subtract('hours', 2)) && day.isSameOrBefore(list[i].end))
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
    const customCSS = {
      selectedweek: {
        start: weekBeginning.format('YYYY[-]MM[-]DD'),
        end: weekEnd.format('YYYY[-]MM[-]DD')
      },
      loggedDay: day => this.dayIsLogged(moment(day), rwl)
    };
    var sortedWeeks = {};
    this.state.raidweeks.map(function(raidweek, index) {
      var month = moment(raidweek.start).format('MMMM').toString();
      if(moment(raidweek.start).format('YYYY') == this.state.selectedYear) {
        if(!sortedWeeks[month] || sortedWeeks[month].length < 0) {
          sortedWeeks[month] = [];
        }
        sortedWeeks[month].push(
          <div className='row'>
            <div className='col-md-2'>{moment(raidweek.start).format('DD[/]MM[/]YYYY')}</div>
            <div className='col-md-2'>{moment(raidweek.end).format('DD[/]MM[/]YYYY')}</div>
            <div className='col-md-2'>{moment(raidweek.start).format('W')}</div>
            <div className='col-md-4'>
              <div className='col-md-2'><input type='checkbox' checked={this.state.raidweeks[index].wednesday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'wednesday')} /></div>
              <div className='col-md-2'><input type='checkbox' checked={this.state.raidweeks[index].thursday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'thursday')} /></div>
              <div className='col-md-2'><input type='checkbox' checked={this.state.raidweeks[index].friday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'friday')} /></div>
              <div className='col-md-1'><input type='checkbox' checked={this.state.raidweeks[index].saturday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'saturday')} /></div>
              <div className='col-md-1'><input type='checkbox' checked={this.state.raidweeks[index].sunday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'sunday')} /></div>
              <div className='col-md-2'><input type='checkbox' checked={this.state.raidweeks[index].monday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'monday')} /></div>
              <div className='col-md-2'><input type='checkbox' checked={this.state.raidweeks[index].tuesday} onChange={() => RaidWeekManagementActions.toggleRaidWeekDay(index, 'tuesday')} /></div>
            </div>
            <div className='col-md-1'>
              <button className='btn btn-primary' onClick={() => RaidWeekManagementActions.updateRaidWeek(this.state.raidweeks[index])}>Save</button>
            </div>
            <div className='col-md-1'>
              <button value={raidweek.id} className='btn btn-danger' onClick={(e) => RaidWeekManagementActions.deleteRaidWeek(e.target.value)}>Delete</button>
            </div>
          </div>
        );
      }
    }, this);

    var panels = [];
    $.each(sortedWeeks, function(key, index) {
        panels.push(
          <Panel header={key} sortOrder={_.findWhere(monthOrders, {name: key}).order}  eventKey={index}>
            {sortedWeeks[key]}
          </Panel>
        );
    });
    console.log(panels);
    var accordion = (
      <Accordion>
        {_.sortBy(panels, function(panel) { return panel.props.sortOrder; }).reverse()}
      </Accordion>
    );

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
              <div>
                <div className='row'>
                  <div className='col-md-2'><strong>Start</strong></div>
                  <div className='col-md-2'><strong>End</strong></div>
                  <div className='col-md-2'><strong>Week No.</strong></div>
                  <div className='col-md-4'>
                    <div className='col-md-2'><strong>W</strong></div>
                    <div className='col-md-2'><strong>T</strong></div>
                    <div className='col-md-2'><strong>F</strong></div>
                    <div className='col-md-1'><strong>S</strong></div>
                    <div className='col-md-1'><strong>S</strong></div>
                    <div className='col-md-2'><strong>M</strong></div>
                    <div className='col-md-2'><strong>T</strong></div>
                  </div>
                  <div className='col-md-1'></div>
                  <div className='col-md-1'></div>
                </div>
                <div className='row'>
                  {accordion}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RaidWeekManagement;
