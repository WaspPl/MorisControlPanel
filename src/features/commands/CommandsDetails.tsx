import { useEffect, useState } from 'react';
import { useTable } from '../../context/TableContext';
import Input from '../../components/ui/Input';
import Dropdown from '../../components/ui/Dropdown';
import Toggle from '../../components/ui/Toggle';
import FileField from '../../components/ui/FileField';
import RoleList from '../../components/ui/RoleList';
import PromptList from '../../components/ui/PromptList';

type Props = {
	data: {
		id: number;
		name: string;
		description: string;
		sprite_id?: number;
		sprite_repeat_times: number;
		is_output_llm: boolean;
		llm_prefix: string;
		prompts: { id: number; text: string }[];
		assignments: { id: number; role: { id: number; name: string } }[];
		time_created: string;
		time_updated: string;
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

	const {
		getItems,
		createItem,
		deleteItemById,
		getScript,
		createScript,
		currentUser,
	} = useTable();

	useEffect(() => {
		const fetchData = async () => {
			const fetchedSprites = await getItems('Sprites');
			setSprites(fetchedSprites);
			const fetchedRoles = await getItems('Roles');
			setRoles(fetchedRoles);
		};

		fetchData();
	}, []);

	const isAdmin = currentUser?.role_id == 1;

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
		await createScript(data.id, script);
	};
	return (
		<>
			<form id='details' onSubmit={onSave} className='details-form'>
				<div className='details-column'>
					<Input
						name='name'
						type='text'
						value={data?.name}
						onChange={onFieldChange}
						isEditing={isEditing}
						label='Name'
						placeholder='eg. Say hello'
						title='A name for your command. Used to help you identify it.'
						required
					/>
					<Input
						name='description'
						type='text'
						value={data?.description}
						onChange={onFieldChange}
						isEditing={isEditing}
						label='Description'
						placeholder='eg. A command that returns "hello". No arguments'
						title='A description for your command. It should specify what it does and possible arguments.'
						required
					/>
				</div>
				<div className='details-column'>
					<Dropdown
						name='sprite_id'
						value={data?.sprite_id}
						onChange={onFieldChange}
						isEditing={isEditing}
						choices={sprites}
						label='Sprite'
						title='A sprite assigned to this command. This image gets sent to the display service.'
					/>
					<Input
						name='sprite_repeat_times'
						type='number'
						value={data?.sprite_repeat_times}
						onChange={onFieldChange}
						isEditing={isEditing}
						label='Spite Repeats'
						placeholder='eg. 1'
						title='How many times the sprite should loop. If no sprite is provided it doesnt do anything'
						required
					/>
					<Toggle
						name='is_output_llm'
						value={data?.is_output_llm}
						isEditing={isEditing}
						label='LLM Output'
						onChange={onFieldChange}
						title='Should the output of the command be sent to an LLM'
					/>
					<Input
						name='llm_prefix'
						type='text'
						value={data?.llm_prefix}
						onChange={onFieldChange}
						isEditing={isEditing}
						label='LLM Prefix'
						placeholder='eg. Tell me you just said hello as a response to: '
						title="Text that'll be sent to the llm before the command output"
					/>
				</div>
				<input type='submit' id='submit-hidden' />
			</form>
			<div className='details-column'>
				<Input
					name='time_updated'
					type='datetime-local'
					value={data?.time_updated.replace('T', ' ')}
					isEditing={false}
					label='Updated at'
					title='The date this command was last updated'
				/>
				<Input
					name='time_created'
					type='datetime-local'
					value={data?.time_created.replace('T', ' ')}
					isEditing={false}
					label='Created at'
					title='The date this command was first created'
				/>
				<FileField
					name='script'
					label='Script '
					isEditing={isEditing}
					onUpload={handleScriptUpload}
					onDownload={handleScriptDownload}
				/>
			</div>
			<div className='details-column list-column'>
				<RoleList
					name='assignments'
					value={assignmentInput}
					label='Roles'
					choices={roles}
					values={assignments}
					isEditing={isAdmin}
					onChange={(value) => {
						setAssignmentInput(value);
					}}
					onSend={addAssignment}
					onRemove={removeAssignment}
				/>
				<PromptList
					name='prompts'
					value={promptInput}
					isEditing={isAdmin}
					values={prompts}
					label='Prompts'
					onChange={(value) => {
						setPromptInput(value);
					}}
					onSend={addPrompt}
					onRemove={removePrompt}
				/>
			</div>
		</>
	);
}

export default CommandsDetails;
