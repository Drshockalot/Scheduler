import React from 'react';
import {Link} from 'react-router';
import AdminSideNavStore from '../../stores/admin/AdminSideNavStore';
import AdminSideNavActions from '../../actions/admin/AdminSideNavActions';

class AdminSideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = AdminSideNavStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AdminSideNavStore.listen(this.onChange);
  }

  componentWillUnmount() {
    AdminSideNavStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div id='sidebar-wrapper'>
        <ul className='sidebar-nav'>
          <li><Link to='/admin'><strong>Admin</strong></Link></li>
          <li><Link to='/admin/roster'>Roster Management</Link></li>
          <li><Link to='/admin/schedule'>Schedule Management</Link></li>
          <li><Link to='/admin/character'>Character Management</Link></li>
          <li><Link to='/admin/raidweek'>Raid Week Management</Link></li>
        </ul>
      </div>
    );
  }
}

export default AdminSideNav;
