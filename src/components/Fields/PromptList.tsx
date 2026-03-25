import { useEffect, useState } from 'react';
import Input from './Input';
import Pill from './Pill';
import { useTable } from '../../context/TableContext';
import { useAuth } from '../../features/auth/AuthContext';

type Prompt = { id: number; text: string };

type Props = {
	promptList?: Prompt[];
	commandId?: number | null;
	canEdit?: boolean;
};

function PromptList({ promptList, commandId = null, canEdit = false }: Props) {
	const { createPrompt, deletePromptById } = useTable();
	const { isAdmin } = useAuth();
	const canModify = isAdmin && canEdit;

	const [inputValue, setInputValue] = useState<string>('');
	const [prompts, setPrompts] = useState<Prompt[]>(promptList || []);

	useEffect(() => {
		setPrompts(promptList || []);
	}, [promptList]);

	const handleCreate = async () => {
		if (!canModify) return;
		if (!commandId) return;
		if (!inputValue.trim()) return;

		const newPrompt = await createPrompt({
			text: inputValue.trim(),
			commandId,
		});

		if (newPrompt) {
			setPrompts((prev) => [...prev, newPrompt]);
			setInputValue('');
		}
	};

	const handleDelete = async (id: number) => {
		if (!canModify) return;
		await deletePromptById(id);
		setPrompts((prev) => prev.filter((item) => item.id !== id));
	};
	return (
		<div className='PromptList'>
			{canModify && (
				<div
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							handleCreate();
						}
					}}
				>
					<Input
						name='text'
						type='text'
						value={inputValue}
						setValue={setInputValue}
						isEditing={true}
						placeholder='Enter prompt...'
					/>
					<button type='button' onClick={handleCreate}>
						Add
					</button>
				</div>
			)}
			<div className='List'>
				{prompts &&
					prompts.map((prompt) => (
						<Pill
							key={prompt.id}
							id={prompt.id}
							text={prompt.text}
							onDelete={handleDelete}
							canDelete={canModify}
						/>
					))}
			</div>
		</div>
	);
}

export default PromptList;
