import React, { Component, Suspense, lazy } from "react";
import styles from "./app.module.scss";
import Grid from "../Grid/containers/Grid";
import Loading from "../Loading/components/Loading";
import _ from "lodash";
import { Welcome } from "../Welcome/containers/Welcome";
import InfiniteScroll from "react-infinite-scroller";
import axios from "axios";
import { MdQueryBuilder } from "react-icons/md";

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
	recentSearchPage: boolean;
	lastScrollY: number;
	scrollingUp: boolean;
};

class App extends Component {
	state: State = {
		error: false,
		images: [],
		page: 0,
		perPage: 15,
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
		recentSearchPage: false,
		lastScrollY: 0,
		scrollingUp: true
	};
	componentDidMount() {
		const url: string = "/api/random-photo";
		this.getRandomPhoto(url);
		document.addEventListener("scroll", _.throttle(this.handleScroll, 250));
	}
	componentWillUnmount() {
		document.addEventListener("scroll", _.throttle(this.handleScroll, 250));
	}
	getRandomPhoto = (url: string) => {
		const limiter = true;
		axios
			.get(url)
			.then(res => {
				this.setState({
					randomPhoto: res.data.regular
				});
			})
			.catch(err => {
				this.setState({
					error: true,
					response: err,
					loading: false
				});
			});
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
		const url = "/api/search-photos";
		// My Unsplash developer ID
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
				loading: true,
				welcome: false,
				recentSearchPage: false
			});
			this.getListPhotos(query, page, perPage);
			this.handleTrackSearches(query);
		}
	};
	getListPhotos = (query: string, page: number, perPage: number) => {
		const limiter = false;
		const options = {
			query: query,
			page: page,
			perPage: perPage
		};
		axios
			.post("/api/search-photos", options)
			.then(res => {
				this.setState({
					loading: true
				});
				this.setState({
					images: [...this.state.images, ...res.data.results],
					loading: false,
					loaded: true,
					page: this.state.page += 1,
					totalPages: limiter ? 3 : res.data.total_pages,
					welcome: false
				});
			})
			.catch(err =>
				this.setState({ error: true, response: err, loading: false })
			);
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
		// My Unsplash developer ID
		const { query, page, perPage, loaded, totalPages } = this.state;
		if (page <= totalPages) {
			this.setState({
				loading: true,
				loaded: false
			});
			this.getListPhotos(query, page, perPage);
			console.log("Load More");
		}
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
	handleRemoveRecentSearchItem = (value: string) => {
		const { recentSearches } = this.state;
		const filteredSearches = recentSearches.filter(searchItem => {
			if (searchItem !== value) {
				return true;
			}
		});
		this.setState({
			recentSearches: filteredSearches
		});
	};
	handleScroll = () => {
		const { lastScrollY } = this.state;
		const currentScrollY = window.scrollY;

		if (currentScrollY < 10) {
			this.setState({
				scrollingUp: true
			});
		} else if (currentScrollY > lastScrollY) {
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
	handleSearchPage = () => {
		this.setState({
			recentSearchPage: !this.state.recentSearchPage
		});
	};
	handleReplaceQuery = (query: string) => {
		this.setState({
			query: query
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
			welcome,
			emptyFormValue,
			query,
			scrollingUp,
			recentSearchPage,
			recentSearches
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
				hasMore={loaded && page < totalPages ? true : false}
				useWindow={true}
				initialLoad={false}
				useCapture={true}
				isReverse={false}
			>
				<div className={styles.App}>
					<Grid
						images={images}
						loading={loading}
						loaded={loaded}
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
						recentSearchPage={recentSearchPage}
						recentSearches={recentSearches}
						handleSearchPage={this.handleSearchPage}
						handleRemoveRecentSearchItem={this.handleRemoveRecentSearchItem}
						handleReplaceQuery={this.handleReplaceQuery}
					/>
				</div>
			</InfiniteScroll>
		);
	}
}

export default App;
