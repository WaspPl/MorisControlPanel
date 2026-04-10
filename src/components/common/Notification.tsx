import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useTable } from '../../context/TableContext';
import TopBarButton from '../ui/TopBarButton';
import { Close } from '../../assets/icons/pixelIcons';

type Props = {
	id: string;
	status: number;
	content: string;
};

function Notification({ id, status, content }: Props) {
	useEffect(() => {
		const close = async () => {
			await sleep(3000);
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
