import { useState } from 'react';
import {
	UserSharp,
	ImagesSharp,
	Script,
	FactorySharp,
	ArrowBigUpSharp,
} from 'pixelarticons/react';

import { useTable } from '../../context/TableContext';
import SidebarButton from '../ui/SidebarButton';
import TopBarButton from '../ui/TopBarButton';

function Sidebar() {
	const { setActiveTable, activeTable } = useTable();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [asideToggled, setAsideToggled] = useState(false);

	const handleButtonClick = async (name: string): Promise<void> => {
		setActiveTable(name as any);
		setAsideToggled(false);
	};
	const handleButtonHover = async (
		name: string,
		description: string,
	): Promise<void> => {
		setTitle(name);
		setDescription(description);
	};
	const toggleAside = () => {
		setAsideToggled(!asideToggled);
	};

	return (
		<>
			<TopBarButton
				icon={ArrowBigUpSharp}
				className={`aside-toggle ${asideToggled && 'active'}`}
				onClick={toggleAside}
			/>
			<div className={`aside ${asideToggled && 'active'}`}>
				<div className='aside-main'>
					<SidebarButton
						content={UserSharp}
						name='Users'
						description='View and edit users. Users are used to communicate with the system and to log into the control panel'
						onClick={handleButtonClick}
						onHover={handleButtonHover}
						active={activeTable === 'Users'}
					/>
					<SidebarButton
						content={FactorySharp}
						name='Roles'
						description='Roles desc'
						onClick={handleButtonClick}
						onHover={handleButtonHover}
						active={activeTable === 'Roles'}
					/>
					<SidebarButton
						content={Script}
						name='Commands'
						description='Commands desc'
						onClick={handleButtonClick}
						onHover={handleButtonHover}
						active={activeTable === 'Commands'}
					/>
					<SidebarButton
						content={ImagesSharp}
						name='Sprites'
						description='Sprites desc'
						onClick={handleButtonClick}
						onHover={handleButtonHover}
						active={activeTable === 'Sprites'}
					/>
				</div>
				<div className='aside-desc'>
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
			</div>
		</>
	);
}

export default Sidebar;
