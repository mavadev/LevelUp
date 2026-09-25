import styles from './styles.module.scss';

const InputGroupSkeleton = () => (
	<div className={styles.skeletonInputGroup}>
		<div className={styles.skeletonBox} />
		<div className={styles.skeletonText} />
	</div>
);

const RenderSkeletons = ({ count = 5 }) => (
	<>
		{Array.from({ length: count }).map((_, index) => (
			<InputGroupSkeleton key={index} />
		))}
	</>
);

export default RenderSkeletons;
