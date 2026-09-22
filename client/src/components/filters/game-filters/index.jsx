import { useEffect, useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.scss';
import { Dropdown } from '../../../components';
import { getGenres, getPlatforms } from '../../../redux/actions';

const InputGroup = ({ id, name, checked, disabled = false, onChange, type = 'checkbox' }) => (
	<div className={`${styles.inputGroup} ${disabled ? styles.disabled : ''}`}>
		<div className={styles.checkboxWrapper}>
			<input
				id={id}
				type={type}
				checked={checked}
				disabled={disabled}
				onChange={onChange}
			/>
			<span className={styles.customCheck}>
				{type === 'checkbox' && checked && <FaCheck className={styles.checkIcon} />}
				{type === 'radio' && checked && <span className={styles.radioDot} />}
			</span>
		</div>
		<label htmlFor={id}>{name}</label>
	</div>
);

const GameFilters = ({ filters, handleChange, onReset, onClose }) => {
	const dispatch = useDispatch();
	const { genres, platforms } = useSelector(state => state);

	useEffect(() => {
		if (!genres.length) dispatch(getGenres());
		if (!platforms.length) dispatch(getPlatforms());
	}, [dispatch, genres, platforms]);

	const [drop, setDrop] = useState({
		genres: true,
		platforms: false,
		order: false,
		creator: false,
	});

	const handleGenreChange = idGenre => {
		const isSelected = filters.genres.includes(idGenre);

		const updatedGenres = isSelected ? filters.genres.filter(g => g !== idGenre) : [...filters.genres, idGenre];
		handleChange({ ...filters, genres: updatedGenres });
	};

	const handlePlatformChange = idPlatform => {
		const isSelected = filters.platforms.includes(idPlatform);

		const updatedPlatforms = isSelected
			? filters.platforms.filter(p => p !== idPlatform)
			: [...filters.platforms, idPlatform];
		handleChange({ ...filters, platforms: updatedPlatforms });
	};

	const handleSortChange = value => {
		const newState = filters.sort === value ? '' : value;
		handleChange({ ...filters, sort: newState });
	};

	const handleCreatorChange = value => {
		const newState = filters.creator === value ? '' : value;
		handleChange({ ...filters, creator: newState });
	};

	return (
		<>
			<AnimatePresence>
				<motion.aside
					className={styles.filtersWrapper}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ duration: 0.2 }}>
					<div className={styles.filterHeader}>
						<h4>Filtros</h4>
						<button
							className={styles.closeBtn}
							onClick={onClose}>
							<FaTimes />
						</button>
					</div>

					<form
						className={styles.formFilter}
						onSubmit={e => e.preventDefault()}>
						{/* Géneros */}
						<Dropdown
							drop={drop}
							select='genres'
							title='Géneros'
							setDrop={setDrop}>
							<div className={styles.optionsList}>
								{genres.map(genre => (
									<InputGroup
										name={genre.name}
										id={`genre-${genre.slug}`}
										key={genre.id || genre.slug}
										onChange={() => handleGenreChange(`${genre.id}`)}
										checked={filters.genres.includes(`${genre.id}`)}
									/>
								))}
							</div>
						</Dropdown>

						{/* Plataformas */}
						<Dropdown
							drop={drop}
							select='platforms'
							title='Plataformas'
							setDrop={setDrop}>
							<div className={styles.optionsList}>
								{platforms.map(platform => (
									<InputGroup
										name={platform.name}
										id={`platform-${platform.slug}`}
										key={platform.id || platform.slug}
										onChange={() => handlePlatformChange(`${platform.id}`)}
										checked={filters.platforms.includes(`${platform.id}`)}
									/>
								))}
							</div>
						</Dropdown>

						{/* Ordenamiento */}
						<Dropdown
							drop={drop}
							select='order'
							title='Orden'
							setDrop={setDrop}>
							<div className={styles.optionsList}>
								<InputGroup
									type='radio'
									id='sort-asc-title'
									name='Alfabéticamente (A-Z)'
									checked={filters.sort === 'name'}
									onChange={() => handleSortChange('name')}
								/>
								<InputGroup
									type='radio'
									id='sort-desc-title'
									name='Alfabéticamente (Z-A)'
									checked={filters.sort === '-name'}
									onChange={() => handleSortChange('-name')}
								/>
								<InputGroup
									type='radio'
									id='sort-asc-rating'
									name='Rating (Menor-Mayor)'
									checked={filters.sort === 'rating'}
									onChange={() => handleSortChange('rating')}
								/>
								<InputGroup
									type='radio'
									id='sort-desc-rating'
									name='Rating (Mayor-Menor)'
									checked={filters.sort === '-rating'}
									onChange={() => handleSortChange('-rating')}
								/>
							</div>
						</Dropdown>

						{/* Creador */}
						<Dropdown
							drop={drop}
							select='creator'
							title='Origen'
							setDrop={setDrop}>
							<div className={styles.optionsList}>
								<InputGroup
									type='radio'
									id='creator-db'
									name='Creados por la comunidad'
									checked={filters.creator === 'db'}
									onChange={() => handleCreatorChange('db')}
								/>
								<InputGroup
									type='radio'
									id='creator-api'
									name='Juegos oficiales (API)'
									checked={filters.creator === 'api'}
									onChange={() => handleCreatorChange('api')}
								/>
							</div>
						</Dropdown>

						<button
							type='button'
							className={styles.resetBtn}
							onClick={onReset}>
							Limpiar Selección
						</button>
					</form>
				</motion.aside>
			</AnimatePresence>
		</>
	);
};

export default GameFilters;
