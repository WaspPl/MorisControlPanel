import { useEffect, useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';
import RolesDetails from '../roles/RolesDetails';
import DetailsButtons from '../../components/ui/DetailsButtons';
import UsersDetails from '../users/UsersDetails';
import CommandsDetails from '../commands/CommandsDetails';
import SpritesDetails from '../sprites/spritesDetails';
import MeDetails from '../me/MeDetails';

type Props = {
	table: TableType;
	itemId: number;
	isMe: boolean;
};

function ItemDetails({ table, itemId, isMe = false }: Props) {
	const TableRegistry: Record<string, any> = {
		Users: UsersDetails,
		Roles: RolesDetails,
		Commands: CommandsDetails,
		Sprites: SpritesDetails,
		Me: MeDetails,
	};
	const {
		items,
		getItemDetailsById,
		deleteItemById,
		updateItemById,
		setItems,
		setExpandedWindowId,
		currentUser,
		logout,
		setCurrentUser,
		setAuthCookies,
	} = useTable();
	const [data, setData] = useState<any>(null);
	const [draft, setDraft] = useState<any>(null);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const getData = async () => {
			let result = await getItemDetailsById(table, itemId);
			setData(result);
			setDraft(result);
		};
		if (isMe) {
			setData(currentUser);
			setDraft(currentUser);
		} else {
			getData();
		}
	}, []);

	const handleFieldChange = (newValue: any, ApiField: string) => {
		setDraft((prev: any) => {
			const updated = { ...prev };
			updated[ApiField] = newValue;
			return updated;
		});
	};

	const handleSave = async (event: React.SubmitEvent) => {
		event.preventDefault();
		const updatedItem = await updateItemById(table, itemId, draft);

		if (updatedItem) {
			setItems(
				items.map((item) => {
					if (item.id == itemId) return updatedItem;
					return item;
				}),
			);
			setDraft((prev: any) => {
				const updated = { ...prev };
				updated['time_updated'] = updatedItem.time_updated;
				return updated;
			});
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

	const handleMeSave = async (event: React.SubmitEvent) => {
		event.preventDefault();
		const updatedItem = await updateItemById(table, null, draft);
		if (updatedItem) {
			setAuthCookies(
				updatedItem.access_token,
				updatedItem.access_token_duration_minutes,
				updatedItem.refresh_token,
				updatedItem.refresh_token_duration_days,
			);
			setData(draft);
			setCurrentUser(draft);
			setIsEditing(false);
		}
	};
	const handleMeDelete = async () => {
		const response = await deleteItemById(table, null);
		if (response) {
			logout();
		}
	};
	const ComponentToRender = TableRegistry[table];
	if (!ComponentToRender) {
		return <div>Table type not found</div>;
	}
	return (
		<div className='details-feature'>
			<div className='details-contents'>
				<ComponentToRender
					data={draft}
					onFieldChange={handleFieldChange}
					isEditing={isEditing}
					onSave={table == 'Me' ? handleMeSave : handleSave}
				/>
			</div>
			{(table == 'Roles' && (itemId == 1 || itemId == 2)) ||
			(currentUser?.role_id != 1 && table != 'Me') ||
			(currentUser?.id == itemId && table == 'Users') ? null : (
				<DetailsButtons
					submitButtonId='submit-hidden'
					isEditing={isEditing}
					onCancel={handleCancel}
					onDelete={isMe ? handleMeDelete : handleDelete}
					onEditClick={handleEnableEdit}
				/>
			)}
		</div>
	);
}

export default ItemDetails;
