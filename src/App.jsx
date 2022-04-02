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
		return (
			<div id="app">
				<Components.Searchbar getCompanies={libs.getCompanies} setResults={this.setResults} />
			</div>
		);
	}
}