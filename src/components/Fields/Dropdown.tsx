import { useEffect, useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';

interface Choice {
	id: number | string;
	name: string;
}

type DropdownProps = {
	name: string;
	value: string | number;
	isEditing: boolean;
	choicesTable: TableType;
	label?: string;
	onSelect: (value: any) => void;
};

function Dropdown({
	name,
	value,
	isEditing,
	choicesTable,
	onSelect,
	label,
}: DropdownProps) {
	const { getItems } = useTable();
	const [choices, setChoices] = useState<Choice[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchChoices = async () => {
			setLoading(true);
			try {
				const data = await getItems(choicesTable);
				setChoices(data);
			} catch (err) {
				console.error(`Failed to fetch choices for ${choicesTable}`, err);
			} finally {
				setLoading(false);
			}
		};

		fetchChoices();
	}, [choicesTable, getItems]);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		const numericValue = Number(selectedValue);
		const finalValue = isNaN(numericValue) ? selectedValue : numericValue;

		onSelect(finalValue);
	};

	return (
		<div className='Dropdown'>
			{label && <label htmlFor={name}>{label}</label>}
			<select
				name={name}
				id={name}
				value={value || ''}
				onChange={handleChange}
				disabled={!isEditing || loading}
			>
				<option value='' disabled>
					{loading ? 'Loading...' : '-- Select Option --'}
				</option>
				{choices.map((choice) => (
					<option key={choice.id} value={choice.id}>
						{choice.name}
					</option>
				))}
			</select>
		</div>
	);
}

export default Dropdown;
