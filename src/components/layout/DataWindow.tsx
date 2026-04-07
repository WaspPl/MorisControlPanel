import { useState } from 'react';
import { useTable, type TableType } from '../../context/TableContext';
import TopBarButton from '../ui/TopBarButton';
import { motion } from 'framer-motion';
import { SquareSharp, CopySharp } from 'pixelarticons/react';
import ItemDetails from '../../features/universal/ItemDetails';
import ItemSummary from '../../features/universal/ItemSummary';
import { Close } from '../../assets/icons/pixelIcons';
import BackgroundBlur from '../common/BackgroundBlur';

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
		<div className='data-window-holder'>
			<BackgroundBlur active={isExpanded} onClick={closeDetals} />
			<motion.div
				onLayoutAnimationStart={() => {
					setIsAnimating(true);
				}}
				onLayoutAnimationComplete={() => {
					setIsAnimating(false);
				}}
				layout
				transition={{ type: 'spring', stiffness: 300, damping: 25 }}
				className={`data-window ${isExpanded ? 'big' : ''} ${isAnimating ? 'animating' : ''}`}
			>
				<div className='data-window-top-bar'>
					{data.id}
					<div className='buttons'>
						<TopBarButton
							icon={isExpanded ? CopySharp : SquareSharp}
							text={isExpanded ? 'Minimize' : 'Details'}
							onClick={handleClickDetails}
						/>
						<TopBarButton icon={Close} disabled />
					</div>
				</div>
				<div className='data-window-content'>
					{isExpanded ? (
						<ItemDetails table={table} itemId={data.id} isMe={isMe} />
					) : (
						<ItemSummary table={table} data={data} />
					)}
				</div>
			</motion.div>
		</div>
	);
}

export default DataWindow;
