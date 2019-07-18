import React, { Component, Suspense, lazy } from "react";
import styles from "./app.module.scss";
import Grid from "../Grid/containers/Grid";
import Loading from "../Loading/components/Loading";
import Search from "../Search/containers/Search";
import InfiniteScroll from "react-infinite-scroller";

type State = {
	error: boolean;
	images: [];
	query: string;
	page: number;
	perPage: number;
	loading: boolean;
	loaded: boolean;
	width: number;
	height: number;
	totalPages: number;
	modalOn: boolean;
	modalImage: string;
	profileImage: string;
	userName: string;
	handler: string;
	modalHeight: number;
	modalWidth: number;
	modalDescription: string;
	randomPhoto: string;
	welcome: true;
};

class App extends Component {
	state: State = {
		error: false,
		images: [],
		page: 0,
		perPage: 30,
		query: "",
		loading: false,
		loaded: false,
		width: 0,
		height: 0,
		totalPages: 0,
		modalOn: false,
		modalImage: "",
		profileImage: "",
		userName: "",
		handler: "",
		modalHeight: 0,
		modalWidth: 0,
		modalDescription: "",
		randomPhoto: "",
		welcome: true
	};
	componentDidMount() {
		this.getRandomPhoto();
	}
	getRandomPhoto = () => {
		// Unsplash API
		const url: string = "https://api.unsplash.com/photos/random";

		const clientID: string =
			"27a6a7d4f395b36ee99907ff50c400e88a36ea7d76130397f368ee3b01dc918b";

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
						randomPhoto: data.urls.regular,
						loading: false
					})
				);
			})
			.catch(err =>
				this.setState({ error: true, response: err, loading: false })
			);
	};
	// Make API call to Unsplash to get list Photos
	callAPI = () => {
		const { perPage, totalPages } = this.state;
		// Limits pulling max 4 pages per request
		const limiter = true;
		// Unsplash API
		const url: string = `https://api.unsplash.com/search/photos?page=${
			this.state.page
		}&per_page=${perPage}&query=${this.state.query}`;
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
						loaded: true,
						page: this.state.page += 1,
						totalPages: limiter ? 4 : data.total_pagesd,
						welcome: false
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
			page: 1,
			loaded: false,
			welcome: false
		});
		this.callAPI();
	};
	handleModal = (
		image: string,
		userName: string,
		handler: string,
		height: number,
		width: number,
		description: string,
		profileImage?: string
	) => {
		this.setState({
			modalOn: !this.state.modalOn,
			modalImage: image,
			userName: userName,
			profileImage: profileImage,
			handler: handler,
			modalHeight: height,
			modalWidth: width,
			modalDescription: description
		});
	};
	handleCloseModal = () => {
		this.setState({
			modalOn: false
		});
	};

	render() {
		const {
			images,
			loading,
			totalPages,
			page,
			modalOn,
			modalImage,
			userName,
			profileImage,
			handler,
			modalHeight,
			modalWidth,
			modalDescription,
			randomPhoto,
			loaded,
			welcome
		} = this.state;
		return welcome ? (
			<Search
				onHomePage={true}
				onChange={this.handleChange}
				onSubmit={this.handleSubmit}
				image={randomPhoto}
			/>
		) : (
			<InfiniteScroll
				pageStart={0}
				loadMore={this.callAPI}
				hasMore={page <= totalPages ? true : false}
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
						profileImage={profileImage}
						userName={userName}
						handler={handler}
						modalHeight={modalHeight}
						modalWidth={modalWidth}
						modalDescription={modalDescription}
						handleCloseModal={this.handleCloseModal}
					/>
				</div>
			</InfiniteScroll>
		);
	}
}

export default App;
