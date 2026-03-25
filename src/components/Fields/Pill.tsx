import { useAuth } from '../../features/auth/AuthContext';

type Props = {
	id: number;
	text: string;
	onDelete: (id: number) => Promise<void>;
	canDelete?: boolean;
};

function Pill({ id, text, onDelete, canDelete = true }: Props) {
	const { isAdmin } = useAuth();

	const handleDelete = (event: any) => {
		event.preventDefault();
		onDelete(id);
	};
	return (
		<div className='Pill'>
			{text}
			{isAdmin && canDelete && (
				<button type='button' onClick={handleDelete}>
					X
				</button>
			)}
		</div>
	);
}

export default Pill;
