import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import cookie from 'react-cookie';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);

    let socket = io.connect();

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });

    if(sessionStorage.navbar)
      NavbarActions.restoreState(JSON.parse(sessionStorage.navbar));
    NavbarActions.checkLogin();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
    sessionStorage.navbar = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  handleLoginSubmit(event) {

  }

  registerRedirect() {
    window.location = '/';
  }

  bnetAuth() {
    window.location = '/auth/bnet';
  }

  logout() {
    sessionStorage.removeItem('battletag');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('loggedin');
    window.location = '/auth/bnet/logout';
  }

  render() {
    var profilePane;

    if(!this.state.battletag) {
        profilePane = <li>
          <a href='/auth/bnet'>Login</a>
        </li>;
    } else {
        profilePane = <li className='dropdown'>
          <a href='/profile' className='dropdown-toggle' data-toggle='dropdown'>{this.state.battletag} <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li><a onClick={NavbarActions.navigateProfile}>Profile</a></li>
            <li><a onClick={this.logout}>Logout</a></li>
          </ul>
        </li>;
    }

    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            Darkstorm Schedule
            <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/attendance'>Attendance</Link></li>
            <li><Link to='/admin'>Admin</Link></li>
            {profilePane}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
