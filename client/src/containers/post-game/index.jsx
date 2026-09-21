import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaImage } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import styles from './styles.module.scss';
import { FormField, FormFieldOpts, ModalSelectOpts, ModalImage, SpinnerLoader } from '../../components';
import { useState } from 'react';
import useCreateGame from '../../hooks/usePostGame';

const CreateGame = () => {
	const {
		game,
		setGame,
		error,
		tags,
		genres,
		platforms,
		send,
		dataSend,
		setDataSend,
		errorImage,
		setErrorImage,
		handleInputChange,
		handleInputSubmit,
	} = useCreateGame();

	const [select, setSelect] = useState(null);
	const [openImage, setOpenImage] = useState(false);

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Level Up | Create</title>
				</Helmet>
			</HelmetProvider>
			<div id={styles.create}>
				{dataSend.send && (
					<section id={styles.modalSend}>
						<div id={styles.content}>
							{send && (
								<div id={styles.loadingSend}>
									<SpinnerLoader />
								</div>
							)}
							{dataSend.error ? (
								<FaTimes className={`${styles.iconModal} ${styles.error}`} />
							) : (
								<FaCheck className={`${styles.iconModal} ${styles.check}`} />
							)}

							{dataSend.error ? (
								<p id={styles.textModal}>
									Hubo un error al crear el juego <span>Vuelva a intentarlo luego</span>
								</p>
							) : (
								<p id={styles.textModal}>El juego fue creado con éxito</p>
							)}

							<div id={styles.btnsModal}>
								<Link
									className={`${styles.btn} ${dataSend.error && styles.error}`}
									to={dataSend.error ? '/games' : `/game/${dataSend.id}`}>
									Ir a{dataSend.error ? ' Games' : 'l Juego'}
								</Link>
								{!dataSend.error && (
									<a
										href='#again'
										className={styles.btn}
										onClick={() => setDataSend({ id: '', send: false })}>
										Crear otro
									</a>
								)}
							</div>
						</div>
					</section>
				)}

				{game.image && !errorImage && openImage && (
					<ModalImage
						srcImage={game.image}
						moveCarrusel={setOpenImage}
						iconsMove={false}
					/>
				)}
				<form
					id={styles.form}
					onChange={e => handleInputChange(e)}
					onSubmit={e => handleInputSubmit(e)}>
					<h2 id={styles.title}>{game.name || 'Nombre del Juego'}</h2>

					<FormField
						name='Nombre'
						slug='name'
						type='text'
						error={error.name}
					/>
					<FormField
						slug='image'
						error={error.image}>
						<label className={styles.require}>Foto del Juego</label>
						<section id={styles.boxImage}>
							<div id={styles.infoImageUrl}>
								{!errorImage && game.image && (
									<img
										id={styles.image}
										src={game.image}
										onClick={() => setOpenImage(true)}
										onError={() => setErrorImage(true)}
									/>
								)}

								{errorImage ? <FaTimes size={20} /> : <FaImage size={30} />}
								<p>{errorImage ? 'No se puede cargar la imagen' : 'Ingresa la url debajo'}</p>
							</div>
							<input
								type='url'
								name='image'
								id={styles.imageUrl}
								placeholder='Ingresa la Url de tu imagen'
							/>
						</section>
					</FormField>
					<FormField
						slug='description'
						error={error.description}>
						<label
							htmlFor='description'
							className={styles.require}>
							Descripcion
						</label>
						<textarea
							name='description'
							id={styles.inputDescription}
						/>
					</FormField>
					<FormField
						slug='released'
						type='date'
						name='Lanzamiento'
						error={error.released}
					/>
					<FormField
						slug='rating'
						type='number'
						name='Rating'
						error={error.rating}
					/>
					<FormFieldOpts
						name='Géneros'
						type='genres'
						error={error.genres}
						game={game}
						setGame={setGame}
						setSelect={setSelect}
					/>
					<FormFieldOpts
						name='Plataformas'
						type='platforms'
						error={error.platforms}
						game={game}
						setGame={setGame}
						setSelect={setSelect}
					/>
					<FormFieldOpts
						name='Etiquetas'
						type='tags'
						error={error.tags}
						game={game}
						setGame={setGame}
						setSelect={setSelect}
					/>
					<FormField
						slug='website'
						type='text'
						name='Sitio Web'
						error={false}
					/>
					<input
						id={styles.btnSub}
						type='submit'
						value='Publicar Juego!'
						disabled={send && Object.values(error).some(e => e.length)}
					/>
					<ModalSelectOpts
						game={game}
						select={select}
						setSelect={setSelect}
						listOpts={select === 'genres' ? genres : select === 'tags' ? tags : platforms}
					/>
				</form>
			</div>
		</>
	);
};

export default CreateGame;
