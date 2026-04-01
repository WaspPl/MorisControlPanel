type Props = {
	name: string;
	value: boolean;
	isEditing: boolean;
	placeholder?: string;
	label?: string;
	onChange?: (newValue: any, name: string) => void;
};

function Toggle({
	name,
	value,
	isEditing,
	placeholder,
	label,
	onChange,
}: Props) {
	return (
		<div className='Toggle'>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				name={name}
				id={name}
				type='checkbox'
				checked={value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (onChange) {
						onChange(e.target.checked, name);
					}
				}}
				placeholder={placeholder}
				disabled={!isEditing}
			/>
		</div>
	);
}

export default Toggle;
