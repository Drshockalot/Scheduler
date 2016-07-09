import React from 'react';
import {Link} from 'react-router';
import RosterManagementStore from '../../stores/admin/RosterManagementStore';
import RosterManagementActions from '../../actions/admin/RosterManagementActions';
import AdminSideNav from './AdminSideNav';
import AddRoster from './AddRoster';
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
    var currentRosterId;
    var rosterList = this.state.rosterList.map(function(roster, index) {
      if(roster.name === this.state.selectedRoster) {
        currentRosterId = roster.id;
      }
      return (
        <option key={roster.id}>{roster.name}</option>
      );
    }, this);

    var includedCaracters = this.state.includedRosterCaracters.map(function(character, index) {
      return (
        <tr>
          <td key={character.name}>{character.name}</td>
          <td key={character.main_role + 'main'}>{character.main_role}</td>
          <td key={character.off_role + 'off'}>{character.off_role}</td>
          <td key='button'><button value={character.id} className='btn btn-danger' onClick={e => {
            RosterManagementActions.removeCharacterFromRoster(character.id, currentRosterId);
          }}>Remove</button></td>
        </tr>
      );
    });

    var excludedCharacters = this.state.excludedRosterCharacters.map(function(character, index) {
      if(character.confirmed == 1)
        return (
          <tr>
            <td key={character.name}>{character.name}</td>
            <td key={character.main_role + 'main'}>{character.main_role}</td>
            <td key={character.off_role + 'off'}>{character.off_role}</td>
            <td key='button'><button value={character.id} className='btn btn-success' onClick={e => {
              RosterManagementActions.addCharacterToRoster(character.id, currentRosterId);
            }}>Add</button></td>
          </tr>
        );
    });

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
              <h3>Manage Rosters</h3>
              <div className='col-md-4'>
                <div className='form-group'>
                  <select name='roster-list' className='form-control' value={this.state.selectedRoster} onChange={e => {
                    RosterManagementActions.updateSelectedRoster(e.target.value, this.state.rosterList);
                  }}>
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
                    {includedCaracters}
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
                    {excludedCharacters}
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
