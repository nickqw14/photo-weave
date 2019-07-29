import * as React from "react";
import { MdSearch } from "react-icons/md";
import { MdHome } from "react-icons/md";
import styles from "../styles/nav.module.scss";
import Search from "../../Search/containers/Search";

type Props = {
	handleGoHome: () => void;
	welcome: boolean;
	onChange: (value: any) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	emptyFormValue: boolean;
	query: string;
	scrollingUp: boolean;
};

export const Nav: React.SFC<Props> = props => {
	const {
		handleGoHome,
		welcome,
		onChange,
		onSubmit,
		emptyFormValue,
		query,
		scrollingUp
	} = props;
	return (
		<div
			className={scrollingUp ? `${styles.navAppear}` : `${styles.navDisappear}`}
		>
			<div className={styles.mobileView}>
				<span className={styles.logo} onClick={handleGoHome}>
					{/* <MdHome size={32} color={"#505050"} /> */}
					Photo Weave
				</span>
				<span>
					<MdSearch size={32} color={"#505050"} />
				</span>
			</div>
			<div className={styles.desktopView}>
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
