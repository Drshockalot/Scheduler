import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import NavbarStore from '../stores/NavbarStore';
var classes = require('../../utility/WowClasses');
var races = require('../../utility/WowRaces');
var _ = require('underscore');

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    ProfileActions.getStoredCharacters();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var retrievedCharactersList;
    var storedCharactersList;

    if(this.state.retrievedCharacters) {
      var retrievedCharactersCopy = this.state.retrievedCharacters;
      var arr = [];
      Object.keys(retrievedCharactersCopy).map(function(i) {
        if(retrievedCharactersCopy[i].realm === "Zenedar") {
            arr.push(retrievedCharactersCopy[i]);
        }
      });

      retrievedCharactersList = arr.map((character) => {
        var characterRace = _.findWhere(races, { id : character.race }).name;
        var characterClass = _.findWhere(classes, { id : character.class }).name;
        return (
          <tr key={character.name}>
            <td key={character.name}>{character.name}</td>
            <td key={characterClass}>{characterClass}</td>
            <td key={characterRace}>{characterRace}</td>
            <td key='main/alt'>
              <button className='btn btn-primary' onClick={() => {
                character.rank = 'main';
                ProfileActions.confirmCharacter(character);
              }}>Main</button>
              <button className='btn btn-default' onClick={() => {
                character.rank = 'alt';
                ProfileActions.confirmCharacter(character);
              }}>Alt</button>
            </td>
          </tr>
        );
      });
    }

    if(this.state.storedCharacters.length > 0) {
      storedCharactersList = this.state.storedCharacters.map((character, index) => {
        return (
          <div className='col-md-4'>
            <h4>{character.rank}</h4>
            <form onSubmit={e => {
              e.preventDefault();
              ProfileActions.updateStoredCharacter(this.state.storedCharacters[index]);
            }} className='form-horizontal'>
              <div className='form-group'>
                <label className='col-sm-6 control-label'>Name</label>
                <div className='col-sm-6'>
                  {character.name}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'>Class</label>
                <div className='col-sm-6'>
                  {_.findWhere(classes, { id : parseInt(character.class) })}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'>Main Role</label>
                <div className='col-sm-6'>
                  <select className='form-control' id='main-role' value={this.state.storedCharacters[index].main_role} onChange={e => {ProfileActions.handleMainRoleChange(e.target.value, index)}}>
                    <option value='Tank'>Tank</option>
                    <option value='Healer'>Healer</option>
                    <option value='DPS'>DPS</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'>Off Role</label>
                <div className='col-sm-6'>
                  <select className='form-control' id='off-role' value={this.state.storedCharacters[index].off_role} onChange={e => {ProfileActions.handleOffRoleChange(e.target.value, index)}}>
                    <option value='Tank'>Tank</option>
                    <option value='Healer'>Healer</option>
                    <option value='DPS'>DPS</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'>Admin Confirmed</label>
                <div className='col-sm-6'>
                  {character.confirmed}
                </div>
              </div>
            </form>
          </div>
        );
      })
    }

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-2'>
            <div className='btn btn-primary' onClick={ProfileActions.retrieveProfileCharacters}>Retrieve Characters</div>
          </div>
          <div className='col-md-10'>
            <h3>Zenedar Characters</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td><strong>Class</strong></td>
                  <td><strong>Race</strong></td>
                  <td><strong>Rank</strong></td>
                </tr>
                {retrievedCharactersList}
              </tbody>
            </table>
          </div>
        </div>
        <div className='row'>
          <h3>Confirmed Characters</h3>
        </div>
        <div className='row'>
          {storedCharactersList}
        </div>
      </div>
    );
  }
}

export default Profile;
