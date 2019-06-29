import React, { Component, Suspense, lazy } from "react";
import styles from "./app.module.scss";
import Grid from "../Grid/containers/Grid";
import Welcome from "../Welcome/containers/Welcome";
import InfiniteScroll from "react-infinite-scroller";

type State = {
	error: boolean;
	images: [];
	query: string;
	page: number;
	perPage: number;
	loading: boolean;
	width: number;
	height: number;
	hasMore: boolean;
};

class App extends Component {
	state: State = {
		error: false,
		images: [],
		page: 1,
		perPage: 30,
		query: "javascript",
		loading: false,
		width: 0,
		height: 0,
		hasMore: true
	};
	// Make API call to Unsplash to get list Photos
	callAPI = () => {
		let { page, perPage } = this.state;
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
		// Fetch the data from unsplash
		fetch(url, options)
			.then(response => {
				if (response.status !== 200) {
					this.setState({
						response: `There was a problem, status code ${response.status}`,
						loading: false
					});
					return;
				}
				this.setState({
					loading: true
				});
				response.json().then(data =>
					this.setState({
						images: [...this.state.images, ...data.results],
						loading: false,
						hasMore: true,
						page: page += 1
					})
				);
			})
			.catch(err =>
				this.setState({ error: true, response: err, loading: false })
			);
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
		const { images, loading, hasMore } = this.state;
		return (
			<InfiniteScroll
				pageStart={0}
				loadMore={this.callAPI}
				hasMore={hasMore}
				loader={
					loading && (
						<div className="loader" key={0}>
							Loading ...
						</div>
					)
				}
				useWindow={true}
				initialLoad={true}
				useCapture={true}
				isReverse={false}
				threshold={50}
			>
				<div className={styles.App}>
					<Grid
						images={images}
						loading={loading}
						onChange={this.handleChange}
						onSubmit={this.handleSubmit}
					/>
				</div>
			</InfiniteScroll>
		);
	}
}

export default App;
