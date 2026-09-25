import { FaSearch, FaTimes } from 'react-icons/fa';

import styles from './styles.module.scss';

const Search = ({ hasValue, search, clearSearch, handleSearchChange }) => {
	return (
		<div className={styles.search}>
			<FaSearch className={styles.searchIcon} />
			<input
				type='text'
				value={search}
				className={styles.searchInput}
				placeholder='Buscar juegos...'
				onChange={handleSearchChange}
			/>
			{hasValue && (
				<FaTimes
					onClick={clearSearch}
					className={styles.clearIcon}
				/>
			)}
		</div>
	);
};

export default Search;
