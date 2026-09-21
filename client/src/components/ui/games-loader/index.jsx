import { motion } from 'framer-motion';
import styles from './styles.module.scss';

const LoadingGames = () => {
	const games = Array.from({ length: 15 }, () => Math.floor(Math.random() * 10));

	const card = {
		visible: i => ({ y: 0, opacity: 1, transition: { delay: i * 0.4 } }),
		hidden: { y: -200, opacity: 0 },
	};

	return (
		<div id={styles.loadGames}>
			{games.map((g, i) => (
				<motion.div
					key={i}
					custom={i}
					initial='hidden'
					animate='visible'
					variants={card}
					className={styles.game}>
					<div className={styles.overlay} />
				</motion.div>
			))}
		</div>
	);
};

export default LoadingGames;
