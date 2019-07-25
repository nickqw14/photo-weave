import React, { Component } from "react";
import styles from "../styles/search.module.scss";
import { Nav } from "../../Grid/components/Nav";

type Props = {
	onChange: (value: any) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	onHomePage: boolean;
	emptyFormValue: boolean;
};

class Search extends React.Component<Props> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value }: any = e.target;
		const { onChange } = this.props;
		onChange(value);
	};

	render() {
		const { onChange, onSubmit, onHomePage, emptyFormValue } = this.props;
		return (
			<div
				className={
					onHomePage ? `${styles.searchOnHome}` : `${styles.searchContainer}`
				}
			>
				<div className={styles.content}>
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
					{emptyFormValue && <span>Oops! Please enter a value</span>}
				</div>
			</div>
		);
	}
}

export default Search;
