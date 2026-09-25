import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';
import { CategoryCard } from '../../components';
import { getGenres, getPlatforms, getTags } from '../../redux/actions';

const CATEGORY_MAP = {
	genres: { title: 'Géneros', fetchAction: getGenres },
	platforms: { title: 'Plataformas', fetchAction: getPlatforms },
	tags: { title: 'Etiquetas', fetchAction: getTags },
};

// Variantes para el contenedor (maneja el tiempo entre cada tarjeta)
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.08, // Retraso de aparición entre items
			delayChildren: 0.1, // Espera inicial antes de empezar
		},
	},
};

// Variantes para cada elemento individual (aparición 1 por 1)
const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.4,
			ease: 'easeOut',
		},
	},
};

const CategoryView = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { category } = useParams();

	const items = useSelector(state => state[category]);
	const currentCategory = CATEGORY_MAP[category];

	useEffect(() => {
		if (!currentCategory) {
			navigate('/', { replace: true });
			return;
		}
		if (!items || items.length === 0) {
			dispatch(currentCategory.fetchAction());
		}
	}, [category, currentCategory, items, dispatch, navigate]);

	if (!currentCategory) return null;

	return (
		<>
			<Helmet>
				<title>{`Level Up | ${currentCategory.title}`}</title>
			</Helmet>

			<main id={styles.container}>
				<motion.header
					initial={{ opacity: 0, y: -15 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.4 }}>
					<h2 className={styles.subtitle}>Categoría</h2>
					<h1 className={styles.title}>{currentCategory.title}</h1>
				</motion.header>

				{items && items.length > 0 ? (
					<motion.section
						className={styles.listItems}
						variants={containerVariants}
						initial='hidden'
						animate='visible'
						key={category} // Remonta la animación al cambiar de URL/categoría
					>
						{items.map(item => (
							<motion.div
								key={item.id || item.slug || item.name}
								variants={itemVariants}>
								<CategoryCard
									type={category}
									category={item}
								/>
							</motion.div>
						))}
					</motion.section>
				) : (
					<p className={styles.empty}>Cargando contenido...</p>
				)}
			</main>
		</>
	);
};

export default CategoryView;
