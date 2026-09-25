import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { defaultGameCard } from '@/assets';

const GameCard = ({ type = 2, game }) => {
	if (!game) return null;

	const handleImageError = e => {
		e.target.onerror = null;
		e.target.src = defaultGameCard;
	};

	const imageSrc = game.background_image || defaultGameCard;
	const firstGenre = game.genres?.[0]?.name || 'Juego';

	return (
		<Link
			className={styles.game}
			to={`/games/${game.slug}`}>
			<div className={styles.imageContainer}>
				<img
					src={imageSrc}
					loading='lazy'
					alt={game.name}
					className={styles.image}
					onError={handleImageError}
				/>
			</div>

			{type === 1 ? (
				<div className={styles.content1}>
					<p
						className={styles.title}
						title={game.name}>
						{game.name}
					</p>
					<span className={styles.boxGenre}>{firstGenre}</span>
				</div>
			) : (
				<div className={styles.content2}>
					<p
						className={styles.title}
						title={game.name}>
						{game.name}
					</p>
					<div className={styles.information}>
						<div className={styles.genres}>
							{game.genres?.slice(0, 3).map((genre, index) => (
								<span
									key={genre.id || index}
									className={styles.genre}>
									{genre.name}
								</span>
							))}
						</div>
						{game.rating > 0 && <span className={styles.rating}>★ {game.rating}</span>}
					</div>
				</div>
			)}
		</Link>
	);
};

export default GameCard;
