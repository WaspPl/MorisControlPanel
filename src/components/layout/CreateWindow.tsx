import { useState } from 'react';
import { useTable } from '../../context/TableContext';
import TopBarButton from '../ui/TopBarButton';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareSharp, CopySharp } from 'pixelarticons/react';
import ItemCreate from '../../features/universal/ItemCreate';
import { Close } from '../../assets/icons/pixelIcons';

type Props = {
	id: number;
};

function CreateWindow({ id }: Props) {
	const { activeTable, expandedWindowId, setExpandedWindowId } = useTable();
	const [isAnimating, setIsAnimating] = useState(false);

	const isExpanded: boolean = expandedWindowId == id;

	const handleClickDetails = () => {
		setExpandedWindowId(isExpanded ? null : id);
	};
	const closeDetals = () => {
		setExpandedWindowId(null);
	};

	return (
		<div className='DataWindowHolder'>
			<AnimatePresence>
				{expandedWindowId == id && (
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
				className={`CreateWindow DataWindow ${isExpanded ? 'BigDataWindow' : ''} ${isAnimating ? 'Animating' : ''}`}
			>
				<div className='DataWindowTopBar'>
					Create
					<div className='ButtonContainer'>
						<TopBarButton
							icon={isExpanded ? CopySharp : SquareSharp}
							text={isExpanded ? 'Minimize' : 'Details'}
							onClick={handleClickDetails}
						/>
						<TopBarButton icon={Close} disabled />
					</div>
				</div>
				{isExpanded ? <ItemCreate table={activeTable} /> : <p>+</p>}
			</motion.div>
		</div>
	);
}

export default CreateWindow;
