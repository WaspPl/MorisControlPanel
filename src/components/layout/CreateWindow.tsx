import { useState } from 'react';
import { useTable } from '../../context/TableContext';
import TopBarButton from '../ui/TopBarButton';
import { motion } from 'framer-motion';
import { SquareSharp, CopySharp, Plus } from 'pixelarticons/react';
import ItemCreate from '../../features/universal/ItemCreate';
import { Close } from '../../assets/icons/pixelIcons';
import BackgroundBlur from '../common/BackgroundBlur';

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
				className={`data-window create ${isExpanded ? 'big' : ''} ${isAnimating ? 'animating' : ''}`}
			>
				<div className='data-window-top-bar'>
					Create
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
						<ItemCreate table={activeTable} />
					) : (
						<div className='create-content' onClick={handleClickDetails}>
							<Plus height={64} width={64} />
						</div>
					)}
				</div>
			</motion.div>
		</div>
	);
}

export default CreateWindow;
