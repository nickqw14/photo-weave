import * as React from "react";
import styles from "../styles/nav.module.scss";
import Search from "../../Search/containers/Search";

type Props = {
	handleGoHome: () => void;
	welcome: boolean;
	onChange: (value: any) => void;
	onSubmit: (event: React.SyntheticEvent) => void;
	emptyFormValue: boolean;
};

export const Nav: React.SFC<Props> = props => {
	const { handleGoHome, welcome, onChange, onSubmit, emptyFormValue } = props;
	return (
		<div className={styles.navContainer}>
			<div className={styles.mobileView}>
				<span onClick={handleGoHome}>Home</span>
				<span>Search</span>
			</div>
			<div className={styles.desktopView}>
				<Search
					onChange={onChange}
					onSubmit={onSubmit}
					onHomePage={welcome}
					emptyFormValue={emptyFormValue}
				/>
			</div>
		</div>
	);
};
