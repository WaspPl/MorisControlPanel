type Props = {
	data: JSON;
};

function UsersData({ data }: Props) {
	return <div>{JSON.stringify(data)}</div>;
}

export default UsersData;
