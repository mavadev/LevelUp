import { motion } from 'framer-motion';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import styles from './styles.module.scss';

const About = () => {
	const skills = {
		Frontend: [
			{
				name: 'Sass',
				description: 'Preprocesador CSS que con características propias un lenguaje de programación.',
			},
			{
				name: 'Css Modules',
				description: 'Herramienta que cambia el nombre de clases y identificadores CSS en selectores únicos.',
			},
			{
				name: 'React',
				description:
					'Librería para la creación de componentes interactivos, reutilizables, para interfaces de usuario.',
			},
			{
				name: 'Redux',
				description: 'Librería de JavaScript que te permite manejar el estado global de una aplicación.',
			},
		],
		Backend: [
			{
				name: 'Node Js',
				description: 'Entorno de ejecución que se utiliza para ejecutar JavaScript fuera del navegador.',
			},
			{
				name: 'Express',
				description: 'Framework para crear aplicaciones web, APIs y web services.',
			},
			{
				name: 'Sequalize',
				description: 'ORM para Node js que nos permite manipular varias bases de datos SQL.',
			},
			{
				name: 'PostgreSQL',
				description: 'Sistema de gestión de bases de datos relacional orientado a objetos.',
			},
		],
	};
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<title>Level Up | About</title>
				</Helmet>
			</HelmetProvider>
			<main id={styles.about}>
				<section id={styles.content}>
					<motion.h1
						id={styles.title}
						animate={{ opacity: [0, 1] }}>
						<span>¡Hola!</span> Soy Gianmarco y este es mi <br />
						Proyecto Individual para el Bootcamp de <b about='Bootcamp de Programación.'>SoyHenry.</b>
					</motion.h1>
					<p id={styles.desc}>
						Es una <b about='Single Page Application'>SPA</b> responsiva, desarollado con el fin de poner a prueba cada
						una de las habilidades y tecnologías aprendidas durante el bootcamp, haciendo uso de Rawg, una{' '}
						<b about='Application Programming Interface'>API</b> externa, la cual nos brinda la mayor base de datos de
						videojuegos.
					</p>
					{Object.keys(skills).map((area, index) => (
						<div
							className={styles.group}
							key={index}>
							<h2 className={styles.area}>{area}</h2>
							{skills[area].map((s, i) => (
								<p
									key={i}
									className={styles.tec}>
									{s.name}
									<p className={styles.desc}>{s.description}</p>
								</p>
							))}
						</div>
					))}
				</section>
			</main>
		</>
	);
};

export default About;
