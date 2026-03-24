type Props = {
	name: string;
	type: string;
	value: any;
	setValue?: (value: any) => void;
	isEditing: boolean;
	placeholder?: string;
	label?: string;
};

function Input({
	name,
	type,
	value,
	setValue,
	isEditing,
	placeholder,
	label,
}: Props) {
	const handleChange = (event: any) => {
		if (setValue) {
			setValue(event.target.value);
		}
	};

	return (
		<div className='Input'>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				name={name}
				id={name}
				type={type}
				value={value}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={!isEditing}
			/>
		</div>
	);
}

export default Input;
