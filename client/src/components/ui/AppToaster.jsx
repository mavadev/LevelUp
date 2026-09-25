import { Toaster } from 'react-hot-toast';

const toasterOptions = {
	duration: 4000,
	style: {
		background: '#141414',
		color: '#ffffff',
		border: '1px solid rgba(255, 255, 255, 0.1)',
		borderRadius: '8px',
		padding: '12px 16px',
		fontSize: '14px',
		boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
	},
	success: {
		iconTheme: { primary: '#00ff88', secondary: '#141414' },
		style: { border: '1px solid rgba(0, 255, 136, 0.3)' },
	},
	error: {
		iconTheme: { primary: '#ff4655', secondary: '#141414' },
		style: { border: '1px solid rgba(255, 70, 85, 0.3)' },
	},
};

export const AppToaster = () => (
	<Toaster
		position='top-right'
		toastOptions={toasterOptions}
	/>
);
