import React from 'react';
import {Link} from 'react-router';
import ProfileSchedulesStore from '../stores/ProfileSchedulesStore';
import ProfileSchedulesActions from '../actions/ProfileSchedulesActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';
var wowClasses = require('../../utility/WowClasses');
import classNames from 'classnames';
import _ from 'underscore';
import moment from 'moment';

class ProfileSchedules extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = ProfileSchedulesStore.getState();
    this.onChange = this.onChange.bind(this);
    this.redirect = false;
  }

  componentDidMount() {
    ProfileSchedulesStore.listen(this.onChange);
    if(sessionStorage.profileSchedules)
      ProfileSchedulesActions.restoreState(JSON.parse(sessionStorage.profileSchedules));
    if($.ajax({method: 'GET', url: '/auth/role'}).then((data) => {
      console.log(data);
      if(data.role && data.role != '') {
        ProfileSchedulesActions.loadComponentData();
      }
    }));
  }

  componentWillUnmount() {
    ProfileSchedulesStore.unlisten(this.onChange);
    sessionStorage.profileSchedules = JSON.stringify(this.state);
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

  render() {
    var pageContent;
    if(this.state.user) {
      if(this.state.user.characters.length > 0) {
        pageContent = this.state.user.characters.map(function(character, index) {
          var bossesBySchedule = _.groupBy(character.schedule_bosses, 'schedule_id');
          var tableContent = [];
          for (var schedule in bossesBySchedule) {
            var scheduleGroup = [];
            for (var i = 0; i < bossesBySchedule[schedule].length; ++i) {
              var bossDay = moment(bossesBySchedule[schedule][i].schedule.raid_week.start);
              if(!bossesBySchedule[schedule][i].published || !bossDay.subtract(1, 'days').isBefore(moment())) {
                continue;
              }
              scheduleGroup.push(
                <tr key={bossesBySchedule[schedule][i].id + '-' + index} data-sortOrder={moment(bossesBySchedule[schedule][i].schedule.raid_week.start).format('W')} data-scheduleName={bossesBySchedule[schedule][i].schedule.name} data-scheduleId={bossesBySchedule[schedule][i].schedule.id}>
                  <td className='col-xs-2 vert-align text-center'>{moment(bossesBySchedule[schedule][i].schedule.raid_week.start).format('W')}</td>
                  <td className='col-xs-2 vert-align text-center'>{bossesBySchedule[schedule][i].raid.name}</td>
                  <td className='col-xs-2 vert-align text-center'>{bossesBySchedule[schedule][i].boss.name}</td>
                </tr>
              );
            }
            tableContent.push(scheduleGroup);
          }
          var finalContent = [];
          tableContent = _.sortBy(tableContent, function(schedule) {
            if(schedule.length > 0)
              return Number(schedule[0].props['data-sortOrder']);
          }).reverse();
          for(var i = 0; i < tableContent.length; ++i) {
            if(tableContent[i].length  == 0) {
              continue;
            }
            var scheduleLink = '/schedule?type=1&schedule=' + tableContent[i][0].props['data-scheduleId'];
            finalContent.push(
              <div key={tableContent[i][0].props['data-scheduleId']} className='row'>
                <div className='col-xs-10 col-xs-offset-1'>
                  <Link to={scheduleLink}><h4>{tableContent[i][0].props['data-scheduleName']}</h4></Link>
                  <table className='table'>
                    <tbody>
                      <tr>
                        <td className='col-xs-2 vert-align text-center'><strong>Raid Week</strong></td>
                        <td className='col-xs-2 vert-align text-center'><strong>Raid</strong></td>
                        <td className='col-xs-2 vert-align text-center'><strong>Boss</strong></td>
                      </tr>
                      {tableContent[i]}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          }

          if (finalContent.length == 0) {
            finalContent = (
              <div className='col-xs-12 text-center'>
                <h3><b>No bosses have been published for this character</b></h3>
              </div>
            );
          }

          return (
            <div key={character.id} className='row'>
              <div className='col-xs-12'>
                <div className='row'>
                  <div className='col-xs-6'>
                    <table className='table'>
                      <tbody>
                        <tr>
                          <td className={this.classColour(character)}></td>
                          <td><h3>{character.name}</h3></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xs-12'>
                    {finalContent}
                  </div>
                </div>
              </div>
            </div>
          );
        }, this);
      } else {
        pageContent = (
          <div className='col-xs-12 text-center'>
            <strong>You have no characters registered available for scheduling</strong>
          </div>
        );
      }
    }

    return (
      <div id='wrapper'>
      <ProfileSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-xs-12'>
                <h2>Schedules</h2>
                {pageContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSchedules;
