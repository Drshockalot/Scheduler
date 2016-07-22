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
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '' && browserHistory) {
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
      <div id='wrapper'>
      <AdminSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
