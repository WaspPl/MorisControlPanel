import { useState } from 'react';
import Button from './Button';

type Props = {
	name: string;
	onUpload: (newFile: File) => void;
	onDownload: () => void;
	isEditing: boolean;
	label?: string;
};

function FileField({ name, onDownload, onUpload, isEditing, label }: Props) {
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleDownload = () => {
		onDownload();
	};

	const handleUpload = () => {
		console.log('Clicked', selectedFile);
		if (selectedFile) {
			onUpload(selectedFile);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setSelectedFile(file);
		}
	};

	return (
		<div>
			<label htmlFor={name + 'div'}>{label}</label>
			<div id={name + 'div'}>
				{isEditing && (
					<input
						id={name}
						className='FileDownloadButton'
						type='file'
						accept='.py'
						onChange={handleChange}
					/>
				)}
				<Button
					label={isEditing ? 'Upload' : 'Download'}
					onClick={isEditing ? handleUpload : handleDownload}
				/>
			</div>
		</div>
	);
}

export default FileField;
