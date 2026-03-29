import Input from '../../fields/Input';
type Props = {
	data: {
		id: number;
		name: string;
	};
	onFieldChange: () => void;
	isEditing: boolean;
	onSave: () => void;
};

function RolesDetails({ data, onFieldChange, isEditing, onSave }: Props) {
	if (!data) return null;
	return (
		<form onSubmit={onSave}>
			<Input
				name='id'
				type='number'
				value={data.id}
				isEditing={false}
				label='Id'
			/>
			<Input
				name='name'
				type='text'
				value={data.name}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Name'
			/>
		</form>
	);
}

export default RolesDetails;
