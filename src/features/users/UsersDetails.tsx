import { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import Dropdown from '../../components/ui/Dropdown';
import { useTable } from '../../context/TableContext';

type Props = {
	data: {
		id: number;
		username: string;
		password: string | null;
		role_id: number;
		llm_prefix: string | null;
		access_token_duration_minutes: number;
		time_created: string;
		time_updated: string;
	};
	onFieldChange: () => void;
	isEditing: boolean;
	onSave: () => void;
};

function UsersDetails({ data, onFieldChange, isEditing, onSave }: Props) {
	const [roles, setRoles] = useState<any[]>([]);

	const { getItems } = useTable();

	useEffect(() => {
		const fetchRoles = async () => {
			const result = await getItems('Roles');
			setRoles(result);
		};

		fetchRoles();
	}, []);

	if (!data) return null;
	return (
		<form id='details' onSubmit={onSave} className='details-form'>
			<div className='details-column'>
				<Input
					name='id'
					type='number'
					value={data.id}
					isEditing={false}
					label='Id'
				/>
				<Input
					name='username'
					type='text'
					value={data?.username}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Username'
					placeholder='eg. Moris'
					title='Username and Login for this user'
					required
				/>
				<Input
					name='password'
					type='password'
					value={data?.password}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Password'
					placeholder='eg. ********'
					title='A password this user can use to log in'
				/>
			</div>
			<div className='details-column'>
				<Dropdown
					name='role_id'
					value={data?.role_id}
					onChange={onFieldChange}
					isEditing={isEditing}
					choices={roles}
					label='Role'
					title="A role for the user. It defines what the user can and can't do"
					required
				/>
				<Input
					name='access_token_duration_minutes'
					type='number'
					value={data?.access_token_duration_minutes}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Token Duration Minutes'
					placeholder='eg. 30'
					title="How long this user's access token will be valid in minutes"
					required
				/>
				<Input
					name='llm_prefix'
					type='text'
					value={data?.llm_prefix}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='LLM Prefix'
					placeholder='eg. Behive like a duck'
					title="Text that will be sent before all this user's messages as a special 'system' message"
				/>
			</div>
			<div className='details-column'>
				<Input
					name='time_updated'
					type='datetime-local'
					value={data?.time_updated.replace('T', ' ')}
					isEditing={false}
					label='Updated at'
					title='The date this user was last updated'
				/>
				<Input
					name='time_created'
					type='datetime-local'
					value={data?.time_created.replace('T', ' ')}
					isEditing={false}
					label='Created at'
					title='The date this user was first created'
				/>
			</div>
			<input type='submit' id='submit-hidden' />
		</form>
	);
}

export default UsersDetails;
