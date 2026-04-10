import { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import Dropdown from '../../components/ui/Dropdown';
import { useTable } from '../../context/TableContext';

type Props = {
	data: {
		id: number;
		username: string;
		password: string | null;
		access_token_duration_minutes: number;
		role_id: number;
		llm_prefix: string | null;
		time_created: string;
		time_updated: string;
	};
	onFieldChange: () => void;
	isEditing: boolean;
	onSave: (event: React.SubmitEvent) => void;
};

function MeDetails({ data, onFieldChange, isEditing, onSave }: Props) {
	const [roles, setRoles] = useState<any[]>([]);

	const { getItems, currentUser } = useTable();

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
					value={data.username}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Username'
					placeholder='eg. WaspPl'
					title='Your username and login'
					required
				/>
				<Input
					name='password'
					type='password'
					value={data.password}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Password'
					placeholder='eg. ********'
					title='The password you use to login. If left empty it will not change'
				/>
			</div>
			<div className='details-column'>
				<Input
					name='access_token_duration_minutes'
					type='number'
					value={data.access_token_duration_minutes}
					onChange={onFieldChange}
					isEditing={isEditing && currentUser?.role_id == 1}
					label='Token Duration'
					placeholder='eg. 30'
					title='How long your access token will be valid'
					required
				/>
				<Dropdown
					name='role_id'
					value={data.role_id}
					onChange={onFieldChange}
					isEditing={isEditing && currentUser?.role_id == 1}
					choices={roles}
					label='Role'
					title='Your role. Roles determine which commands you can use.'
					required
				/>
				<Input
					name='llm_prefix'
					type='text'
					value={data.llm_prefix}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='LLM Prefix'
					placeholder='eg. Behave like a duck'
					title='Text that will be sent before all your messages as a special "system" message'
				/>
			</div>
			<div className='details-column'>
				<Input
					name='time_updated'
					type='datetime-local'
					value={data?.time_updated.replace('T', ' ')}
					isEditing={false}
					label='Updated at'
					title='The date your user was last updated'
				/>
				<Input
					name='time_created'
					type='datetime-local'
					value={data?.time_created.replace('T', ' ')}
					isEditing={false}
					label='Created at'
					title='The date your user was first created'
				/>
			</div>
			<input type='submit' id='submit-hidden' />
		</form>
	);
}

export default MeDetails;
