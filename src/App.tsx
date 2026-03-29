import { useEffect } from 'react';
import './App.css';
import './components/components.css';

import ContentHolder from './components/ContentHolder';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';
import { useTable } from './context/TableContext';

function App() {
	const { setDefaultParams } = useTable();

	useEffect(() => {
		setDefaultParams();
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
