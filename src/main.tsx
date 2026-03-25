import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { TableProvider } from './context/TableContext.tsx';
import { AuthProvider, useAuth } from './features/auth/AuthContext';
import LoginForm from './features/auth/LoginForm';

function Root() {
	const { isAuthenticated, isLoadingMe } = useAuth();

	if (!isAuthenticated) {
		if (isLoadingMe) {
			return <div style={{ padding: 24 }}>Loading...</div>;
		}
		return <LoginForm />;
	}

	return <App />;
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<TableProvider>
				<Root />
			</TableProvider>
		</AuthProvider>
	</StrictMode>,
);
