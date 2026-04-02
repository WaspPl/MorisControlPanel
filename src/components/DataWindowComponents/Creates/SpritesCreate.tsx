import { useEffect } from 'react';
import Image from '../../fields/Image';
import Input from '../../fields/Input';
type Props = {
	data: {
		name: string;
		content: string;
	};
	onFieldChange: (value: any, ApiField: string) => void;
	isEditing: boolean;
	onSave: () => void;
};

function SpritesCreate({ data, onFieldChange, isEditing, onSave }: Props) {
	const defaultValues = {
		name: '',
		content: '',
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
			/>
			<Image
				name='content'
				srcBase64={data?.content}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Sprite'
			/>
			<button type='submit' style={{ display: 'none' }} />
		</form>
	);
}

export default SpritesCreate;
