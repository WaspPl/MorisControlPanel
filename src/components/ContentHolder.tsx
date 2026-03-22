import { AnimatePresence, motion } from 'framer-motion';
import { useTable } from '../context/TableContext';
import DataWindow from './DataWindow';
import { useEffect } from 'react';

function ContentHolder() {
	const { items, activeTable, getItems, setItems } = useTable();

	useEffect(() => {
		const fetchItems = async () => {
			let items = await getItems(activeTable);
			setItems(items);
		};
		fetchItems();
	}, [activeTable]);

	return (
		<div className='ContentHolder'>
			<div className='ListWrapper'>
				<div className='ListHolder' key={activeTable}>
					<AnimatePresence mode='popLayout'>
						{items.map((item: any) => (
							<motion.div
								key={item.id}
								layout
								initial={{ scale: 0.5, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.5, opacity: 0 }}
								transition={{ duration: 0.2 }}
								style={{ height: 'fit-content' }}
							>
								<DataWindow data={item} />
							</motion.div>
						))}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

export default ContentHolder;
