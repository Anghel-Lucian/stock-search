import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class Graph extends React.PureComponent {
  constructor(props) {
    super(props);

    this.graphRef = React.createRef();

    this.state = { graphHeight: null };
  }

  componentDidMount() {
    this.setState({ graphHeight: this.graphRef.current.clientHeight });
  }

  renderGraphBars() {
    const { quotes = [] } = this.props;

    if(!this.state.graphHeight) return;

    let maxNumber = 0;
    let minNumber = quotes[0];

    for(const quote of quotes) {
      maxNumber = quote > maxNumber ? Number(quote) : maxNumber;
      minNumber = quote < minNumber ? Number(quote) : minNumber;
    }

    return quotes.map((quote, i) => {
      return (
        <li key={quote + i} style={{ height: `${((quote - minNumber) / (maxNumber - minNumber)) * this.state.graphHeight}px` }} />
      );
    });
  }

  render() {
    return (
      <ul id="graph" ref={this.graphRef}>
        {this.renderGraphBars()}
      </ul>
    );
  }
}

Graph.propTypes = {
  quotes: PropTypes.array
};