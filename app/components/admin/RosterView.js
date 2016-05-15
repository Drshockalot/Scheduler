import React from 'react';
import {Link} from 'react-router';
import RosterViewStore from '../../stores/admin/RosterViewStore';
import RosterViewActions from '../../actions/admin/RosterViewActions';
import ViewRostersStore from '../../stores/admin/ViewRostersStore';

class RosterView extends React.Component {
  constructor(props) {
    super(props);
    this.state = RosterViewStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RosterViewStore.listen(this.onChange);
  }

  componentWillUnmount() {
    RosterViewStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return(
      <div className='col-md-6'>
        <h1>{this.state.rosterName}</h1>
      </div>
    );
  }
}

export default RosterView;
