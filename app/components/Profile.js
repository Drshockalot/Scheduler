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


    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-2'>
            <div className='btn btn-primary' onClick={ProfileActions.retrieveProfileCharacters}>Retrieve Characters</div>
          </div>
          <div className='col-md-10'>
            <h3>Characters</h3>
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
      </div>
    );
  }
}

export default Profile;
