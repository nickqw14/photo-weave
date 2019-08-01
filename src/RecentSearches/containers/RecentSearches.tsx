import * as React from "react";
import { MdHighlightOff } from "react-icons/md";
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
	handleReplaceQuery: (value: string) => void;
};

export const RecentSearches: React.SFC<Props> = props => {
	const {
		onChange,
		onSubmit,
		emptyFormValue,
		query,
		recentSearchPage,
		recentSearches,
		handleRemoveRecentSearchItem,
		handleReplaceQuery
	} = props;
	return (
		<div
			className={
				recentSearchPage
					? styles.recentSearchContainerOn
					: styles.recentSearchContainerOff
			}
		>
			<div className={recentSearchPage ? styles.contentOn : styles.contentOff}>
				<div className={styles.recentSearches}>
					<h3>Recent Searches</h3>
					<div className={styles.searchList}>
						{recentSearches.map((searchItem, index) => {
							return (
								<div className={styles.searchItem} key={index}>
									<span
										onClick={() => handleReplaceQuery(searchItem.toLowerCase())}
										style={{ cursor: "pointer" }}
									>
										{searchItem.toLowerCase()}
									</span>
									<span
										style={{ cursor: "pointer" }}
										onClick={() => handleRemoveRecentSearchItem(searchItem)}
									>
										<MdHighlightOff />
									</span>
								</div>
							);
						})}
					</div>
				</div>
				<div className={styles.searchWrapper}>
					<Search
						onChange={onChange}
						onSubmit={onSubmit}
						onHomePage={false}
						emptyFormValue={emptyFormValue}
						query={query}
					/>
				</div>
			</div>
		</div>
	);
};
