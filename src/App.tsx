import './App.css';
import './components/components.css';

import ContentHolder from './components/ContentHolder';
import Sidebar from './components/Sidebar';
import TitleBar from './components/TitleBar';

function App() {
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
