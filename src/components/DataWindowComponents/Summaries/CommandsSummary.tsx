import ForeignField from '../../fields/ForeignField';
import Input from '../../fields/Input';
import Toggle from '../../fields/Toggle';

type Props = {
	data: {
		id: number;
		name: string;
		description: string;
		sprite?: {
			id: number;
			name: string;
		};
		sprite_repeat_times: number;
		is_output_llm: boolean;
		llm_prefix?: string;
	};
};

function CommandsSummary({ data }: Props) {
	if (!data) return null;
	return (
		<form>
			<Input
				name='name'
				type='text'
				value={data?.name}
				isEditing={false}
				label='Name'
			/>
			<Input
				name='description'
				type='text'
				value={data?.description}
				isEditing={false}
				label='Description'
			/>
			<ForeignField
				name='sprite'
				item={data?.sprite}
				foreignItemTable='Sprites'
				label='Sprite'
			/>
			<Toggle
				name='is_output_llm'
				value={data?.is_output_llm}
				isEditing={false}
				label='LLM Output'
			/>
		</form>
	);
}

export default CommandsSummary;
