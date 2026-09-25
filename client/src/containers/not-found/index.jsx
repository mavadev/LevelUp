import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaGamepad, FaArrowLeft } from 'react-icons/fa';

import styles from './styles.module.scss';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<section className={styles.container}>
			<motion.div
				className={styles.content}
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.4, ease: 'easeOut' }}>
				<div className={styles.glow} />

				<div className={styles.errorCodeContainer}>
					<span className={styles.glitchText}>4</span>
					<motion.div
						className={styles.iconWrapper}
						animate={{ rotate: [0, -10, 10, -10, 0] }}
						transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
						<FaGamepad className={styles.gamepadIcon} />
					</motion.div>
					<span className={styles.glitchText}>4</span>
				</div>

				<h1 className={styles.title}>¡GAME OVER!</h1>
				<p className={styles.subtitle}>
					Parece que te has salido del mapa. La página o el juego que buscas no existe o fue movido a otra dimensión.
				</p>

				<div className={styles.actions}>
					<button
						className={styles.secondaryBtn}
						onClick={() => navigate(-1)}>
						<FaArrowLeft /> Regresar
					</button>

					<button
						className={styles.primaryBtn}
						onClick={() => navigate('/games')}>
						<FaHome /> Volver al Catálogo
					</button>
				</div>
			</motion.div>
		</section>
	);
};

export default NotFound;
