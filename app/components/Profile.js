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
            //return retrievedCharactersCopy[i];
            arr.push(retrievedCharactersCopy[i]);
        }
      });
      console.log(arr);
      retrievedCharactersList = arr.map((character) => {
        var characterRace = _.findWhere(races, { id : character.race }).name;
        var characterClass = _.findWhere(classes, { id : character.class }).name;
        return (
          <tr>
            <td>character.name</td>
            <td>characterClass</td>
            <td>characterRace</td>
            <td></td>
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
                  <td>Name</td>
                  <td>Class</td>
                  <td>Race</td>
                  <td>Role</td>
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
