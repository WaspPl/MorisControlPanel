type Props = {
	id: number;
	text: string;
	onDelete: (id: number) => Promise<void>;
};

function Pill({ id, text, onDelete }: Props) {
	const handleDelete = (event: any) => {
		event.preventDefault();
		onDelete(id);
	};
	return (
		<div className='Pill'>
			{text}
			<button onClick={handleDelete}>X</button>
		</div>
	);
}

export default Pill;
