import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

import styles from './styles.module.scss';

const Dropdown = ({ drop, setDrop, select, title, children }) => {
	return (
		<section className={styles.dropdown}>
			<header
				className={styles.header}
				onClick={() => setDrop({ ...drop, [select]: !drop[select] })}>
				<p className={styles.text}>{title}</p>
				<FaChevronDown
					className={styles.icon}
					style={{ transform: drop[select] ? 'rotate(-180deg)' : 'rotate(0deg)' }}
				/>
			</header>
			<motion.div
				className={styles.drop}
				animate={
					!drop[select]
						? { y: '-100%', opacity: 0, height: '0px', overflow: 'hidden' }
						: { y: '0', opacity: 1, height: 'max-content', marginBottom: '15px' }
				}>
				{children}
			</motion.div>
		</section>
	);
};

export default Dropdown;
