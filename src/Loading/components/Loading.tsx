import * as React from "react";
import { FaSpinner } from "react-icons/fa";
import styles from "../styles/loading.module.scss";

class Loading extends React.Component {
	render() {
		return (
			<div className={styles.loadingContainer}>
				<FaSpinner className={styles.spinner} size={65} />
			</div>
		);
	}
}

export default Loading;
