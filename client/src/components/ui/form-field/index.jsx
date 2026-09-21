import styles from './styles.module.scss';

const FormField = ({ name, slug, type, error, children }) => {
	return (
		<div
			className={`${styles.campo_form} ${slug === 'image' ? styles.image : ''} ${slug === 'description' ? styles.description : ''}`}>
			{children || (
				<div className={styles.content}>
					<label
						htmlFor={slug}
						className={styles.require}>
						{name}
					</label>
					<input
						id={slug}
						step='0.01'
						type={type}
						name={slug}
						maxLength={slug === 'name' ? 25 : 100}
					/>
				</div>
			)}
			{error && <span className={styles.error}>{error}</span>}
		</div>
	);
};

export default FormField;
