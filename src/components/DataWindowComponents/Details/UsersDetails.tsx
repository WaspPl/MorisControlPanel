import { useEffect, useState } from 'react';
import Input from '../../fields/Input';
import Dropdown from '../../fields/Dropdown';
import { useTable } from '../../../context/TableContext';

type Props = {
	data: {
		id: number;
		username: string;
		role_id: number;
		llm_prefix: string | null;
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
			<Dropdown
				name='role_id'
				value={data.role_id}
				onChange={onFieldChange}
				isEditing={isEditing}
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
		</form>
	);
}

export default UsersDetails;
