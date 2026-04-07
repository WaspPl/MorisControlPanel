import { useState } from 'react';
import Input from '../components/ui/Input';
import { useTable } from '../context/TableContext';

type Props = {};

function Login({}: Props) {
	const [draft, setDraft] = useState<any>({ username: '', password: '' });

	const { login } = useTable();

	const handleFieldChange = (newValue: any, ApiField: string) => {
		setDraft((prev: any) => {
			const updated = { ...prev };
			updated[ApiField] = newValue;
			return updated;
		});
	};
	const handleLogin = async (event: React.SubmitEvent) => {
		event.preventDefault();
		await login(draft.username, draft.password);
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<Input
					name='username'
					type='text'
					value={draft.username}
					isEditing={true}
					placeholder='Login'
					label='Login'
					onChange={handleFieldChange}
				/>
				<Input
					name='password'
					type='password'
					value={draft.password}
					isEditing={true}
					placeholder='Password'
					label='Password'
					onChange={handleFieldChange}
				/>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default Login;
