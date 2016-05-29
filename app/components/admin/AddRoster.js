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
  }

  componentWillUnmount() {
    AddRosterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();

    let rosterName = this.state.rosterName.trim();
    let rosterDescription = this.state.rosterDescription.trim();

    let roster = {};
    roster.name = rosterName;
    roster.description = rosterDescription;

    if (roster.name != '') {
      AddRosterActions.addRoster(roster);
    } else {
      toastr.error("You must supply a name for a Roster to add it", "Silly Pineapple");
    }
  }

  render() {
    return (
      <div className='col-md-6'>
        <h3>Add New Roster</h3>
        <form className='form-horizontal' onSubmit={this.handleSubmit.bind(this)}>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='rosterName'>Name</label>
            <div className='col-sm-10'>
              <input type="text" className='form-control' id='rosterName' placeholder='Main Raid, Alt Raid etc...' value={this.state.rosterName} onChange={AddRosterActions.updateRosterName}></input>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='rosterDescription'>Description</label>
            <div className='col-sm-10'>
              <textarea name='description' value={this.state.rosterDescription} onChange={AddRosterActions.updateRosterDescription} />
            </div>
          </div>
          <button type='submit' className='btn btn-default pull-right'>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddRoster;
