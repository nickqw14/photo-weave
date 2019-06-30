import React, { Component } from "react";
import styles from "../styles/search.module.scss";

type Props = {
	onChange: (value: any) => void;
	onSubmit: () => void;
};

class Search extends React.Component<Props> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value }: any = e.target;
		const { onChange } = this.props;
		onChange(value);
	};

	render() {
		const { onChange, onSubmit } = this.props;
		return (
			<div className={styles.searchContainer}>
				<form onSubmit={onSubmit}>
					<input
						className={styles.searchInput}
						onChange={this.handleChange}
						placeholder={"Search Photos"}
					/>
				</form>
				<div className={styles.searchSubmit} onClick={onSubmit}>
					Search
				</div>
			</div>
		);
	}
}

export default Search;
