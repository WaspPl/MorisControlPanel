import { useTable, type TableType } from '../../context/TableContext';
type Props = {
	name: string;
	item?: { id: number; name: string };
	foreignItemTable: TableType;
	label?: string;
};

function ForeignField({ name, item, foreignItemTable, label }: Props) {
	const { setActiveTable, setExpandedWindowId, sleep } = useTable();

	const handleClick = async (event: any) => {
		event.preventDefault();
		if (item?.id) {
			setActiveTable(foreignItemTable);
			await sleep(300);
			setExpandedWindowId(item.id);
		}
	};
	return (
		<div className='Input'>
			{label && <label htmlFor={name}>{label}</label>}
			<button id={name} onClick={handleClick}>
				{item ? item?.name : 'Not Assigned'}
			</button>
		</div>
	);
}

export default ForeignField;
