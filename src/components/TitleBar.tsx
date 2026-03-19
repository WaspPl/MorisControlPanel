import { useTable } from '../context/TableContext';
import Logo from './Logo';
import TopBarButton from './TopBarButton';
import { UserSharp } from 'pixelarticons/react';

const Close = ({ size = 24, color = 'currentColor' }) => (
	<svg width={size} height={size} viewBox='0 0 24 24' fill='none'>
		<path
			d='M5 5h2v2H5V5Zm4 4H7V7h2v2Zm2 2H9V9h2v2Zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2Zm2-2v2h-2V9h2Zm2-2v2h-2V7h2Zm0 0V5h2v2h-2Z'
			fill={color}
		/>
	</svg>
);

function TitleBar() {
	const { activeTable } = useTable();
	const handleUserClick = () => {};

	const handleLogOut = () => {};

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
