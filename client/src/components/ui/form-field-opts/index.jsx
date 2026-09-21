import styles from './styles.module.scss';
import { FaTimesCircle, FaPlus } from 'react-icons/fa';

const FormFieldOpts = ({ name, type, error, game, setGame, setSelect }) => {
	return (
		<div className={styles.campo_form}>
			<div className={styles.content}>
				<label className={styles.require}>{name}</label>
				<div className={styles.selected}>
					{game[type].length ? (
						<>
							{game[type].map((item, i) => (
								<div
									className={styles.select}
									key={i}>
									<span>
										{item}
										<FaTimesCircle onClick={() => setGame({ ...game, [type]: game[type].filter(i => i !== item) })} />
									</span>
								</div>
							))}
							<span
								title='Add other'
								id={styles.plusItem}
								onClick={() => setSelect(type)}>
								Add other <FaPlus />
							</span>
						</>
					) : (
						<p
							className={styles.optSelect}
							onClick={() => setSelect(type)}>
							Selecciona Aquí
						</p>
					)}
				</div>
			</div>
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
};

export default FormFieldOpts;
