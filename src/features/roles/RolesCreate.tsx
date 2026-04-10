import { useEffect } from 'react';
import Input from '../../components/ui/Input';
type Props = {
	data: {
		name: string;
	};
	onFieldChange: (value: any, ApiField: string) => void;
	isEditing: boolean;
	onSave: () => void;
};

function RolesCreate({ data, onFieldChange, isEditing, onSave }: Props) {
	const defaultValues = {
		name: '',
	};

	useEffect(() => {
		const setDefaults = () => {
			Object.entries(defaultValues).map(([key, value]) => {
				onFieldChange(value, key);
			});
		};
		setDefaults();
	}, []);

	return (
		<form id='details' onSubmit={onSave} className='details-form'>
			<div className='details-column'>
				<Input
					name='name'
					type='text'
					value={data?.name}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Name'
					placeholder='eg. Bot'
					title='A name for the new role'
					required
				/>
			</div>
			<div className='details-column'></div>
			<div className='details-column'></div>
			<input type='submit' id='submit-hidden' />
		</form>
	);
}

export default RolesCreate;
