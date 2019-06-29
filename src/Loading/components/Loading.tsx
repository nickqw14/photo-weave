import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/loading.module.scss";

class Loading extends React.Component {
	render() {
		return (
			<FontAwesomeIcon className={styles.spinner} icon={faSpinner} size="4x" />
		);
	}
}

export default Loading;
