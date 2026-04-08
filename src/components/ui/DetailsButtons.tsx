import Button from './Button';

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
		<div className='details-buttons'>
			{isEditing ? (
				<>
					<Button
						type='submit'
						label='Save'
						variant='success'
						onClick={onSave}
					/>
					<Button label='Cancel' onClick={onCancel} variant='danger' />
				</>
			) : (
				<>
					<Button label='Edit' onClick={onEditClick} variant='secondary' />
					<Button label='Delete' onClick={onDelete} variant='danger' />
				</>
			)}
		</div>
	);
}

export default DetailsButtons;
