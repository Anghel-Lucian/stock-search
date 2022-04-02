import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import Results from "./Results";

export default class Main extends React.PureComponent {
  state = { selectedResult: null };

  setSelectedResult = (result) => {
    this.setState({ selectedResult: result });
  };

  render() {
    const { results = [], setResults = () => {} } = this.props;
    const { selectedResult } = this.state;  

    return (
      <main>
        <Results results={results} setSelectedResult={this.setSelectedResult} setResults={setResults} />
        <p>{selectedResult.name}</p>
      </main>
    );
  }
}

Main.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func
};