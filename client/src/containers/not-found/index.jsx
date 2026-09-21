import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import styles from './styles.module.scss';

const NotFound = ({ isGame = true }) => (
	<>
		<HelmetProvider>
			<Helmet>
				<title>Level Up | Page Not Found</title>
			</Helmet>
		</HelmetProvider>
		<div id={styles.notFound}>
			<h1 id={styles.title}>{isGame ? 'Juego no encontrado' : 404}</h1>
			<p id={styles.desc}>
				{isGame
					? 'Es posible que el identificador del juego esté mal escrito o que el juego ya no exista'
					: 'No esperabamos esta visita, estas opciones podrían ayudarte'}
			</p>
			<div id={styles.links}>
				<a
					className={styles.link}
					onClick={() => history.back()}>
					Regresar
				</a>
				<Link
					to='/create'
					className={styles.link}>
					Crear Juego
				</Link>
			</div>
		</div>
	</>
);

export default NotFound;
