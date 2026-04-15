import { Navigate, Route, Routes } from 'react-router';
import Panel from './pages/Panel';
import NotificationHolder from './components/layout/NotificationHolder';
import { useTable } from './context/TableContext';
import Loading from './components/layout/Loading';
import Login from './pages/Login';

type Props = {};

function App({}: Props) {
	const { isProcessing } = useTable();
	return (
		<>
			{isProcessing && <Loading />}
			<Routes>
				<Route path='/panel' element={<Panel />} />
				<Route path='/login' element={<Login />} />
				<Route index element={<Navigate to='/panel' replace />} />
			</Routes>
			<NotificationHolder />
		</>
	);
}

export default App;
