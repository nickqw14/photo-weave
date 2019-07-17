import * as React from "react";
import styles from "../styles/userCard.module.scss";

type Props = {
	profileImage: string;
	userName: string;
	inModal: boolean;
	handler: string;
};

export const UserCard: React.SFC<Props> = props => {
	const { profileImage, userName, inModal, handler } = props;
	return (
		<div className={inModal ? `${styles.inModal}` : `${styles.userCard}`}>
			<img className={styles.profileImage} src={profileImage} />
			<div className={styles.userContent}>
				<span className={styles.name}>{userName}</span>
				<span className={styles.handler}>@{handler}</span>
			</div>
		</div>
	);
};
