import { useEffect, useState } from 'react';
import { useTable } from '../context/TableContext';
import UsersData from './DataComponents/UsersData';
import UsersDetailsData from './DataComponents/UsersDetailsData';
import TopBarButton from './TopBarButton';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareSharp, CopySharp } from 'pixelarticons/react';
import UniversalData from './DataComponents/UniverstalData';

type Props = {
	data: any;
};

const Close = ({ size = 24, color = 'currentColor' }) => (
	<svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
		<path
			d='M5 5h2v2H5V5Zm4 4H7V7h2v2Zm2 2H9V9h2v2Zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2Zm2-2v2h-2V9h2Zm2-2v2h-2V7h2Zm0 0V5h2v2h-2Z'
			fill={color}
		/>
	</svg>
);

function DataWindow({ data }: Props) {
	const {
		activeTable,
		getItemDetailsById,
		expandedWindowId,
		setExpandedWindowId,
	} = useTable();
	const [isAnimating, setIsAnimating] = useState(false);
	const [expandedData, setExpandedData] = useState(null);

	const dataToDisplay = expandedWindowId == data.id ? expandedData : data;
	const TableRegistry: Record<string, { summary: any; details: any }> = {
		Users: { summary: UsersData, details: UsersDetailsData },
		Roles: { summary: UniversalData, details: UniversalData },
		Commands: { summary: UniversalData, details: UniversalData },
		Sprites: { summary: UniversalData, details: UniversalData },
	};

	const Config = TableRegistry[activeTable] || TableRegistry['Users'];

	const CurrentView =
		expandedWindowId == data.id ? Config.details : Config.summary;

	const handleClickDetails = () => {
		setExpandedWindowId(expandedWindowId == data.id ? null : data.id);
	};
	const closeDetals = () => {
		setExpandedWindowId(null);
	};

	useEffect(() => {
		if (expandedWindowId == data.id) {
			const getData = async () => {
				let result = await getItemDetailsById(activeTable, data.id);
				setExpandedData(result);
			};
			getData();
		}
	}, [expandedWindowId]);

	return (
		<div className='DataWindowHolder'>
			<AnimatePresence>
				{expandedWindowId == data.id && (
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
				className={`DataWindow ${expandedWindowId == data.id ? 'BigDataWindow' : ''} ${isAnimating ? 'Animating' : ''}`}
			>
				<div className='DataWindowTopBar'>
					{data.id}
					<div className='ButtonContainer'>
						<TopBarButton
							icon={expandedWindowId == data.id ? CopySharp : SquareSharp}
							text={expandedWindowId == data.id ? 'Minimize' : 'Details'}
							onClick={handleClickDetails}
						/>
						<TopBarButton icon={Close} disabled />
					</div>
				</div>
				<CurrentView data={dataToDisplay} />
			</motion.div>
		</div>
	);
}

export default DataWindow;
