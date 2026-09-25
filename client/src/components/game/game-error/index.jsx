import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaExclamationTriangle, FaRedo } from 'react-icons/fa';

import styles from './styles.module.scss';

const GameErrorDetail = ({ error }) => {
	const navigate = useNavigate();

	const handleRetry = () => {
		window.location.reload();
	};

	return (
		<main className={styles.stateContainer}>
			<motion.div
				className={styles.errorContent}
				initial={{ opacity: 0, y: 15 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.3 }}>
				<div className={styles.errorIconWrapper}>
					<FaExclamationTriangle />
				</div>
				<h2>¡Misión Fallida!</h2>
				<p>{error || 'No pudimos cargar la información de este juego en este momento.'}</p>

				<div className={styles.errorActions}>
					<button
						type='button'
						className={styles.secondaryBtn}
						onClick={() => navigate('/games')}>
						<FaArrowLeft /> Volver al catálogo
					</button>
					<button
						type='button'
						className={styles.primaryBtn}
						onClick={handleRetry}>
						<FaRedo /> Reintentar
					</button>
				</div>
			</motion.div>
		</main>
	);
};

export default GameErrorDetail;
