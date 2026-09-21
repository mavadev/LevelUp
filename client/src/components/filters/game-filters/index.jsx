import { useEffect, useState } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.scss';
import { Dropdown } from '../../../components';
import { getGenres, getPlatforms } from '../../../redux/actions';

const InputGroup = ({ id, name, value, checked, disabled = false, onChange, type = 'checkbox' }) => (
	<div className={`${styles.inputGroup} ${disabled ? styles.disabled : ''}`}>
		<div className={styles.checkboxWrapper}>
			<input
				id={id}
				type={type}
				value={value}
				checked={checked}
				disabled={disabled}
				onChange={onChange}
			/>
			<span className={styles.customCheck}>
				{type === 'checkbox' && checked && <FaCheck className={styles.checkIcon} />}
				{type === 'radio' && checked && <span className={styles.radioDot} />}
			</span>
		</div>
		<label htmlFor={id}>{name || value}</label>
	</div>
);

const GameFilters = ({ filters, onFilterChange, onReset, onClose }) => {
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

	const handleGenreChange = genreName => {
		const isSelected = filters.genresFilter.includes(genreName);
		const updatedGenres = isSelected
			? filters.genresFilter.filter(g => g !== genreName)
			: [...filters.genresFilter, genreName];

		onFilterChange({ ...filters, genresFilter: updatedGenres });
	};

	const handlePlatformChange = platformName => {
		const isSelected = filters.platformFilter.includes(platformName);
		const updatedPlatforms = isSelected
			? filters.platformFilter.filter(p => p !== platformName)
			: [...filters.platformFilter, platformName];

		onFilterChange({ ...filters, platformFilter: updatedPlatforms });
	};

	const handleSortChange = value => {
		const nextValue = filters.sortOption === value ? 'none' : value;
		onFilterChange({ ...filters, sortOption: nextValue });
	};

	const handleCreatorChange = value => {
		const nextValue = filters.creatorOption === value ? 'all' : value;
		onFilterChange({ ...filters, creatorOption: nextValue });
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
										key={genre.id || genre.slug}
										id={`genre-${genre.slug}`}
										value={genre.name}
										checked={filters.genresFilter.includes(genre.name)}
										onChange={() => handleGenreChange(genre.name)}
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
										key={platform.id || platform.slug}
										id={`platform-${platform.slug}`}
										value={platform.name}
										checked={filters.platformFilter.includes(platform.name)}
										onChange={() => handlePlatformChange(platform.name)}
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
									id='sort-asc-title'
									name='Alfabéticamente (A-Z)'
									value='asc_title'
									type='radio'
									checked={filters.sortOption === 'asc_title'}
									onChange={() => handleSortChange('asc_title')}
								/>
								<InputGroup
									id='sort-desc-title'
									name='Alfabéticamente (Z-A)'
									value='desc_title'
									type='radio'
									checked={filters.sortOption === 'desc_title'}
									onChange={() => handleSortChange('desc_title')}
								/>
								<InputGroup
									id='sort-asc-rating'
									name='Rating (Menor-Mayor)'
									value='asc_rating'
									type='radio'
									checked={filters.sortOption === 'asc_rating'}
									onChange={() => handleSortChange('asc_rating')}
								/>
								<InputGroup
									id='sort-desc-rating'
									name='Rating (Mayor-Menor)'
									value='desc_rating'
									type='radio'
									checked={filters.sortOption === 'desc_rating'}
									onChange={() => handleSortChange('desc_rating')}
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
									id='creator-db'
									name='Creados por la comunidad'
									value='gamesDB'
									type='radio'
									checked={filters.creatorOption === 'gamesDB'}
									onChange={() => handleCreatorChange('gamesDB')}
								/>
								<InputGroup
									id='creator-api'
									name='Juegos oficiales (API)'
									value='gamesAPI'
									type='radio'
									checked={filters.creatorOption === 'gamesAPI'}
									onChange={() => handleCreatorChange('gamesAPI')}
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
