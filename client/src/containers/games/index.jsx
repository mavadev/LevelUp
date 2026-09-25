import { FaFilter } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';

import styles from './styles.module.scss';
import { getFilteredGames } from '../../redux/actions';
import { GameFilters, GameGrid, Pagination, Search } from '../../components';

const Games = () => {
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	// Estado local para el valor del input de búsqueda en tiempo real
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	// Obtenemos los estados locales controlados por la URL
	const filters = useMemo(
		() => ({
			page: Number(searchParams.get('page') || 1),
			search: searchParams.get('search') || '',
			genres: searchParams.get('genres')?.split(',').filter(Boolean) || [],
			platforms: searchParams.get('platforms')?.split(',').filter(Boolean) || [],
			tags: searchParams.get('tags')?.split(',').filter(Boolean) || [],
			sort: searchParams.get('sort') || '',
			creator: searchParams.get('creator') || 'api',
		}),
		[searchParams],
	);

	// Estado local para el valor del input de búsqueda
	const [searchTerm, setSearchTerm] = useState(filters.search);

	// Actualizamos el estado local con el valor de búsqueda en la URL
	useEffect(() => {
		setSearchTerm(filters.search);
	}, [filters.search]);

	// Obtenemos los datos desde Redux
	const { filteredGames, loadingGames } = useSelector(state => state);

	// Cada vez que cambie los parameters en la URL, pedimos nuevamente los juegos
	useEffect(() => {
		const params = Object.fromEntries(searchParams.entries());
		dispatch(getFilteredGames(params)).catch(() => handleResetAll());
	}, [dispatch, searchParams]);

	// Función para actualizar filtros
	const updateParams = newFilters => {
		setSearchParams(
			prev => {
				Object.entries(newFilters).forEach(([key, value]) => {
					if (Array.isArray(value) && value.length > 0) {
						prev.set(key, value.join(','));
					} else if (typeof value === 'string' && value.trim().length > 0) {
						prev.set(key, value);
					} else if (typeof value === 'number' && value > 0) {
						prev.set(key, value.toString());
					} else {
						prev.delete(key);
					}
				});
				return prev;
			},
			{ replace: true },
		);
	};

	// Función para borrar todos los filtros
	const handleResetAll = () => {
		setSearchTerm('');

		updateParams({
			page: 1,
			search: '',
			genres: [],
			platforms: [],
			tags: [],
			sort: '',
			creator: '',
		});
	};

	// Debounce para el input de búsqueda
	const debounceTimer = useRef(null);
	const handleSearchChange = e => {
		const value = e.target.value;
		setSearchTerm(value);

		if (debounceTimer.current) clearTimeout(debounceTimer.current);

		debounceTimer.current = setTimeout(() => {
			const cleanValue = value.trim();
			updateParams({
				...filters,
				search: cleanValue,
				page: 1,
			});
		}, 400);
	};

	// Función para borrar la búsqueda actual
	const clearSearch = () => {
		updateParams({ ...filters, search: '' });
	};

	// Función para cambiar de página
	const handlePageChange = newPage => {
		updateParams({ ...filters, page: newPage });
	};

	return (
		<>
			<Helmet>
				<title>Level Up | Juegos</title>
			</Helmet>
			<main className={styles.gamesPage}>
				<div className={styles.container}>
					<header className={styles.header}>
						<div className={styles.counterGroup}>
							{!loadingGames && filters.search && <h2>{filteredGames.totalGames} resultados</h2>}
						</div>
						<div className={styles.actionsGroup}>
							<button
								className={styles.switchFilter}
								onClick={() => setShowMobileFilters(prev => !prev)}>
								<FaFilter />
								<span>Filtros</span>
							</button>

							<Search
								search={searchTerm}
								hasValue={filters.search}
								clearSearch={clearSearch}
								handleSearchChange={handleSearchChange}
							/>
						</div>
					</header>

					<div className={styles.contentLayout}>
						<aside id={styles.sectionFilters}>
							<GameFilters
								filters={filters}
								handleChange={updateParams}
								onReset={handleResetAll}
								isOpen={showMobileFilters}
								onClose={() => setShowMobileFilters(false)}
							/>
						</aside>
						<section id={styles.sectionGames}>
							<GameGrid
								listGames={filteredGames.games}
								loadingGames={loadingGames}
								onReset={handleResetAll}
							/>
							<Pagination
								totalPages={filteredGames.totalPages}
								currentPage={filters.page}
								handlePageChange={handlePageChange}
							/>
						</section>
					</div>
				</div>
			</main>
		</>
	);
};

export default Games;
