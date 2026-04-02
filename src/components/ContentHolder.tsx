import { AnimatePresence, motion } from 'framer-motion';
import { useTable } from '../context/TableContext';
import DataWindow from './DataWindow';
import { useEffect, useState } from 'react';
import CreateWindow from './CreateWindow';
import Button from './fields/Button';

function ContentHolder() {
	const { items, activeTable, getItems, setItems, currentUser } = useTable();

	const [isMore, setIsMore] = useState<boolean>(true);
	useEffect(() => {
		const fetchItems = async () => {
			const limit = currentUser?.role_id == 1 ? 5 : 6;
			const fetched = await getItems(activeTable, limit);
			setItems(fetched);
		};
		fetchItems();
		setIsMore(true);
	}, [activeTable]);

	const loadMore = async () => {
		const itemsVisible = (currentUser?.role_id == 1 ? 1 : 0) + items.length;
		const recieved = await getItems(
			activeTable,
			6 - (itemsVisible % 6),
			items.length,
			true,
		);
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
						{currentUser?.role_id == 1 && <CreateWindow id={-1} />}
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
								<DataWindow data={item} table={activeTable} isMe={false} />
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
			<div className='MeWindow'>
				<DataWindow data={currentUser} table='Me' isMe={true} id={-2} />
			</div>
		</div>
	);
}

export default ContentHolder;
