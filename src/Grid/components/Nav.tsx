import * as React from "react";
import { MdSearch, MdRemove } from "react-icons/md";
import styles from "../styles/nav.module.scss";
import Search from "../../Search/containers/Search";

type Props = {
	handleGoHome: () => void;
	welcome: boolean;
	onChange: (value: any) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	handleSearchPage: () => void;
	emptyFormValue: boolean;
	query: string;
	scrollingUp: boolean;
	recentSearchPage: boolean;
};

export const Nav: React.SFC<Props> = props => {
	const {
		handleGoHome,
		welcome,
		onChange,
		onSubmit,
		emptyFormValue,
		query,
		scrollingUp,
		handleSearchPage,
		recentSearchPage
	} = props;
	return (
		<div
			className={
				scrollingUp || recentSearchPage
					? `${styles.navAppear}`
					: `${styles.navDisappear}`
			}
		>
			<div
				className={
					recentSearchPage
						? `${styles.mobileViewRecentOn}`
						: `${styles.mobileView}`
				}
			>
				<span className={styles.logo} onClick={handleGoHome}>
					Photo Weave
				</span>
				<span onClick={handleSearchPage}>
					{recentSearchPage ? (
						<MdRemove size={32} color={"505050"} />
					) : (
						<MdSearch size={32} color={"#505050"} />
					)}
				</span>
			</div>
			<div
				className={
					recentSearchPage
						? `${styles.desktopViewRecentOn}`
						: `${styles.desktopView}`
				}
			>
				<Search
					onChange={onChange}
					onSubmit={onSubmit}
					onHomePage={welcome}
					emptyFormValue={emptyFormValue}
					query={query}
				/>
			</div>
		</div>
	);
};
