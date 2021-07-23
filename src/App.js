import "./App.css";
import { Component } from "react";
import { sampleText } from "./sampleText";
import DOMPurify from "dompurify";

import marked from "marked";

class App extends Component {
  state = {
    text: sampleText,
  };

  componentDidMount() {
    console.log("mounted");
    const text = localStorage.getItem("text");
    text ? this.setState({ text }) : this.setState({ text: sampleText });
  }

  componentDidUpdate() {
    console.log("updated");
    // const text = this.state.text;
    const { text } = this.state;
    localStorage.setItem("text", text);
  }

  handleChange = (event) => {
    const text = event.target.value;
    this.setState({ text });
  };

  renderText = (text) => {
    // return DOMPurify.sanitize(marked(text));
    const __html = DOMPurify.sanitize(marked(text));
    return { __html };
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea
              onChange={this.handleChange}
              value={this.state.text}
              className="form-control"
              rows="35"
            ></textarea>
          </div>
          <div className="col-sm-6">
            <div
              dangerouslySetInnerHTML={this.renderText(this.state.text)}
              // __html: this.renderText(this.state.text)
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
