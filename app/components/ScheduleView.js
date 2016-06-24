import React from 'react';
import {Link} from 'react-router';
import ScheduleViewStore from '../stores/ScheduleViewStore';
import ScheduleViewActions from '../actions/ScheduleViewActions';
import NavbarStore from '../stores/NavbarStore';

class SingleScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = ScheduleViewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ScheduleViewStore.listen(this.onChange);
  }

  componentWillUnmount() {
    ScheduleViewStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div id='page-content-wrapper'>
        <div className='container-fluid-eighty'>
          <div className='row'>
            {this.props.location.query.type}
          </div>
          <div className='row'>
            {this.props.location.query.schedule}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleScheduleView;
