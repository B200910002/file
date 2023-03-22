import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { SuccessAlert, DangerAlert } from "../util/Alert";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(email, password);
    setResponse(response)
  };
  return (
    <form onSubmit={handleSubmit}>
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
          onChange={(event) => setEmail(event.target.value)}
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
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600"
        type="submit"
      >
        Login
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
