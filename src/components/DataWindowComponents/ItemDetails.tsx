import { useEffect, useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';
import RolesDetails from './Details/RolesDetails';
import UsersDetails from './Details/UsersDetails';
import DetailsButtons from './DetailsButtons';
import SpritesDetails from './Details/spritesDetails';
import CommandsDetails from './Details/CommandsDetails';

type Props = {
	table: TableType;
	itemId: number;
};

function ItemDetails({ table, itemId }: Props) {
	const TableRegistry: Record<string, any> = {
		Users: UsersDetails,
		Roles: RolesDetails,
		Commands: CommandsDetails,
		Sprites: SpritesDetails,
	};
	const {
		items,
		getItemDetailsById,
		deleteItemById,
		updateItemById,
		setItems,
		setExpandedWindowId,
	} = useTable();
	const [data, setData] = useState(null);
	const [draft, setDraft] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const getData = async () => {
			let result = await getItemDetailsById(table, itemId);
			setData(result);
			setDraft(result);
		};
		getData();
	}, []);

	const handleFieldChange = (newValue: any, ApiField: string) => {
		setDraft((prev: any) => {
			const updated = { ...prev };
			updated[ApiField] = newValue;
			return updated;
		});
	};

	const handleSave = async () => {
		const updatedItem = await updateItemById(table, itemId, draft);

		if (updatedItem) {
			setItems(
				items.map((item) => {
					if (item.id == itemId) return updatedItem;
					return item;
				}),
			);
			setData(draft);
			setIsEditing(false);
		}
	};

	const handleDelete = async () => {
		const deletedItem = await deleteItemById(table, itemId);
		if (deletedItem) {
			setItems(items.filter((item) => item.id != itemId));
			setExpandedWindowId(null);
		}
	};

	const handleCancel = () => {
		setDraft(data);
		setIsEditing(false);
	};
	const handleEnableEdit = () => {
		setIsEditing(true);
	};

	const ComponentToRender = TableRegistry[table];
	if (!ComponentToRender) {
		return <div>Table type not found</div>;
	}
	return (
		<div>
			<ComponentToRender
				data={draft}
				onFieldChange={handleFieldChange}
				isEditing={isEditing}
				onSave={handleSave}
			/>
			{table == 'Roles' && (itemId == 1 || 2) ? null : (
				<DetailsButtons
					isEditing={isEditing}
					onSave={handleSave}
					onCancel={handleCancel}
					onDelete={handleDelete}
					onEditClick={handleEnableEdit}
				/>
			)}
		</div>
	);
}

export default ItemDetails;
