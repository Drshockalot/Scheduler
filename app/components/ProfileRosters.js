import React from 'react';
import {Link} from 'react-router';
import ProfileRostersStore from '../stores/ProfileRostersStore';
import ProfileRostersActions from '../actions/ProfileRostersActions';
import NavbarStore from '../stores/NavbarStore';
import ProfileSideNav from './ProfileSidenav';

class ProfileRosters extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileRostersStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileRostersStore.listen(this.onChange);
    ProfileRostersActions.getComponentData();
  }

  componentWillUnmount() {
    ProfileRostersStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var list;
    if(this.state.characters.length > 0) {
      list = this.state.characters.map(function(character, index) {
        var rosters;
        if(rosters.length > 0) {
          rosters = character.rosters.map(function(roster, index) {
            return (
              <div className='text-center'><i>{roster.name}</i></div>
            );
          });
        } else {
          rosters = (
            <div className='text-center'><i>No Rosters</i></div>
          );
        }

        return (
          <div className='col-md-4'>
            <h4 className='text-center'><strong>{character.name}</strong></h4>
            <br />
            {rosters}
          </div>
        );
      }, this);
    }

    return (
      <div id='wrapper'>
      <ProfileSideNav />
        <div id='page-content-wrapper'>
          <div className='container-fluid'>
            <h3>Character Rosters</h3>
            <div className='row'>
              {list}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileRosters;
