import * as React from "react";
import Search from "../../Search/containers/Search";
import styles from "../styles/recentSearches.module.scss";

type Props = {
	onChange: (value: any) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	emptyFormValue: boolean;
	query: string;
	recentSearchPage: boolean;
	recentSearches: string[];
};

export const RecentSearches: React.SFC<Props> = props => {
	const {
		onChange,
		onSubmit,
		emptyFormValue,
		query,
		recentSearchPage,
		recentSearches
	} = props;
	return (
		<div className={styles.recentSearchesContainer}>
			<Search
				onChange={onChange}
				onSubmit={onSubmit}
				onHomePage={false}
				emptyFormValue={emptyFormValue}
				query={query}
			/>
			<div>Recent Searches</div>
			<div>
				{recentSearches.map(searchItem => {
					return searchItem;
				})}
			</div>
		</div>
	);
};
