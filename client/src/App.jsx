import store from './redux/store';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';
import MainLayout from './layouts/MainLayout';
import { Landing, Games, GameDetail, PostGame, About, NotFound, Category } from './containers';

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
							path='games'
							element={<Games />}
						/>
						<Route
							path='games/:slug'
							element={<GameDetail />}
						/>
						<Route
							path='post-game'
							element={<PostGame />}
						/>
						<Route
							path='about'
							element={<About />}
						/>
						<Route
							path='category/:category'
							element={<Category />}
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
