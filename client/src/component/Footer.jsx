import React, { Component } from "react";

class Footer extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {};
  render() {
    return (
      <footer className="bg-light py-3">
        <p className="text-center">
          No Copyright &copy; {new Date().getFullYear()}
        </p>
      </footer>
    );
  }
}

export default Footer;
