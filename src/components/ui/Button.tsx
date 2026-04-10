type Variant = 'success' | 'danger' | 'warning' | 'primary' | 'secondary';

type ButtonType = 'submit' | 'reset' | 'button' | undefined;

type Props = {
	label: React.ReactNode;
	onClick?: (event: any) => void;
	variant?: Variant;
	type?: ButtonType;
	className?: string;
	id?: string;
	title?: string;
	form?: string;
};

function Button({
	label,
	onClick,
	variant = 'primary',
	type,
	className,
	id,
	title,
	form,
}: Props) {
	return (
		<button
			id={id}
			onClick={onClick}
			className={`input-field ${variant} ${className}`}
			type={type}
			title={title}
			form={form}
		>
			{label}
		</button>
	);
}

export default Button;
