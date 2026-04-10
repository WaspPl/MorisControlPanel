import { useEffect, useState } from 'react';
import Input from '../../components/ui/Input';
import Dropdown from '../../components/ui/Dropdown';
import { useTable } from '../../context/TableContext';
import Toggle from '../../components/ui/Toggle';

type Props = {
	data: {
		name: string;
		description: string;
		sprite_id?: number;
		sprite_repeat_times: number;
		is_output_llm: boolean;
		llm_prefix: string | null;
	};
	onFieldChange: (value: any, ApiField: string) => void;
	isEditing: boolean;
	onSave: () => void;
};

function CommandsCreate({ data, onFieldChange, isEditing, onSave }: Props) {
	const [sprites, setSprites] = useState<any[]>([]);

	const { getItems } = useTable();

	const defaultValues = {
		name: '',
		description: '',
		sprite_id: undefined,
		sprite_repeat_times: 1,
		is_output_llm: false,
		llm_prefix: null,
	};

	useEffect(() => {
		const fetchSprites = async () => {
			const result = await getItems('Sprites');
			setSprites(result);
		};
		const setDefaults = () => {
			Object.entries(defaultValues).map(([key, value]) => {
				onFieldChange(value, key);
			});
		};

		fetchSprites();
		setDefaults();
	}, []);

	return (
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
			<div className='details-column'></div>
			<input type='submit' id='submit-hidden' />{' '}
		</form>
	);
}

export default CommandsCreate;
