import * as React from "react";
import { MdLoop } from "react-icons/md";
import styles from "../styles/loading.module.scss";

class Loading extends React.Component {
	render() {
		return (
			<div className={styles.loadingContainer}>
				<MdLoop className={styles.spinner} size={70} />
			</div>
		);
	}
}

export default Loading;
