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

  componentDidMount() {
    CharacterManagementStore.listen(this.onChange);
    if(sessionStorage.characterManagement)
      CharacterManagementActions.restoreState(JSON.parse(sessionStorage.characterManagement));
    if($.ajax({method: 'GET', url: '/auth/role'}).then((data) => {
      if(data.role && data.role == 'admin') {
        CharacterManagementActions.getCharactersForConfirmation();
      }
    }));
  }

  componentWillUnmount() {
    CharacterManagementStore.unlisten(this.onChange);
    sessionStorage.characterManagement = JSON.stringify(this.state);
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
            }}>Confirm</button>;
          } else {
            btn = <button value={character.id} className='btn btn-danger' onClick={e => {
              CharacterManagementActions.unconfirmCharacter(e.target.value);
            }}>Unconfirm</button>;
          }
          return (
            <tr key={character.id}>
              <td className='col-xs-2 vert-align' key={character.name}>{character.name}</td>
              <td className='col-xs-2 vert-align' key={characterClass}>{characterClass}</td>
              <td className='col-xs-2 vert-align' key={character.realm}>{character.realm}</td>
              <td className='col-xs-1 vert-align' key={character.rank}>{character.rank}</td>
              <td className='col-xs-1 vert-align' key={character.main_role + 'main'}>{character.main_role}</td>
              <td className='col-xs-1 vert-align' key={character.off_role + 'off'}>{character.off_role}</td>
              <td className='col-xs-3 vert-align' key='buttons'>{btn}</td>
            </tr>
          );
        });
        return (
          <div key={user.id} className='row'>
            <h4><strong>{user.battletag}</strong></h4>
            <table className='table'>
              <tbody>
                <tr>
                  <td className='col-xs-2 vert-align'><strong>Name</strong></td>
                  <td className='col-xs-2 vert-align'><strong>Class</strong></td>
                  <td className='col-xs-2 vert-align'><strong>Realm</strong></td>
                  <td className='col-xs-1 vert-align'><strong>Rank</strong></td>
                  <td className='col-xs-1 vert-align'><strong>Main Role</strong></td>
                  <td className='col-xs-1 vert-align'><strong>Off Role</strong></td>
                  <td className='col-xs-3'></td>
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
