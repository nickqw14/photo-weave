import * as React from "react";
import styles from "../styles/welcome.module.scss";
import Search from "../../Search/containers/Search";

type Props = {
	image: string;
	onChange: (value: any) => void;
	onSubmit: () => void;
	onHomePage: boolean;
};

export const Welcome: React.SFC<Props> = props => {
	const { image, onChange, onSubmit, onHomePage } = props;
	const imageStyles = {
		backgroundImage: `url(${image})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover"
	};
	return (
		<div style={imageStyles} className={styles.welcomeContainer}>
			<div className={styles.content}>
				<div className={styles.greeting}>
					<h1>Photo Weave</h1>
					<h3>A mini unsplash replica, search millions of photos</h3>
				</div>
				<Search
					onChange={onChange}
					onSubmit={onSubmit}
					onHomePage={onHomePage}
				/>
			</div>
		</div>
	);
};
