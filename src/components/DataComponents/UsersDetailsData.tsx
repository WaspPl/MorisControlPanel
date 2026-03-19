type Props = {
	data: any;
	isEdited: boolean;
};

function UsersDetailsData({ data, isEdited }: Props) {
	return (
		<div>
			{isEdited && 'Editing'}
			{JSON.stringify(data)}
		</div>
	);
}

export default UsersDetailsData;
