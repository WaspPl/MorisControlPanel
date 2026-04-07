import { useState } from 'react';
import {
	UserSharp,
	ImagesSharp,
	Script,
	FactorySharp,
} from 'pixelarticons/react';

import { useTable } from '../../context/TableContext';
import SidebarButton from '../ui/SidebarButton';

function Sidebar() {
	const { setActiveTable } = useTable();

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleButtonClick = async (name: string): Promise<void> => {
		setActiveTable(name as any);
	};
	const handleButtonHover = async (
		name: string,
		description: string,
	): Promise<void> => {
		setTitle(name);
		setDescription(description);
	};

	return (
		<div className='Sidebar'>
			<div className='IconHolder'>
				<SidebarButton
					content={UserSharp}
					name='Users'
					description='View and edit users. Users are used to communicate with the system and to log into the control panel'
					onClick={handleButtonClick}
					onHover={handleButtonHover}
				/>
				<SidebarButton
					content={FactorySharp}
					name='Roles'
					description='Roles desc'
					onClick={handleButtonClick}
					onHover={handleButtonHover}
				/>
				<SidebarButton
					content={Script}
					name='Commands'
					description='Commands desc'
					onClick={handleButtonClick}
					onHover={handleButtonHover}
				/>
				<SidebarButton
					content={ImagesSharp}
					name='Sprites'
					description='Sprites desc'
					onClick={handleButtonClick}
					onHover={handleButtonHover}
				/>
			</div>
			<div className={`DescriptionHolder`}>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default Sidebar;
