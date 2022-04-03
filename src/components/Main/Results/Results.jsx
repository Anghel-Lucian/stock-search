import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class Results extends React.PureComponent {
  constructor(props) {
    super(props);

    this.resultsRef = React.createRef();
  }

  componentDidMount() {
    const { setResults = () => {} } = this.props;

    document.addEventListener("click", () => {
      setResults([]);
    });
  }

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
      <div id="results" ref={this.resultsRef}>
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