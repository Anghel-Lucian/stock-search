import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class Results extends React.PureComponent {
  renderResults() {
    const { results = [] } = this.props;

    return results.map(result => {
      return (
        <li key={`${result.name}${result.symbol}`}>
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
        ) : (
          <p>Search for a company first...</p>
        )}
      </div>
    );
  }
}

Results.propTypes = {
  results: PropTypes.array
};