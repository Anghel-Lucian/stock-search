import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class Results extends React.PureComponent {
  curriedSetSelectedResult(...args) {
    const { setSelectedResult = () => {}, setResults = () => {} } = this.props;

    return () => {
      setSelectedResult(...args);
      setResults([]);
    };
  }

  renderResults() {
    const { results = [] } = this.props;

    return results.map(result => {
      return (
        <li key={`${result.name}${result.symbol}`} onClick={this.curriedSetSelectedResult({ name: result.name, symbol: result.symbol })}>
          <p>{result.name}</p>
          <p>{result.symbol}</p>
        </li>
      );
    });
  }

  render() {
    const { results = [] } = this.props;

    return (
      <div id="results">
        {results.length > 0 ? (
          <ul>
            {this.renderResults()}
          </ul>
        ) : null}
      </div>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array,
  setSelectedResult: PropTypes.func,
  setResults: PropTypes.func
};