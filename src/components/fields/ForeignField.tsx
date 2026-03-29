import { useTable, type TableType } from '../../context/TableContext';

type Props = {
	name: string;
	item: { id: number; name: string };
	foreignItemTable: TableType;
	label?: string;
};

function ForeignField({ name, item, foreignItemTable, label }: Props) {
	const { updateQueryParams } = useTable();

	const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		if (item?.id) {
			updateQueryParams({
				activeTable: foreignItemTable,
				expandedWindowId: item.id.toString(),
			});
		}
	};
	return (
		<div className='Input'>
			{label && <label htmlFor={name}>{label}</label>}
			<button id={name} onClick={handleClick}>
				{item?.name}
			</button>
		</div>
	);
}

export default ForeignField;
