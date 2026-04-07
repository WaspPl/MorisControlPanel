import ForeignField from '../../components/ui/ForeignField';
import Input from '../../components/ui/Input';
import Toggle from '../../components/ui/Toggle';

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
		time_updated: string;
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
			<Input
				name='time_updated'
				type='datetime-local'
				value={data?.time_updated.replace('T', ' ')}
				isEditing={false}
				label='Updated at'
			/>
		</form>
	);
}

export default CommandsSummary;
