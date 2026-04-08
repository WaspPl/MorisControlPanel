type Props = {
	name: string;
	type: string;
	value: string | number | null;
	isEditing: boolean;
	placeholder?: string;
	label?: string;
	onChange?: (newValue: any, name: string) => void;
	className?: string;
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
}: Props) {
	return (
		<div className='input'>
			{label && <label htmlFor={name}>{label}</label>}
			<input
				className={`input-field ${className}`}
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
