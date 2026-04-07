import Input from '../../components/ui/Input';

type Props = {
	data: {
		id: number;
		name: string;
		time_updated: string;
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

export default SpritesSummary;
