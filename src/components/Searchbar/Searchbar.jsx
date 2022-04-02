import React from "react";
import PropTypes from "prop-types";

import "./style.css";

export default class Searchbar extends React.PureComponent {
  state = { query: "" };

  onChange = (e) => {
    const { value = "" } = e.target;

    this.setState({ query: value });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { setResults = () => {}, getCompanies = () => {} } = this.props;
    const { query } = this.state;

    let companies = await getCompanies(query);

    companies = companies.map((company) =>  ({ name: company.description, symbol: company.symbol }));

    setResults(companies);
  };

  render() {
    const { query } = this.state;

    return (
      <form onSubmit={this.onSubmit} id="searchbar">
        <input required placeholder="Search for symbols or companies" value={query} onChange={this.onChange} />
        <button>Search</button>
      </form>
    );
  }
}

Searchbar.propTypes = {
  setResults: PropTypes.func,
  getCompanies: PropTypes.func
};