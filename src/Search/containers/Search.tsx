import React, { Component } from "react";
import styles from "../styles/search.module.scss";

type Props = {
	onChange: (value: any) => void;
	onSubmit: () => void;
	onHomePage: boolean;
	image?: string;
};

class Search extends React.Component<Props> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value }: any = e.target;
		const { onChange } = this.props;
		onChange(value);
	};

	render() {
		const { onChange, onSubmit, image, onHomePage } = this.props;

		const imageStyles = {
			backgroundImage: `url(${image})`,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "cover"
		};
		return (
			<div
				style={imageStyles}
				className={
					onHomePage ? `${styles.searchOnHome}` : `${styles.searchContainer}`
				}
			>
				<div className={styles.content}>
					{onHomePage && (
						<div className={styles.greeting}>
							<h1>Nick Splash</h1>
							<h3>A mini unsplash replica, search millions of photos</h3>
						</div>
					)}
					<form className={styles.formContainer} onSubmit={onSubmit}>
						<input
							className={styles.searchInput}
							onChange={this.handleChange}
							placeholder={"Search Photos"}
						/>
						<div className={styles.searchSubmit} onClick={onSubmit}>
							Search
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default Search;
