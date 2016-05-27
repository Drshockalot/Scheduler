import React from 'react';
import {Link} from 'react-router';
import CharacterManagementStore from './../../stores/admin/CharacterManagementStore';
import CharacterManagementActions from './../../actions/admin/CharacterManagementActions';

class CharacterManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = CharacterManagementStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    CharacterManagementStore.listen(this.onChange);

  }

  componentWillUnmount() {
    CharacterManagementStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {

    return (
      false
    );
  }
}

export default CharacterManagement;
