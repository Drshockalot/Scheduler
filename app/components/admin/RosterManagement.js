import React from 'react';
import {Link} from 'react-router';
import RosterManagementStore from '../../stores/admin/RosterManagementStore';
import RosterManagementActions from '../../actions/admin/RosterManagementActions';
import AdminSideNav from './AdminSideNav';
import AddRoster from './AddRoster';
import ViewRosters from './ViewRosters';
import RosterView from './RosterView';
import RosterControlPanel from './RosterControlPanel';

class RosterManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = RosterManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RosterManagementStore.listen(this.onChange);
  }

  componentWillUnmount() {
    RosterManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <AdminSideNav></AdminSideNav>
        <div className='col-md-8'>
          <ViewRosters></ViewRosters>
          <AddRoster></AddRoster>
          <RosterView></RosterView>
          <RosterControlPanel></RosterControlPanel>
        </div>
      </div>
    );
  }
}

export default RosterManagement;
