import React from 'react';
import {Link} from 'react-router';
import CharacterManagementStore from './../../stores/admin/CharacterManagementStore';
import CharacterManagementActions from './../../actions/admin/CharacterManagementActions';
import AdminSideNav from './AdminSideNav';

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



    return (
      <div className='container'>
        <AdminSideNav></AdminSideNav>
        <div className='row'>
          <h3>Character Confirmation</h3>
        </div>
      </div>
    );
  }
}

export default CharacterManagement;
