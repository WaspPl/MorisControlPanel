type Props = {
	name: string;
	value: any;
	setValue: (value: any) => void;
	isEditing: boolean;
	choices: {
		id: number;
		name: string;
	}[];
	label?: string;
};

function Dropdown({ name, value, setValue, isEditing, choices, label }: Props) {
	const handleChange = (event: any) => {
		setValue(event.target.value);
	};
	return (
		<div className='Dropdown'>
			{label && <label htmlFor={name}>{label}</label>}
			<select
				name={name}
				id={name}
				value={value}
				onChange={handleChange}
				disabled={!isEditing}
			>
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
