import React, { useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';
import DetailsButtons from '../../components/ui/DetailsButtons';
import CommandsCreate from '../commands/CommandsCreate';
import UsersCreate from '../users/UsersCreate';
import RolesCreate from '../roles/RolesCreate';
import SpritesCreate from '../sprites/SpritesCreate';

type Props = {
	table: TableType;
};

function ItemCreate({ table }: Props) {
	const TableRegistry: Record<string, any> = {
		Users: UsersCreate,
		Roles: RolesCreate,
		Commands: CommandsCreate,
		Sprites: SpritesCreate,
	};
	const { items, createItem, setItems, setExpandedWindowId } = useTable();
	const [draft, setDraft] = useState<any>(null);
	const isEditing = true;

	const handleFieldChange = (newValue: any, ApiField: string) => {
		setDraft((prev: any) => {
			const updated = { ...prev };
			updated[ApiField] = newValue;
			return updated;
		});
	};

	const handleSave = async (event: React.SubmitEvent) => {
		event.preventDefault();
		const updatedItem = await createItem(table, draft);

		if (updatedItem) {
			setItems([updatedItem, ...items]);
			handleCancel();
		}
	};

	const handleCancel = () => {
		setExpandedWindowId(null);
		setDraft(null);
	};

	const ComponentToRender = TableRegistry[table];
	if (!ComponentToRender) {
		return <div>Table type not found</div>;
	}
	return (
		<div className='details-feature create-feature'>
			<div className='details-contents'>
				<ComponentToRender
					data={draft}
					onFieldChange={handleFieldChange}
					isEditing={isEditing}
					onSave={handleSave}
				/>
			</div>
			<DetailsButtons
				submitButtonId='submit-hidden'
				isEditing={isEditing}
				onCancel={handleCancel}
				onDelete={async () => {}}
				onEditClick={() => {}}
			/>
		</div>
	);
}

export default ItemCreate;
