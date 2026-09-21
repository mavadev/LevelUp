import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { FaFilter, FaSearch } from 'react-icons/fa';
import { useMemo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { getGamesByPage } from '../../redux/actions';
import { GameFilters, GameGrid, Pagination } from '../../components';

const INITIAL_FILTERS = {
	genresFilter: [],
	platformFilter: [],
	sortOption: 'none',
	creatorOption: 'all',
};
const TOTAL_PAGES = 500;

const Games = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const pageParam = searchParams.get('page') || 1;

	const dispatch = useDispatch();
	const { gamesByPage, loadingPage } = useSelector(state => state);

	// Estados locales de control
	const [searchQuery, setSearchQuery] = useState('');
	const [filters, setFilters] = useState(INITIAL_FILTERS);
	const [currentPage, setCurrentPage] = useState(Number(pageParam > TOTAL_PAGES ? TOTAL_PAGES : pageParam));
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	// Obtención de juegos por página
	useEffect(() => {
		if (!gamesByPage[currentPage]) dispatch(getGamesByPage(currentPage));
	}, [dispatch, currentPage]);

	// Sincronizar el estado cuando la URL cambie (ej: con los botones de ir atrás/adelante del navegador)
	useEffect(() => {
		const validPage = pageParam > TOTAL_PAGES ? TOTAL_PAGES : pageParam;
		setCurrentPage(Number(validPage));
	}, [pageParam]);

	// Función para cambiar de página y actualizar la URL sin recargar
	const handlePageChange = newPage => {
		setCurrentPage(Number(newPage));

		setSearchParams(
			prev => {
				prev.set('page', newPage.toString());
				return prev;
			},
			{ replace: true },
		);
	};

	// Filtrado y Ordenamiento Combinado (Derivado del estado)
	const filteredGames = useMemo(() => {
		if (!gamesByPage || !gamesByPage[currentPage]) return [];

		let result = [...gamesByPage[currentPage]];

		// Búsqueda por texto
		if (searchQuery.trim() !== '') {
			result = result.filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()));
		}

		// Filtro por Género
		if (filters.genresFilter.length > 0) {
			result = result.filter(game =>
				game.genres?.some(g => filters.genresFilter.includes(typeof g === 'string' ? g : g.name)),
			);
		}

		// Filtro por Plataforma
		if (filters.platformFilter.length > 0) {
			result = result.filter(game =>
				game.platforms?.some(p => filters.platformFilter.includes(typeof p === 'string' ? p : p.name)),
			);
		}

		// Filtro por Origen (API vs DB)
		if (filters.creatorOption === 'gamesDB') {
			result = result.filter(g => Boolean(Number(g.id)));
		} else if (filters.creatorOption === 'gamesAPI') {
			result = result.filter(g => !Number(g.id));
		}

		// Ordenamiento
		if (filters.sortOption === 'asc_title') {
			result.sort((a, b) => a.name.localeCompare(b.name));
		} else if (filters.sortOption === 'desc_title') {
			result.sort((a, b) => b.name.localeCompare(a.name));
		} else if (filters.sortOption === 'asc_rating') {
			result.sort((a, b) => (a.rating || 0) - (b.rating || 0));
		} else if (filters.sortOption === 'desc_rating') {
			result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
		}

		return result;
	}, [gamesByPage[currentPage], searchQuery, filters]);

	// Handlers para resetear o actualizar filtros y resetear la página a 1
	const handleFilterChange = newFilters => {
		setFilters(newFilters);
		handlePageChange(1);
	};
	const handleSearchChange = e => {
		setSearchQuery(e.target.value);
		handlePageChange(1);
	};
	const handleResetAll = () => {
		setFilters(INITIAL_FILTERS);
		setSearchQuery('');
		handlePageChange(1);
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
							<h2>{filteredGames.length} resultados</h2>
							<button
								className={styles.clearFilters}
								onClick={handleResetAll}>
								Borrar filtros
							</button>
						</div>
						<div className={styles.actionsGroup}>
							<button
								className={styles.switchFilter}
								onClick={() => setShowMobileFilters(prev => !prev)}>
								<FaFilter />
								<span>Filtros</span>
							</button>

							<div className={styles.search}>
								<FaSearch className={styles.searchIcon} />
								<input
									type='text'
									className={styles.searchInput}
									placeholder='Buscar juegos...'
									value={searchQuery}
									onChange={handleSearchChange}
								/>
							</div>
						</div>
					</header>

					<div className={styles.contentLayout}>
						<aside id={styles.sectionFilters}>
							<GameFilters
								filters={filters}
								onReset={handleResetAll}
								onFilterChange={handleFilterChange}
								onClose={() => setShowMobileFilters(false)}
							/>
						</aside>
						<section id={styles.sectionGames}>
							{loadingPage ? (
								<>
									<h1>Cargando los juegos</h1>
								</>
							) : (
								<GameGrid listGames={filteredGames} />
							)}
							<Pagination
								totalPages={TOTAL_PAGES}
								currentPage={currentPage}
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
