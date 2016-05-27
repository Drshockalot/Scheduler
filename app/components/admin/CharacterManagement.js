import React from 'react';
import {Link} from 'react-router';
import CharacterManagementStore from './../../stores/admin/CharacterManagementStore';
import CharacterManagementActions from './../../actions/admin/CharacterManagementActions';
import AdminSideNav from './AdminSideNav';
import NavbarStore from './../../stores/NavbarStore';
import { browserHistory } from 'react-router';
import _ from 'underscore';

var classes = require('./../../../utility/WowClasses');
var races = require('./../../../utility/WowRaces');

class CharacterManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = CharacterManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    if (NavbarStore.getState().userRole === 'member' || NavbarStore.getState().userRole === '') {
      browserHistory.push('/');
      toastr.error('You do not have authorization to access Admin', 'YOU SHALL NOT PASS!!');
    }
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
          var characterClass = _.findWhere(classes, { id: parseInt(character.class) }).name;
          var btn;
          if(character.confirmed == 0) {
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
              <td key={character.realm}>{character.realm}</td>
              <td key={character.rank}>{character.rank}</td>
              <td key={character.main_role}>{character.main_role}</td>
              <td key={character.off_role}>{character.off_role}</td>
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
                  <td><strong>Realm</strong></td>
                  <td><strong>Rank</strong></td>
                  <td><strong>Main Role</strong></td>
                  <td><strong>Off Role</strong></td>
                </tr>
                {characterList}
              </tbody>
            </table>
          </div>
        );
      });
    }

    return (
      <div id='wrapper'>
        <AdminSideNav></AdminSideNav>
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <div className='row'>
              <h3>Character Confirmation</h3>
            </div>
            {characterConfirmationList}
          </div>
        </div>
      </div>
    );
  }
}

export default CharacterManagement;
