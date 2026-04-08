import Dropdown from './Dropdown';
import Button from './Button';
import { Close } from '../../assets/icons/pixelIcons';

type Props = {
	name: string;
	value?: number;
	isEditing: boolean;
	values: {
		id: number;
		role: {
			id: number;
			name: string;
		};
	}[];
	choices: {
		id: number;
		name: string;
	}[];
	label?: string;
	onChange: (value: number) => void;
	onSend: (id: number) => void;
	onRemove: (id: number) => void;
};

function RoleList({
	name,
	choices,
	value,
	isEditing,
	values,
	label,
	onChange,
	onSend,
	onRemove,
}: Props) {
	const assignedRoleIds = values.map((v) => v.role.id);
	const choicesFiltered = choices.filter(
		(choice) => !assignedRoleIds.includes(choice.id),
	);

	const handleChange = (newValue: number, _name: string) => {
		onChange(newValue);
	};

	const handleSend = (event: React.SubmitEvent) => {
		event.preventDefault();
		if (onSend && value) onSend(value);
	};

	const handleRemove = (event: React.MouseEvent, id: number) => {
		event.preventDefault();
		if (onRemove) onRemove(id);
	};
	return (
		<form className='input' onSubmit={handleSend}>
			<div className='input-list'>
				<Dropdown
					name={name}
					value={value}
					isEditing={isEditing}
					choices={choicesFiltered}
					label={label}
					onChange={handleChange}
				/>
				<Button label='Add' type='submit' className='input-field' />
			</div>
			<div className='list-wrapper'>
				<div className='list '>
					{values.map((value) => (
						<div className='pill' key={value.role.id}>
							<span>{value.role.name}</span>
							<Button
								label={<Close size={12} />}
								onClick={(e: React.MouseEvent) => {
									handleRemove(e, value.id);
								}}
							/>
						</div>
					))}
				</div>
			</div>
		</form>
	);
}

export default RoleList;
