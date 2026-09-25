import { motion, AnimatePresence } from 'framer-motion';

import GameCard from '../game-card';
import styles from './styles.module.scss';
import { GamesNotFound, GamesGridSkeleton } from '../../../components';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
		},
	},
};
const itemVariants = {
	hidden: { opacity: 0, y: 15 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.25, ease: 'easeOut' },
	},
};

const ListGames = ({ listGames, loadingGames = false, onReset }) => {
	if (loadingGames) {
		return <GamesGridSkeleton count={20} />;
	}

	return (
		<AnimatePresence mode='wait'>
			{!listGames || listGames.length === 0 ? (
				<motion.div
					key='not-found'
					initial={{ opacity: 0, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}>
					<GamesNotFound onReset={onReset} />
				</motion.div>
			) : (
				<motion.div
					key='game-list'
					id={styles.listGames}
					variants={containerVariants}
					initial='hidden'
					animate='visible'>
					{listGames.map(game => (
						<motion.div
							key={game.id || game.slug}
							variants={itemVariants}>
							<GameCard game={game} />
						</motion.div>
					))}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ListGames;
