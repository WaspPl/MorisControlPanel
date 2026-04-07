import Input from '../../components/ui/Input';
type Props = {
	data: {
		id: number;
		name: string;
		time_created: string;
		time_updated: string;
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
			<Input
				name='time_updated'
				type='datetime-local'
				value={data?.time_updated.replace('T', ' ')}
				isEditing={false}
				label='Updated at'
			/>
			<Input
				name='time_created'
				type='datetime-local'
				value={data?.time_created.replace('T', ' ')}
				isEditing={false}
				label='Created at'
			/>
		</form>
	);
}

export default RolesDetails;
