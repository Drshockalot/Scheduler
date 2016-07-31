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
    ProfileSchedulesActions.loadComponentData();
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
    if(typeof(Storage) === 'undefined' || (sessionStorage.role === '' || NavbarStore.getState().userRole === '')) {
      return null;
    }

    var pageContent;
    if(this.state.user) {
      if(this.state.user.characters.length > 0) {
        pageContent = this.state.user.characters.map(function(character, index) {
          if (character.schedule_bosses.length == 0) {
            return null;
          }

          var bossesBySchedule = _.groupBy(character.schedule_bosses, 'schedule_id');
          var tableContent = [];
          for (var schedule in bossesBySchedule) {
            var scheduleGroup = [];
            for (var i = 0; i < bossesBySchedule[schedule].length; ++i) {
              var bossDay = moment(bossesBySchedule[schedule][i].schedule.raid_week.start);
              if(!bossesBySchedule[schedule][i].published || bossDay.subtract(1, 'days').isBefore(moment())) {
                continue;
              }
              scheduleGroup.push(
                <tr sortOrder={moment(bossesBySchedule[schedule][i].schedule.raid_week.start).format('W')} scheduleName={bossesBySchedule[schedule][i].schedule.name}>
                  <td className='col-xs-2 vert-align text-center'>{moment(bossesBySchedule[schedule][i].schedule.raid_week.start).format('W')}</td>
                  <td className='col-xs-2 vert-align text-center'>{bossesBySchedule[schedule][i].raid.name}</td>
                  <td className='col-xs-2 vert-align text-center'>{bossesBySchedule[schedule][i].boss.name}</td>
                </tr>
              );
            }
            tableContent.push(scheduleGroup);
          }
          var finalContent = [];
          tableContent = _.sortBy(tableContent, function(schedule) { return Number(schedule[0].props.sortOrder);}).reverse();
          for(var i = 0; i < tableContent.length; ++i) {
            finalContent.push(
              <div className='row'>
                <div className='col-xs-10 col-xs-offset-1'>
                  <h4>{tableContent[i][0].props.scheduleName}</h4>
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

          return (
            <div className='row'>
              <div className='col-xs-12'>
                <div className='row'>
                  <div className='col-xs-12'>
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
