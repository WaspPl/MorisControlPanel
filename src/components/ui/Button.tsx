type Variant = 'Success' | 'Danger' | 'Warning' | 'Primary' | 'Secondary';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

type Props = {
	label: string;
	onClick?: (event: any) => void;
	variant?: Variant;
	type?: ButtonType;
	className?: string;
};

function Button({
	label,
	onClick,
	variant = 'Success',
	type,
	className,
}: Props) {
	return (
		<button onClick={onClick} className={`${variant} ${className}`} type={type}>
			{label}
		</button>
	);
}

export default Button;
