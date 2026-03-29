import Input from '../../fields/Input';

type Props = {
	data: {
		id: number;
		name: string;
	};
};

function SpritesSummary({ data }: Props) {
	if (!data) return null;
	return (
		<form>
			<Input
				name='Username'
				type='text'
				value={data?.name}
				isEditing={false}
				label='Username'
			/>
		</form>
	);
}

export default SpritesSummary;
