import { Link } from 'react-router-dom';

import styles from './styles.module.scss';
import { LogoWhite } from '../../../assets';

const Footer = () => (
	<footer id={styles.footer}>
		<section id={styles.container}>
			<div id={styles.content}>
				<article className={styles.box}>
					<Link to='/'>
						<img
							alt='Level Up'
							src={LogoWhite}
							id={styles.logo}
						/>
					</Link>
					<p id={styles.desc}>Creamos posibilidades para el mundo conectado.</p>
				</article>
				<article className={styles.box}>
					<p className={styles.title}>Explorar</p>
					<Link
						to='/'
						className={styles.link}>
						Inicio
					</Link>
					<Link
						to='/games'
						className={styles.link}>
						Juegos
					</Link>
					<Link
						to='/post-game'
						className={styles.link}>
						Publicar
					</Link>
					<Link
						to='/about'
						className={styles.link}>
						Nosotros
					</Link>
				</article>
				<article className={styles.box}>
					<p className={styles.title}>Sigueme</p>
					<a
						target='_blank'
						className={styles.link}
						rel='noopener noreferrer'
						href='https://github.com/mavadev'>
						GitHub
					</a>
					<a
						target='_blank'
						className={styles.link}
						rel='noopener noreferrer'
						href='https://www.linkedin.com/in/gianmarco-valentin/'>
						Linkedin
					</a>
				</article>
			</div>
			<p id={styles.copyr}>
				&#0169; 2026 Desarrollador por <span>Mavadev</span>
			</p>
		</section>
	</footer>
);

export default Footer;
