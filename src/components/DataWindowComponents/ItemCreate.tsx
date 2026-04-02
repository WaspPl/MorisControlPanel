import React, { useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';
import DetailsButtons from './DetailsButtons';
import UsersCreate from './Creates/UsersCreate';
import RolesCreate from './Creates/RolesCreate';
import SpritesCreate from './Creates/SpritesCreate';
import CommandsCreate from './Creates/CommandsCreate';

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
		<div>
			<ComponentToRender
				data={draft}
				onFieldChange={handleFieldChange}
				isEditing={isEditing}
				onSave={handleSave}
			/>
			<DetailsButtons
				isEditing={isEditing}
				onSave={handleSave}
				onCancel={handleCancel}
				onDelete={async () => {}}
				onEditClick={() => {}}
			/>
		</div>
	);
}

export default ItemCreate;
