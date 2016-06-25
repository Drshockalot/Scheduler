import React from 'react';
import {Link} from 'react-router';
import ScheduleViewStore from '../stores/ScheduleViewStore';
import ScheduleViewActions from '../actions/ScheduleViewActions';
import NavbarStore from '../stores/NavbarStore';

import SingleScheduleView from './SingleScheduleView';

class ScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ScheduleViewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ScheduleViewStore.listen(this.onChange);
    ScheduleViewActions.setPropValues(this.props.location.query.type, this.props.location.query.schedule);
  }

  componentWillUnmount() {
    ScheduleViewStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var scheduleView;

    switch(this.state.viewType) {
      case 1:
        scheduleView = (
          <SingleScheduleView schedule={this.props.locations.query.schedule}
                              filter={this.state}/>
        );
        break;
    }

    return (
      <div id='wrapper'>
      <div id='sidebar-wrapper'>
        <ul className='sidebar-nav'>
          <li><strong>Filter</strong></li>
          <li><button className='btn btn-default' onClick={() => ScheduleViewActions.setFilterType(1)}>All</button></li>
          <li><button className='btn btn-default' onClick={() => ScheduleViewActions.setFilterType(2)}>My Characters</button></li>
          <li>
            Raid Week:
            <br />
          </li>
        </ul>
      </div>
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            {scheduleView}
          </div>
        </div>
      </div>
    );
  }
}

export default ScheduleView;
