import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './styles.module.scss';
import { CategoryCard } from '../../components';
import { getGenres, getPlatforms, getTags } from '../../redux/actions';

const Genres = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { category } = useParams();
	const state = useSelector(state => state);

	useEffect(() => {
		if (!['genres', 'platforms', 'tags'].includes(category)) navigate('/');

		if (!state[category].length) {
			if (category === 'genres') dispatch(getGenres());
			else if (category === 'platforms') dispatch(getPlatforms());
			else dispatch(getTags());
		}
	}, [dispatch, state[category]]);

	return (
		<div id={styles.container}>
			<header>
				<h1 className={styles.subtitle}>Categoria</h1>
				<span className={styles.title}>
					{category === 'genres' ? 'Géneros' : category === 'platforms' ? 'Plataformas' : 'Etiquetas'}
				</span>
			</header>
			<main className={styles.listItems}>
				{state[category].map(item => (
					<CategoryCard
						type={category}
						category={item}
					/>
				))}
			</main>
		</div>
	);
};

export default Genres;
