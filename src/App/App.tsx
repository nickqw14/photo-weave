import React, { Component, Suspense, lazy } from "react";
import styles from "./app.module.scss";
import Grid from "../Grid/containers/Grid";
import Loading from "../Loading/components/Loading";
import _ from "lodash";
import { Welcome } from "../Welcome/containers/Welcome";
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
	welcome: boolean;
	emptyFormValue: boolean;
	recentSearches: string[];
	lastScrollY: number;
	scrollingUp: boolean;
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
		welcome: true,
		emptyFormValue: false,
		recentSearches: [],
		lastScrollY: 0,
		scrollingUp: true
	};
	componentDidMount() {
		const url: string = "https://api.unsplash.com/photos/random";
		const clientID: string =
			"27a6a7d4f395b36ee99907ff50c400e88a36ea7d76130397f368ee3b01dc918b";
		const grid = false;
		this.callAPI(url, clientID, grid);
		document.addEventListener("scroll", _.throttle(this.handleScroll, 250));
	}
	componentWillUnmount() {
		document.addEventListener("scroll", _.throttle(this.handleScroll, 250));
	}
	callAPI = (url: string, clientID: string, grid: boolean) => {
		const limiter = true;
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
				if (grid) {
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
				} else {
					response.json().then(data =>
						this.setState({
							randomPhoto: data.urls.regular
						})
					);
				}
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
	handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		const { query, page, perPage, recentSearches } = this.state;
		recentSearches.push(query);
		const url: string = `https://api.unsplash.com/search/photos?page=${page}&per_page=${perPage}&query=${query}`;
		// My Unsplash developer ID
		const clientID: string =
			"27a6a7d4f395b36ee99907ff50c400e88a36ea7d76130397f368ee3b01dc918b";
		const grid = true;
		/* Check value before submitting to API */
		if (query.length === 0) {
			this.setState({
				emptyFormValue: true
			});
		} else {
			this.setState({
				emptyFormValue: false,
				response: {},
				images: [],
				page: 1,
				loaded: false,
				welcome: false
			});
			this.callAPI(url, clientID, grid);
			this.handleTrackSearches(query);
		}
	};
	/* Refactor, change from multiple arguments to take one object */
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
	handleLoadMore = () => {
		const url: string = `https://api.unsplash.com/search/photos?page=${
			this.state.page
		}&per_page=${this.state.perPage}&query=${this.state.query}`;
		// My Unsplash developer ID
		const clientID: string =
			"27a6a7d4f395b36ee99907ff50c400e88a36ea7d76130397f368ee3b01dc918b";
		const grid = true;
		this.callAPI(url, clientID, grid);
	};
	handleCloseModal = () => {
		this.setState({
			modalOn: false
		});
	};
	handleGoHome = () => {
		this.setState({
			welcome: true
		});
	};
	handleTrackSearches = (query: string) => {
		const { recentSearches } = this.state;
		// Prevents displaying duplicate searches
		const filteredSearches = recentSearches.filter((searchItem, index) => {
			return recentSearches.indexOf(searchItem) >= index;
		});
		this.setState({
			recentSearches: filteredSearches
		});
	};
	handleScroll = () => {
		const { lastScrollY } = this.state;
		const currentScrollY = window.scrollY;

		if (currentScrollY > lastScrollY) {
			this.setState({
				scrollingUp: false
			});
		} else {
			this.setState({
				scrollingUp: true
			});
		}
		this.setState({ lastScrollY: currentScrollY });
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
			welcome,
			emptyFormValue,
			query,
			scrollingUp
		} = this.state;
		return welcome ? (
			<Welcome
				onChange={this.handleChange}
				onSubmit={this.handleSubmit}
				image={randomPhoto}
				onHomePage={welcome}
				emptyFormValue={emptyFormValue}
				query={query}
			/>
		) : (
			<InfiniteScroll
				pageStart={0}
				loadMore={this.handleLoadMore}
				hasMore={page <= totalPages ? true : false}
				useWindow={true}
				initialLoad={false}
				useCapture={true}
				isReverse={false}
			>
				<div className={styles.App}>
					{/* {images.length == 0 && loading == true ? (
						<Loading />
					) : (
						<h1 className={styles.noResults}>No Results</h1>
					)} */}
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
						welcome={welcome}
						handleGoHome={this.handleGoHome}
						emptyFormValue={emptyFormValue}
						query={query}
						scrollingUp={scrollingUp}
					/>
				</div>
			</InfiniteScroll>
		);
	}
}

export default App;
