import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaGamepad, FaUserAlt } from 'react-icons/fa';

import styles from './styles.module.scss';
import { LogoColor } from '../../../assets';

const Navbar = () => {
	const location = useLocation().pathname;

	const navLinks = [
		{
			name: 'Inicio',
			ruta: '/',
			icon: <FaHome />,
		},
		{
			name: 'Juegos',
			ruta: '/games',
			icon: <FaGamepad />,
		},
		{
			name: 'Nosotros',
			ruta: '/about',
			icon: <FaUserAlt />,
		},
	];

	return (
		<>
			{/* Navbar */}
			<div id={styles.container}>
				<nav id={styles.navbar}>
					<Link to='/'>
						<img
							alt='Level Up'
							src={LogoColor}
							id={styles.logo}
						/>
					</Link>
					<ul id={styles.navigation}>
						{navLinks.map((option, index) => (
							<Link
								key={index}
								to={option.ruta}
								className={`${styles.option} ${location === option.ruta ? styles.active : styles.desactive}`}>
								{option.name}
							</Link>
						))}
						<a
							id={styles.btnCrear}
							href='/post-game'>
							Publicar Juego
						</a>
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Navbar;
