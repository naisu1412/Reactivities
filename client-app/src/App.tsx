import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { cars } from './demo';
import { CarItem } from './CarItem';

class App extends Component {
  state = {
    values: []
  }

  componentDidMount() {
    this.setState({
      values: [{ id: 1, name: "Value 101" }, { id: 2, name: "Value 102" }]
    })
  }
  render() {
    return (
      <div className="App">
        <h1>
          <ul>
            {this.state.values.map((value: any) => (
              <li>{value.name}</li>
            ))}
          </ul>
        </h1>
      </div>
    );
  }

}

export default App;
