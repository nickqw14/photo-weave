import * as React from "react";
import styles from "../styles/nav.module.scss";

type Props = {
	handleGoHome: () => void;
	welcome: boolean;
};

export const Nav: React.SFC<Props> = props => {
	const { handleGoHome, welcome } = props;
	return (
		<div className={styles.navContainer}>
			<span onClick={handleGoHome}>Home</span>
			<span>Search</span>
		</div>
	);
};
