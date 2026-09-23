import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import usePostGame from '../../hooks/usePostGame';
import defaultCard from '../../assets/default/game_card.png';
import { getGenres, getPlatforms, getTags } from '../../redux/actions';
import { FaTrash } from 'react-icons/fa';

const PostGame = () => {
	const dispatch = useDispatch();
	const { genres, platforms, tags } = useSelector(state => state);
	const { game, errors, isLoading, handleInputChange, handleRatingChange, handleResetForm, handleSubmit } =
		usePostGame();

	useEffect(() => {
		if (!genres.length) dispatch(getGenres());
		if (!platforms.length) dispatch(getPlatforms());
		if (!tags.length) dispatch(getTags());
	}, [dispatch, genres, platforms, tags]);

	const stars = useRef(null);
	const ratingValue = useRef(null);

	const handleChangeRating = e => {
		const rect = stars.current.getBoundingClientRect();
		const pct = (e.clientX - rect.left) / rect.width;
		const rating = Math.round(pct * 5 * 10) / 10;

		const pctFill = ((rating / 5) * 100).toFixed(0);

		stars.current.style.color = 'transparent';
		stars.current.style.background = `linear-gradient(90deg, #2cc1a1 ${pctFill}%, #8c8c8c ${pctFill}%)`;
		stars.current.style.backgroundClip = 'text';
		stars.current.style.webkitBackgroundClip = 'text';

		const value = rating.toFixed(1);
		ratingValue.current.textContent = value;
		handleRatingChange(value);
	};

	return (
		<>
			<Helmet>
				<title>Level Up | Publicar Juego</title>
			</Helmet>

			<div id={styles.container}>
				<main id={styles.content}>
					{/* Preview del juego */}
					<div id={styles.createImage}>
						{game.image ? (
							<div
								className={styles.previewBg}
								style={{ backgroundImage: `url(${game.image})` }}
							/>
						) : (
							<div
								className={styles.previewBg}
								style={{ backgroundImage: `url(${defaultCard})` }}>
								<p>Pega una URL de tu portada para ver el preview de tu juego aquí</p>
							</div>
						)}

						<div className={styles.previewOverlay}>
							<span className={styles.previewTag}>Vista previa</span>
							<div className={styles.boxInformation}>
								<h3 className={styles.previewName}>{game.name || 'Nombre del Juego'}</h3>
								<p className={styles.previewRating}>{game.rating ? `${game.rating} ★` : 'Rating'}</p>
							</div>
						</div>
					</div>

					{/* Formulario de juego */}
					<form
						id={styles.createForm}
						onSubmit={handleSubmit}>
						<header className={styles.header}>
							<h2 id={styles.title}>Información de tu juego</h2>
							<p>Completa los datos para publicar tu juego en Level Up</p>
						</header>

						{/* Nombre */}
						<div className={styles.field}>
							<div className={styles.information}>
								<label
									htmlFor='name'
									className={`${styles.label} ${styles.require}`}>
									Nombre
								</label>
								<input
									id='name'
									type='text'
									name='name'
									maxLength={25}
									value={game.name}
									onChange={handleInputChange}
									placeholder='Ej: Left 4 Dead 2'
								/>
							</div>
							{errors.name && <span className={styles.error}>{errors.name}</span>}
						</div>

						{/* Imagen */}
						<div className={styles.field}>
							<div className={styles.information}>
								<label
									htmlFor='image'
									className={`${styles.label} ${styles.require}`}>
									Portada del Juego
								</label>
								<input
									id='image'
									type='url'
									name='image'
									value={game.image}
									onChange={handleInputChange}
									placeholder='Ingresa la URL de tu imagen'
								/>
							</div>
							{errors.image && <span className={styles.error}>{errors.image}</span>}
						</div>

						{/* Descripción */}
						<div className={`${styles.field} ${styles.fieldFull}`}>
							<div className={styles.information}>
								<label
									htmlFor='description'
									className={styles.label}>
									Descripción
								</label>
								<textarea
									id={styles.inputDescription}
									name='description'
									value={game.description}
									onChange={handleInputChange}
									className={styles.inputDescription}
									placeholder='Cuenta de qué trata el juego...'
								/>
							</div>
							{errors.description && <span className={styles.error}>{errors.description}</span>}
						</div>

						{/* Lanzamiento */}
						<div className={styles.field}>
							<div className={styles.information}>
								<label
									htmlFor='released'
									className={`${styles.label} ${styles.require}`}>
									Lanzamiento
								</label>
								<input
									id='released'
									type='date'
									name='released'
									value={game.released}
									onChange={handleInputChange}
								/>
							</div>
							{errors.released && <span className={styles.error}>{errors.released}</span>}
						</div>

						{/* Rating */}
						<div className={styles.field}>
							<div className={styles.information}>
								<label
									htmlFor='rating'
									className={`${styles.label} ${styles.require}`}>
									Rating
								</label>
								<input
									min={0}
									max={5}
									step={0.1}
									name='rating'
									type='number'
									value={game.rating}
									id={styles.inputRating}
									onChange={handleInputChange}
									placeholder='0.0 - 5.0'
								/>
								<div className={styles.boxRating}>
									<div
										ref={stars}
										className={styles.stars}
										onClick={handleChangeRating}>
										★★★★★
									</div>
									<span
										ref={ratingValue}
										className={styles.ratingValue}>
										0.0
									</span>
								</div>
							</div>
							{errors.rating && <span className={styles.error}>{errors.rating}</span>}
						</div>

						{/* Géneros */}
						<div className={`${styles.field} ${styles.fieldFull}`}>
							<div className={styles.information}>
								<p className={styles.label}>Géneros</p>
								<div className={styles.chipGroup}>
									{genres.map(genre => (
										<label
											key={genre.id}
											className={`${styles.chip} ${game.genres.includes(`${genre.id}`) ? styles.selected : ''}`}>
											<input
												type='checkbox'
												name='genres'
												value={genre.id}
												onChange={handleInputChange}
											/>
											{genre.name}
										</label>
									))}
								</div>
							</div>
							{errors.genres && <span className={styles.error}>{errors.genres}</span>}
						</div>

						{/* Plataformas */}
						<div className={`${styles.field} ${styles.fieldFull}`}>
							<div className={styles.information}>
								<p className={styles.label}>Plataformas</p>
								<div className={styles.chipGroup}>
									{platforms.map(platform => (
										<label
											key={platform.id}
											className={`${styles.chip} ${game.platforms.includes(`${platform.id}`) ? styles.selected : ''}`}>
											<input
												type='checkbox'
												name='platforms'
												value={platform.id}
												onChange={handleInputChange}
											/>
											{platform.name}
										</label>
									))}
								</div>
							</div>
							{errors.platforms && <span className={styles.error}>{errors.platforms}</span>}
						</div>

						{/* Etiquetas */}
						<div className={`${styles.field} ${styles.fieldFull}`}>
							<div className={styles.information}>
								<p className={styles.label}>Etiquetas</p>
								<div className={styles.chipGroup}>
									{tags.map(tag => (
										<label
											key={tag.id}
											className={`${styles.chip} ${game.tags.includes(`${tag.id}`) ? styles.selected : ''}`}>
											<input
												type='checkbox'
												name='tags'
												value={tag.id}
												onChange={handleInputChange}
											/>
											{tag.name}
										</label>
									))}
								</div>
							</div>
							{errors.tags && <span className={styles.error}>{errors.tags}</span>}
						</div>

						{/* Sitio Oficial */}
						<div className={`${styles.field} ${styles.fieldFull}`}>
							<div className={styles.information}>
								<label
									htmlFor='website'
									className={styles.label}>
									Sitio Oficial
								</label>
								<input
									type='text'
									id='website'
									name='website'
									value={game.website}
									onChange={handleInputChange}
									placeholder='https://...'
								/>
							</div>
							{errors.website && <span className={styles.error}>{errors.website}</span>}
						</div>

						<div id={styles.btnGroup}>
							<button
								type='button'
								id={styles.btnReset}
								onClick={handleResetForm}>
								<FaTrash />
							</button>
							<input
								type='submit'
								id={styles.btnSubmit}
								disabled={isLoading}
								value={isLoading ? 'Publicando...' : 'Publicar Juego'}
							/>
						</div>
					</form>
				</main>
			</div>
		</>
	);
};

export default PostGame;
