type Props = {
	name: string;
	value?: number;
	isEditing: boolean;
	choices: {
		id: number;
		name: string;
	}[];
	label?: string;
	onChange?: (newValue: any, name: string) => void;
};

function Dropdown({ name, value, isEditing, choices, label, onChange }: Props) {
	return (
		<div className='input'>
			{label && <label htmlFor={name}>{label}</label>}
			<select
				className='input-field'
				name={name}
				id={name}
				value={value || ''}
				onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
					if (onChange) {
						onChange(e.target.value, name);
					}
				}}
				disabled={!isEditing}
			>
				<option value={''}>--null--</option>
				{choices?.map((choice) => (
					<option key={choice.id} value={choice.id}>
						{choice.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default Dropdown;
