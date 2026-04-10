type Props = {
	name: string;
	type: string;
	value: string | number | null;
	isEditing: boolean;
	placeholder?: string;
	label?: string;
	onChange?: (newValue: any, name: string) => void;
	className?: string;
	title?: string;
	required?: boolean;
};

function Input({
	name,
	type,
	value,
	isEditing,
	placeholder,
	label,
	onChange,
	className,
	title,
	required,
}: Props) {
	let displayedValue = value;
	if (type == 'datetime-local' && value) {
		const date = new Date(value + ' UTC');
		console.log(date);
		displayedValue = date.toLocaleString('sv-SE');
	}
	const displayedPlaceholder = isEditing && placeholder ? placeholder : '';
	return (
		<div className='input'>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				className={`input-field ${className}`}
				name={name}
				id={name}
				type={type}
				value={displayedValue || ''}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					if (onChange) {
						onChange(e.target.value, name);
					}
				}}
				placeholder={displayedPlaceholder}
				disabled={!isEditing}
				required={required}
				title={title}
				min={0}
			/>
		</div>
	);
}

export default Input;
