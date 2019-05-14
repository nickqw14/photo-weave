import React, { Component } from "react";
import styles from "../styles/grid.module.scss";
import { GridTile } from "../components/GridTile";
import Search from "../../Search/containers/Search";

type Props = {
	images: [];
	loading: boolean;
	onChange: (value: string) => void;
	onSubmit: () => void;
};

class Grid extends React.Component<Props, {}> {
	render() {
		const { images, loading, onChange, onSubmit } = this.props;
		return (
			<div className={styles.gridContainer}>
				<Search onChange={onChange} onSubmit={onSubmit} />
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
