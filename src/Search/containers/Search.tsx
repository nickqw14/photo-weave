import React, { Component } from "react";
import styles from "../styles/search.module.scss";

type Props = {
	onChange: (value: any) => void;
	onSubmit: () => void;
	background: string;
};

class Search extends React.Component<Props> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value }: any = e.target;
		const { onChange } = this.props;
		onChange(value);
	};

	render() {
		const { onChange, onSubmit, background } = this.props;
		return (
			<div onSubmit={onSubmit} className={styles.searchContainer}>
				<h1>N</h1>
				<input
					className={styles.searchInput}
					onChange={this.handleChange}
					placeholder={"Search millions of high-resolution photos"}
				/>
				<button className={styles.searchSubmit} onClick={onSubmit}>
					Search
				</button>
			</div>
		);
	}
}

export default Search;
