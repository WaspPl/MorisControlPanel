import { createRoot } from 'react-dom/client';
import { TableProvider } from './context/TableContext.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Login from './pages/Login.tsx';
import NotificationHolder from './components/layout/NotificationHolder.tsx';
import Panel from './pages/Panel.tsx';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<TableProvider>
			<Routes>
				<Route path='/panel' element={<Panel />} />
				<Route path='/login' element={<Login />} />
				<Route index element={<Navigate to='/panel' replace />} />
			</Routes>
			<NotificationHolder />
		</TableProvider>
	</BrowserRouter>,
);
