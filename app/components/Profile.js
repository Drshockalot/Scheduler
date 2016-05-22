import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import NavbarStore from '../stores/NavbarStore';

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
    // var retreivedCharactersList;
    // var storedCharactersList;
    //
    // if(this.state.retreivedCharacters) {
    //   var retreivedCharactersCopy = this.state.retreivedCharacters;
    //   var arr = Object.keys(retreivedCharactersCopy).map(function(i) {return retreivedCharactersCopy[i]});
    //
    //   retreivedCharactersList = arr.map((character) => {
    //     return (
    //
    //     )
    //   });
    // }


    return (
      <div className='container'>
        <div className='row'>
          <div className='btn btn-primary' onClick={ProfileActions.retreiveProfileCharacters}>Retreive Characters</div>
          <div className='col-md-11'>
            <h3>Characters</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
