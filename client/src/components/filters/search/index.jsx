import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { setHistory } from '../../../redux/actions';

const Search = ({ isNavbar }) => {
	const dispatch = useDispatch();
	const { history } = useSelector(state => state);

	const [search, setSearch] = useState('');
	const [recomend, setRecomend] = useState(false);

	const getGames = title => {
		dispatch(setHistory(title));
	};

	const handleSubmitTitle = e => {
		e.preventDefault();
		if (search.length) {
			getGames(search);
		}
		setSearch('');
	};

	const handleClick = e => {
		const title = e.target.textContent;
		getGames(title);
		setSearch(title);
	};

	return (
		<form
			className={`${styles.search} ${isNavbar && styles.isNavbar}`}
			onSubmit={e => handleSubmitTitle(e)}>
			<input
				type='text'
				value={search}
				name='titleGame'
				id={styles.inputSearch}
				placeholder='Buscar Juegos'
				onFocus={() => setRecomend(true)}
				onBlur={() => setRecomend(false)}
				onChange={e => setSearch(e.target.value)}
			/>
			<div
				id={styles.history}
				className={recomend ? styles.view : styles.hide}>
				{history.map(
					(e, i) =>
						e.includes(search) && (
							<div
								key={i}
								id={styles.item}
								onClick={e => handleClick(e)}>
								<FaSearch />
								<span>{e}</span>
							</div>
						),
				)}
			</div>
		</form>
	);
};

export default Search;
