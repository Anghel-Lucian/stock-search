import React from "react";

import "./styles/app.css";

import libs from "./libs";
import Components from "./components";

export default class App extends React.PureComponent {
	state = {
		results: []
	};

	setResults = (results = []) => {
		this.setState({ results });
	};

	render() {
		const { results } = this.state;

		return (
			<div id="app">
				<Components.Searchbar getCompanies={libs.getCompanies} setResults={this.setResults} />
				<Components.Main getQuotes={libs.getQuotes} results={results} setResults={this.setResults} />
			</div>
		);
	}
}