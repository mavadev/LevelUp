import styles from './styles.module.scss';

const SliderSkeleton = () => {
	return (
		<div className={styles.sliderSkeleton}>
			<div className={styles.skeletonPulse} />
			<div className={styles.skeletonContent}>
				<div className={styles.skeletonBadge} />
				<div className={styles.skeletonTitle} />
				<div className={styles.skeletonBtn} />
			</div>
		</div>
	);
};

export default SliderSkeleton;
