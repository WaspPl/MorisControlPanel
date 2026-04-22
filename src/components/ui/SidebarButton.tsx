import type { ComponentType, SVGProps } from 'react';

type Props = {
	name: string;
	description: string;
	content: ComponentType<SVGProps<SVGSVGElement>>;
	onClick: (name: string) => Promise<void>;
	onHover: (name: string, description: string) => void;
	active?: boolean;
};

function SidebarButton({
	name,
	description,
	content: Icon,
	onClick,
	onHover,
	active
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
			className={`aside-button ${active ? 'active' : ''}`}
		>
			<Icon width={48} height={48} />
		</button>
	);
}

export default SidebarButton;
