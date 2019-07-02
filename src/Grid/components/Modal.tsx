import * as React from "react";
import { UserCard } from "../../Grid/components/UserCard";
import styles from "../styles/modal.module.scss";

type Props = {
	modalImage: string;
	profileImage: string;
	userName: string;
	handler: string;
};

export const Modal: React.SFC<Props> = props => {
	const { modalImage, profileImage, userName, handler } = props;
	const imageStyles = {
		backgroundImage: `url(${modalImage})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center"
	};
	return (
		<div className={styles.modalContainer}>
			<div className={styles.thumbnail}>
				<div className={styles.userCardContainer}>
					<UserCard
						profileImage={profileImage ? profileImage : ""}
						userName={userName}
						inModal={true}
						handler={handler}
					/>
				</div>
				<div className={styles.modalImage} style={imageStyles} />
			</div>
		</div>
	);
};
