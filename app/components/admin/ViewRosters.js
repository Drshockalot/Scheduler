import React from 'react';
import {Link} from 'react-router';
import ViewRostersStore from '../../stores/admin/ViewRostersStore';
import ViewRostersActions from '../../actions/admin/ViewRostersActions';
import RosterViewActions from '../../actions/admin/RosterViewActions';

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

  handleCurrentRosterChange(e) {
    ViewRostersActions.updateCurrentRoster(e.target.value);
    RosterViewActions.populateRosterList(e.target.value);
  }

  render() {
    var rosterListCopy = this.state.rosterList;
    var arr = Object.keys(rosterListCopy).map(function(i) {return rosterListCopy[i]});

    let list = arr.map((roster) => {
      return (
        <option key={roster._id} value={roster.name}>{roster.name}</option>
      )
    });

    return (
      <div className='col-md-6 form-horizontal'>
        <h3>View Roster</h3>
        <div className='form-group'>
          <label className='col-sm-2 control-label' htmlFor='rosterList'>Rosters</label>
          <div className='col-sm-6'>
            <select name='rosterList' className='form-control' value={this.state.currentRoster} onChange={this.handleCurrentRosterChange}>
              {list}
            </select>
          </div>
          <button type='submit' className='btn btn-default'>DELETE</button>
        </div>
      </div>
    );
  }
}

export default ViewRosters;
