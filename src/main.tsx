import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TableProvider } from './context/TableContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<TableProvider>
			<App />
		</TableProvider>
	</StrictMode>,
);
