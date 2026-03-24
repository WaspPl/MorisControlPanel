import React from 'react';

type Props = {
	label: string;
	src: string; // base64
	isEditing: boolean;
	onChange: (val: string) => void;
};

function ImageField({ label, src, isEditing, onChange }: Props) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		const reader = new FileReader();

		reader.onloadend = () => {
			const base64String = reader.result as string;
			const rawBase64 = base64String.split(',')[1];
			onChange(rawBase64);
		};

		reader.readAsDataURL(file);
	};

	return (
		<div className='Input'>
			<label>{label}</label>
			<div className='ImagePreview'>
				{src ? (
					<img src={`data:image/png;base64,${src}`} alt='Preview' />
				) : (
					<span>No Image</span>
				)}

				{isEditing && (
					<input
						type='file'
						accept='image/*'
						className='FilePicker'
						onChange={handleChange}
					/>
				)}
			</div>
		</div>
	);
}

export default ImageField;
