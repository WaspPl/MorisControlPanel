import { useEffect } from 'react';
import './App.css';
import './components/components.css';

import ContentHolder from './components/ContentHolder';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import { useTable } from './context/TableContext';

function App() {
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
		<div className='App'>
			<TitleBar />
			<div className='BottomPart'>
				<Sidebar />
				<ContentHolder />
			</div>
		</div>
	);
}

export default App;
