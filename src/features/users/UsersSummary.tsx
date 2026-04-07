import ForeignField from '../../components/ui/ForeignField';
import Input from '../../components/ui/Input';

type Props = {
	data: {
		id: number;
		username: string;
		role: {
			id: number;
			name: string;
		};
		time_updated: string;
	};
};

function UsersSummary({ data }: Props) {
	if (!data) return null;
	return (
		<form>
			<Input
				name='Username'
				type='text'
				value={data?.username}
				isEditing={false}
				label='Username'
			/>
			<ForeignField
				name='Role'
				item={data?.role}
				foreignItemTable='Roles'
				label='Role'
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

export default UsersSummary;
