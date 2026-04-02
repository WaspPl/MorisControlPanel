import Button from '../fields/Button';

type Props = {
	isEditing: boolean;
	onSave: (event: any) => Promise<void>;
	onEditClick: () => void;
	onDelete: () => Promise<void>;
	onCancel: () => void;
};

function DetailsButtons({
	isEditing,
	onSave,
	onEditClick,
	onDelete,
	onCancel,
}: Props) {
	return (
		<div className='ButtonHolder'>
			{isEditing ? (
				<>
					<Button
						type='submit'
						label='Save'
						variant='Success'
						onClick={onSave}
					/>
					<Button label='Cancel' onClick={onCancel} variant='Danger' />
				</>
			) : (
				<>
					<Button label='Edit' onClick={onEditClick} variant='Warning' />
					<Button label='Delete' onClick={onDelete} variant='Danger' />
				</>
			)}
		</div>
	);
}

export default DetailsButtons;
