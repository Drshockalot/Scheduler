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
      <div className='col-md-2 sidebar'>
        <ul className='nav'>
          <li><Link to='/admin/roster'>Roster</Link></li>
          <li><Link to='/admin/schedule'>Schedule</Link></li>
        </ul>
      </div>
    );
  }
}

export default AdminSideNav;
