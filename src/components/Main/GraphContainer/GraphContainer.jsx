import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import Graph from "./Graph/Graph";

export default class GraphContainer extends React.PureComponent {
  state = { requestStatus: "idle", quotes: [], showAverage: false };

  async componentDidUpdate() {
    const { symbol = "", getQuotes = () => {}, setSelectedResult = () => {} } = this.props;

    if(symbol.trim().length === 0) return;

    this.setState({ requestStatus: "loading" });
    setSelectedResult({});

    const quotes = await getQuotes(symbol);

    if(quotes.length === 0) {
      this.setState({ requestStatus: "error" });
      return;
    }

    this.setState({ quotes, requestStatus: "success" });
  }

  renderContent() {
    const { requestStatus, quotes, showAverage } = this.state;

    switch (requestStatus) {
      case "loading": {
        return <div className="loader loader--big" />;
      }
      case "error": {
        return <div className="graph__error-message"><p>Oops! We hit a snag. Please try again.</p></div>;
      }
      case "success": {
        return (
          <>
            <div className="graph-container__options">
              <label>
                Show average:
                <input type="checkbox" onClick={this.setShowAverage} value={showAverage} />
              </label>
              <form>
                <input type="date" />
                <input type="date" />
                <button type="submit">Set filters</button>
              </form>
            </div>
            <Graph quotes={quotes} showAverage={showAverage} />
          </>
        );
      }
    }
  }

  setShowAverage = () => {
    this.setState((state) => ({ showAverage: !state.showAverage }));
  };

  render() {
    return (
      <div id="graph-container">
        {this.renderContent()}
      </div>
    );
  }
}

GraphContainer.propTypes = {
  companyName: PropTypes.string,
  symbol: PropTypes.string,
  getQuotes: PropTypes.func,
  setSelectedResult: PropTypes.func
};