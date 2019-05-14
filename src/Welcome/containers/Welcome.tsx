import React, { Component } from "react";
import styles from "../styles/welcome.module.scss";
import Search from "../../Search/containers/Search";

type Props = {
	onChange: (value: any) => void;
	onSubmit: () => void;
};

class Welcome extends React.Component<Props> {
	render() {
		const { onChange, onSubmit } = this.props;
		return (
			<div className={styles.welcomeContainer}>
				<div className={styles.messageContainer}>
					<h1 className={styles.message}>What do you want to see?</h1>
				</div>
				<div className={styles.searchContainer}>
					<Search onChange={onChange} onSubmit={onSubmit} />
				</div>
			</div>
		);
	}
}

export default Welcome;
