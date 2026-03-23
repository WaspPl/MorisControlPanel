import ForeignField from '../ForeignField';
import Input from '../Input';

type Props = {
	data: {
		id: number;
		username: string;
		role: {
			id: number;
			name: string;
		};
	};
};

function UsersData({ data }: Props) {
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
		</form>
	);
}

export default UsersData;
