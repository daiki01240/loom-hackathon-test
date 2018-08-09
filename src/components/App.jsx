import React, {Component} from 'react';

// import Contract from './contract';

import Header from './Header';
import TimeLine from './TimeLine';

const App = class App extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.contract = new Contract()
  // }

  // async componentWillMount() {
  //   await this.contract.loadContract()
  // }

  // onChangeHandler(event) {
  //   this.value = event.target.value
  //   const isValid = this.value > 0
  //   this.setState({ isValid })
  // }

  render() {
    return (
      <div className="main">
        <div className="container">
          <Header />
          <TimeLine />
        </div>
      </div>
    )
  }
};

export default App;
