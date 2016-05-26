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
        if(retrievedCharactersCopy[i].level === 100) {
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
            <td key={character.realm}>{character.realm}</td>
            <td key='main/alt'>
              <button className='btn btn-primary' onClick={() => {
                character.rank = 'main';
                ProfileActions.confirmCharacter(character);
              }}>Main</button>
            </td>
            <td>
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
            <div className='col-sm-offset-6 col-sm-6'>
              <h2>{character.rank}</h2>
            </div>
            <div className='form-horizontal'>
              <div className='form-group'>
                <label className='col-sm-6 control-label'><strong>Name:</strong></label>
                <div className='col-sm-6 control-label text-left'>
                  {character.name}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'><strong>Class:</strong></label>
                <div className='col-sm-6 control-label text-left'>
                  {_.findWhere(classes, { id : parseInt(character.class) }).name}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'><strong>Main Role:</strong></label>
                <div className='col-sm-6'>
                  <select className='form-control' id='main-role' value={this.state.storedCharacters[index].main_role} onChange={e => {ProfileActions.handleMainRoleChange(e.target.value, index)}}>
                    <option key='Tank' value='Tank'>Tank</option>
                    <option key='Healer' value='Healer'>Healer</option>
                    <option value='DPS'>DPS</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'><strong>Off Role:</strong></label>
                <div className='col-sm-6'>
                  <select className='form-control' id='off-role' value={this.state.storedCharacters[index].off_role} onChange={e => {ProfileActions.handleOffRoleChange(e.target.value, index)}}>
                    <option key='Tank' value='Tank'>Tank</option>
                    <option key='Healer' value='Healer'>Healer</option>
                    <option value='DPS'>DPS</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'><strong>Average ilvl:</strong></label>
                <div className='col-sm-6 control-label text-left'>
                  {character.average_ilvl}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-6 control-label'><strong>Admin Confirmed:</strong></label>
                <div className='col-sm-6 control-label text-left'>
                  {character.confirmed}
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-offset-6 col-sm-6'>
                  <button className='btn btn-default' onClick={() => {
                    ProfileActions.saveStoredCharacterDetails(this.state.storedCharacters[index]);
                  }}>Save</button>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-offset-6 col-sm-6'>
                  <button className='btn btn-danger' onClick={() => {
                    ProfileActions.deleteStoredCharacter(this.state.storedCharacters[index]);
                  }}>Delete</button>
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-offset-6 col-sm-6'>
                  <button className='btn btn-info' onClick={() => {
                    ProfileActions.updateIlvlForCharacter(this.state.storedCharacters[index]);
                  }}>Update ilvl</button>
                </div>
              </div>
            </div>
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
            <h3>Level 100 Characters</h3>
            <table className='table'>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td><strong>Class</strong></td>
                  <td><strong>Race</strong></td>
                  <td><strong>Realm</strong></td>
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
