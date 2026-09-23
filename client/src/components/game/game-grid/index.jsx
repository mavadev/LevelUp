import GameCard from '../game-card';
import styles from './styles.module.scss';

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
				<GameCard game={game} />
			))}
		</div>
	);
};

export default ListGames;
