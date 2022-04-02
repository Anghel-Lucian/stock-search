import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class Searchbar extends React.PureComponent {
  state = { query: "", requestStatus: "idle" };

  onChange = (e) => {
    const { value = "" } = e.target;

    this.setState({ query: value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ requestStatus: "loading" });

    const { setResults = () => {}, getCompanies = () => {} } = this.props;
    const { query } = this.state;

    let companies = await getCompanies(query);

    companies = companies.map((company) =>  ({ name: company.description, symbol: company.symbol }));

    setResults(companies);
    this.setState({ requestStatus: "idle", query: "" });
  };

  render() {
    const { query, requestStatus } = this.state;

    return (
      <form onSubmit={this.onSubmit} id="searchbar">
        <input required placeholder="Symbol or company" value={query} onChange={this.onChange} />
        <button disabled={requestStatus === "loading"}>{requestStatus === "idle" ? "Search" : <div className="loader" />}</button>
      </form>
    );
  }
}

Searchbar.propTypes = {
  setResults: PropTypes.func,
  getCompanies: PropTypes.func
};