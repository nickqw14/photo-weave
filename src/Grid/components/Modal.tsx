import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserCard } from "../../Grid/components/UserCard";
import styles from "../styles/modal.module.scss";

type Props = {
	modalImage: string;
	profileImage: string;
	userName: string;
	handler: string;
	modalHeight: number;
	modalWidth: number;
	closeModal: () => void;
};

export const Modal: React.SFC<Props> = props => {
	const {
		modalImage,
		profileImage,
		userName,
		handler,
		modalHeight,
		modalWidth,
		closeModal
	} = props;
	const imageStyles = {
		backgroundImage: `url(${modalImage})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center"
	};
	return (
		<div className={styles.modalContainer}>
			<div className={styles.closeModal} onClick={closeModal}>
				<FontAwesomeIcon size="2x" icon={faTimes} />
			</div>
			<div
				className={
					modalHeight > modalWidth
						? `${styles.portraitThumbnail}`
						: `${styles.landscapeThumbnail}`
				}
			>
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
