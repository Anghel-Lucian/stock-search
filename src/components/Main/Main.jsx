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
    const { results = [] } = this.props;
    const { selectedResult } = this.state;  

    return (
      <main>
        {selectedResult === null ? <Results results={results} setSelectedResult={this.setSelectedResult} /> : <div></div>}
      </main>
    );
  }
}

Main.propTypes = {
  results: PropTypes.array
};