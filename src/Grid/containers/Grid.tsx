import React, { Component } from "react";
import styles from "../styles/grid.module.scss";
import { GridTile } from "../components/GridTile";
import { Nav } from "../components/Nav";
import Loading from "../../Loading/components/Loading";
import { Modal } from "../components/Modal";
import { UserCard } from "../components/UserCard";
import { RecentSearches } from "../../RecentSearches/containers/RecentSearches";

type Props = {
	images: [];
	loading: boolean;
	loaded: boolean;
	modalOn: boolean;
	onChange: (value: string) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	handleModal: (
		image: string,
		userName: string,
		handler: string,
		height: number,
		width: number,
		description: string,
		profileImage?: string
	) => void;
	handleCloseModal: () => void;
	modalImage: string;
	profileImage: string;
	userName: string;
	handler: string;
	modalHeight: number;
	modalWidth: number;
	modalDescription: string;
	welcome: boolean;
	handleGoHome: () => void;
	emptyFormValue: boolean;
	query: string;
	scrollingUp: boolean;
	recentSearchPage: boolean;
	recentSearches: string[];
	handleSearchPage: () => void;
	handleRemoveRecentSearchItem: (value: string) => void;
	handleReplaceQuery: (query: string) => void;
};

class Grid extends React.Component<Props, {}> {
	render() {
		const {
			images,
			loading,
			loaded,
			onChange,
			onSubmit,
			handleModal,
			modalOn,
			modalImage,
			profileImage,
			userName,
			handler,
			modalHeight,
			modalWidth,
			handleCloseModal,
			modalDescription,
			handleGoHome,
			welcome,
			emptyFormValue,
			query,
			scrollingUp,
			recentSearchPage,
			recentSearches,
			handleSearchPage,
			handleRemoveRecentSearchItem,
			handleReplaceQuery
		} = this.props;
		return (
			<div className={styles.gridContainer}>
				<Nav
					handleGoHome={handleGoHome}
					onChange={onChange}
					welcome={welcome}
					onSubmit={onSubmit}
					emptyFormValue={emptyFormValue}
					query={query}
					scrollingUp={scrollingUp}
					handleSearchPage={handleSearchPage}
					recentSearchPage={recentSearchPage}
				/>
				{modalOn && (
					<Modal
						modalImage={modalImage}
						profileImage={profileImage ? profileImage : ""}
						userName={userName}
						handler={handler}
						modalHeight={modalHeight}
						modalWidth={modalWidth}
						closeModal={handleCloseModal}
						description={modalDescription}
					/>
				)}
				<RecentSearches
					onChange={onChange}
					onSubmit={onSubmit}
					emptyFormValue={emptyFormValue}
					query={query}
					recentSearchPage={recentSearchPage}
					recentSearches={recentSearches}
					handleRemoveRecentSearchItem={handleRemoveRecentSearchItem}
					handleReplaceQuery={handleReplaceQuery}
				/>
				<div className={styles.grid}>
					{images.map((image: any) => {
						return (
							<GridTile
								image={image.urls.regular}
								description={image.description}
								key={image.id}
								portrait={image.height > image.width ? true : false}
								profileImage={image.user.profile_image.medium}
								userName={image.user.name}
								handler={image.user.username}
								handleModal={handleModal}
								modalOn={modalOn}
								modalHeight={image.height}
								modalWidth={image.width}
							/>
						);
					})}
				</div>
				{/* {images.length === 0 && !loading ? (
					<h1 className={styles.noResults}>No Results</h1>
				) : (
					<Loading />
				)} */}
				{loading && <Loading />}
				{loaded && images.length === 0 && (
					<h1 className={styles.noResults}>No Results</h1>
				)}
			</div>
		);
	}
}

export default Grid;
