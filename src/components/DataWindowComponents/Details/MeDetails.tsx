import { useEffect, useState } from 'react';
import Input from '../../fields/Input';
import Dropdown from '../../fields/Dropdown';
import { useTable } from '../../../context/TableContext';

type Props = {
	data: {
		id: number;
		username: string;
		password: string | null;
		token_duration_minutes: number;
		role_id: number;
		llm_prefix: string | null;
		time_created: string;
		time_updated: string;
	};
	onFieldChange: () => void;
	isEditing: boolean;
	onSave: () => void;
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
		<form onSubmit={onSave}>
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
			/>
			<Input
				name='password'
				type='password'
				value={data.password}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Password'
			/>
			<Input
				name='token_duration_minutes'
				type='number'
				value={data.token_duration_minutes}
				onChange={onFieldChange}
				isEditing={isEditing && currentUser?.role_id == 1}
				label='Token Duration'
			/>
			<Dropdown
				name='role_id'
				value={data.role_id}
				onChange={onFieldChange}
				isEditing={isEditing && currentUser?.role_id == 1}
				choices={roles}
				label='Role'
			/>
			<Input
				name='llm_prefix'
				type='text'
				value={data.llm_prefix}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='LLM Prefix'
			/>
			<Input
				name='time_updated'
				type='datetime-local'
				value={data?.time_updated.replace('T', ' ')}
				isEditing={false}
				label='Updated at'
			/>
			<Input
				name='time_created'
				type='datetime-local'
				value={data?.time_created.replace('T', ' ')}
				isEditing={false}
				label='Created at'
			/>
		</form>
	);
}

export default MeDetails;
