import styles from './styles.module.scss';
import { GameImageLoader } from '../../../assets';

const GameLoader = () => {
	return (
		<div id={styles.gameLoader}>
			<img
				src={GameImageLoader}
				alt='Cargando el juego...'
			/>
			<h2>Cargando el juego ...</h2>
		</div>
	);
};

export default GameLoader;
