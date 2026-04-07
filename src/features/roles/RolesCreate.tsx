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
		<form onSubmit={onSave}>
			<Input
				name='name'
				type='text'
				value={data?.name}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Name'
				placeholder='A name for your role'
			/>
			<button type='submit' style={{ display: 'none' }} />
		</form>
	);
}

export default RolesCreate;
