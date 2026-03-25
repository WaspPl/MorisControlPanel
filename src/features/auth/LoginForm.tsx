import { useState } from 'react';
import { useAuth } from './AuthContext';
import Button from '../../shared/ui/Button';

function LoginForm() {
	const { signIn, isLoadingMe } = useAuth();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isSigningIn, setIsSigningIn] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setIsSigningIn(true);
		try {
			await signIn(username.trim(), password);
			// App will automatically switch to the main UI when auth state changes.
		} catch (err: any) {
			setError(err?.response?.data?.detail ?? err?.message ?? 'Login failed');
		} finally {
			setIsSigningIn(false);
		}
	};

	return (
		<div className='LoginScreen'>
			<div className='LoginCard'>
				<h2>Sign In</h2>
				<form onSubmit={handleSubmit} className='LoginForm'>
					<label htmlFor='username'>Username</label>
					<input
						id='username'
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Enter username'
						autoComplete='username'
					/>

					<label htmlFor='password'>Password</label>
					<input
						id='password'
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Enter password'
						autoComplete='current-password'
					/>

					{error && <div className='LoginError'>{error}</div>}

					<div className='LoginActions'>
						<Button
							type='submit'
							label={isSigningIn || isLoadingMe ? 'Signing in...' : 'Sign In'}
							disabled={isSigningIn || isLoadingMe}
							variant='Success'
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;

