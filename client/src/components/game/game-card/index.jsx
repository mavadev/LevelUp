import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import defaultGameCard from '@/assets/default/game_card.png';

const GameCard = ({ type = 2, game }) => {
	return (
		<Link
			className={styles.game}
			to={`/games/${game.slug}`}
			key={`${game.id}-${game.slug}`}>
			{type === 1 ? (
				<>
					<img
						alt={game.name}
						className={styles.image}
						src={game.background_image}
					/>
					<div className={styles.content1}>
						<p className={styles.title}>{game.name}</p>
						<h3 className={styles.boxGenre}>{game.genres[0].name}</h3>
					</div>
				</>
			) : (
				<>
					<img
						alt={game.name}
						className={styles.image}
						src={game.background_image || defaultGameCard}
						onError={e => {
							e.target.onerror = null;
							e.target.src = defaultGameCard;
						}}
					/>
					<div className={styles.content2}>
						<p className={styles.title}>{game.name}</p>
						<div className={styles.information}>
							<div className={styles.genres}>
								{game.genres?.slice(0, 3).map((genre, index) => (
									<h3
										key={index}
										className={styles.genre}>
										{genre.name}
									</h3>
								))}
							</div>
							<p className={styles.rating}>{game.rating}</p>
						</div>
					</div>
				</>
			)}
		</Link>
	);
};

export default GameCard;
