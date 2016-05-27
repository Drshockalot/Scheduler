import React from 'react';
import {Link} from 'react-router';
import CharacterManagementStore from './../../stores/admin/CharacterManagementStore';
import CharacterManagementActions from './../../actions/admin/CharacterManagementActions';
import AdminSideNav from './AdminSideNav';
import _ from 'underscore';

var classes = require('./../../../utility/WowClasses');
var races = require('./../../../utility/WowRaces');

class CharacterManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = CharacterManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterManagementStore.listen(this.onChange);
    CharacterManagementActions.getCharactersForConfirmation();
  }

  componentWillUnmount() {
    CharacterManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var characterConfirmationList;

    if(this.state.UserCharacterList) {
      characterConfirmationList = this.state.UserCharacterList.map(function(user, index) {
        var characterList = user.characters.map(function(character, index) {
          var characterClass = _.findWhere(classes, { id: character.class }).name;
          var characterRace = _.findWhere(races, { id: character.race }).name;
          var btn;
          if(character.confirmed) {
            btn = <button value={character.id} className='btn btn-success' onClick={e => {
              CharacterManagementActions.confirmCharacter(e.target.value);
            }}>Confirm</button>
          } else {
            btn = <button value={character.id} className='btn btn-danger' onClick={e => {
              CharacterManagementActions.unconfirmCharacter(e.target.value);
            }}>Unconfirm</button>
          }
          return (
            <tr>
              <td key={character.name}>{character.name}</td>
              <td key={characterClass}>{characterClass}</td>
              <td key={characterRace}>{characterRace}</td>
              <td key={character.realm}>{character.realm}</td>
              <td key={character.rank}>{character.rank}</td>
              <td key='buttons'>{btn}</td>
            </tr>
          );
        });
        return (
          <div className='row'>
            <h4><strong>{user.battletag}</strong></h4>
            <table className='table'>
              <tbody>
                <tr>
                  <td><strong>Name</strong></td>
                  <td><strong>Class</strong></td>
                  <td><strong>Race</strong></td>
                  <td><strong>Realm</strong></td>
                  <td><strong>Rank</strong></td>
                </tr>
                {characterConfirmationList}
              </tbody>
            </table>
          </div>
        );
      });
    }

    return (
      <div className='container'>
        <AdminSideNav></AdminSideNav>
        <div className='row'>
          <h3>Character Confirmation</h3>
        </div>
        {characterConfirmationList}
      </div>
    );
  }
}

export default CharacterManagement;
