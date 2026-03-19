type Props = {
	type: string;
	value: any;
	setValue: (value: any) => null;
	isEditing: boolean;
	placeholder?: string;
	label?: string;
};

function Input({
	type,
	value,
	setValue,
	isEditing,
	placeholder,
	label,
}: Props) {
	const handleChange = (event: any) => {
		setValue(event.targer.value);
	};

	return (
		<div className='Input'>
			{label && <p>{label}</p>}
			<input
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
