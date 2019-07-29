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
	handleRemoveRecentSearchItem: (value: string) => void;
};

export const RecentSearches: React.SFC<Props> = props => {
	const {
		onChange,
		onSubmit,
		emptyFormValue,
		query,
		recentSearchPage,
		recentSearches,
		handleRemoveRecentSearchItem
	} = props;
	return (
		<div className={styles.recentSearchesContainer}>
			<div className={styles.searchWrapper}>
				<h1>Recent Searches</h1>
				<div>
					{recentSearches.map(searchItem => {
						return (
							<span>
								{searchItem.toLowerCase()}
								<span onClick={() => handleRemoveRecentSearchItem(searchItem)}>
									X
								</span>
							</span>
						);
					})}
				</div>
				<Search
					onChange={onChange}
					onSubmit={onSubmit}
					onHomePage={false}
					emptyFormValue={emptyFormValue}
					query={query}
				/>
			</div>
		</div>
	);
};
