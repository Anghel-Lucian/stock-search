import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import Results from "./Results";

export default class Main extends React.PureComponent {
  render() {
    const { results } = this.props;

    return (
      <main>
        <Results results={results} />
      </main>
    );
  }
}

Main.propTypes = {
  results: PropTypes.array
};