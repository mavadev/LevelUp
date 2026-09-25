import { motion } from 'framer-motion';
import { FaGamepad } from 'react-icons/fa';

import styles from './styles.module.scss';

const GameLoadingDetail = () => {
	return (
		<main className={styles.stateContainer}>
			<motion.div
				className={styles.loaderContent}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.3 }}>
				<div className={styles.spinnerWrapper}>
					<div className={styles.spinner} />
					<FaGamepad className={styles.gamepadIcon} />
				</div>
				<h2>Cargando partida...</h2>
				<p>Obteniendo la información técnica y capturas del juego.</p>
			</motion.div>
		</main>
	);
};

export default GameLoadingDetail;
