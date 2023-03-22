import React, { Component } from "react";
import { AuthContext } from "../context/AuthContext";
import { SuccessAlert, DangerAlert } from "../util/Alert";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", repeatPassword: "", response: "" };
  }
  static contextType = AuthContext;
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { register } = this.context;
    const response = await register(
      this.state.email,
      this.state.password,
      this.state.repeatPassword
    );
    this.setState({ response: response });
  };
  render() {
    const { email, password, repeatPassword, response } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="border border-gray-400 py-2 px-3 w-full rounded-lg"
            type="text"
            id="email"
            name="email"
            value={email}
            required
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="border border-gray-400 py-2 px-3 w-full rounded-lg"
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="repeatPassword"
          >
            Re-Password
          </label>
          <input
            className="border border-gray-400 py-2 px-3 w-full rounded-lg"
            type="password"
            id="repeatPassword"
            name="repeatPassword"
            value={repeatPassword}
            required
            onChange={this.handleChange}
          />
        </div>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Register
        </button>
        <div>
          <br />
          {response ? (
            response.error ? (
              <DangerAlert message={response.error} />
            ) : (
              <SuccessAlert message={response} />
            )
          ) : (
            <></>
          )}
        </div>
      </form>
    );
  }
}
