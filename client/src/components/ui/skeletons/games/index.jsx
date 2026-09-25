import styles from './styles.module.scss';

const GameCardSkeleton = () => (
	<div className={styles.skeletonCard}>
		<div className={styles.skeletonMedia} />
		<div className={styles.skeletonBody}>
			<div className={styles.skeletonTitle} />
			<div className={styles.skeletonTag} />
		</div>
	</div>
);

const GamesGridSkeleton = ({ count = 8 }) => (
	<div id={styles.listGames}>
		{Array.from({ length: count }).map((_, index) => (
			<GameCardSkeleton key={index} />
		))}
	</div>
);

export default GamesGridSkeleton;
