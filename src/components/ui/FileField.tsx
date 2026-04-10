import { useState } from 'react';
import Button from './Button';

type Props = {
	name: string;
	onUpload: (newFile: File) => void;
	onDownload: () => void;
	isEditing: boolean;
	label?: string;
	title?: string;
	required?: boolean;
};

function FileField({
	name,
	onDownload,
	onUpload,
	isEditing,
	label,
	title,
	required,
}: Props) {
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
		<div className='input input-file'>
			<label htmlFor={name + 'div'}>{label}</label>
			<div id={name + 'div'}>
				{isEditing && (
					<label className='input-file-input input-field'>
						{selectedFile?.name || 'No file selected'}
						<input
							id={name}
							className='FileDownloadButton'
							type='file'
							accept='.py'
							onChange={handleChange}
							title={title}
							required={required}
						/>
					</label>
				)}
				<Button
					className='input-field'
					label={isEditing ? 'Upload' : 'Download'}
					onClick={isEditing ? handleUpload : handleDownload}
					variant={selectedFile && isEditing ? 'success' : 'primary'}
				/>
			</div>
		</div>
	);
}

export default FileField;
