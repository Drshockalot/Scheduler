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
  }

  componentWillUnmount() {
    RaidManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <h3>Add Raid</h3>
              <div className='col-md-6'>
                <form className='form-horizontal'>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='raidName'>Name</label>
                    <div className='col-sm-10'>
                      <input type="text" className='form-control' id='raidName' placeholder='...' value={this.state.formRaidName} onChange={RaidManagementActions.updateFormRaidName}></input>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label className='col-sm-2 control-label' htmlFor='raidDescription'>Description</label>
                    <div className='col-sm-10'>
                      <textarea className='form-control' name='description' value={this.state.formRaidDescription} onChange={RaidManagementActions.updateFormRaidDescription} />
                    </div>
                  </div>
                  <button className='btn btn-default pull-right' onClick={() => RaidManagementActions.createRaid(this.state.raidName, this.state.raidDescription)}>Submit</button>
                </form>
              </div>
            </div>
            <div className='row'>
              <div className='col-md-6'>

              </div>
              <div className='col-md-6'>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RaidManagement;
