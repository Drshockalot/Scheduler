import React from 'react';
import { Link } from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import NavbarStore from '../stores/NavbarStore';
import {browserHistory} from 'react-router';

import moment from 'moment';
import _ from 'underscore';

import { OverlayTrigger, Popover } from 'react-bootstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    if(sessionStorage.home)
      HomeActions.restoreState(JSON.parse(sessionStorage.home));
    HomeActions.loadComponentData();
    if(this.props.location.query.somesneakyguy) {
      toastr.error('You do not have authorization to access this page, please log in', 'YOU SHALL NOT PASS!!');
    }
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
    sessionStorage.home = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var schedules;
    if (this.state.raidweeks.length > 0) {
      schedules = _.sortBy(this.state.raidweeks, 'start').map(function (raidweek, index) {
        var now = moment();
        if (moment(raidweek.end).isBefore(now)) {
            return null;
        }
        var schedules;
        schedules = raidweek.schedules.map(function (schedule) {
          var countResult = _.countBy(schedule.schedule_bosses, function (data) {return data.raid.name;});

          var raids = _.keys(countResult);
          var raidListItems = raids.map(function(raid) {
            return (
              <li key={raid.id}>{raid}</li>
            );
          });
          return (
            <div className='row' key={schedule.id}>
              <div className='col-xs-8'>
                <Link to={'/schedule?type=1&schedule=' + schedule.id}>{schedule.name}</Link>
                  <ul>
                    {raidListItems}
                  </ul>
              </div>
              <div className='col-xs-4'>
                <button className='btn btn-info center-block' onClick={() => {browserHistory.push('/schedule?type=1&schedule=' + schedule.id);}}>View</button>
              </div>
            </div>
          );
        }, this);

        var wed = raidweek.wednesday ? <div className='clearfix hand-cursor'><strong><span>Wednesday</span></strong></div> : null;
        var thurs = raidweek.thursday ? <div className='clearfix hand-cursor'><strong><span>Thursday</span></strong></div> : null;
        var fri = raidweek.friday ? <div className='clearfix hand-cursor'><strong><span>Friday</span></strong></div> : null;
        var sat = raidweek.saturday ? <div className='clearfix hand-cursor'><strong><span>Saturday</span></strong></div> : null;
        var sun = raidweek.sunday ? <div className='clearfix hand-cursor'><strong><span>Sunday</span></strong></div> : null;
        var mon = raidweek.monday ? <div className='clearfix hand-cursor'><strong><span>Monday</span></strong></div> : null;
        var tues = raidweek.tuesday ? <div className='clearfix hand-cursor'><strong><span>Tuesday</span></strong></div> : null;

        var popover = (
          <Popover id={raidweek.id} title='Raiding Days'>
            {wed}
            {thurs}
            {fri}
            {sat}
            {sun}
            {mon}
            {tues}
          </Popover>
        );

        var trigger = (
          <OverlayTrigger placement='left' trigger='click' rootClose overlay={popover}>
            <strong className='hand-cursor'><u>&#10094;   {moment(raidweek.start).format('MMM Do YYYY')}</u></strong>
          </OverlayTrigger>
        );

        return (
          <tr key={raidweek.id}>
            <td className='col-xs-4 vert-align text-center'>
              {trigger}
            </td>
            <td className='col-xs-8 vert-align'>
              {schedules}
            </td>
          </tr>
        );
      }, this);
    }

    return (
      <div id='page-content-wrapper'>
        <div className='container-fluid-eighty'>
          <div className='row'>
            <div className='col-md-6'>
              <h2>Timetable</h2>
              <div className='home-timetable-header'>
                <div className='col-xs-4 vert-align text-center'>
                  <h4>Raid Weeks</h4>
                </div>
                <div className='col-xs-8 vert-align text-center'>
                  <h4>Schedules</h4>
                </div>
              </div>
              <table className='table table-striped'>
                <tbody>
                  {schedules}
                </tbody>
              </table>
            </div>
            <div className='col-md-6'>
              <h2>Website Updates</h2>
              <table className='table table-striped'>
                <tbody>
                  <tr>
                    <td>
                      <h4>{moment('2016-10-06').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Profile Raid Weeks</h5>
                          <ul>
                            <li>The limit for raid notes has been increased from 255 to 500 characters</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-10-06').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Home Page</h5>
                          <ul>
                            <li>Past Schedules are no longer visible</li>
                            <li>Schedules are now displayed in ascending order (earliest at the top), the current week will be displayed at the top</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Profile RaidWeeks</h5>
                          <ul>
                            <li>Raid week notes are now limited to 255 characters</li>
                            <li>An indication is now given for how many characters you have currently entered into a note</li>
                            <li>The note text area is now larger by default</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-10-01').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Profile Schedules</h5>
                          <ul>
                            <li>You should now be able to correctly see listed bosses that your characters are assigned to</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-08-27').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Profile Raidweeks</h5>
                          <ul>
                            <li>Past raidweeks are no longer listed</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-08-19').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>General Website</h5>
                          <ul>
                            <li>Your login session now persists for a greater duration</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-08-14').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>General Website</h5>
                          <ul>
                            <li>Your login session should now save by default, not requiring you to reauthenticate so often</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Profile Schedules</h5>
                          <ul>
                            <li>All characters are now listed, regardless whether or not they are assigned to bosses</li>
                            <li>A message will appear under the character if there are no bosses published that have scheduled that character</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-08-05').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Public Attendance View  -<strong>New!</strong>-</h5>
                          <ul>
                            <li>A new section has been added, allowing the public to view general attendance</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Attendance Views</h5>
                          <ul>
                            <li>Only users that have characters registered in the system will be shown on the attendance views</li>
                          </ul>
                        </li>
                        <li>
                          <h5>View Schedule</h5>
                          <ul>
                            <li>The public schedule view has gone under a slight reskinning</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-08-02').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>View Attendance</h5>
                          <ul>
                            <li>The entire section has been revamped</li>
                            <li>You can now view attendance for each user by the following filters:
                              <ul>
                                <li>Past 30 days</li>
                                <li>Past 60 days</li>
                                <li>Past 90 days</li>
                                <li>Lifetime</li>
                                <li>A special column which is filtered by raid</li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-31').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>User Profile</h5>
                          <ul>
                            <li>A new section has been added: Schedules</li>
                            <li>This section shows the user all of the published bosses and raids that their characters have been assigned to</li>
                            <li>This will only show future bosses/schedules</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-30').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Attendance Management</h5>
                          <ul>
                            <li>You can now view the attendance percentage of each user</li>
                            <li>The only currently supported filters are Raid and Roster</li>
                            <li>Inputting attendance from text file or raw text now allows space between character names and commas</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-24').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Attendance Management</h5>
                          <ul>
                            <li>You can now upload attendance via uploading a text file, note that this currently holds the same restrictions as uploading raw text</li>
                            <li>Attendance Management has been split up into three sections:
                              <ul>
                                <li>Add Attendance</li>
                                <li>View Attendance</li>
                                <li>Delete Attendance</li>
                              </ul>
                            </li>
                            <li>The previous Attendance Management has been transfered to Add Attendance, the other two sections are currently in development</li>
                          </ul>
                        </li>
                        <li>
                          <h5>User Profiles</h5>
                          <ul>
                            <li>Derp mentioned the Schedules section within profile, it is still happening, just behind the priority of Attendance Management</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-23').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Website Performance  -<strong>New!</strong>-</h5>
                          <ul>
                            <li>A new caching system has been put in place to retain state even on page switch or refresh</li>
                            <li>This should increase the speed of the website</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Profile Characters</h5>
                          <ul>
                            <li>Slight refactoring to the layout, page should look cleaner on the whole.</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Profile Raid Weeks</h5>
                          <ul>
                            <li>Slight refactoring to the layout, page should look cleaner on the whole.</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Security Measures</h5>
                          <ul>
                            <li>Security measures have been improved on the site, severely limiting access without logging in first</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Website usability</h5>
                          <ul>
                            <li>Refreshing the web page should no longer crash the website (let me know if it happens to you)</li>
                            <li>NOTE: Doing this might cause you to lose some work that you have not saved, but it should be minimal, I should soon have a system in place where a refresh will affect nothing</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-20').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Schedule Management</h5>
                          <ul>
                            <li>Absent days now correctly correlate with the raiding days of that week</li>
                            <li>Users that have not yet entered their availability for that week have their character rows highlighted with a light red color</li>
                            <li>User that have entered their availability for that week but are absent for some days have their character rows highlighted with a light yellow/orange color</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-18').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Attendance Management</h5>
                          <ul>
                            <li>You can now input attendance by submitting raw text</li>
                            <li>NOTE: Names must currently be comma delimited with no spaces, this will be more flexible in the future</li>
                            <li>NOTE: There is not yet a way to view attendance</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-17').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Attendance Management</h5>
                          <ul>
                            <li>A third method of logging attendance has been added - selecting characters manually from a roster</li>
                            <li>NOTE: There is not yet a way to view attendance</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-16').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Raid Week Management</h5>
                          <ul>
                            <li>Raid Weeks are now sorted and no longer skip around when changed</li>
                            <li>Raid Weeks are now grouped by month</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-15').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Raid Week Management</h5>
                          <ul>
                            <li>Weeks that have a raid week created for them are now highlighted in a teal color</li>
                            <li>Fixed styling issues on the yearly calendar</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-14').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Schedule Management</h5>
                          <ul>
                            <li>Clicking on a character name show shows that the user cannot attend</li>
                            <li>Only the character offspec is now shown, the main spec is assumed by the column</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Schedule View</h5>
                          <ul>
                            <li>4th column added showing the remaining characters that are not assigned to the boss</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-13').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Schedule View</h5>
                          <ul>
                            <li>Only published bosses are now shown</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-12').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Home Page</h5>
                          <ul>
                            <li>Raids that are included in any given schedules are now shown under the respective raid on the home page</li>
                            <li>A list of raiding days for each week is now included on the home page by clicking on the raid weeks</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-11').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Schedule Management</h5>
                          <ul>
                            <li>Bosses are now added on a full raid basis, instead of individually</li>
                            <li>You can now delete individual bosses from a schedule</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h4>{moment('2016-07-09').format('MMM Do YYYY')}</h4>
                      <ul>
                        <li>
                          <h5>Raid Management</h5>
                          <ul>
                            <li>Bosses can now be edited</li>
                            <li>Boss description split up into Public Note and Officer Note</li>
                            <li>Public Note and Officer Note text no longer spill into other table cells</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Roster Management</h5>
                          <ul>
                            <li>Characters must now be confirmed via Character Management before they are able to be added to rosters</li>
                          </ul>
                        </li>
                        <li>
                          <h5>Schedule Management</h5>
                          <ul>
                            <li>Schedules are now shown empty by default until scheduling takes place</li>
                            <li>Schedules are now published on a boss-by-boss basis</li>
                          </ul>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
