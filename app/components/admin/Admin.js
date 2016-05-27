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

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
  }

  componentDidMount() {
    AdminStore.listen(this.onChange);
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
