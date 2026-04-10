import Button from './Button';

type Props = {
	submitButtonId: string;
	isEditing: boolean;
	onEditClick: () => void;
	onDelete: () => Promise<void>;
	onCancel: () => void;
};

function DetailsButtons({
	isEditing,
	onEditClick,
	onDelete,
	onCancel,
	submitButtonId,
}: Props) {
	return (
		<div className='details-buttons'>
			{isEditing ? (
				<>
					<label htmlFor={submitButtonId} className='input-field success'>
						Submit
					</label>
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
