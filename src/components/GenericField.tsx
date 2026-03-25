import type { TableType } from '../context/TableContext';
import type { FieldConfig } from '../schemas/tableConfig';
import Dropdown from './fields/Dropdown';
import ForeignField from './fields/ForeignField';
import ImageField from './fields/ImageField';
import Input from './fields/Input';
import PromptList from './fields/PromptList';
import RoleList from './fields/RoleList';

interface Props {
	fieldConfig: FieldConfig;
	value: any;
	isEditing: boolean;
	onChange: (name: string, value: any, apiKey: string) => void;
	isExpanded?: boolean;
}

function GenericField({
	fieldConfig,
	value,
	isEditing,
	onChange,
	isExpanded = false,
}: Props) {
	const { type, name, label, lookupTable, apiKey, placeholder } = fieldConfig;

	switch (type) {
		case 'text':
		case 'number':
		case 'password':
			return (
				<Input
					name={name}
					label={label}
					type={type}
					value={value || ''}
					isEditing={isEditing}
					placeholder={placeholder}
					setValue={(val: string | number) => onChange(name, val, apiKey)}
				/>
			);

		case 'checkbox':
			return (
				<div className='Input CheckboxRow'>
					<label htmlFor={name}>{label}</label>
					<input
						id={name}
						type='checkbox'
						checked={!!value}
						disabled={!isEditing}
						onChange={(e) => onChange(name, e.target.checked, apiKey)}
					/>
				</div>
			);

		case 'foreign':
			if (isExpanded && lookupTable) {
				return (
					<Dropdown
						name={name}
						label={label}
						value={value?.id || value}
						choicesTable={lookupTable}
						onSelect={(val) => onChange(name, val, apiKey)}
						isEditing={isEditing}
					/>
				);
			}
			return (
				<ForeignField
					name={name}
					label={label}
					item={value}
					foreignItemTable={lookupTable as TableType}
				/>
			);
		case 'dropdownList':
			return <RoleList roleList={value || []} />;
		case 'inputList':
			return <PromptList promptList={value || []} />;
		case 'image':
			return (
				<ImageField
					label={label}
					src={value}
					isEditing={isEditing}
					onChange={(val: string | number) => onChange(name, val, apiKey)}
				/>
			);
		default:
			return <span>Unsupported Field: {type}</span>;
	}
}

export default GenericField;
