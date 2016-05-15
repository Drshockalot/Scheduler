import React from 'react';
import {Link} from 'react-router';
import RosterControlPanelStore from '../../stores/admin/RosterControlPanelStore';
import RosterControlPanelActions from '../../actions/admin/RosterControlPanelActions';
import ViewRostersStore from '../../stores/admin/ViewRostersStore';

import classNames from 'classnames';

// import Autosize from 'Autosize';
// import Autocomplete from 'Autocomplete';
// import Combobox from 'Combobox';
// import Mask from 'Mask';
// import DatePicker from 'DatePicker';

class RosterControlPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = RosterControlPanelStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RosterControlPanelStore.listen(this.onChange);

  }

  componentWillUnmount() {
    RosterControlPanelStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleAddCharacterSubmit(e) {
    e.preventDefault();
    let currentRoster = ViewRostersStore.getState().currentRoster;

    RosterControlPanelActions.addCharacterToRoster(currentRoster,
                                                   this.state.addCharacter_Name,
                                                   this.state.addCharacter_Class,
                                                   this.state.addCharacter);
  }

  currentClassColour() {
    let currentClass = this.state.addCharacter_Class;
    var arr = currentClass.split(" ");

    var ret = '';
    for (var i = 0; i < arr.length; ++i) {
      ret += arr[i].toLowerCase();
      ret += '-'
    }

    ret += 'color';
    return ret;
  }

  render() {
    var classColour = this.currentClassColour();
    let classColourClasses = classNames(classColour, { 'col-sm-2' : true});

    return (
      <div className='col-md-6'>
        <h3>Add Character To Roster</h3>
        <form className='form-horizontal' onSubmit={this.handleAddCharacterSubmit.bind(this)}>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='characterName'>Name</label>
            <div className='col-sm-10'>
              <input type='text' className='form-control' id='characterName' name='characterName' value={this.state.addCharacter_Name} onChange={RosterControlPanelActions.updateCharacterName}></input>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='characterClass'>Class</label>
            <div className='col-sm-7'>
              <select className='form-control' id='characterClass' value={this.state.addCharacter_Class} onChange={RosterControlPanelActions.updateCharacterClass}>
                <option value='Death Knight'>Death Knight</option>
                <option value='Demon Hunter'>Demon Hunter</option>
                <option value='Druid'>Druid</option>
                <option value='Hunter'>Hunter</option>
                <option value='Mage'>Mage</option>
                <option value='Monk'>Monk</option>
                <option value='Paladin'>Paladin</option>
                <option value='Priest'>Priest</option>
                <option value='Rogue'>Rogue</option>
                <option value='Shaman'>Shaman</option>
                <option value='Warlock'>Warlock</option>
                <option value='Warrior'>Warrior</option>
              </select>
            </div>
            <div className={classColourClasses}>

            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='characterRole'>Role</label>
            <div className='col-sm-10'>
              <select className='form-control' id='characterRole' value={this.state.addCharacter_Role} onChange={RosterControlPanelActions.updateCharacterRole}>
                <option value='Tank'>Tank</option>
                <option value='DPS'>DPS</option>
                <option value='Healer'>Healer</option>
              </select>
            </div>
          </div>
          <button type='submit' className='btn btn-default pull-right'>Submit</button>
        </form>
      </div>
    );
  }
}

export default RosterControlPanel;
