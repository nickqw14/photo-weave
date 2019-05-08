import * as React from "react";
import styles from "../styles/userCard.module.scss";

type Props = {
	profileImage: string;
	userName: string;
};

export const UserCard: React.SFC<Props> = props => {
	const { profileImage, userName } = props;
	return (
		<div className={styles.userCard}>
			<img className={styles.profileImage} src={profileImage} />
			<span className={styles.name}>{userName}</span>
		</div>
	);
};
