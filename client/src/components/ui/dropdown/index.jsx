import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

import styles from './styles.module.scss';

const Dropdown = ({ drop, setDrop, select, title, children }) => {
	const isOpen = Boolean(drop[select]);

	return (
		<section className={styles.dropdown}>
			<header
				className={styles.header}
				onClick={() => setDrop({ ...drop, [select]: !isOpen })}>
				<p className={styles.text}>{title}</p>
				<motion.div
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2, ease: 'easeInOut' }}>
					<FaChevronDown className={styles.icon} />
				</motion.div>
			</header>

			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className={styles.dropContainer}
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: 'easeInOut' }}>
						<div className={styles.dropContent}>{children}</div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default Dropdown;
