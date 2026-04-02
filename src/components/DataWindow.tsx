import { useState } from 'react';
import { useTable, type TableType } from '../context/TableContext';
import TopBarButton from './TopBarButton';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareSharp, CopySharp } from 'pixelarticons/react';
import ItemDetails from './DataWindowComponents/ItemDetails';
import ItemSummary from './DataWindowComponents/ItemSummary';

type Props = {
	data: any;
	table: TableType;
	isMe: boolean;
	id?: number;
};

const Close = ({ size = 24, color = 'currentColor' }) => (
	<svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
		<path
			d='M5 5h2v2H5V5Zm4 4H7V7h2v2Zm2 2H9V9h2v2Zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2Zm2-2v2h-2V9h2Zm2-2v2h-2V7h2Zm0 0V5h2v2h-2Z'
			fill={color}
		/>
	</svg>
);

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
