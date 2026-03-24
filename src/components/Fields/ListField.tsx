import { Plus, Minus } from 'pixelarticons/react';
import Dropdown from './Dropdown';
import Input from './Input';

interface Props {
	label: string;
	items: any[];
	isEditing: boolean;
	type: 'dropdownList' | 'inputList';
	onChange: (newValue: any[]) => void;
}

function ListField({ label, items, isEditing, type, onChange }: Props) {
	const handleAdd = () => {
		const newItem =
			type === 'inputList'
				? { id: Date.now(), text: '' }
				: { id: Date.now(), role: { id: '', name: '' } };
		onChange([...items, newItem]);
	};

	const handleRemove = (index: number) => {
		const newItems = items.filter((_, i) => i !== index);
		onChange(newItems);
	};

	const handleUpdate = (index: number, val: any) => {
		const newItems = [...items];
		if (type === 'inputList') {
			newItems[index] = { ...newItems[index], text: val };
		} else {
			// For dropdownList (assignments), we usually want to store the ID or the object
			newItems[index] = { ...newItems[index], role: val };
		}
		onChange(newItems);
	};

	return (
		<div className='ListField'>
			<div className='ListHeader'>
				<label>{label}</label>
				{isEditing && (
					<button type='button' onClick={handleAdd} className='AddBtn'>
						<Plus />
					</button>
				)}
			</div>

			<div className='ListContainer'>
				{items.map((item, index) => (
					<div key={item.id || index} className='ListItem'>
						<div className='ItemContent'>
							{type === 'inputList' ? (
								<Input
									name={`${label}-${index}`}
									value={item.text || ''}
									isEditing={isEditing}
									setValue={(val) => handleUpdate(index, val)}
									type='text'
								/>
							) : (
								<Dropdown
									name={`${label}-${index}`}
									value={item.role?.id || item.role || ''}
									choicesTable='Roles' // You might want to make this dynamic in schema
									isEditing={isEditing}
									onSelect={(val) => handleUpdate(index, val)}
								/>
							)}
						</div>

						{isEditing && (
							<button
								type='button'
								onClick={() => handleRemove(index)}
								className='RemoveBtn'
							>
								<Minus />
							</button>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

export default ListField;
