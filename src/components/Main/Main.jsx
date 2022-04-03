import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import Results from "./Results";
import Graph from "./GraphContainer";

export default class Main extends React.PureComponent {
  state = { selectedResult: {} };

  setSelectedResult = (result) => {
    this.setState({ selectedResult: result });
  };

  render() {
    const { results = [], setResults = () => {}, getQuotes = () => {} } = this.props;
    const { selectedResult } = this.state;  

    return (
      <main>
        <Results setSelectedResult={this.setSelectedResult} setResults={setResults} results={results} />
        <Graph setSelectedResult={this.setSelectedResult} getQuotes={getQuotes} companyName={selectedResult.name} symbol={selectedResult.symbol} />
      </main>
    );
  }
}

Main.propTypes = {
  results: PropTypes.array,
  setResults: PropTypes.func,
  getQuotes: PropTypes.func
};