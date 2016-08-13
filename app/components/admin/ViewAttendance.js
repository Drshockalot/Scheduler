import React from 'react';
import {Link} from 'react-router';
import ViewAttendanceStore from '../../stores/admin/ViewAttendanceStore';
import ViewAttendanceActions from '../../actions/admin/ViewAttendanceActions';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

import moment from 'moment';
import _ from 'underscore';
import { Modal, OverlayTrigger, Popover } from 'react-bootstrap';

class ViewAttendance extends React.Component {
  constructor(props) {
    super(props);
    this.state = ViewAttendanceStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ViewAttendanceStore.listen(this.onChange);
    if(sessionStorage.viewAttendance)
      ViewAttendanceActions.restoreState(JSON.parse(sessionStorage.viewAttendance));
    if($.ajax({method: 'GET', url: '/auth/role'}).then((data) => {
      if(data.role && data.role == 'admin') {
        ViewAttendanceActions.loadComponentData();
      }
    }));
  }

  componentWillUnmount() {
    ViewAttendanceStore.unlisten(this.onChange);
    sessionStorage.viewAttendance = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    if(typeof(Storage) === 'undefined' || (sessionStorage.role != 'admin' || NavbarStore.getState().userRole != 'admin')) {
      return null;
    }

    var selectRaidOptions, generalAttendanceRows;

    if(this.state.raids.length > 0) {
      selectRaidOptions = this.state.raids.map(function(raid) {
        return (
          <option key={raid.id} value={raid.id}>{raid.name}</option>
        );
      });
    }

    if(this.state.attendanceRecords.length > 0 && this.state.attendanceCount.length > 0) {
      generalAttendanceRows = _.filter(this.state.users, function(user) {
        return user.characters.length > 0;
      }).map(function(user) {
        var userCharacters = user.characters;

        var totalAttendanceCount = this.state.attendanceCount.length;

        var totalByRaidCount = _.where(this.state.attendanceCount, {raid_id: Number(this.state.selectRaid)}).length;
        var userByRaidAttendanceCount = _.where(this.state.attendanceRecords, {user_id: Number(user.id), raid_id: Number(this.state.selectRaid)}).length;
        var byRaidAttendancePercentage = (userByRaidAttendanceCount / totalByRaidCount) * 100;

        var totalUserAttendance = _.where(this.state.attendanceRecords, {user_id : Number(user.id)});
        var totalUserAttendanceCount = totalUserAttendance.length;

        var totalAttendanceCount90Days = _.countBy(this.state.attendanceCount, function(row) {
          if(moment(row.created_at).isAfter(moment().subtract(90, 'days'))) {
            return '90days';
          }
        })['90days'];
        var totalAttendanceCount60Days = _.countBy(this.state.attendanceCount, function(row) {
          if(moment(row.created_at).isAfter(moment().subtract(60, 'days'))) {
            return '60days';
          }
        })['60days'];
        var totalAttendanceCount30Days = _.countBy(this.state.attendanceCount, function(row) {
          if(moment(row.created_at).isAfter(moment().subtract(30, 'days'))) {
            return '30days';
          }
        })['30days'];

        var userAttendanceCount90Days, userAttendanceCount60Days, userAttendanceCount30Days, userTimeBasedResults;
        if(totalUserAttendanceCount > 0) {
          userAttendanceCount90Days = _.countBy(totalUserAttendance, function(row) {
            if(moment(row.created_at).isAfter(moment().subtract(90, 'days'))) {
              return '90days';
            }
          })['90days'];
          userAttendanceCount60Days = _.countBy(totalUserAttendance, function(row) {
            if(moment(row.created_at).isAfter(moment().subtract(60, 'days'))) {
              return '60days';
            }
          })['60days'];
          userAttendanceCount30Days = _.countBy(totalUserAttendance, function(row) {
            if(moment(row.created_at).isAfter(moment().subtract(30, 'days'))) {
              return '30days';
            }
          })['30days'];
        }

        var lifetimeAttendancePercentage = (totalUserAttendanceCount / totalAttendanceCount) * 100;
        var since90DaysAttendancePercentage = (userAttendanceCount90Days / totalAttendanceCount90Days) * 100;
        var since60DaysAttendancePercentage = (userAttendanceCount60Days / totalAttendanceCount60Days) * 100;
        var since30DaysAttendancePercentage = (userAttendanceCount30Days / totalAttendanceCount30Days) * 100;

        var characterRows = userCharacters.map(function(character) {
          return (
            <div key={character.id} className='clearfix hand-cursor'>{character.name}<strong></strong></div>
          );
        });

        var popover = (
          <Popover key={user.id} id={user.id} title='Characters'>
            {characterRows}
          </Popover>
        );

        var trigger = (
          <OverlayTrigger placement='right' trigger='click' rootClose overlay={popover}>
            <span className='hand-cursor'>{user.battletag}&nbsp;&nbsp;&nbsp;&nbsp;&#10095;</span>
          </OverlayTrigger>
        );

        return (
          <tr key={user.id} sortOrder={isNaN(lifetimeAttendancePercentage) ? 0 : lifetimeAttendancePercentage}>
            <td className='col-xs-2 text-center vert-align'>{trigger}</td>
            <td className='col-xs-2 text-center vert-align'>{isNaN(since30DaysAttendancePercentage) ? 0 : since30DaysAttendancePercentage.toFixed(1)}%&nbsp;({userAttendanceCount30Days ? userAttendanceCount30Days : 0}/{totalAttendanceCount30Days})</td>
            <td className='col-xs-2 text-center vert-align'>{isNaN(since60DaysAttendancePercentage) ? 0 : since60DaysAttendancePercentage.toFixed(1)}%&nbsp;({userAttendanceCount60Days ? userAttendanceCount60Days : 0}/{totalAttendanceCount60Days})</td>
            <td className='col-xs-2 text-center vert-align'>{isNaN(since90DaysAttendancePercentage) ? 0 : since90DaysAttendancePercentage.toFixed(1)}%&nbsp;({userAttendanceCount90Days ? userAttendanceCount90Days : 0}/{totalAttendanceCount90Days})</td>
            <td className='col-xs-2 text-center vert-align'>{isNaN(lifetimeAttendancePercentage) ? 0 : lifetimeAttendancePercentage.toFixed(1)}%&nbsp;({totalUserAttendanceCount}/{totalAttendanceCount})</td>
            <td className='col-xs-2 text-center vert-align'>{isNaN(byRaidAttendancePercentage) ? 0 : byRaidAttendancePercentage.toFixed(1)}%&nbsp;({userByRaidAttendanceCount}/{totalByRaidCount})</td>
          </tr>
        );
      }, this);
    }

    return (
      <div className='row'>
        <div className='row'>
          <div className='col-xs-12'>
            <h2>View General Attendance</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-xs-10'>
            <div className='form-horizontal'>
              <div className='form-group'>
                <label className='col-sm-1 control-label'>Raid:</label>
                <div className='col-sm-5'>
                  <select className='form-control' value={this.state.selectRaid} onChange={e => ViewAttendanceActions.updateSelectRaid(parseInt(e.target.value))}>
                    {selectRaidOptions}
                  </select>
                </div>
              </div>
            </div>
            <table className='table'>
              <tbody>
                <tr>
                  <td className='col-xs-2 text-center'><strong>User</strong></td>
                  <td className='col-xs-2 text-center'><strong>Last 30 days</strong></td>
                  <td className='col-xs-2 text-center'><strong>Last 60 days</strong></td>
                  <td className='col-xs-2 text-center'><strong>Last 90 days</strong></td>
                  <td className='col-xs-2 text-center'><strong>Lifetime</strong></td>
                  <td className='col-xs-2 text-center'><strong>{this.state.raids.length > 0 ? _.findWhere(this.state.raids, {id: Number(this.state.selectRaid)}).name : null}</strong></td>
                </tr>
                {_.sortBy(generalAttendanceRows, function(row) {return row.props.sortOrder;}).reverse()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewAttendance;
