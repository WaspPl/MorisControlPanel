import { useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';
import TopBarButton from '../ui/TopBarButton';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareSharp, CopySharp } from 'pixelarticons/react';
import ItemDetails from '../../features/universal/ItemDetails';
import ItemSummary from '../../features/universal/ItemSummary';
import { Close } from '../../assets/icons/pixelIcons';

type Props = {
	data: any;
	table: TableType;
	isMe: boolean;
	id?: number;
};

function DataWindow({ data, table, isMe, id }: Props) {
	const { expandedWindowId, setExpandedWindowId } = useTable();
	const [isAnimating, setIsAnimating] = useState(false);

	const itemId = id || data.id;

	const isExpanded: boolean = expandedWindowId == itemId;

	const handleClickDetails = () => {
		setExpandedWindowId(isExpanded ? null : itemId);
	};
	const closeDetals = () => {
		setExpandedWindowId(null);
	};
	if (!data) return null;
	return (
		<div className='DataWindowHolder'>
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='BackgroundBlur'
						onClick={closeDetals}
					/>
				)}
			</AnimatePresence>
			<motion.div
				onLayoutAnimationStart={() => {
					setIsAnimating(true);
				}}
				onLayoutAnimationComplete={() => {
					setIsAnimating(false);
				}}
				layout
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				className={`DataWindow ${isExpanded ? 'BigDataWindow' : ''} ${isAnimating ? 'Animating' : ''}`}
			>
				<div className='DataWindowTopBar'>
					{data.id}
					<div className='ButtonContainer'>
						<TopBarButton
							icon={isExpanded ? CopySharp : SquareSharp}
							text={isExpanded ? 'Minimize' : 'Details'}
							onClick={handleClickDetails}
						/>
						<TopBarButton icon={Close} disabled />
					</div>
				</div>
				{isExpanded ? (
					<ItemDetails table={table} itemId={data.id} isMe={isMe} />
				) : (
					<ItemSummary table={table} data={data} />
				)}
			</motion.div>
		</div>
	);
}

export default DataWindow;
