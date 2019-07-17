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
	handler: string;
	modalHeight: number;
	modalWidth: number;
	description: string;
	handleModal: (
		image: string,
		userName: string,
		handler: string,
		height: number,
		width: number,
		description: string,
		profileImage?: string
	) => void;
};

export const GridTile: React.SFC<Props> = props => {
	const {
		image,
		portrait,
		profileImage,
		userName,
		modalOn,
		handleModal,
		handler,
		modalHeight,
		modalWidth,
		description
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
				handleModal(
					image,
					userName,
					handler,
					modalHeight,
					modalWidth,
					description,
					profileImage
				);
			}}
		>
			<div className={styles.userWrapper}>
				<UserCard
					profileImage={profileImage ? profileImage : ""}
					userName={userName}
					inModal={false}
					handler={handler}
				/>
			</div>
		</div>
	);
};
