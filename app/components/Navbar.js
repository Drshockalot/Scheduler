import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = NavbarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    //NavbarActions.getCharacterCount();

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

    NavbarActions.checkLogin();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    let searchQuery = this.state.searchQuery.trim();

    if (searchQuery) {
      NavbarActions.findCharacter({
        searchQuery: searchQuery,
        searchForm: this.refs.searchForm,
        history: this.props.history
      });
    }
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
    window.location = '/auth/bnet/logout';
  }

  hardLogout() {
    window.location = '/auth/bnet/logout/hard';
  }

  logLocation() {
    console.log(this.props.routes[this.props.routes.length-1]);
  }

  render() {
    var profilePane;

    if(this.state.battleNetTag === '') {
        profilePane = <li>
          <a href='/auth/bnet'>Login</a>
        </li>
    } else {
        profilePane = <li className='dropdown'>
          <a href='/profile' className='dropdown-toggle' data-toggle='dropdown'>{this.state.battleNetTag} <span className='caret'></span></a>
          <ul className='dropdown-menu'>
            <li><a href='/auth/bnet/logout'>Logout</a></li>
            <li><a href='/auth/bnet/logout/hard'>Hard Logout</a></li>
          </ul>
        </li>
    }
    this.logLocation();
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
          { /*<form ref='searchForm' className='navbar-form navbar-left animated' onSubmit={this.handleSubmit.bind(this)}>
            <div className='input-group'>
              <input type='text' className='form-control' placeholder={this.state.totalCharacters + ' characters'} value={this.state.searchQuery} onChange={NavbarActions.updateSearchQuery} />
              <span className='input-group-btn'>
                <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}><span className='glyphicon glyphicon-search'></span></button>
              </span>
            </div>
          </form>*/ }
          <ul className='nav navbar-nav'>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/stats'>Roster</Link></li>
            <li className='dropdown'>
              <a href='#' className='dropdown-toggle' data-toggle='dropdown'>Sections<span className='caret'></span></a>
              <ul className='dropdown-menu'>
                <li><Link to='/DPS'>DPS</Link></li>
                <li><Link to='/Tank'>Tank</Link></li>
                <li><Link to='/Healer'>Healer</Link></li>
              </ul>
            </li>
            <li><Link to='/admin'>Admin</Link></li>
            {profilePane}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
