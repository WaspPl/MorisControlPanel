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
		<form id='details' onSubmit={onSave} className='details-form'>
			<div className='details-column'>
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
					placeholder='eg. Bot'
					title='A name for the role'
					required
				/>
			</div>
			<div className='details-column'></div>
			<div className='details-column'>
				<Input
					name='time_updated'
					type='datetime-local'
					value={data?.time_updated.replace('T', ' ')}
					isEditing={false}
					label='Updated at'
					title='The date this role was last updated'
				/>
				<Input
					name='time_created'
					type='datetime-local'
					value={data?.time_created.replace('T', ' ')}
					isEditing={false}
					label='Created at'
					title='The date this role was first created'
				/>
			</div>
			<input type='submit' id='submit-hidden' />
		</form>
	);
}

export default RolesDetails;
