import React from 'react';
import {Link} from 'react-router';
import SingleScheduleViewStore from '../stores/SingleScheduleViewStore';
import SingleScheduleViewActions from '../actions/SingleScheduleViewActions';
import NavbarStore from '../stores/NavbarStore';

class SingleScheduleView extends React.Component {
  constructor(props) {
    super(props);
    this.state = SingleScheduleViewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SingleScheduleViewStore.listen(this.onChange);
    SingleScheduleViewActions.loadSingleSchedule(this.props.schedule);
    SingleScheduleViewActions.loadUserCharacters();
  }

  componentWillUnmount() {
    SingleScheduleViewStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        Testage
      </div>
    );
  }
}

export default SingleScheduleView;
