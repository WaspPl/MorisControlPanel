import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'cookies-js';
import { useAuth } from '../../features/auth/AuthContext';

const API_BASE = 'http://localhost:8080';
const TOKEN_COOKIE_NAME = 'token';

type Props = {
	commandId: number;
	scriptPath?: string | null;
	canUpload: boolean;
};

export default function ScriptField({
	commandId,
	scriptPath,
	canUpload,
}: Props) {
	const { isAdmin } = useAuth();
	const [hasScript, setHasScript] = useState<boolean>(!!scriptPath);
	const [isChecking, setIsChecking] = useState<boolean>(false);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// If backend ever includes script_path in command details, we can use it.
	// Otherwise we rely on an existence check below.
	useEffect(() => {
		if (typeof scriptPath === 'string') setHasScript(!!scriptPath);
	}, [scriptPath]);

	// Backend doesn't return "script exists" in the command details payload,
	// so we check via `GET /commands/{id}/script` and treat 404 as "no script".
	useEffect(() => {
		if (!isAdmin) return;
		let cancelled = false;

		const check = async () => {
			setIsChecking(true);
			setError(null);

			const token = Cookies.get(TOKEN_COOKIE_NAME);
			if (!token) {
				setHasScript(false);
				setIsChecking(false);
				return;
			}

			try {
				await axios.get(`${API_BASE}/commands/${commandId}/script`, {
					headers: { Authorization: `Bearer ${token}` },
					// We don't actually use the blob; this is just an existence check.
					responseType: 'blob',
				});
				if (cancelled) return;
				setHasScript(true);
			} catch (err: any) {
				if (cancelled) return;
				if (err?.response?.status === 404) {
					setHasScript(false);
				} else {
					setError(
						err?.response?.data?.detail ??
							'Failed to check script availability',
					);
				}
			} finally {
				if (!cancelled) setIsChecking(false);
			}
		};

		check();
		return () => {
			cancelled = true;
		};
	}, [commandId, isAdmin]);

	const authHeaders = () => {
		const token = Cookies.get(TOKEN_COOKIE_NAME);
		return token ? { Authorization: `Bearer ${token}` } : {};
	};

	const downloadScript = async () => {
		setError(null);
		const token = Cookies.get(TOKEN_COOKIE_NAME);
		if (!token) {
			setError('Not authenticated');
			return;
		}

		try {
			const resp = await axios.get(
				`${API_BASE}/commands/${commandId}/script`,
				{
					headers: { Authorization: `Bearer ${token}` },
					responseType: 'blob',
				},
			);

			const blob = resp.data as Blob;
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `script_${commandId}.py`;
			a.click();
			window.URL.revokeObjectURL(url);
		} catch (err: any) {
			setError(err?.response?.data?.detail ?? 'Failed to download script');
		}
	};

	const uploadScript = async () => {
		setError(null);
		if (!selectedFile) return;
		if (!canUpload) return;

		const fileExtension = selectedFile.name?.toLowerCase().endsWith('.py');
		if (!fileExtension) {
			setError('Script has to be in a .py format');
			return;
		}

		setIsUploading(true);
		try {
			const form = new FormData();
			form.append('file', selectedFile);

			const token = Cookies.get(TOKEN_COOKIE_NAME);
			if (!token) throw new Error('Not authenticated');

			await axios.put(`${API_BASE}/commands/${commandId}/script`, form, {
				headers: {
					...authHeaders(),
					'Content-Type': 'multipart/form-data',
				},
			});

			// Backend PUT returns nothing, so we optimistically assume success.
			setSelectedFile(null);
			setHasScript(true);
		} catch (err: any) {
			setError(err?.response?.data?.detail ?? 'Failed to upload script');
		} finally {
			setIsUploading(false);
		}
	};

	if (!isAdmin) return null;

	return (
		<div className='ScriptField'>
			<div className='ScriptFieldHeader'>
				<h3>Script</h3>
			</div>

			<div className='ScriptFieldActions'>
				{hasScript ? (
					<button
						type='button'
						onClick={downloadScript}
						className='ScriptBtn'
					>
						Download
					</button>
				) : isChecking ? (
					<span className='ScriptHint'>Checking...</span>
				) : (
					<span className='ScriptHint'>No script uploaded</span>
				)}
			</div>

			<div className='ScriptFieldUpload'>
				<input
					type='file'
					accept='.py'
					disabled={!canUpload || isUploading}
					onChange={(e) => {
						const file = e.target.files?.[0] ?? null;
						setSelectedFile(file);
					}}
				/>

				<button
					type='button'
					onClick={uploadScript}
					disabled={!canUpload || isUploading || !selectedFile}
					className='ScriptBtn'
				>
					{isUploading ? 'Uploading...' : 'Upload'}
				</button>
			</div>

			{error && <div className='ScriptError'>{error}</div>}
		</div>
	);
}

