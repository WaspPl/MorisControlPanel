import { Close } from '../../assets/icons/pixelIcons';
import { useTable } from '../../context/TableContext';
import Logo from '../common/Logo';
import TopBarButton from '../ui/TopBarButton';
import { UserSharp } from 'pixelarticons/react';

function TitleBar() {
	const { activeTable, logout, setExpandedWindowId } = useTable();
	const handleUserClick = () => {
		setExpandedWindowId(-2);
	};

	const handleLogOut = () => {
		logout();
	};

	return (
		<div className='TitleBar'>
			<div className='LogoContainer'>
				<Logo />
				Moris Control Panel - {activeTable}
			</div>

			<div className='ButtonContainer'>
				<TopBarButton
					icon={UserSharp}
					text='Your account'
					onClick={handleUserClick}
				/>
				<TopBarButton icon={Close} text='Log out' onClick={handleLogOut} />
			</div>
		</div>
	);
}

export default TitleBar;
