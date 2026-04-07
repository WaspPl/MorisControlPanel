import { UploadSharp, ImageSharp } from 'pixelarticons/react';
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
		<div className='input'>
			{label && <label htmlFor={name}>{label}</label>}
			<div
				id={name}
				className='ImageField'
				onClick={handleClick}
				style={{
					cursor: isEditing ? 'pointer' : 'default',
					maxWidth: '200px',
				}}
			>
				{srcBase64 ? (
					<img
						className={`spriteImage`}
						src={`data:image/png;base64,${srcBase64}`}
						alt={label || name}
					/>
				) : (
					<div className='spriteIcon'>
						{isEditing ? (
							<UploadSharp width={48} height={48} />
						) : (
							<ImageSharp width={48} height={48} />
						)}
					</div>
				)}

				<input
					className='ImageInput'
					type='file'
					ref={fileInputRef}
					disabled={!isEditing}
					accept='image/*'
					onChange={handleFileChange}
				/>
			</div>
		</div>
	);
}

export default Image;
