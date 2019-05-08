import React, { Component } from "react";
import styles from "../styles/grid.module.scss";
import { GridTile } from "../components/GridTile";

type Props = {
	images: [];
	loading: boolean;
};

class Grid extends React.Component<Props, {}> {
	render() {
		const { images, loading } = this.props;
		return (
			<div className={styles.gridContainer}>
				{loading ? (
					<span>Loading</span>
				) : (
					<div className={styles.grid}>
						{images.map((image: any) => {
							return (
								<GridTile
									image={image.urls.small}
									key={image.id}
									portrait={image.height > image.width ? true : false}
									profileImage={image.user.profile_image.medium}
									userName={image.user.name}
								/>
							);
						})}
					</div>
				)}
			</div>
		);
	}
}

export default Grid;
