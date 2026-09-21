import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getGenres, getPlatforms, getTags } from './actions';

const ReduxInitializer = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getGenres());
		dispatch(getPlatforms());
		dispatch(getTags());
	}, [dispatch]);

	return null;
};

export default ReduxInitializer;
