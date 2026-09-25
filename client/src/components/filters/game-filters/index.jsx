import { useEffect } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './styles.module.scss';
import { Dropdown, InputGroupSkeleton } from '../../../components';
import { getGenres, getPlatforms, getTags, setOpenDropdowns } from '../../../redux/actions';

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

const GameFilters = ({ filters, handleChange, onReset, onClose, isOpen }) => {
	const dispatch = useDispatch();
	const { genres, platforms, tags, dropdownState } = useSelector(state => state);

	useEffect(() => {
		if (!genres.length) dispatch(getGenres());
		if (!platforms.length) dispatch(getPlatforms());
		if (!tags.length) dispatch(getTags());
	}, [dispatch, genres, platforms, tags]);

	const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;
	const shouldRender = isDesktop || isOpen;

	const changeDropdownState = dropdown => {
		dispatch(setOpenDropdowns(dropdown));
	};

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

	const handleTagChange = idTag => {
		const isSelected = filters.tags.includes(idTag);
		const updatedTags = isSelected ? filters.tags.filter(p => p !== idTag) : [...filters.tags, idTag];
		handleChange({ ...filters, tags: updatedTags });
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
		<AnimatePresence>
			{shouldRender && (
				<motion.aside
					className={styles.filtersWrapper}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					transition={{ duration: 0.2 }}>
					<div className={styles.filterHeader}>
						<h4>Filtros</h4>
						<button
							type='button'
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
							select='genres'
							title='Géneros'
							drop={dropdownState}
							setDrop={changeDropdownState}>
							<div className={styles.optionsList}>
								{!genres.length ? (
									<InputGroupSkeleton count={5} />
								) : (
									genres.map(genre => (
										<InputGroup
											name={genre.name}
											id={`genre-${genre.slug}`}
											key={genre.id || genre.slug}
											onChange={() => handleGenreChange(`${genre.id}`)}
											checked={filters.genres.includes(`${genre.id}`)}
										/>
									))
								)}
							</div>
						</Dropdown>

						{/* Etiquetas */}
						<Dropdown
							title='Tags'
							select='tags'
							drop={dropdownState}
							setDrop={changeDropdownState}>
							<div className={styles.optionsList}>
								{!tags.length ? (
									<InputGroupSkeleton count={5} />
								) : (
									tags.map(tag => (
										<InputGroup
											name={tag.name}
											id={`tag-${tag.slug}`}
											key={tag.id || tag.slug}
											onChange={() => handleTagChange(`${tag.id}`)}
											checked={filters.tags.includes(`${tag.id}`)}
										/>
									))
								)}
							</div>
						</Dropdown>

						{/* Plataformas */}
						<Dropdown
							select='platforms'
							title='Plataformas'
							drop={dropdownState}
							setDrop={changeDropdownState}>
							<div className={styles.optionsList}>
								{!platforms.length ? (
									<InputGroupSkeleton count={5} />
								) : (
									platforms.map(platform => (
										<InputGroup
											name={platform.name}
											id={`platform-${platform.slug}`}
											key={platform.id || platform.slug}
											onChange={() => handlePlatformChange(`${platform.id}`)}
											checked={filters.platforms.includes(`${platform.id}`)}
										/>
									))
								)}
							</div>
						</Dropdown>

						{/* Ordenamiento */}
						<Dropdown
							title='Orden'
							select='order'
							drop={dropdownState}
							setDrop={changeDropdownState}>
							<div className={styles.optionsList}>
								<InputGroup
									type='radio'
									id='sort-asc-title'
									name='Nombre (A - Z)'
									checked={filters.sort === 'name'}
									onChange={() => handleSortChange('name')}
								/>
								<InputGroup
									type='radio'
									id='sort-desc-title'
									name='Nombre (Z - A)'
									checked={filters.sort === '-name'}
									onChange={() => handleSortChange('-name')}
								/>
								<InputGroup
									type='radio'
									id='sort-asc-rating'
									name='Rating (Menor a Mayor)'
									checked={filters.sort === 'rating'}
									onChange={() => handleSortChange('rating')}
								/>
								<InputGroup
									type='radio'
									id='sort-desc-rating'
									name='Rating (Mayor a Menor)'
									checked={filters.sort === '-rating'}
									onChange={() => handleSortChange('-rating')}
								/>
							</div>
						</Dropdown>

						{/* Creador */}
						<Dropdown
							title='Fuente'
							select='creator'
							drop={dropdownState}
							setDrop={changeDropdownState}>
							<div className={styles.optionsList}>
								<InputGroup
									type='radio'
									id='creator-api'
									name='Oficiales'
									checked={filters.creator === 'api'}
									onChange={() => handleCreatorChange('api')}
								/>
								<InputGroup
									type='radio'
									id='creator-db'
									name='Comunidad'
									checked={filters.creator === 'community'}
									onChange={() => handleCreatorChange('community')}
								/>
							</div>
						</Dropdown>

						<button
							type='button'
							className={styles.btnReset}
							onClick={onReset}>
							Limpiar Selección
						</button>
					</form>
				</motion.aside>
			)}
		</AnimatePresence>
	);
};

export default GameFilters;
