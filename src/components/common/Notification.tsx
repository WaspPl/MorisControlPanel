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

	const statusGroup = status.toString()[0];
	const variant =
		statusGroup == '5' || statusGroup == '4'
			? 'danger'
			: statusGroup == '2'
				? 'success'
				: 'warning';

	return (
		<motion.div
			layout
			transition={{ type: 'spring', stiffness: 300, damping: 25 }}
			className={`notification ${variant}`}
		>
			<div className={`notification-top-bar ${variant}`}>
				{status}
				<TopBarButton icon={Close} onClick={handleClose} />
			</div>
			{content}
		</motion.div>
	);
}

export default Notification;
