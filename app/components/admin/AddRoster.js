import React from 'react';
import {Link} from 'react-router';
import AddRosterStore from '../../stores/admin/AddRosterStore';
import AddRosterActions from '../../actions/admin/AddRosterActions';

class AddRoster extends React.Component {
  constructor(props) {
    super(props);
    this.state = AddRosterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AddRosterStore.listen(this.onChange);
    console.log(this.state);
  }

  componentWillUnmount() {
    AddRosterStore.unlisten(this.onChange);
  }

  onChange(state) {
    console.log(state);
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    let rosterName = this.state.rosterName.trim();

    if (rosterName) {
      AddRosterActions.addRoster(rosterName);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label htmlFor='rosterName'>Roster Name</label>
          <input type="text" className='form-control' id='rosterName' placeholder='Main Raid, Alt Raid etc...' value={this.state.rosterName} onChange={AddRosterActions.updateRosterName}></input>
        </div>
        <button type='submit' className='btn btn-default'>Submit</button>
      </form>
    );
  }
}

export default AddRoster;
