import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TableProvider } from './context/TableContext.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';

function Panel() {
	return <App />;
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<TableProvider>
				<Routes>
					<Route path='/panel' element={<Panel />} />
				</Routes>
			</TableProvider>
		</BrowserRouter>
	</StrictMode>,
);
