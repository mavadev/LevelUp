import { Outlet } from 'react-router-dom';
import { Footer, Navbar } from '../components';

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
};

export default MainLayout;
