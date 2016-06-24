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
    this.loadComponentData();
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
      <div id='wrapper'>
        <div id='page-content-wrapper-eighty'>
          <div className='container-fluid'>
            <div className='row'>
              {pageContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
