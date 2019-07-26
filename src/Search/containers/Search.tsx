import React, { Component } from "react";
import styles from "../styles/search.module.scss";
import { Nav } from "../../Grid/components/Nav";

type Props = {
	onChange: (value: any) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	onHomePage: boolean;
	emptyFormValue: boolean;
	query: string;
};

class Search extends React.Component<Props> {
	handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value }: any = e.target;
		const { onChange } = this.props;
		onChange(value);
	};

	render() {
		const {
			onChange,
			onSubmit,
			onHomePage,
			emptyFormValue,
			query
		} = this.props;
		const center = {
			justifyContent: "center"
		};
		const spaceAround = {
			justifyContent: "space-around"
		};
		return (
			<div
				className={
					onHomePage ? `${styles.searchOnHome}` : `${styles.searchContainer}`
				}
			>
				<div
					className={styles.content}
					style={emptyFormValue ? spaceAround : center}
				>
					<form className={styles.formContainer} onSubmit={onSubmit}>
						<input
							className={styles.searchInput}
							onChange={this.handleChange}
							placeholder={"Search Photos"}
							value={query}
						/>
						<div className={styles.searchSubmit} onClick={onSubmit}>
							Search
						</div>
					</form>
					{emptyFormValue && (
						<span className={styles.emptyForm}>Oops! Please enter a value</span>
					)}
				</div>
			</div>
		);
	}
}

export default Search;
