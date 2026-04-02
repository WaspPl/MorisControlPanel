import { useEffect, useState } from 'react';
import Input from '../../fields/Input';
import Dropdown from '../../fields/Dropdown';
import { useTable } from '../../../context/TableContext';
import Toggle from '../../fields/Toggle';

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
		<form onSubmit={onSave}>
			<Input
				name='name'
				type='text'
				value={data?.name}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Name'
			/>
			<Input
				name='description'
				type='text'
				value={data?.description}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Description'
			/>
			<Dropdown
				name='sprite_id'
				value={data?.sprite_id}
				onChange={onFieldChange}
				isEditing={isEditing}
				choices={sprites}
				label='Sprite'
			/>
			<Input
				name='sprite_repeat_times'
				type='number'
				value={data?.sprite_repeat_times}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='Spite Repeats'
			/>
			<Toggle
				name='is_output_llm'
				value={data?.is_output_llm}
				isEditing={isEditing}
				label='LLM Output'
				onChange={onFieldChange}
			/>
			<Input
				name='llm_prefix'
				type='text'
				value={data?.llm_prefix}
				onChange={onFieldChange}
				isEditing={isEditing}
				label='LLM Prefix'
			/>
			<button type='submit' style={{ display: 'none' }} />
		</form>
	);
}

export default CommandsCreate;
