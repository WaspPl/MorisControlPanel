import React, { useRef } from 'react';

type Props = {
	name: string;
	srcBase64: string;
	onChange: (newValue: string, name: string) => void;
	isEditing: boolean;
	label?: string;
};

function Image({ name, srcBase64, onChange, isEditing, label }: Props) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClick = () => {
		if (isEditing) {
			fileInputRef.current?.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const base64String = (reader.result as string).split(',')[1];
				onChange(base64String, name);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div>
			{label && <label htmlFor={name}>{label}</label>}

			<img
				id={name}
				className={`spriteImage ${isEditing ? 'editable' : ''}`}
				src={`data:image/png;base64,${srcBase64}`}
				alt={label || name}
				onClick={handleClick}
				style={{ cursor: isEditing ? 'pointer' : 'default', maxWidth: '200px' }}
			/>
			<input
				className='ImageInput'
				type='file'
				ref={fileInputRef}
				disabled={!isEditing}
				accept='image/*'
				onChange={handleFileChange}
			/>
		</div>
	);
}

export default Image;
