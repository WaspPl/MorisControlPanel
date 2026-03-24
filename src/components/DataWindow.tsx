import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareSharp, CopySharp } from 'pixelarticons/react';
import { useTable, type TableType } from '../context/TableContext';
import { Table_Schemas } from '../schemas/tableConfig';
import GenericField from './GenericField';
import TopBarButton from './TopBarButton';
import DetailsButtons from './DetailsButtons';
import BackgroundBlur from './BackgroundBlur';

type Props = {
	data: any;
	table: TableType;
};

function DataWindow({ data, table }: Props) {
	const {
		getItemDetailsById,
		updateItemById,
		expandedWindowId,
		setExpandedWindowId,
		deleteItemById,
		setItems,
		items,
	} = useTable();

	// States
	const [isEditing, setIsEditing] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);
	const [expandedData, setExpandedData] = useState<any>(null);
	const [draft, setDraft] = useState<any>(null);

	const isExpanded = expandedWindowId === data.id;
	const schema = Table_Schemas[table];

	// Fetch data
	useEffect(() => {
		if (isExpanded && !expandedData) {
			const getData = async () => {
				const result = await getItemDetailsById(table, data.id);
				setExpandedData(result);
				setDraft(result);
			};
			getData();
		} else {
			setDraft(null);
		}
		if (!isExpanded) setExpandedData(null);
	}, [isExpanded, data.id, table, getItemDetailsById]);

	// Handlers
	const handleFieldChange = (_name: string, newValue: any, apiKey: string) => {
		setDraft((prev: any) => {
			const updated = { ...prev };
			updated[apiKey] = newValue;
			return updated;
		});
	};
	const handleMinimize = () => {
		setIsEditing(false);
		setExpandedWindowId(null);
	};
	const handleSave = async (e: any) => {
		e.preventDefault();
		console.log(draft);
		const success = await updateItemById(table, data.id, draft);
		if (success) {
			setExpandedData(draft);
			setIsEditing(false);
			setItems(
				items.map((item) => {
					if (item.id == success.id) return success;
					return item;
				}),
			);
		}
	};
	const handleCancel = (e: any) => {
		e.preventDefault();
		setDraft(expandedData);
		setIsEditing(false);
	};
	const handleDelete = async (e: any) => {
		e.preventDefault();
		const response = await deleteItemById(table, data.id);
		if (response) {
			setExpandedWindowId(null);
			setItems(items.filter((item) => item.id != data.id));
		}
	};

	const currentData = isExpanded ? draft || expandedData || data : data;

	return (
		<div className='DataWindowHolder'>
			{isExpanded && <BackgroundBlur onClick={handleMinimize} />}
			<motion.div
				layout
				onLayoutAnimationStart={() => setIsAnimating(true)}
				onLayoutAnimationComplete={() => setIsAnimating(false)}
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				className={`DataWindow ${isExpanded ? 'BigDataWindow' : ''} ${isAnimating ? 'Animating' : ''}`}
			>
				<div className='DataWindowTopBar'>
					<span className='IdBadge'>#{data.id}</span>
					<div className='ButtonContainer'>
						<TopBarButton
							icon={isExpanded ? CopySharp : SquareSharp}
							text={isExpanded ? 'Minimize' : 'Details'}
							onClick={
								isExpanded ? handleMinimize : () => setExpandedWindowId(data.id)
							}
						/>
					</div>
				</div>

				<form onSubmit={handleSave}>
					<div className='FormWrapper'>
						{schema.fields.map((field) => {
							if (!isExpanded && !schema.summary.includes(field.name))
								return null;
							const valueKey = currentData[field.apiKey]
								? field.apiKey
								: field.name;
							return (
								<GenericField
									key={field.name}
									fieldConfig={field}
									value={currentData[valueKey]}
									isEditing={isEditing}
									onChange={handleFieldChange}
									isExpanded={isExpanded}
								/>
							);
						})}
					</div>

					<AnimatePresence>
						{isExpanded && (
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0 }}
							>
								<DetailsButtons
									isEditing={isEditing}
									setIsEditing={setIsEditing}
									onCancel={handleCancel}
									onDelete={handleDelete}
								/>
							</motion.div>
						)}
					</AnimatePresence>
				</form>
			</motion.div>
		</div>
	);
}

export default DataWindow;
