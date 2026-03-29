type Props = {
	name: string;
	type: string;
	value: string | number | null;
	isEditing: boolean;
	placeholder?: string;
	label?: string;
	onChange?: (newValue: any, name: string) => void;
};

function Input({
	name,
	type,
	value,
	isEditing,
	placeholder,
	label,
	onChange,
}: Props) {
	return (
		<div className='Input'>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				name={name}
				id={name}
				type={type}
				value={value || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (onChange) {
						onChange(e.target.value, name);
					}
				}}
				placeholder={placeholder}
				disabled={!isEditing}
			/>
		</div>
	);
}

export default Input;
