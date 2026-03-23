import { useTable } from '../../context/TableContext';
import Button from '../Button';

type Props = {
	isEditing: boolean;
	setIsEditing: (isEditing: boolean) => void;
	id: number;
	reloadFunction: () => void;
};

function DetailsButtons({
	isEditing,
	setIsEditing,
	id,
	reloadFunction,
}: Props) {
	const { setExpandedWindowId, deleteItemById, setItems, activeTable, items } =
		useTable();

	const handleEditClick = (event: any) => {
		event.preventDefault();
		setIsEditing(true);
	};
	const handleCancelClick = (event: any) => {
		event.preventDefault();
		reloadFunction();
		setIsEditing(false);
	};

	const handleDeleteClick = async (event: any) => {
		event.preventDefault();
		await deleteItemById(activeTable, id);
		setIsEditing(false);
		setExpandedWindowId(null);
		setItems(items.filter((item) => item.id !== id));
	};

	return (
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
	);
}

export default DetailsButtons;
