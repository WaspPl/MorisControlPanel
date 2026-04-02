import type { TableType } from '../../context/TableContext';
import CommandsSummary from './Summaries/CommandsSummary';
import RolesSummary from './Summaries/RolesSummary';
import SpritesSummary from './Summaries/SpritesSummary';
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
		Commands: CommandsSummary,
		Sprites: SpritesSummary,
		Me: UniversalData,
	};

	const ComponentToRender = TableRegistry[table];

	return (
		<div>
			<ComponentToRender data={data} />
		</div>
	);
}
export default ItemSummary;
