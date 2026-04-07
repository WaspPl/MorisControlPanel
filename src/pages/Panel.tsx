import { useEffect } from 'react';
import '../styles/components.css';
import '../styles/style.css';
import Sidebar from '../components/layout/Sidebar';
import ContentHolder from '../components/layout/ContentHolder';
import { useTable } from '../context/TableContext';
import Nav from '../components/layout/Nav';

function Panel() {
	const { setDefaultParams, setCurrentUser, getItems, isLoading } = useTable();
	useEffect(() => {
		const getCurrentUser = async () => {
			setCurrentUser(await getItems('Me'));
		};
		getCurrentUser();
		setDefaultParams();
	}, []);

	if (isLoading) return <p>loading...</p>;
	return (
		<div className='app'>
			<Nav />
			<ContentHolder />
			<Sidebar />
		</div>
	);
}

export default Panel;
