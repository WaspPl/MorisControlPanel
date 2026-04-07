import type { ComponentType, SVGProps } from 'react';

type Props = {
	name: string;
	description: string;
	content: ComponentType<SVGProps<SVGSVGElement>>;
	onClick: (name: string) => Promise<void>;
	onHover: (name: string, description: string) => void;
};

function SidebarButton({
	name,
	description,
	content: Icon,
	onClick,
	onHover,
}: Props) {
	const handleClick = async (): Promise<void> => {
		await onClick(name);
	};

	const handleHover = (): void => {
		onHover(name, description);
	};

	return (
		<button
			onClick={handleClick}
			onMouseOver={handleHover}
			className='aside-button'
		>
			<Icon width={48} height={48} />
		</button>
	);
}

export default SidebarButton;
