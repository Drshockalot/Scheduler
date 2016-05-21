import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore';
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    FooterActions.getTopCharacters();
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    // let admins = this.state.admins.map((name) => {
    //   return (
    //     <li key={name}>{name}</li>
    //   )
    // });

    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-5'>
              <h2 className='lead'><strong>Darkstorm</strong></h2>
              <p>Scheduling application for a World of Warcraft raiding guild.</p>
            </div>
            <div className='col-sm-7 hidden-xs'>
              <h2 className='lead'><strong>Admins</strong></h2>
              <ul className='list-inline'>

              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
