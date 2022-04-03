import React from "react";
import PropTypes from "prop-types";

import "./style.css";

import Graph from "./Graph/Graph";

export default class GraphContainer extends React.PureComponent {
  state = { requestStatus: "idle", quotes: [], showAverage: false, from: 0, to: 0 };

  async componentDidMount() {
    const { symbol = "", getQuotes = () => {} } = this.props;

    this.setState({ requestStatus: "loading" });

    const quotesNew = await getQuotes(symbol);

    if(quotesNew.length === 0) {
      this.setState({ requestStatus: "error" });
      return;
    }

    this.setState({ quotes: quotesNew, requestStatus: "success" });
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  renderContent() {
    const { requestStatus, quotes, showAverage, from, to } = this.state;

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
              <form onSubmit={this.setInterval}>
                <input required type="date" name="from" value={from} max={to} onChange={this.handleOnChange} />
                <input required type="date" name="to" value={to} onChange={this.handleOnChange} />
                <button type="submit">Set interval</button>
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

  setInterval = async (e) => {
    e.preventDefault();
    const { getQuotes = () => {}, symbol } = this.props;
    const { from, to } = this.state;
  
    const timestampFrom = new Date(from).getTime() / 1000;
    const timestampTo = new Date(to).getTime() / 1000;

    const quotes = await getQuotes(symbol, timestampFrom, timestampTo);

    this.setState({ quotes });
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