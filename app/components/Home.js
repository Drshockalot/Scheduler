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
    var pageContent;
    if(this.state.raidweeks.length > 0) {
      pageContent = this.state.raidweeks.map(function(raidweek, index) {
        var schedules;
        schedules = raidweek.schedules.map(function(schedule) {
          return (
            <div className='row'>
              {schedule.name}
            </div>
          )
        }, this);

        return (
          <tr>
            <td>
              <div className='row'>
                <strong><u>{moment(raidweek.start).format('MMM Do YYYY')}</u></strong>
              </div>
              <br />
              {schedules}
              <br />
            </td>
          </tr>
        );
      }, this);
    }
    return (
      <div id='page-content-wrapper'>
        <div className='container-fluid-eighty'>
          <div className='row'>
            <h2>Upcoming Schedules</h2>
          </div>
          <table tableName='table-striped'>
            <tbody>
              {pageContent}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
