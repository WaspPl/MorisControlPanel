import Button from '../shared/ui/Button';
import { useAuth } from '../features/auth/AuthContext';

type Props = {
	isEditing: boolean;
	setIsEditing: (val: boolean) => void;
	onDelete: (event: any) => Promise<void>;
	onCancel: (event: any) => void;
};

function DetailsButtons({
	isEditing,
	setIsEditing,
	onDelete,
	onCancel,
}: Props) {
	const { isAdmin } = useAuth();

	if (!isAdmin) return null;

	const handleEnableEditing = (event: any) => {
		event.preventDefault();
		setIsEditing(true);
	};

	return (
		<div className='ButtonHolder'>
			{isEditing ? (
				<>
					<Button type='submit' label='Save' variant='Success' />
					<Button label='Cancel' onClick={onCancel} variant='Failure' />
				</>
			) : (
				<>
					<Button
						label='Edit'
						onClick={handleEnableEditing}
						variant='Warning'
					/>
					<Button label='Delete' onClick={onDelete} variant='Failure' />
				</>
			)}
		</div>
	);
}

export default DetailsButtons;
