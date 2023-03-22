import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
        <h1>Home</h1>
      </div>
    );
  }
}
