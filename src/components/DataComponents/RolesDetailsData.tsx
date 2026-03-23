import { useEffect, useState } from 'react';
import Input from '../Input';
import { useTable } from '../../context/TableContext';
import DetailsButtons from './DetailsButtons';

type Props = {
	data: {
		id: number;
		name: string;
	};
	reloadFunction: () => void;
};

function RolesDetailsData({ data, reloadFunction }: Props) {
	//#region States
	const [name, setName] = useState<string>(data?.name || '');
	const [isEditing, setIsEditing] = useState(false);

	const { items, updateItemById, setItems, activeTable } = useTable();

	//#endregion

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

	// #region useEffects
	useEffect(() => {
		if (data) {
			setName(data.name || '');
		}
	}, [data]);

	// #endregion
	if (!data) return null;
	return (
		<form onSubmit={handleSaveClick}>
			<Input
				name='id'
				type='number'
				value={data.id}
				isEditing={false}
				label='Id'
			/>
			<Input
				name='name'
				type='text'
				value={name}
				setValue={setName}
				isEditing={isEditing}
				label='Name'
			/>
			<DetailsButtons
				isEditing={isEditing}
				setIsEditing={setIsEditing}
				id={data.id}
				reloadFunction={reloadFunction}
			/>
		</form>
	);
}

export default RolesDetailsData;
