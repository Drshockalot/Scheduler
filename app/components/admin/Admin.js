import React from 'react';
import {Link} from 'react-router';
import AdminStore from '../../stores/admin/AdminStore';
import AdminActions from '../../actions/admin/AdminActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = AdminStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AdminStore.listen(this.onChange);
    if (NavbarStore.getState().userRole === 'member') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentWillUnmount() {
    AdminStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <AdminSideNav></AdminSideNav>
      </div>
    );
  }
}

export default Admin;
