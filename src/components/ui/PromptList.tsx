import Button from './Button';
import Input from './Input';

type Props = {
	name: string;
	value: string;
	isEditing: boolean;
	values: {
		id: number;
		text: string;
	}[];
	label?: string;
	onChange: (value: string) => void;
	onSend: (value: string) => void;
	onRemove: (id: number) => void;
};

function PromptList({
	name,
	value,
	isEditing,
	values,
	label,
	onChange,
	onSend,
	onRemove,
}: Props) {
	const handleChange = (newValue: string, _name: string) => {
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
		<form className='RoleList' onSubmit={handleSend}>
			<Input
				name={name}
				type='text'
				value={value}
				isEditing={isEditing}
				label={label}
				onChange={handleChange}
			/>
			<Button label='Add' type='submit' />
			<div>
				{values.map((value) => (
					<div className='Pill' key={value.id}>
						<p>{value.text}</p>
						<Button
							label='X'
							onClick={(e: React.MouseEvent) => {
								handleRemove(e, value.id);
							}}
						/>
					</div>
				))}
			</div>
		</form>
	);
}

export default PromptList;
