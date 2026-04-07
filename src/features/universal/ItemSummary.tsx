import type { TableType } from '../../context/TableContext';
import CommandsSummary from '../commands/CommandsSummary';
import RolesSummary from '../roles/RolesSummary';
import SpritesSummary from '../sprites/SpritesSummary';
import UsersSummary from '../users/UsersSummary';
import UniversalData from './UniversalData';

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
