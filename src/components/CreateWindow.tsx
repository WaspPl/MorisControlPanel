import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useTable, type TableType } from '../context/TableContext';
import { Table_Schemas } from '../schemas/tableConfig';
import TopBarButton from './TopBarButton';
import { CopySharp, SquareSharp } from 'pixelarticons/react';
import GenericField from './GenericField';
import Button from '../shared/ui/Button';
import BackgroundBlur from './BackgroundBlur';
import { useAuth } from '../features/auth/AuthContext';

type Props = {
	table: TableType;
};

function CreateWindow({ table }: Props) {
	const { createItem, expandedWindowId, setExpandedWindowId, setItems, items } =
		useTable();
	const { isAdmin } = useAuth();

	// States
	const [isAnimating, setIsAnimating] = useState(false);
	const [formData, setFormData] = useState<Record<string, any>>(() => {
		const initialState: Record<string, any> = {};
		const schema = Table_Schemas[table];
		schema.fields.forEach((field) => {
			if (schema.create.includes(field.name)) {
				initialState[field.apiKey] = field.type === 'checkbox' ? false : '';
			}
		});
		return initialState;
	});
	const isExpanded = expandedWindowId === -1;
	const schema = Table_Schemas[table];

	if (!isAdmin) return null;

	//UseEffect
	useEffect(() => {
		const resetState: Record<string, any> = {};
		Table_Schemas[table].fields.forEach((field) => {
			if (!schema.create.includes(field.name)) return;
			resetState[field.apiKey] = field.type === 'checkbox' ? false : '';
		});
		setFormData(resetState);
	}, [table]);

	//Handlers

	const handleMinimize = () => {
		setExpandedWindowId(null);
		setFormData({});
	};

	const handleSave = async (event: React.SubmitEvent) => {
		event.preventDefault();
		console.log(formData);
		const success = await createItem(table, formData);
		if (success) {
			setExpandedWindowId(null);
			setItems([...items, success]);
			setFormData({});
		}
	};

	const handleFieldChange = (_name: string, newValue: any, apiKey: string) => {
		setFormData((prev: any) => {
			const updated = { ...prev };
			updated[apiKey] = newValue;
			return updated;
		});
	};

	return (
		<div className='DataWindowHolder EditWindow'>
			{isExpanded && <BackgroundBlur onClick={handleMinimize} />}
			<motion.div
				layout
				onLayoutAnimationStart={() => setIsAnimating(true)}
				onLayoutAnimationComplete={() => setIsAnimating(false)}
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				className={`DataWindow ${isExpanded ? 'BigDataWindow' : ''} ${isAnimating ? 'Animating' : ''}`}
			>
				<div className='DataWindowTopBar'>
					<span className='IdBadge'>#Create New</span>
					<div className='ButtonContainer'>
						<TopBarButton
							icon={isExpanded ? CopySharp : SquareSharp}
							text={isExpanded ? 'Minimize' : 'Details'}
							onClick={
								isExpanded ? handleMinimize : () => setExpandedWindowId(-1)
							}
						/>
					</div>
				</div>

				<form onSubmit={handleSave}>
					{isExpanded ? (
						<div className='FormWrapper'>
							{schema.fields
								.filter((field) => schema.create.includes(field.name))
								.map((field) => {
									return (
										<GenericField
											key={field.name}
											fieldConfig={field}
											value={formData[field.apiKey] ?? ''}
											isEditing={true}
											onChange={handleFieldChange}
											isExpanded={isExpanded}
										/>
									);
								})}
						</div>
					) : (
						'+'
					)}
					{isExpanded && <Button label={'Save'} onClick={handleSave} />}
				</form>
			</motion.div>
		</div>
	);
}

export default CreateWindow;
