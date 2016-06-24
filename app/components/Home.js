import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import NavbarStore from '../stores/NavbarStore';

import moment from 'moment';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    //HomeActions.loadComponentData();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var pageContent;
    console.log(this.state);
    if(this.state.raidweeks.length > 0) {
      pageContent = this.state.raidweeks.map(function(raidweek, index) {
        return (
          <div className='row'>
            <strong>{moment(raidweek.start).format('MMM Do YYYY')}</strong>
          </div>
        );
      }, this);
    }
    return (
      <div id='page-content-wrapper'>
        <div className='container-fluid-eighty'>
          <div className='row'>
            <h1>Raid Weeks</h1>
          </div>
          {pageContent}
        </div>
      </div>
    );
  }
}

export default Home;
