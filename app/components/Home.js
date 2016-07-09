import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import NavbarStore from '../stores/NavbarStore';

import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.loadComponentData();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var schedules;
    if(this.state.raidweeks.length > 0) {
      schedules = this.state.raidweeks.map(function(raidweek, index) {
        var schedules;
        schedules = raidweek.schedules.map(function(schedule) {
          return (
            <div className='row'>
              <Link to={'/schedule?type=1&schedule=' + schedule.id}>{schedule.name}</Link>
            </div>
          )
        }, this);

        return (
          <tr>
            <td className='col-md-4 vert-align'>
                <strong><u>{moment(raidweek.start).format('MMM Do YYYY')}</u></strong>
            </td>
            <td className='col-md-8 vert-align'>
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
              <h2>Upcoming Schedules</h2>
              <table className='table table-striped'>
                <tbody>
                  {schedules}
                </tbody>
              </table>
            </div>
            <div className='col-md-6'>
              <h2>ReadMe</h2>
              <table className='table table-striped'>
                <tbody>
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
