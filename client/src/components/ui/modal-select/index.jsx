import { motion } from 'framer-motion';
import styles from './styles.module.scss';

const ModalSelect = ({ listOpts, game, select, setSelect }) => {
	const containerModal = {
		visible: { display: 'grid' },
		hidden: { display: 'none' },
	};

	return (
		<motion.div
			initial='hidden'
			variants={containerModal}
			className={styles.modalSelectOpts}
			animate={select ? 'visible' : 'hidden'}>
			<div
				className={styles.container}
				onMouseOver={() => {
					document.onclick = null;
				}}
				onMouseOut={() => {
					document.onclick = () => {
						setSelect(null);
						document.onclick = null;
					};
				}}>
				<h2>Selecciona:</h2>
				<div className={styles.options}>
					{listOpts.map(
						(option, i) =>
							select && (
								<div
									className={styles.option}
									key={i}>
									<label
										key={i}
										htmlFor={`${select}${i}`}
										className={`${styles.optionLabel} ${game[select].includes(option) && styles.checked}`}>
										{option}
									</label>
									<input
										type='checkbox'
										id={`${select}${i}`}
										name={select}
										value={option}
										disabled={game[select].length > 4 && !game[select].includes(option)}
									/>
								</div>
							),
					)}
				</div>
				{select && <span className={styles.numSelect}>Total: {game[select].length} / 5</span>}
			</div>
		</motion.div>
	);
};

export default ModalSelect;
