import type { ComponentType, SVGProps } from 'react';

type Props = {
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	text?: string;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
};

function TopBarButton({
	icon: Icon,
	text,
	onClick,
	disabled,
	className,
}: Props) {
	return (
		<div className={`TopBarButton ${!disabled && 'enabled'} ${className}`}>
			{!disabled && <p>{text}</p>}
			<button onClick={onClick} disabled={disabled}>
				<Icon width={24} height={24} />
			</button>
		</div>
	);
}

export default TopBarButton;
