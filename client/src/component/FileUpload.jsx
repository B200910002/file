import React, { Component } from "react";
import { FileContext } from "../context/FileContext";
import { SuccessAlert, DangerAlert } from "../util/Alert";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = { category: "", extention: "", response: "" };
  }
  static contextType = FileContext;
  handleSubmit = async (event) => {
    event.preventDefault();
    const { uploadFile } = this.context;
    const response = await uploadFile(event);
    this.setState({ response: response });
  };
  render() {
    const { categories, extentions, getAllCategories, getAllExtentions } =
      this.context;
    const { category, extention, response } = this.state;
    return (
      <div className="container mx-auto my-5 py-2 px-4 border border-gray-400 rounded-lg">
        <h2 className="text-gray-700 font-bold mb-2">Upload</h2>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="" className="text-gray-700 font-bold mb-2">
            Category:{" "}
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            onClick={() => getAllCategories()}
            onChange={(event) => {
              getAllExtentions(event.target.value);
              this.setState({
                category: categories.find(function (element) {
                  return element._id === event.target.value;
                }),
              });
            }}
            required
          >
            {categories.map((category, index) => (
              <option
                id="option"
                key={index}
                value={category._id}
                className="text-gray-700 block px-4 py-2 text-sm"
              >
                {category.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor="extention" className="text-gray-700 font-bold mb-2">
            Extention:{" "}
          </label>
          <select
            id="extention"
            name="extention"
            className="mt-1 rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            onChange={(event) => {
              this.setState({
                extention: extentions.find(function (element) {
                  return element._id === event.target.value;
                }),
              });
            }}
            required
          >
            {extentions.map((extention, index) => (
              <option
                key={index}
                value={extention._id}
                className="text-gray-700 block px-4 py-2 text-sm"
              >
                {extention.name}
              </option>
            ))}
          </select>
          <br />
          <div className="mb-4">
            <label htmlFor="file" className="text-gray-700 font-bold mb-2">
              Choose a file to upload:{" "}
            </label>
            <input
              type="file"
              name="file"
              id="file"
              className="py-2 px-3 border border-gray-400 rounded-lg"
              accept={"." + extention.name}
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload
            </button>
          </div>
        </form>
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
      </div>
    );
  }
}
