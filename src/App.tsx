import { useEffect } from 'react';
import './App.css';
import './components/components.css';

import ContentHolder from './components/ContentHolder';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import { useTable } from './context/TableContext';
import { Navigate } from 'react-router';

function App() {
	const { setDefaultParams, currentUser } = useTable();

	if (!currentUser) {
		return <Navigate to={'/login'} />;
	}
	useEffect(() => {
		if (currentUser) {
			console.log(currentUser);
			setDefaultParams();
		}
	}, []);
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
