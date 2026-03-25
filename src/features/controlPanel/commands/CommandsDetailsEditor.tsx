import GenericField from '../../../components/GenericField';
import PromptList from '../../../components/Fields/PromptList';
import RoleList from '../../../components/Fields/RoleList';
import ScriptField from '../../../components/Fields/ScriptField';
import type { TableSchema } from '../../../schemas/tableConfig';
import { useAuth } from '../../../features/auth/AuthContext';

type Props = {
	schema: TableSchema;
	currentData: any;
	isExpanded: boolean;
	isEditing: boolean;
	onChange: (name: string, value: any, apiKey: string) => void;
};

const TWO_COLUMN_FIELDS = new Set(['assignments', 'prompts']);

export default function CommandsDetailsEditor({
	schema,
	currentData,
	isExpanded,
	isEditing,
	onChange,
}: Props) {
	const scalarFields = schema.fields.filter((f) => !TWO_COLUMN_FIELDS.has(f.name));
	const { isAdmin } = useAuth();

	return (
		<div className='CommandsEditor'>
			<div className='CommandsEditorLeft'>
				{scalarFields.map((field) => {
					const value =
						currentData?.[field.apiKey] ?? currentData?.[field.name];

					return (
						<GenericField
							key={field.name}
							fieldConfig={field}
							value={value}
							isEditing={isEditing}
							onChange={onChange}
							isExpanded={isExpanded}
						/>
					);
				})}

				{isAdmin && (
					<ScriptField
						commandId={Number(currentData?.id)}
						scriptPath={currentData?.script_path}
						canUpload={isEditing}
					/>
				)}
			</div>

			<div className='CommandsEditorRight'>
				<div className='CommandsEditorPanel'>
					<h3>Roles</h3>
					<RoleList
						roleList={currentData?.assignments ?? []}
						commandId={currentData?.id}
						canEdit={isEditing}
					/>
				</div>
				<div className='CommandsEditorPanel'>
					<h3>Prompts</h3>
					<PromptList
						promptList={currentData?.prompts ?? []}
						commandId={currentData?.id}
						canEdit={isEditing}
					/>
				</div>
			</div>
		</div>
	);
}

