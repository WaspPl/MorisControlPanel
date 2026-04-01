import { useEffect, useState } from 'react';
import Dropdown from '../../fields/Dropdown';
import Input from '../../fields/Input';
import { useTable } from '../../../context/TableContext';
import Toggle from '../../fields/Toggle';
import RoleList from '../../fields/RoleList';
import PromptList from '../../fields/PromptList';
import FileField from '../../fields/FileField';
type Props = {
	data: {
		id: number;
		name: string;
		description: string;
		sprite_id?: number;
		sprite_repeat_times: number;
		is_output_llm: boolean;
		llm_prefix?: string;
		prompts: { id: number; text: string }[];
		assignments: { id: number; role: { id: number; name: string } }[];
	};
	onFieldChange: () => void;
	isEditing: boolean;
	onSave: () => void;
};

function CommandsDetails({ data, onFieldChange, isEditing, onSave }: Props) {
	if (!data) return null;

	const [sprites, setSprites] = useState<any>([]);
	const [roles, setRoles] = useState<any>([]);
	const [assignments, setAssignments] = useState(data.assignments);
	const [prompts, setPrompts] = useState(data.prompts);
	const [promptInput, setPromptInput] = useState('');
	const [assignmentInput, setAssignmentInput] = useState(0);

	const { getItems, createItem, deleteItemById, getScript, createScript } =
		useTable();

	useEffect(() => {
		const fetchData = async () => {
			const fetchedSprites = await getItems('Sprites');
			setSprites(fetchedSprites);
			const fetchedRoles = await getItems('Roles');
			setRoles(fetchedRoles);
		};

		fetchData();
	}, []);

	const addAssignment = async (roleId: number) => {
		const dataToSend = {
			command_id: data.id,
			role_id: roleId,
		};
		const response = await createItem('Assignments', dataToSend);
		if (response) {
			setAssignments([...assignments, response]);
			setAssignmentInput(0);
		}
	};

	const removeAssignment = async (id: number) => {
		const response = await deleteItemById('Assignments', id);
		if (response) {
			setAssignments(assignments.filter((ass: any) => ass.id != id));
		}
	};

	const addPrompt = async (value: string) => {
		const dataToSend = {
			command_id: data.id,
			text: value,
		};
		const response = await createItem('Prompts', dataToSend);
		if (response) {
			setPrompts([...prompts, response]);
			setPromptInput('');
		}
	};

	const removePrompt = async (id: number) => {
		const response = await deleteItemById('Prompts', id);
		if (response) {
			setPrompts(prompts.filter((p) => p.id != id));
		}
	};

	const handleScriptDownload = async () => {
		const blob = await getScript(data.id);

		if (blob) {
			const url = window.URL.createObjectURL(blob);

			const link = document.createElement('a');
			link.href = url;

			link.setAttribute('download', `script_${data.id}.py`);

			document.body.appendChild(link);
			link.click();

			link.parentNode?.removeChild(link);
			window.URL.revokeObjectURL(url);
		}
	};
	const handleScriptUpload = async (script: File) => {
		const success = await createScript(data.id, script);
		if (success) {
			alert('Upload successful!');
		}
	};
	return (
		<>
			<form onSubmit={onSave}>
				<Input
					name='id'
					type='number'
					value={data.id}
					isEditing={false}
					label='Id'
				/>
				<Input
					name='name'
					type='text'
					value={data.name}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Name'
				/>
				<Input
					name='description'
					type='text'
					value={data.description}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Description'
				/>
				<Dropdown
					name='sprite_id'
					value={data.sprite_id}
					isEditing={isEditing}
					choices={sprites}
					onChange={onFieldChange}
					label='Sprite'
				/>
				<Input
					name='sprite_repeat_times'
					type='number'
					value={data.sprite_repeat_times}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='Sprite Repeats'
				/>
				<Toggle
					name='is_output_llm'
					value={data.is_output_llm}
					isEditing={isEditing}
					label='LLM Output'
					onChange={onFieldChange}
				/>
				<Input
					name='llm_prefix'
					type='text'
					value={data.llm_prefix || ''}
					onChange={onFieldChange}
					isEditing={isEditing}
					label='LLM Prefix'
				/>
			</form>
			<FileField
				name='script'
				label='Script '
				isEditing={isEditing}
				onUpload={handleScriptUpload}
				onDownload={handleScriptDownload}
			/>
			<RoleList
				name='assignments'
				value={assignmentInput}
				choices={roles}
				values={assignments}
				isEditing={true}
				onChange={(value) => {
					setAssignmentInput(value);
				}}
				onSend={addAssignment}
				onRemove={removeAssignment}
			/>
			<PromptList
				name='prompts'
				value={promptInput}
				isEditing={true}
				values={prompts}
				label='Prompts'
				onChange={(value) => {
					setPromptInput(value);
				}}
				onSend={addPrompt}
				onRemove={removePrompt}
			/>
		</>
	);
}

export default CommandsDetails;
