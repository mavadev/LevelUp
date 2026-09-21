import store from './redux/store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import MainLayout from './layouts/MainLayout';
import { Landing, Games, GameDetail, PostGame, About, NotFound } from './containers';

const App = () => (
	<HelmetProvider>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route
						path='/'
						element={<MainLayout />}>
						<Route
							index
							element={<Landing />}
						/>
						<Route
							path='juegos'
							element={<Games />}
						/>
						<Route
							path='juego/:slug'
							element={<GameDetail />}
						/>
						<Route
							path='publicar'
							element={<PostGame />}
						/>
						<Route
							path='acerca-de'
							element={<About />}
						/>
						<Route
							path='*'
							element={<NotFound />}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</HelmetProvider>
);

export default App;
