type Props = { label: string; items: any[]; isEditing: boolean };

function ListField({ label, items, isEditing }: Props) {
	return (
		<div className='Input'>
			<label>{label}</label>
			<div className='PillContainer'>
				{items?.map((item) => (
					<span key={item.id} className='Pill'>
						{item.name}
						{isEditing && <button className='RemovePill'>×</button>}
					</span>
				))}
				{isEditing && <button className='AddPill'>+ Add</button>}
			</div>
		</div>
	);
}

export default ListField;
