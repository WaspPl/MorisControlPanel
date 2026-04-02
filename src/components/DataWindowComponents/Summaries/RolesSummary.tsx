import Input from '../../fields/Input';

type Props = {
	data: {
		id: number;
		name: string;
		time_updated: string;
	};
};

function RolesSummary({ data }: Props) {
	if (!data) return null;
	return (
		<form>
			<Input
				name='Name'
				type='text'
				value={data?.name}
				isEditing={false}
				label='Name'
			/>
			<Input
				name='time_updated'
				type='datetime-local'
				value={data?.time_updated.replace('T', ' ')}
				isEditing={false}
				label='Updated at'
			/>
		</form>
	);
}

export default RolesSummary;
