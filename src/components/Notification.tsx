import { motion } from 'framer-motion';
import TopBarButton from './TopBarButton';
import { useTable } from '../context/TableContext';
import { useEffect } from 'react';

type Props = {
	id: string;
	status: number;
	content: string;
};

function Notification({ id, status, content }: Props) {
	const Close = ({ size = 24, color = 'currentColor' }) => (
		<svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
			<path
				d='M5 5h2v2H5V5Zm4 4H7V7h2v2Zm2 2H9V9h2v2Zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2Zm2-2v2h-2V9h2Zm2-2v2h-2V7h2Zm0 0V5h2v2h-2Z'
				fill={color}
			/>
		</svg>
	);

	useEffect(() => {
		const close = async () => {
			await sleep(10000);
			handleClose();
		};
		close();
	}, []);

	const { removeNotification, sleep } = useTable();
	const handleClose = () => {
		removeNotification(id);
	};
	return (
		<motion.div
			layout
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
			className={`Notification`}
		>
			<div className='DataWindowTopBar'>
				{status}
				<div className='ButtonContainer'>
					<TopBarButton icon={Close} onClick={handleClose} />
				</div>
			</div>
			{content}
		</motion.div>
	);
}

export default Notification;
