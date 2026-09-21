import styles from './styles.module.scss';
import { LoadRunBunny } from '../../../assets';

const LoadingDetail = () => {
	return (
		<div id={styles.loadingDetail}>
			<img
				src={LoadRunBunny}
				alt='Loading Game..'
			/>
			<h2>Loading the game ...</h2>
		</div>
	);
};

export default LoadingDetail;
