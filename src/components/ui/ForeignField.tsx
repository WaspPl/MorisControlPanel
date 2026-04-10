import { useTable, type TableType } from '../../context/TableContext';
import Button from './Button';

type Props = {
	name: string;
	item?: { id: number; name: string };
	foreignItemTable: TableType;
	label?: string;
	title?: string;
};

function ForeignField({ name, item, foreignItemTable, label, title }: Props) {
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
		<div className='input'>
			{label && <label htmlFor={name}>{label}</label>}
			<Button
				id={name}
				onClick={handleClick}
				className='input-field'
				label={item ? item.name : 'Unassigned'}
				title={title}
			/>
		</div>
	);
}

export default ForeignField;
