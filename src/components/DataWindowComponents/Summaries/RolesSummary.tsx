import Input from '../../fields/Input';

type Props = {
	data: {
		id: number;
		name: string;
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
		</form>
	);
}

export default RolesSummary;
