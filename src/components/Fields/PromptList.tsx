import { useEffect, useState } from 'react';
import Input from './Input';
import Pill from './Pill';
import { useTable } from '../../context/TableContext';

type Prompt = { id: number; text: string };

type Props = {
	promptList: Prompt[];
};

function PromptList({ promptList }: Props) {
	const { createPrompt, deletePromptById, expandedWindowId } = useTable();

	const [inputValue, setInputValue] = useState<string>('');
	const [prompts, setPrompts] = useState<Prompt[]>(promptList);

	useEffect(() => {
		setPrompts(promptList);
	}, [promptList]);

	const handleCreate = async (event: any) => {
		event.preventDefault();
		if (!inputValue.trim()) return;

		const newPrompt = await createPrompt({
			text: inputValue.trim(),
			commandId: expandedWindowId,
		});

		if (newPrompt) {
			setPrompts((prev) => [...prev, newPrompt]);
			setInputValue('');
		}
	};

	const handleDelete = async (id: number) => {
		const success = await deletePromptById(id);
		if (success) {
			setPrompts((prev) => prev.filter((item) => item.id !== id));
		}
	};
	return (
		<div className='PromptList'>
			<form onSubmit={handleCreate}>
				<Input
					name='text'
					type='text'
					value={inputValue}
					setValue={setInputValue}
					isEditing={true}
				/>
				<button type='submit' />
			</form>
			<div className='List'>
				{prompts &&
					prompts.map((prompt) => (
						<Pill
							key={prompt.id}
							id={prompt.id}
							text={prompt.text}
							onDelete={handleDelete}
						/>
					))}
			</div>
		</div>
	);
}

export default PromptList;
