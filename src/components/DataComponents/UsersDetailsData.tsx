import { useEffect, useState } from 'react';
import Input from '../Input';
import Dropdown from '../Dropdown';
import { useTable } from '../../context/TableContext';
import Button from '../Button';

type Props = {
	data: {
		id: number;
		username: string;
		role_id: number;
		llm_prefix: string | null;
	};
};

function UsersDetailsData({ data }: Props) {
	//#region States
	const [username, setUsername] = useState<string>(data?.username || '');
	const [roleId, setRoleId] = useState<number>(data?.role_id || 0);
	const [llmPrefix, setLlmPrefix] = useState<string | null>(
		data?.llm_prefix || '',
	);
	const [roles, setRoles] = useState<any[]>([]);

	const [isEditing, setIsEditing] = useState(false);

	const {
		items,
		getItems,
		updateItemById,
		setItems,
		activeTable,
		deleteItemById,
		setExpandedWindowId,
	} = useTable();

	//#endregion

	const handleEditClick = (event: any) => {
		event.preventDefault();
		setIsEditing(true);
	};
	const handleSaveClick = async (event: any) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const dataToSend = Object.fromEntries(formData.entries());

		const updatedItem = await updateItemById(activeTable, data.id, dataToSend);

		if (updatedItem) {
			setItems(items.map((item) => (item.id === data.id ? updatedItem : item)));
			setIsEditing(false);
		}
	};
	const handleCancelClick = (event: any) => {
		event.preventDefault();
		setUsername(data.username);
		setRoleId(data.role_id);
		setLlmPrefix(data.llm_prefix);
		setIsEditing(false);
	};

	const handleDeleteClick = async (event: any) => {
		event.preventDefault();
		await deleteItemById(activeTable, data.id);
		setIsEditing(false);
		setExpandedWindowId(null);
		setItems(items.filter((item) => item.id !== data.id));
	};

	// #region useEffects
	useEffect(() => {
		if (data) {
			setUsername(data.username || '');
			setRoleId(data.role_id || 0);
			setLlmPrefix(data.llm_prefix || '');
		}
	}, [data]);

	useEffect(() => {
		const fetchRoles = async () => {
			const result = await getItems('Roles');
			setRoles(result);
		};

		fetchRoles();
	}, []);

	// #endregion
	if (!data) return null;
	return (
		<form onSubmit={handleSaveClick}>
			<Input
				name='username'
				type='text'
				value={username}
				setValue={setUsername}
				isEditing={isEditing}
				label='Username'
			/>
			<Dropdown
				name='role_id'
				value={roleId}
				setValue={setRoleId}
				isEditing={isEditing}
				choices={roles}
				label='Role'
			/>
			<Input
				name='llm_prefix'
				type='text'
				value={llmPrefix}
				setValue={setLlmPrefix}
				isEditing={isEditing}
				label='LLM Prefix'
			/>
			<div className='ButtonHolder'>
				{isEditing ? (
					<>
						<Button type='submit' label='Save' variant='Success' />
						<Button
							label='Cancel'
							onClick={handleCancelClick}
							variant='Failure'
						/>
					</>
				) : (
					<>
						<Button label='Edit' onClick={handleEditClick} variant='Warning' />
						<Button
							label='Delete'
							onClick={handleDeleteClick}
							variant='Failure'
						/>
					</>
				)}
			</div>
		</form>
	);
}

export default UsersDetailsData;
