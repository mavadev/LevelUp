import { useParams } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import styles from './styles.module.scss';
import { ModalImage } from '../../components';
import useDetailGame from '../../hooks/useDetailGame';

const GameDetail = () => {
	const { slug } = useParams();

	const {
		game,
		slide,
		error,
		loading,
		imgSelect,
		setImgSelect,
		handleModalImage,
		moveCarruselNext,
		moveCarruselPrev,
		moveCarruselModal,
	} = useDetailGame(slug);

	const categories = [
		{
			title: 'Generos',
			attr: 'genres',
		},
		{
			title: 'Plataformas',
			attr: 'platforms',
		},
		{
			title: 'Etiquetas',
			attr: 'tags',
		},
	];

	if (loading) {
		return (
			<main id={styles.loader}>
				<h1>Obteniendo el juego...</h1>
			</main>
		);
	}

	if (error) {
		return (
			<main id={styles.error}>
				<h1>Error: {error}</h1>
			</main>
		);
	}

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>{`Level Up | ${game?.name || ''}`}</title>
				</Helmet>
			</HelmetProvider>
			<main
				id={styles.container}
				style={{
					backgroundImage: `linear-gradient(180deg, rgba(15,15,15,0.7) 0%, #0f0f0f 90%), url(${game?.background_image})`,
				}}>
				<section id={styles.information}>
					<div id={styles.content}>
						<h1 id={styles.title}>{game?.name}</h1>
						<p id={styles.description}>{game?.description_raw}</p>
						<div id={styles.categories}>
							{categories.map(category => (
								<div
									key={category.attr}
									className={styles.category}>
									<h2 className={styles.categoryTitle}>{category.title}</h2>
									<div className={styles.categoryList}>
										{game?.[category.attr]
											?.map(item => item.name || item)
											?.slice(0, 3)
											.map((item, idx) => (
												<span
													key={idx}
													className={styles.value}>
													{item}
												</span>
											))}
									</div>
								</div>
							))}
							<div className={styles.category}>
								<h2 className={styles.categoryTitle}>RATING</h2>
								<div className={styles.categoryList}>
									<p className={styles.value}>{game?.rating}</p>
								</div>
							</div>
							<div className={styles.category}>
								<h2 className={styles.categoryTitle}>Lanzamiento</h2>
								<div className={styles.categoryList}>
									<p className={styles.value}>{game?.released}</p>
								</div>
							</div>
						</div>
						{game?.website && (
							<a
								target='_blank'
								rel='noreferrer'
								id={styles.website}
								href={game.website}>
								Visitar Sitio Oficial
							</a>
						)}
					</div>
					{game?.videoData && (
						<div id={styles.trailerWrapper}>
							<video
								muted
								controls
								autoPlay
								id={styles.trailer}
								poster={game.videoPreview}>
								<source
									src={game.videoData[480]}
									type='video/mp4'
								/>
								Tu navegador no soporta el formato de video.
							</video>
						</div>
					)}
				</section>
				{game?.screenshots && game.screenshots.length > 0 && (
					<section id={styles.screenshots}>
						<button
							type='button'
							onClick={moveCarruselPrev}
							style={{ display: !slide.position && 'none' }}
							className={`${styles.iconMove} ${styles.left}`}>
							<FaAngleLeft />
						</button>
						<div
							className={styles.carrusel}
							style={{ transform: `translateX(${slide.position}px)` }}>
							{game.screenshots.map((src, i) => (
								<img
									key={i}
									src={src}
									className={styles.screen}
									alt={`Screenshot ${i + 1}`}
									onClick={() => handleModalImage(i, src)}
								/>
							))}
						</div>
						<button
							type='button'
							onClick={moveCarruselNext}
							className={`${styles.iconMove} ${styles.right}`}
							style={{
								display: slide.stop || game.screenshots.length < 3 || window.innerWidth < 480 ? 'none' : 'flex',
							}}>
							<FaAngleRight />
						</button>
					</section>
				)}
				{imgSelect.view && (
					<ModalImage
						srcImage={imgSelect.src}
						imgSelect={imgSelect}
						setImage={setImgSelect}
						moveCarrusel={moveCarruselModal}
						iconsMove={game?.screenshots?.length > 1}
					/>
				)}
			</main>
		</>
	);
};

export default GameDetail;
