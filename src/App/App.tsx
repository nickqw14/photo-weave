import React, { Component, Suspense, lazy } from "react";
import styles from "./app.module.scss";
import Grid from "../Grid/containers/Grid";
import Welcome from "../Welcome/containers/Welcome";
import Loading from "../Loading/components/Loading";
import InfiniteScroll from "react-infinite-scroller";
import { totalmem } from "os";

type State = {
	error: boolean;
	images: [];
	query: string;
	page: number;
	perPage: number;
	loading: boolean;
	width: number;
	height: number;
	totalPages: number;
	modalOn: boolean;
	modalImage: string;
};

class App extends Component {
	state: State = {
		error: false,
		images: [],
		page: 0,
		perPage: 30,
		query: "",
		loading: false,
		width: 0,
		height: 0,
		totalPages: 0,
		modalOn: false,
		modalImage: ""
	};
	// Make API call to Unsplash to get list Photos
	callAPI = () => {
		let { page, perPage, totalPages } = this.state;
		const limiter = true;
		// Unsplash API
		const url: string = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${
			this.state.query
		}`;
		// My Unsplash developer ID
		const clientID: string =
			"27a6a7d4f395b36ee99907ff50c400e88a36ea7d76130397f368ee3b01dc918b";
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
						page: page += 1,
						totalPages: limiter ? 4 : data.total_pages
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
		// event.preventDefault - for onsubmit enter keypress
		this.setState({
			response: {},
			images: [],
			page: 1
		});
		this.callAPI();
	};
	handleModal = (image: string) => {
		this.setState({
			modalOn: !this.state.modalOn,
			modalImage: image
		});
	};

	render() {
		const {
			images,
			loading,
			totalPages,
			page,
			modalOn,
			modalImage
		} = this.state;
		return (
			<InfiniteScroll
				pageStart={0}
				loadMore={this.callAPI}
				hasMore={page <= totalPages ? true : false}
				loader={loading && <Loading />}
				useWindow={true}
				initialLoad={false}
				useCapture={true}
				isReverse={false}
				threshold={500}
			>
				<div className={styles.App}>
					<Grid
						images={images}
						loading={loading}
						onChange={this.handleChange}
						onSubmit={this.handleSubmit}
						handleModal={this.handleModal}
						modalOn={modalOn}
						modalImage={modalImage}
					/>
				</div>
			</InfiniteScroll>
		);
	}
}

export default App;
