type Props = {
	name: string;
	value: boolean;
	isEditing: boolean;
	label?: string;
	onChange?: (newValue: any, name: string) => void;
	title?: string;
};

function Toggle({ name, value, isEditing, label, onChange, title }: Props) {
	return (
		<div className='input'>
			{label && <label htmlFor={name}>{label}</label>}
			<div className='toggle'>
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
					disabled={!isEditing}
					title={title}
				/>
				<label></label>
			</div>
		</div>
	);
}

export default Toggle;
