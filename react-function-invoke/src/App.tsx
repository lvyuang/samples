import React from 'react';
import Input from './Input';
import './App.css';

class App extends React.Component {
  reset: null | (() => void) = null

  handleClick = () => {
    this.reset && this.reset()
  }

  render () {
    return <div className="App" style={{
      margin: '10px'
    }}>
      <Input resetRef={(reset) => this.reset = reset} />
      <button onClick={this.handleClick}>reset</button>
    </div>
  }
}

export default App;
