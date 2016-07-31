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

    switch(parseInt(this.state.viewType)) {
      case 1:
        scheduleView = (
          <SingleScheduleView schedule={this.props.location.query.schedule}
                              filter={this.state}/>
        );
        break;
    }

    if(typeof(Storage) === 'undefined' || (sessionStorage.role === '' || NavbarStore.getState().userRole === ''))
      return null;

    return (
      <div id='wrapper'>
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
