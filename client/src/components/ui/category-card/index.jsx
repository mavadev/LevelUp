import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './styles.module.scss';
import { setOpenDropdowns } from '../../../redux/actions';

const CategoryCard = ({ type, category }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = e => {
		e.preventDefault();
		if (type) {
			dispatch(setOpenDropdowns({ [type]: true }));
		}
		navigate(`/games?${type}=${category.id}`);
	};

	return (
		<div
			key={category.slug}
			onClick={handleClick}
			className={styles.item}>
			<img
				alt={category.name}
				className={styles.itemImage}
				src={category.background_image}
			/>
			<div className={styles.itemInformation}>
				<h3 className={styles.itemName}>{category.name}</h3>
			</div>
		</div>
	);
};

export default CategoryCard;
