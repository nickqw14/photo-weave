import React, { Component } from "react";
import styles from "./app.module.scss";
import Grid from "../Grid/containers/Grid";
import Welcome from "../Welcome/containers/Welcome";

type State = {
	response: {};
	error: boolean;
	images: [];
	query: string;
	page: number;
	perPage: number;
	loading: boolean;
	width: number;
	height: number;
};

class App extends Component {
	state: State = {
		response: {},
		error: false,
		images: [],
		page: 1,
		perPage: 30,
		query: "",
		loading: false,
		width: 0,
		height: 0
	};
	componentWillMount() {
		this.callAPI();
	}
	// Make API call to Unsplash to get list Photos
	callAPI = () => {
		const { page, perPage } = this.state;
		// Unsplash API
		const url: string = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${
			this.state.query
		}`;
		// My Unsplash developer ID
		const clientID: string =
			"9ac9908fc8f8067a3bfae8c3264fa8f2722acb93bfb1b580b9ed3fcc515b042d";
		// Authorization
		const options = {
			headers: {
				Authorization: `Client-ID ${clientID}`
			}
		};
		// Each time the API gets called it adds 1 to the current page
		this.setState({
			page: this.state.page + 1,
			loading: true
		});
		// Fetch the data from unsplash
		fetch(url, options)
			.then(response => {
				if (response.status !== 200) {
					this.setState({
						response: `There was a problem, status code ${response.status}`
					});
					return;
				}
				response.json().then(data =>
					this.setState({
						response: data,
						images: [...this.state.images, ...data.results],
						loading: false
					})
				);
			})
			.catch(err => this.setState({ error: true, response: err }));
	};
	// Gets value as user types into the input
	handleChange = (value: any) => {
		this.setState({
			query: value
		});
	};
	// Submits the users search request and calls API
	handleSubmit = () => {
		this.setState({
			response: {},
			images: []
		});
		this.callAPI();
	};
	render() {
		const { images, loading } = this.state;
		return (
			<div className={styles.App}>
				{images.length > 0 ? (
					<Grid
						onChange={this.handleChange}
						onSubmit={this.handleSubmit}
						loading={loading}
						images={images}
					/>
				) : (
					<Welcome onChange={this.handleChange} onSubmit={this.handleSubmit} />
				)}
			</div>
		);
	}
}

export default App;
