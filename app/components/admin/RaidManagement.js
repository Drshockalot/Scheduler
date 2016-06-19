import React from 'react';
import {Link} from 'react-router';
import RaidManagementStore from '../../stores/admin/RaidManagementStore';
import RaidManagementActions from '../../actions/admin/RaidManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

class RaidManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = RaidManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentDidMount() {
    RaidManagementStore.listen(this.onChange);
    RaidManagementActions.loadRaids();
  }

  componentWillUnmount() {
    RaidManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var currentRaidId
    var raidOptionList;
    var raidBossList;
    if(this.state.raids.length > 0) {
      raidOptionList = this.state.raids.map(function(raid, index) {
        if(raid.name === this.state.selectedRaid) {
          currentRaidId = raid.id;

          if(raid.bosses && raid.bosses.length > 0) {
            raidBossList = raid.bosses.map(function(boss, index) {
              return (
                <tr>
                  <td>{boss.name}</td>
                  <td>{boss.description}</td>
                  <td>
                    <button className='btn btn-danger' onClick={() => RaidManagementActions.deleteBoss(boss)}>Delete</button>
                  </td>
                </tr>
              );
            });
          }
        }

        return (
          <option key={raid.id} value={raid.name}>{raid.name}</option>
        );
      }, this);
    }

    return (
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-6'>
                <h3>Add Raid</h3>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='raidName'>Name</label>
                    <div className='col-sm-10'>
                      <input type="text" className='form-control' id='raidName' placeholder='...' value={this.state.formRaidName} onChange={RaidManagementActions.updateFormRaidName}></input>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='raidDescription'>Description</label>
                    <div className='col-sm-10'>
                      <textarea className='form-control' name='raidDescription' value={this.state.formRaidDescription} onChange={RaidManagementActions.updateFormRaidDescription} />
                    </div>
                  </div>
                  <button className='btn btn-default pull-right' onClick={() => RaidManagementActions.createRaid(this.state.formRaidName, this.state.formRaidDescription)}>Submit</button>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <h3>Raids</h3>
                <div className='row'>
                  <div classname='col-md-10'>
                    <select className='form-control' value={this.state.selectedRaid} onChange={e => RaidManagementActions.updateSelectedRaid(e.target.value)}>
                      {raidOptionList}
                    </select>
                  </div>
                  <div className='col-md-2'>
                    <button className='btn btn-danger' onClick={() => RaidManagementActions.deleteRaid(currentRaidId)}>Delete</button>
                  </div>
                </div>
                <br />
                <table className='table'>
                  <tbody>
                    <tr>
                      <td><strong>Name</strong></td>
                      <td><strong>Description</strong></td>
                      <td></td>
                      <td></td>
                    </tr>
                    {raidBossList}
                  </tbody>
                </table>
              </div>
              <div className='col-md-6'>
                <h3>Add Boss</h3>
                <div className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='bossName'>Name</label>
                    <div className='col-sm-10'>
                      <input type="text" className='form-control' id='bossName' placeholder='...' value={this.state.formBossName} onChange={RaidManagementActions.updateFormBossName}></input>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='bossDescription'>Description</label>
                    <div className='col-sm-10'>
                      <textarea className='form-control' name='bossDescription' value={this.state.formBossDescription} onChange={RaidManagementActions.updateFormBossDescription} />
                    </div>
                  </div>
                  <button className='btn btn-default pull-right' onClick={() => RaidManagementActions.createBoss(this.state.formBossName, this.state.formBossDescription, currentRaidId)}>Submit</button>
                </div>
              </div>
            </div>
            <div className='row'>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RaidManagement;
