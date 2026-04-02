import { useEffect, useState } from 'react';
import Input from '../../fields/Input';
import Dropdown from '../../fields/Dropdown';
import { useTable } from '../../../context/TableContext';

type Props = {
	data: {
		id: number;
		username: string;
		password: string | null;
		role_id: number;
		llm_prefix: string | null;
	};
	onFieldChange: (value: any, ApiField: string) => void;
	isEditing: boolean;
	onSave: () => void;
};

function UsersCreate({ data, onFieldChange, isEditing, onSave }: Props) {
	const [roles, setRoles] = useState<any[]>([]);

	const { getItems } = useTable();

	const defaultValues = {
		username: '',
		password: '',
		role_id: 2,
		llm_prefix: '',
	};

	useEffect(() => {
		const fetchRoles = async () => {
			const result = await getItems('Roles');
			setRoles(result);
		};
		const setDefaults = () => {
			Object.entries(defaultValues).map(([key, value]) => {
				onFieldChange(value, key);
			});
		};

		fetchRoles();
		setDefaults();
	}, []);

	return (
		<form onSubmit={onSave}>
			<Input
				name='username'
				type='text'
				value={data?.username}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Username'
			/>
			<Input
				name='password'
				type='password'
				value={data?.password}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Password'
			/>
			<Dropdown
				name='role_id'
				value={data?.role_id}
				onChange={onFieldChange}
				isEditing={isEditing}
				choices={roles}
				label='Role'
			/>
			<Input
				name='llm_prefix'
				type='text'
				value={data?.llm_prefix}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='LLM Prefix'
			/>
			<button type='submit' style={{ display: 'none' }} />
		</form>
	);
}

export default UsersCreate;
