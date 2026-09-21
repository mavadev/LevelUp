import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { getGamesByPage, getGenres, getPlatforms } from '../../redux/actions';

const Landing = () => {
	const dispatch = useDispatch();
	const { genres, games, platforms } = useSelector(state => state);

	useEffect(() => {
		if (!genres.length) dispatch(getGenres());
		if (!games.length) dispatch(getGamesByPage());
		if (!platforms.length) dispatch(getPlatforms());
	}, [dispatch, genres, games, platforms]);

	const [currentSlide, setCurrentSlide] = useState(0);

	// Derivamos los datos limitados a 5 directamente de los arreglos globales
	const sliderGames = useMemo(() => games.slice(5, 10), [games]);
	const topGenres = useMemo(() => genres.slice(0, 5), [genres]);
	const featuredGames = useMemo(() => games.slice(0, 5), [games]);
	const topPlatforms = useMemo(() => platforms.slice(0, 5), [platforms]);

	// Manejo del temporizador del Slider basado en sliderGames
	useEffect(() => {
		if (!sliderGames.length) return;
		const interval = setInterval(() => {
			setCurrentSlide(prevIndex => (prevIndex === sliderGames.length - 1 ? 0 : prevIndex + 1));
		}, 5000);
		return () => clearInterval(interval);
	}, [sliderGames.length]);

	// Manejo de los botones de navegación del Slider
	const handlePrev = () => {
		setCurrentSlide(prev => (prev === 0 ? sliderGames.length - 1 : prev - 1));
	};
	const handleNext = () => {
		setCurrentSlide(prev => (prev === sliderGames.length - 1 ? 0 : prev + 1));
	};

	return (
		<>
			<Helmet>
				<title>Level Up | Inicio</title>
			</Helmet>
			<main id={styles.landing}>
				<section id={styles.slider}>
					{sliderGames.map((game, index) => (
						<div
							className={`${styles.game} ${index === currentSlide ? styles.active : ''}`}
							key={game.id}>
							<img
								alt={game.name}
								id={styles.gameImage}
								src={game.background_image}
							/>
							<div id={styles.container}>
								<div id={styles.content}>
									<h3 id={styles.genre}>{game.genre}</h3>
									<p id={styles.title}>{game.name}</p>
									<a
										href={`/juego/${game.slug}`}
										id={styles.btn}>
										Ir al Juego
									</a>
								</div>
							</div>
						</div>
					))}

					<button
						className={styles.prevBtn}
						onClick={handlePrev}>
						&#10094;
					</button>
					<button
						className={styles.nextBtn}
						onClick={handleNext}>
						&#10095;
					</button>

					<div className={styles.dotsContainer}>
						{sliderGames.map((_, index) => (
							<span
								key={index}
								className={`${styles.dot} ${index === currentSlide ? styles.activeDot : ''}`}
								onClick={() => setCurrentSlide(index)}
							/>
						))}
					</div>
				</section>

				<div id={styles.content}>
					<section id={styles.genres}>
						<div className={styles.sectionHeader}>
							<h2>
								<span>/</span> EXPLORA POR GÉNEROS
							</h2>
							{/* <Link
								to='/generos'
								className={styles.viewAll}>
								VER TODOS &#10095;
							</Link> */}
						</div>
						<div id={styles.listGenres}>
							{topGenres.map(genre => (
								<div
									key={genre.slug}
									id={styles.genre}>
									<img
										alt={genre.name}
										id={styles.genreImage}
										src={genre.background_image}
									/>
									<div id={styles.genreInfo}>
										<h3 id={styles.genreName}>{genre.name}</h3>
									</div>
								</div>
							))}
						</div>
					</section>
					<section id={styles.games}>
						<div className={styles.sectionHeader}>
							<h2>
								<span>/</span>JUEGOS DESTACADOS
							</h2>
							<Link
								to='/juegos'
								className={styles.viewAll}>
								VER TODOS &#10095;
							</Link>
						</div>
						<div id={styles.listGames}>
							{featuredGames.map(game => (
								<Link
									key={game.id}
									id={styles.game}
									to={`/juego/${game.slug}`}>
									<img
										alt={game.name}
										id={styles.gameImage}
										src={game.background_image}
									/>
									<div id={styles.gameInfo}>
										<p id={styles.gameTitle}>{game.name}</p>
										<h3 id={styles.gameGenre}>{game.genres[0]}</h3>
									</div>
								</Link>
							))}
						</div>
					</section>
					<section id={styles.platforms}>
						<div className={styles.sectionHeader}>
							<h2>
								<span>/</span>ELIGE TU PLATAFORMA
							</h2>
							{/* <Link
								to='/platforms'
								className={styles.viewAll}>
								VER TODOS &#10095;
							</Link> */}
						</div>
						<div id={styles.listPlatforms}>
							{topPlatforms.map(platform => (
								<div
									key={platform.id}
									id={styles.platform}>
									<img
										alt={platform.name}
										id={styles.platformImage}
										src={platform.background_image}
									/>
									<div id={styles.platformInfo}>
										<h3 id={styles.platformName}>{platform.name}</h3>
									</div>
								</div>
							))}
						</div>
					</section>
					<section id={styles.contact}>
						<div className={styles.contactContainer}>
							<div className={styles.contactText}>
								<h2>¿ERES DESARROLLADOR DE JUEGOS?</h2>
								<p>
									Publica la información de tu videojuego en Level Up para darle máxima visibilidad ante nuestra
									comunidad.
								</p>
							</div>
							<Link
								to='/publicar'
								className={styles.contactBtn}>
								Publicar Mi Juego
							</Link>
						</div>
					</section>
				</div>
			</main>
		</>
	);
};

export default Landing;
