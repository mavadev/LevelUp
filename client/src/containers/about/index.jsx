import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

import styles from './styles.module.scss';

const About = () => {
	const skills = {
		Frontend: [
			{
				name: 'Sass',
				description: 'Preprocesador CSS con características avanzadas de lenguaje de programación.',
			},
			{
				name: 'CSS Modules',
				description: 'Herramienta que genera selectores únicos para evitar colisiones de estilos.',
			},
			{
				name: 'React',
				description: 'Librería para la creación de componentes reutilizables e interfaces dinámicas.',
			},
			{
				name: 'Redux',
				description: 'Librería para la gestión y centralización del estado global de la aplicación.',
			},
		],
		Backend: [
			{
				name: 'Node.js',
				description: 'Entorno de ejecución asíncrono para ejecutar JavaScript en el servidor.',
			},
			{
				name: 'Express',
				description: 'Framework minimalista para la construcción de APIs REST y servicios web.',
			},
			{
				name: 'Sequelize',
				description: 'ORM para Node.js enfocado en la manipulación de bases de datos relacionales SQL.',
			},
			{
				name: 'PostgreSQL',
				description: 'Sistema de gestión de bases de datos relacional orientada a objetos.',
			},
		],
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 15 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<>
			<Helmet>
				<title>Level Up | About</title>
			</Helmet>
			<main id={styles.about}>
				<motion.section
					id={styles.content}
					initial='hidden'
					animate='visible'
					variants={containerVariants}>
					<motion.h1
						id={styles.title}
						variants={itemVariants}>
						<span>¡Hola!</span> Soy Gianmarco y este es mi <br />
						Proyecto Individual para el Bootcamp de{' '}
						<span
							className={styles.tooltip}
							data-tooltip='Bootcamp de Programación'>
							SoyHenry.
						</span>
					</motion.h1>

					<motion.p
						id={styles.desc}
						variants={itemVariants}>
						Es una{' '}
						<span
							className={styles.tooltip}
							data-tooltip='Single Page Application'>
							SPA
						</span>{' '}
						responsiva, desarrollada para integrar las tecnologías aprendidas durante el bootcamp, haciendo uso de RAWG,
						una{' '}
						<span
							className={styles.tooltip}
							data-tooltip='Application Programming Interface'>
							API
						</span>{' '}
						externa con un catálogo extenso de videojuegos.
					</motion.p>

					<div id={styles.skillsSection}>
						{Object.keys(skills).map((area, index) => (
							<motion.div
								className={styles.group}
								key={index}
								variants={itemVariants}>
								<h2 className={styles.area}>{area}</h2>
								<div className={styles.cardsGrid}>
									{skills[area].map((s, i) => (
										<div
											key={i}
											className={styles.tecCard}>
											<span className={styles.tecName}>{s.name}</span>
											<span className={styles.tecDesc}>{s.description}</span>
										</div>
									))}
								</div>
							</motion.div>
						))}
					</div>
				</motion.section>
			</main>
		</>
	);
};

export default About;
