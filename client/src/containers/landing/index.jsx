import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { CategoryCard, GameCard, SliderSkeleton } from '../../components';
import { getFeaturedGames, getGenres, getPlatforms, getTags, setOpenDropdowns } from '../../redux/actions';

const Landing = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { featuredGames: games, genres, platforms, tags } = useSelector(state => state);

	useEffect(() => {
		if (!games.length) dispatch(getFeaturedGames());
		if (!genres.length) dispatch(getGenres());
		if (!tags.length) dispatch(getTags());
		if (!platforms.length) dispatch(getPlatforms());
	}, [dispatch, games, genres, tags, platforms]);

	const [currentSlide, setCurrentSlide] = useState(0);

	const sliderGames = useMemo(() => games.slice(5, 10), [games]);
	const topGenres = useMemo(() => genres.slice(0, 6), [genres]);
	const topTags = useMemo(() => tags.slice(0, 6), [tags]);
	const featuredGames = useMemo(() => games.slice(0, 5), [games]);
	const topPlatforms = useMemo(() => platforms.slice(0, 5), [platforms]);

	useEffect(() => {
		if (!sliderGames.length) return;
		const interval = setInterval(() => {
			setCurrentSlide(prevIndex => (prevIndex === sliderGames.length - 1 ? 0 : prevIndex + 1));
		}, 5000);
		return () => clearInterval(interval);
	}, [sliderGames.length]);

	const handlePrev = () => {
		setCurrentSlide(prev => (prev === 0 ? sliderGames.length - 1 : prev - 1));
	};

	const handleNext = () => {
		setCurrentSlide(prev => (prev === sliderGames.length - 1 ? 0 : prev + 1));
	};

	const handleFilterPlatform = platformId => {
		dispatch(setOpenDropdowns({ platforms: true }));
		navigate(`/games?platforms=${platformId}`);
	};

	const sectionVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' },
		},
	};

	return (
		<>
			<Helmet>
				<title>Level Up | Inicio</title>
			</Helmet>
			<main id={styles.landing}>
				{/* Slider o Skeleton si los datos aún están cargando */}
				<section id={styles.slider}>
					{!sliderGames.length ? (
						<SliderSkeleton />
					) : (
						<>
							{sliderGames.map((game, index) => (
								<div
									className={`${styles.game} ${index === currentSlide ? styles.active : ''}`}
									key={game.id || game.slug}>
									<img
										alt={game.name}
										id={styles.gameImage}
										src={game.background_image}
									/>
									<div id={styles.container}>
										<div id={styles.content}>
											<h3 id={styles.genre}>{game.genres?.[0]?.name}</h3>
											<p id={styles.title}>{game.name}</p>
											<Link
												to={`/games/${game.slug}`}
												id={styles.btn}>
												Ir al Juego
											</Link>
										</div>
									</div>
								</div>
							))}

							<button
								type='button'
								className={styles.prevBtn}
								onClick={handlePrev}>
								&#10094;
							</button>
							<button
								type='button'
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
						</>
					)}
				</section>

				<div id={styles.content}>
					{/* Sección Géneros */}
					<motion.section
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						variants={sectionVariants}>
						<header>
							<h2>
								<span>/</span> EXPLORA POR GÉNEROS
							</h2>
							<Link
								to='/category/genres'
								className={styles.sectionLink}>
								VER TODOS &#10095;
							</Link>
						</header>
						<div className={styles.listCategory}>
							{topGenres.map(genre => (
								<CategoryCard
									key={genre.id || genre.slug}
									type={'genres'}
									category={genre}
								/>
							))}
						</div>
					</motion.section>

					{/* Sección Juegos Destacados */}
					<motion.section
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						variants={sectionVariants}>
						<header>
							<h2>
								<span>/</span> JUEGOS DESTACADOS
							</h2>
							<Link
								to='/category/games'
								className={styles.sectionLink}>
								VER TODOS &#10095;
							</Link>
						</header>
						<div id={styles.listGames}>
							{featuredGames.map(game => (
								<GameCard
									key={game.id || game.slug}
									type={1}
									game={game}
								/>
							))}
						</div>
					</motion.section>

					{/* Sección Tags */}
					<motion.section
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						variants={sectionVariants}>
						<header>
							<h2>
								<span>/</span> EXPLORA POR TAGS
							</h2>
							<Link
								to='/category/tags'
								className={styles.sectionLink}>
								VER TODOS &#10095;
							</Link>
						</header>
						<div className={styles.listCategory}>
							{topTags.map(tag => (
								<CategoryCard
									key={tag.id || tag.slug}
									type={'tags'}
									category={tag}
								/>
							))}
						</div>
					</motion.section>

					{/* Sección Plataformas */}
					<motion.section
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						variants={sectionVariants}>
						<header>
							<h2>
								<span>/</span> ELIGE TU PLATAFORMA
							</h2>
							<Link
								to='/category/platforms'
								className={styles.sectionLink}>
								VER TODOS &#10095;
							</Link>
						</header>
						<div id={styles.listPlatforms}>
							{topPlatforms.map(platform => (
								<div
									key={platform.id}
									id={styles.platform}
									onClick={() => handleFilterPlatform(platform.id)}>
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
					</motion.section>

					{/* Sección Contacto/Publicar */}
					<motion.section
						id={styles.contact}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, margin: '-50px' }}
						variants={sectionVariants}>
						<div className={styles.contentContact}>
							<div className={styles.textContact}>
								<h2>¿ERES DESARROLLADOR DE JUEGOS?</h2>
								<p>
									Publica la información de tu videojuego en Level Up para darle máxima visibilidad ante nuestra
									comunidad.
								</p>
							</div>
							<Link
								to='/post-game'
								className={styles.btnContact}>
								Publicar Mi Juego
							</Link>
						</div>
					</motion.section>
				</div>
			</main>
		</>
	);
};

export default Landing;
