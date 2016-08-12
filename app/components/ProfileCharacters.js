import React from 'react';
import {Link} from 'react-router';
import ProfileCharactersStore from '../stores/ProfileCharactersStore';
import ProfileCharactersActions from '../actions/ProfileCharactersActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';
var classes = require('../../utility/WowClasses');
var races = require('../../utility/WowRaces');
var _ = require('underscore');
import classNames from 'classnames';

class ProfileCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileCharactersStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileCharactersStore.listen(this.onChange);
    if(sessionStorage.profileCharacters)
      ProfileCharactersActions.restoreState(JSON.parse(sessionStorage.profileCharacters));
    ProfileCharactersActions.getChosenCharacters();
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
    sessionStorage.profileCharacters = JSON.stringify(this.state);
  }

  onChange(state) {
    this.setState(state);
  }

  classColour(character) {
    let currentClass = _.findWhere(classes, {id: parseInt(character.class)}).name;
    var arr = currentClass.split(" ");

    var ret = '';
    for (var i = 0; i < arr.length; ++i) {
      ret += arr[i].toLowerCase();
      ret += '-';
    }

    ret += 'color';
    return classNames(ret, { 'col-sm-1' : true});;
  }

  render() {
    var retrievedCharactersList;
    var chosenCharactersList;

    if(this.state.retrievedCharacters.length > 0) {
      var retrievedCharactersCopy = this.state.retrievedCharacters;
      var arr = [];
      Object.keys(retrievedCharactersCopy).map(function(i) {
        if(retrievedCharactersCopy[i].level >= 100 &&
           retrievedCharactersCopy[i].guild === "DarkStorm" &&
           retrievedCharactersCopy[i].realm === "Zenedar") {
            arr.push(retrievedCharactersCopy[i]);
        }
      });

      retrievedCharactersList = arr.map((character, index) => {
        var characterRace = _.findWhere(races, { id : character.race }).name;
        var characterClass = _.findWhere(classes, { id : character.class }).name;
        return (
          <tr key={'character' + index}>
            <td key={'color' + index} className={this.classColour(character)}></td>
            <td key={'name' + index} className='vert-align'>{character.name}</td>
            <td key={'class' + index} className='vert-align'>{characterClass}</td>
            <td key={'race' + index} className='vert-align'>{characterRace}</td>
            <td key={'realm' + index} className='vert-align'>{character.realm}</td>
            <td key={'rank' + index} className='vert-align'>
              <button className='btn btn-primary' onClick={() => {
                character.rank = 'main';
                ProfileCharactersActions.confirmCharacter(character);
              }}>Main</button>
              &nbsp;&nbsp;
              <button className='btn btn-default' onClick={() => {
                character.rank = 'alt';
                ProfileCharactersActions.confirmCharacter(character);
              }}>Alt</button>
            </td>
          </tr>
        );
      });
    }

    if(this.state.chosenCharacters.length > 0) {
      chosenCharactersList = this.state.chosenCharacters.map((character, index) => {
        return (
          <div key={character.id} className='col-md-4'>
            <div className='col-sm-offset-4 col-xs-8 text-center'>
              <h3><strong>{character.rank}</strong></h3>
            </div>
            <div className='form-horizontal'>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Name:</strong></label>
                <div className='col-xs-8 text-center vert-align'>
                  {character.name}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Class:</strong></label>
                <div className='col-xs-8 text-center vert-align'>
                  {_.findWhere(classes, { id : parseInt(character.class) }).name}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Realm:</strong></label>
                <div className='col-xs-8 text-center vert-align'>
                  {character.realm}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Main Role:</strong></label>
                <div className='col-xs-8'>
                  <select className='form-control' id='main-role' value={this.state.chosenCharacters[index].main_role} onChange={e => ProfileCharactersActions.handleMainRoleChange(e.target.value, index)}>
                    <option key='Tank' value='Tank'>Tank</option>
                    <option key='Healer' value='Healer'>Healer</option>
                    <option key='DPS' value='DPS'>DPS</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Off Role:</strong></label>
                <div className='col-xs-8'>
                  <select className='form-control' id='off-role' value={this.state.chosenCharacters[index].off_role} onChange={e => ProfileCharactersActions.handleOffRoleChange(e.target.value, index)}>
                    <option key='Tank' value='Tank'>Tank</option>
                    <option key='Healer' value='Healer'>Healer</option>
                    <option key='DPS' value='DPS'>DPS</option>
                  </select>
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Average ilvl:</strong></label>
                <div className='col-xs-8 text-center vert-align'>
                  {character.average_ilvl}
                </div>
              </div>
              <div className='form-group'>
                <label className='col-sm-4 control-label'><strong>Confirmed:</strong></label>
                <div className='col-xs-8 text-center vert-align'>
                  {character.confirmed ? 'Yes' : 'No'}
                </div>
              </div>
              <div className='form-group'>
                <div className='col-sm-offset-4 col-xs-8'>
                  <button className='btn btn-default' onClick={() =>
                    ProfileCharactersActions.saveChosenCharacterDetails(this.state.chosenCharacters[index])
                  }>Save</button>
                  &nbsp;&nbsp;
                  <button className='btn btn-info' onClick={() => {
                    ProfileCharactersActions.updateIlvlForCharacter(this.state.chosenCharacters[index], index);
                  }}>Update ilvl</button>
                  &nbsp;&nbsp;
                  <button className='btn btn-danger' onClick={() => {
                    ProfileCharactersActions.deleteChosenCharacter(this.state.chosenCharacters[index]);
                  }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        );
      });
    }

    if(typeof(Storage) === 'undefined' || (sessionStorage.role === '' || NavbarStore.getState().userRole === ''))
      return null;

    return (
      <div id='wrapper'>
      <ProfileSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-md-2'>
                <div className='btn btn-primary' onClick={ProfileCharactersActions.retrieveProfileCharacters}>Retrieve Characters</div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12'>
                <h3>Valid Characters</h3>
                    {this.state.retrievedCharacters.length > 0 ?
                      <table className='table'>
                      <tbody>
                        <tr>
                          <td></td>
                          <td><strong>Name</strong></td>
                          <td><strong>Class</strong></td>
                          <td><strong>Race</strong></td>
                          <td><strong>Realm</strong></td>
                          <td><strong>Rank</strong></td>
                        </tr>
                        {retrievedCharactersList}
                        </tbody>
                      </table>
                      : <strong>Press the Retrieve Characters button to display your valid characters</strong>}
              </div>
            </div>
            <div className='row'>
              <h3>Chosen Characters</h3>
            </div>
            <div className='row'>
              {chosenCharactersList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCharacters;
