import { createRoot } from 'react-dom/client';
import { TableProvider } from './context/TableContext.tsx';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<TableProvider>
			<App />
		</TableProvider>
	</BrowserRouter>,
);
