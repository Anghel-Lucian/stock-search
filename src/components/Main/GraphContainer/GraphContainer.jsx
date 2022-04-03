import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class GraphContainer extends React.PureComponent {
  state = { requestStatus: "idle", quotes: [] };

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

    this.setState({ quotes, requestStatus: "idle" });
  }

  renderContent() {
    const { requestStatus, quotes } = this.state;

    if(requestStatus === "loading") {
      return <div className="loader loader--big" />;
    } else if(requestStatus === "error") {
      return <div className="graph__error-message"><p>Oops! We hit a snag. Please try again.</p></div>;
    }

    return <div>{quotes[0]}</div>;
  }

  render() {
    return (
      <div id="graph">
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