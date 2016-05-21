import Navbar from './Navbar';
import Footer from './Footer';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar history={this.props.history} url={this.props.location} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default App;
