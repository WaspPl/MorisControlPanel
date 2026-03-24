type Variant = 'Success' | 'Failure' | 'Warning' | 'Primary' | 'Secondary';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

type Props = {
	label: any;
	onClick?: (event: any) => void;
	variant?: Variant;
	type?: ButtonType;
};

function Button({ label, onClick, variant = 'Success', type }: Props) {
	return (
		<button onClick={onClick} className={variant} type={type}>
			{label}
		</button>
	);
}

export default Button;
