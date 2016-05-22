import React from 'react';
import {link} from 'react-router';
import RegisterActions from '../actions/RegisterActions';
import RegisterStore from '../stores/RegisterStore';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = RegisterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    RegisterStore.listen(this.onChange);
  }

  componentWillUnmount() {
    RegisterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    false
  }
}

export default Register;
