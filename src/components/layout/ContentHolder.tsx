import { AnimatePresence, motion } from 'framer-motion';
import { useTable } from '../../context/TableContext';
import DataWindow from './DataWindow';
import { useEffect, useState, useRef, useCallback } from 'react';
import CreateWindow from './CreateWindow';

function ContentHolder() {
	const { items, activeTable, getItems, setItems, currentUser } = useTable();
	const [isMore, setIsMore] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const observerTarget = useRef(null);

	useEffect(() => {
		let isMounted = true;
		const fetchInitial = async () => {
			setIsLoading(true);
			const limit = currentUser?.role_id === 1 ? 5 : 6;
			const fetched = await getItems(activeTable, limit);

			if (isMounted) {
				setItems(fetched);
				setIsMore(fetched.length === limit);
				setIsLoading(false);
			}
		};
		fetchInitial();
		return () => {
			isMounted = false;
		};
	}, [activeTable, currentUser?.role_id]);

	const loadMore = useCallback(async () => {
		if (isLoading || !isMore) return;

		setIsLoading(true);
		const fetchLimit = 6;
		const currentOffset = items.length;

		const received = await getItems(
			activeTable,
			fetchLimit,
			currentOffset,
			true,
		);

		if (received.length < fetchLimit) {
			setIsMore(false);
		}
		setItems([...items, ...received]);

		setIsLoading(false);
	}, [activeTable, items.length, isMore, isLoading, getItems, setItems]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && isMore && !isLoading) {
					loadMore();
				}
			},
			{
				rootMargin: '200px',
				threshold: 0.1,
			},
		);

		if (observerTarget.current) {
			observer.observe(observerTarget.current);
		}

		return () => observer.disconnect();
	}, [loadMore, isMore, isLoading]);

	return (
		<div className='main'>
			<div className='main-list-border'>
				<div className='main-list'>
					<div className='main-list-grid'>
						<AnimatePresence mode='popLayout'>
							{currentUser?.role_id === 1 && <CreateWindow id={-1} />}
							{items?.map((item: any) => (
								<motion.div
									className='motion-div'
									key={item.id}
									layout
									initial={{ scale: 0.8, opacity: 0 }}
									animate={{ scale: 1, opacity: 1 }}
									exit={{ scale: 0.8, opacity: 0 }}
									transition={{ duration: 0.2 }}
								>
									<DataWindow data={item} table={activeTable} isMe={false} />
								</motion.div>
							))}
						</AnimatePresence>

						{isMore && (
							<div
								ref={observerTarget}
								style={{ height: '40px', textAlign: 'center' }}
							>
								{isLoading && <span>Loading more items...</span>}
							</div>
						)}
					</div>
				</div>
			</div>
			<div className='moved-away'>
				<DataWindow data={currentUser} table='Me' isMe={true} id={-2} />
			</div>
		</div>
	);
}

export default ContentHolder;
