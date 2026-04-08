import { Close } from '../../assets/icons/pixelIcons';
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
		<form className='input' onSubmit={handleSend}>
			<div className='input-list'>
				<Input
					name={name}
					type='text'
					value={value}
					isEditing={isEditing}
					label={label}
					onChange={handleChange}
				/>
				<Button label='Add' type='submit' className='input-field' />
			</div>
			<div className='list'>
				{values.map((value) => (
					<div className='pill' key={value.id}>
						<span>{value.text}</span>
						<Button
							label={<Close size={12} />}
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
