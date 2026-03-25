type Variant = 'Success' | 'Failure' | 'Warning' | 'Primary' | 'Secondary';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

type Props = {
	label: any;
	onClick?: (event: any) => void;
	variant?: Variant;
	type?: ButtonType;
	disabled?: boolean;
};

function Button({ label, onClick, variant = 'Success', type, disabled }: Props) {
	return (
		<button
			onClick={onClick}
			className={variant}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	);
}

export default Button;

