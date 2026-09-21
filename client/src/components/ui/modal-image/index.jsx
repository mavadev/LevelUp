import { motion } from 'framer-motion';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

import styles from './styles.module.scss';

const ModalImage = ({ srcImage, imgSelect, setImage, moveCarrusel, iconsMove }) => (
	<motion.section
		id={styles.modalImage}
		initial={{ x: '-100%' }}
		animate={{ x: '0' }}>
		<div
			id={styles.boxImage}
			onMouseOver={() => {
				document.onclick = null;
			}}
			onMouseOut={() => {
				document.onclick = () => {
					setImage ? setImage({ ...imgSelect, view: !imgSelect.view }) : moveCarrusel(false); // Para cerrar el modal en la pagina de Create
					document.onclick = null;
				};
			}}>
			{iconsMove && (
				<div
					onClick={() => moveCarrusel(false)}
					className={`${styles.boxIcon} ${styles.left}`}>
					<FaAngleLeft size='30px' />
				</div>
			)}
			<img
				src={srcImage}
				id={styles.image}
			/>
			{iconsMove && (
				<div
					onClick={() => moveCarrusel(true)}
					className={`${styles.boxIcon} ${styles.right}`}>
					<FaAngleRight size='30px' />
				</div>
			)}
		</div>
	</motion.section>
);

export default ModalImage;
