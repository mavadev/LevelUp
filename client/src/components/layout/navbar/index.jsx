import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import styles from './styles.module.scss';
import { colorLogo } from '../../../assets';

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const location = useLocation().pathname;

	const navLinks = [
		{
			name: 'Inicio',
			ruta: '/',
		},
		{
			name: 'Juegos',
			ruta: '/games',
		},
		{
			name: 'Nosotros',
			ruta: '/about',
		},
	];

	const toggleMenu = () => setIsOpen(!isOpen);
	const closeMenu = () => setIsOpen(false);

	return (
		<div id={styles.container}>
			<nav id={styles.navbar}>
				<Link
					to='/'
					onClick={closeMenu}>
					<img
						alt='Level Up'
						src={colorLogo}
						id={styles.logo}
					/>
				</Link>

				<button
					type='button'
					className={styles.hamburger}
					onClick={toggleMenu}
					aria-label='Toggle navigation'>
					{isOpen ? <FaTimes /> : <FaBars />}
				</button>

				<ul className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
					{navLinks.map((option, index) => (
						<Link
							key={index}
							to={option.ruta}
							onClick={closeMenu}
							className={`${styles.option} ${location === option.ruta ? styles.active : styles.desactive}`}>
							{option.name}
						</Link>
					))}
					<Link
						id={styles.btnCrear}
						to='/post-game'
						onClick={closeMenu}>
						Publicar Juego
					</Link>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
