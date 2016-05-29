import React from 'react';
import {Link} from 'react-router';
import RosterManagementStore from '../../stores/admin/RosterManagementStore';
import RosterManagementActions from '../../actions/admin/RosterManagementActions';
import AdminSideNav from './AdminSideNav';
import AddRoster from './AddRoster';
import ViewRosters from './ViewRosters';
import RosterView from './RosterView';
import RosterControlPanel from './RosterControlPanel';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

class RosterManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = RosterManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentDidMount() {
    RosterManagementStore.listen(this.onChange);
    RosterManagementActions.getAllRosters();
  }

  componentWillUnmount() {
    RosterManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var rosterList = this.state.rosterList.map(function(roster, index) {
      return (
        <option key={roster.name}>{roster.name}</option>
      );
    });

    var includedRosterCaracters, excludedRosterCharacters;


    return (
      <div id='wrapper'>
        <AdminSideNav></AdminSideNav>
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <h3>Add New Roster</h3>
              <AddRoster></AddRoster>
            </div>
            <div className='row'>
              <h3>ManageRosters</h3>
              <div classname='col-md-4'>
                <div className='form-group'>
                  <select name='roster-list' className='form-control' value={this.state.selectedRoster} onChange={RosterManagementActions.updateSelectedRoster}>
                    {rosterList}
                  </select>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-6'>
                <h4>Included</h4>
                <table className='table'>
                  <tbody>
                    <tr>
                      <td><strong>Name</strong></td>
                      <td><strong>Main Role</strong></td>
                      <td><strong>Off Role</strong></td>
                    </tr>
                    {includedRosterCaracters}
                  </tbody>
                </table>
              </div>
              <div className='col-sm-6'>
                <h4>Excluded</h4>
                <table className='table'>
                  <tbody>
                    <tr>
                      <td><strong>Name</strong></td>
                      <td><strong>Main Role</strong></td>
                      <td><strong>Off Role</strong></td>
                    </tr>
                    {excludedRosterCharacters}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RosterManagement;
