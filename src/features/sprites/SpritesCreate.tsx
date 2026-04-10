import { useEffect } from 'react';
import Image from '../../components/ui/Image';
import Input from '../../components/ui/Input';
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
		<form id='details' onSubmit={onSave} className='details-form'>
			<div className='details-column'>
				<Input
					name='name'
					type='text'
					value={data?.name}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Name'
					placeholder='eg. Spin'
					title='A name for the sprite'
					required
				/>
			</div>
			<div className='details-column'>
				<Image
					name='content'
					srcBase64={data?.content}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Sprite'
					title='The sprite sheet. Must be a png or a jpeg with a height of 8 and width divisible by 8'
					required
				/>
			</div>
			<div className='details-column'></div>
			<input type='submit' id='submit-hidden' />
		</form>
	);
}

export default SpritesCreate;
