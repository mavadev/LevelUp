import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import defaultGameCard from '@/assets/default/game_card.png';

const ListGames = ({ listGames }) => {
	if (!listGames || listGames.length === 0) {
		return (
			<div className={styles.noResults}>
				<p>No se encontraron juegos que coincidan con los criterios de búsqueda.</p>
			</div>
		);
	}

	return (
		<div id={styles.listGames}>
			{listGames.map(game => (
				<Link
					className={styles.game}
					key={`${game.id}-${game.slug}`}
					to={`/juego/${game.slug}`}>
					<img
						alt={game.name}
						className={styles.image}
						src={game.background_image || defaultGameCard}
						onError={e => {
							e.target.onerror = null;
							e.target.src = defaultGameCard;
						}}
					/>
					<div className={styles.content}>
						<p className={styles.title}>{game.name}</p>
						<div className={styles.information}>
							<div className={styles.genres}>
								{game.genres?.slice(0, 3).map((genre, index) => (
									<h3
										key={index}
										className={styles.genre}>
										{genre || genre.name}
									</h3>
								))}
							</div>
							<p className={styles.rating}>{game.rating}</p>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default ListGames;
