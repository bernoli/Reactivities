import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { cars } from "./cars_demo/carsTypes";
import Shop from "./cars_demo/shop";
import axios from "axios";

class App extends Component {
  state = {
    values: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/api/values")
      .then(res => {
        this.setState({ values: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let valuesElement = null;
    if (this.state.values) {
      valuesElement = (
        <ul>
          {this.state.values.map((value: any) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      );
    }
    return (
      <div className="App">
        <header className="App-header">
          <Shop cars={cars} name="Shop 1" />
          {valuesElement}
        </header>
      </div>
    );
  }
}

export default App;
