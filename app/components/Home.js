import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import NavbarStore from '../stores/NavbarStore';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
    HomeActions.loadComponentData();
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var pageContent;



    return (
      <div id='page-content-wrapper'>
        <div className='container-fluid-eighty'>
          <div className='row'>
            {pageContent}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
