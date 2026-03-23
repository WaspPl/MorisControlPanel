import Input from '../Input';

type Props = {
	data: {
		id: number;
		name: string;
	};
};

function RolesData({ data }: Props) {
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

export default RolesData;
