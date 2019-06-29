import * as React from "react";
import styles from "../styles/gridTile.module.scss";
import { UserCard } from "../components/UserCard";
import { Modal } from "../components/Modal";

type Props = {
	image: string;
	portrait: boolean;
	profileImage?: string;
	userName: string;
	modalOn: boolean;
	handleModal: (image: string) => void;
};

export const GridTile: React.SFC<Props> = props => {
	const {
		image,
		portrait,
		profileImage,
		userName,
		modalOn,
		handleModal
	} = props;
	const imageStyles = {
		backgroundImage: `url(${image})`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		width: "100%",
		height: "100%"
	};
	return (
		<div
			className={`${styles.gridItem} ${portrait ? styles.portraitOn : null}`}
			style={imageStyles}
			onClick={() => {
				handleModal(image);
			}}
		>
			<div className={styles.userWrapper}>
				<UserCard
					profileImage={profileImage ? profileImage : ""}
					userName={userName}
				/>
			</div>
		</div>
	);
};
