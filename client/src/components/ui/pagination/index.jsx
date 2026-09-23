import { useMemo } from 'react';
import styles from './styles.module.scss';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
	if (totalPages <= 1) return null;

	const pages = useMemo(() => {
		const actual = Array.from({ length: totalPages }, (_, i) => i + 1).slice(
			currentPage === 1 ? 0 : currentPage - 2,
			currentPage === 1 ? currentPage + 2 : currentPage + 1,
		);

		const rawPages = [...new Set([1, ...actual, totalPages > 500 ? 500 : totalPages])];

		const result = rawPages.reduce((acc, page, index, array) => {
			if (index > 0 && page - array[index - 1] > 1) {
				acc.push(null);
			}
			acc.push(page);
			return acc;
		}, []);

		return result;
	}, [totalPages, currentPage]);

	const handlePrev = () => {
		if (currentPage > 1) {
			handlePageChange(currentPage - 1);
		}
	};
	const handleNext = () => {
		if (currentPage < totalPages) {
			handlePageChange(currentPage + 1);
		}
	};

	return (
		<section className={styles.paginationSection}>
			<div className={styles.paginationContainer}>
				<button
					onClick={handlePrev}
					disabled={currentPage === 1}
					className={`${styles.navBtn} ${currentPage === 1 ? styles.disabled : styles.active}`}>
					&#10094;
				</button>
				{pages.map(page =>
					page !== null ? (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={currentPage === page ? styles.active : styles.desactive}>
							{page}
						</button>
					) : (
						<button
							key={page}
							disabled={true}
							className={`${styles.navBtn} ${styles.disabled}`}>
							...
						</button>
					),
				)}
				<button
					onClick={handleNext}
					disabled={currentPage === totalPages}
					className={`${styles.navBtn} ${currentPage === totalPages ? styles.disabled : styles.active}`}>
					&#10095;
				</button>
			</div>
		</section>
	);
};

export default Pagination;
