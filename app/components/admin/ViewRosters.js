import React from 'react';
import {Link} from 'react-router';
import ViewRostersStore from '../../stores/admin/ViewRostersStore';
import ViewRostersActions from '../../actions/admin/ViewRostersActions';

class ViewRosters extends React.Component {
  constructor(props) {
    super(props);
    this.state = ViewRostersStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ViewRostersStore.listen(this.onChange);
    ViewRostersActions.updateRosterList();
  }

  componentWillUnmount() {
    ViewRostersStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    console.log(this.state.rosterList);
    var rosterListCopy = this.state.rosterList;
    var arr = Object.keys(rosterListCopy).map(function(i) {return rosterListCopy[i]});

    let list = arr.map((roster) => {
      return (
        <option key={roster._id} value={roster.name}>{roster.name}</option>
      )
    });

    return (
      <select className='form-control'>
        {list}
      </select>
    );
  }
}

export default ViewRosters;
