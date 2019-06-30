import * as React from "react";
import styles from "../styles/modal.module.scss";

type Props = {
	modalImage: string;
};

export const Modal: React.SFC<Props> = props => {
	const { modalImage } = props;
	return (
		<div className={styles.modalContainer}>
			<div className={styles.thumbnail}>
				<img src={modalImage} />
			</div>
		</div>
	);
};
