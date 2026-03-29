import Image from '../../fields/Image';
import Input from '../../fields/Input';
type Props = {
	data: {
		id: number;
		name: string;
		content: string;
	};
	onFieldChange: () => void;
	isEditing: boolean;
	onSave: () => void;
};

function SpritesDetails({ data, onFieldChange, isEditing, onSave }: Props) {
	if (!data) return null;
	return (
		<form onSubmit={onSave}>
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
			/>
			<Image
				name='content'
				srcBase64={data.content}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Sprite'
			/>
		</form>
	);
}

export default SpritesDetails;
