import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TableProvider } from './context/TableContext.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import Login from './Login.tsx';
import NotificationHolder from './components/NotificationHolder.tsx';

function Panel() {
	return <App />;
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<TableProvider>
				<Routes>
					<Route path='/panel' element={<Panel />} />
					<Route path='/login' element={<Login />} />
					<Route index element={<Navigate to='/panel' replace />} />
				</Routes>
				<NotificationHolder />
			</TableProvider>
		</BrowserRouter>
	</StrictMode>,
);
