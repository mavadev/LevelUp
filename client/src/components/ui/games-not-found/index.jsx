import { motion } from 'framer-motion';
import { FaGhost, FaUndo } from 'react-icons/fa';

import styles from './styles.module.scss';

const GamesNotFound = ({ onReset }) => {
	return (
		<div className={styles.noResultsContainer}>
			<motion.div
				className={styles.noResultsContent}
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}>
				<div className={styles.iconWrapper}>
					<FaGhost className={styles.ghostIcon} />
				</div>

				<h3>¡Sin juegos encontrados!</h3>
				<p>
					No encontramos ningún juego que coincida con los filtros seleccionados. Prueba ajustando la búsqueda o resetea
					la selección.
				</p>

				{onReset && (
					<button
						className={styles.resetBtn}
						onClick={onReset}>
						<FaUndo /> Limpiar Filtros
					</button>
				)}
			</motion.div>
		</div>
	);
};

export default GamesNotFound;
