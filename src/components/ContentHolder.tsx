import { AnimatePresence, motion } from 'framer-motion';
import { useTable } from '../context/TableContext';
import DataWindow from './DataWindow';
import { useEffect, useState } from 'react';
import CreateWindow from './CreateWindow';
import Button from './fields/Button';

function ContentHolder() {
	const { items, activeTable, getItems, setItems } = useTable();

	const [isMore, setIsMore] = useState<boolean>(true);
	useEffect(() => {
		const fetchItems = async () => {
			const items = await getItems(activeTable);
			setItems(items);
		};
		fetchItems();
	}, [activeTable]);

	const loadMore = async () => {
		const recieved = await getItems(activeTable, 6, items.length, true);
		if (recieved.length == 0) {
			setIsMore(false);
		}
		setItems([...items, ...recieved]);
	};

	return (
		<div className='ContentHolder'>
			<div className='ListWrapper'>
				<div className='ListHolder' key={activeTable}>
					<AnimatePresence mode='popLayout'>
						<CreateWindow id={-1} />
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
					{isMore && (
						<div className='LoadMore'>
							<Button label='Load More' onClick={loadMore} variant='Success' />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default ContentHolder;
