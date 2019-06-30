import React, { Component } from "react";
import styles from "../styles/grid.module.scss";
import { GridTile } from "../components/GridTile";
import Search from "../../Search/containers/Search";
import Loading from "../../Loading/components/Loading";
import { Modal } from "../components/Modal";

type Props = {
	images: [];
	loading: boolean;
	modalOn: boolean;
	onChange: (value: string) => void;
	onSubmit: () => void;
	handleModal: (image: string) => void;
	modalImage: string;
};

class Grid extends React.Component<Props, {}> {
	render() {
		const {
			images,
			loading,
			onChange,
			onSubmit,
			handleModal,
			modalOn,
			modalImage
		} = this.props;
		return (
			<div className={styles.gridContainer}>
				<Search onChange={onChange} onSubmit={onSubmit} />
				{modalOn && <Modal modalImage={modalImage} />}
				<div className={styles.grid}>
					{images.map((image: any) => {
						return (
							<GridTile
								image={image.urls.regular}
								key={image.id}
								portrait={image.height > image.width ? true : false}
								profileImage={image.user.profile_image.medium}
								userName={image.user.name}
								handleModal={handleModal}
								modalOn={modalOn}
							/>
						);
					})}
				</div>
				{loading && <Loading />}
			</div>
		);
	}
}

export default Grid;
