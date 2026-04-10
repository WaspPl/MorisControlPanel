import { useTable } from '../../context/TableContext';
import Notification from '../common/Notification';

type Props = {};

function NotificationHolder({}: Props) {
	const { notifications } = useTable();

	return (
		<div className='NotificationHolder'>
			{notifications.map((n: any) => (
				<Notification
					key={n.id}
					id={n.id}
					status={n.status}
					content={n.content}
				/>
			))}
		</div>
	);
}

export default NotificationHolder;
