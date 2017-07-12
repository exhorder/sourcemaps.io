import React, { Component } from "react";
import logo from "./logo.svg";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;

const TARGET_URL_PLACEHOLDER = "http://code.jquery.com/jquery-1.9.1.min.js";

class App extends Component {
  constructor() {
    super();
    this.state = {
      targetUrl: ""
    };
  }

  handleSubmit(evt) {
    const url = this.state.targetUrl || TARGET_URL_PLACEHOLDER;

    evt.preventDefault();
    fetch(`${VALIDATE_URL}?url=${url}`, {
      method: "POST"
    }).then(response => {
      response.text().then(gcloudObject => {});
    });
  }
  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>SourceMap Validator</h1>
          <p className="lead">
            SourceMaps are hard. Make sure you did it right.
          </p>
          <form
            action="/validate"
            className="form-inline"
            onSubmit={evt => this.handleSubmit(evt)}>
            <div className="input-append">
              <input
                type="text"
                className="span6"
                name="url"
                value={this.state.targetUrl}
                onChange={(evt) => this.setState({targetUrl: evt.target.value})}
                placeholder={TARGET_URL_PLACEHOLDER}
              />
              <button className="btn">Validate</button>
            </div>
          </form>
        </div>
        <h2>Examples</h2>
        <ul>
          <li>
            <a href="/validate?url=http%3A%2F%2Fcode.jquery.com%2Fjquery-1.9.1.min.js">
              jQuery
            </a>
          </li>
          <li>
            <a href="/validate?url=http%3A%2F%2Fdocumentcloud.github.io%2Fbackbone%2Fbackbone-min.js">
              Backbone.js
            </a>
          </li>
          <li>
            <a href="/validate?url=http%3A%2F%2Fcdn.ravenjs.com%2F1.1.0%2Fraven.min.js">
              Raven.js
            </a>
          </li>
          <li>
            <a href="/validate?url=http%3A%2F%2Fgetsentry-cdn.s3.amazonaws.com%2Ftest%2Fraven.min.js">
              Raven.js (with closure compiler)
            </a>
          </li>
        </ul>

        <hr />

        <p>
          Brought to you by <a href="https://sentry.io">Sentry</a>
        </p>
      </div>
    );
  }
}

export default App;