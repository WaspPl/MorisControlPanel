import type { TableType } from '../../context/TableContext';
import RolesSummary from './Summaries/RolesSummary';
import UsersSummary from './Summaries/UsersSummary';
import UniversalData from './UniverstalData';

type Props = {
	table: TableType;
	data: any;
};

function ItemSummary({ table, data }: Props) {
	const TableRegistry: Record<string, any> = {
		Users: UsersSummary,
		Roles: RolesSummary,
		Commands: UniversalData,
		Sprites: UniversalData,
	};

	const ComponentToRender = TableRegistry[table];

	return (
		<div>
			<ComponentToRender data={data} />
		</div>
	);
}
export default ItemSummary;
