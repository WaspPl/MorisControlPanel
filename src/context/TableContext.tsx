import axios from 'axios';
import Cookies from 'cookies-js';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

export type TableType =
	| 'Users'
	| 'Roles'
	| 'Commands'
	| 'Sprites'
	| 'Assignments'
	| 'Prompts'
	| 'Me';
const Routes = {
	Users: 'users',
	Roles: 'roles',
	Commands: 'commands',
	Sprites: 'sprites',
	Assignments: 'role_assignments',
	Prompts: 'prompts',
	Me: 'me',
};

interface TableContextType {
	activeTable: TableType;
	setActiveTable: (table: TableType) => void;
	items: any[];
	setItems: (items: any[]) => void;
	getItems: (
		table: TableType,
		limit?: number,
		offset?: number,
		descending?: boolean,
	) => Promise<any>;
	getItemDetailsById: (table: TableType, id: number | null) => Promise<any>;
	createItem: (table: TableType, data: object) => Promise<any>;
	updateItemById: (
		table: TableType,
		id: number | null,
		data: object,
	) => Promise<any>;
	deleteItemById: (table: TableType, id: number | null) => Promise<any>;
	expandedWindowId: number | null;
	setExpandedWindowId: (id: number | null) => void;
	sleep: (ms: number) => Promise<any>;
	setDefaultParams: () => void;
	updateQueryParams: (paramsToUpdate: Record<string, string | null>) => void;
	getScript: (id: number) => Promise<any>;
	createScript: (id: number, script: File) => Promise<any>;
	currentUser: {
		id: number;
		username: string;
		role_id: number;
		llm_prefix: string;
	} | null;
	setCurrentUser: (user: any) => void;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
	isLoading: boolean;
	notifications: any;
	removeNotification: (id: string) => void;
	setAuthCookies: (
		access_token: string,
		access_token_duration_minutes: number,
		refresh_token: string,
		refresh_token_duration_days: number,
	) => void;
	setIsLoading: (value: boolean) => void;
	isProcessing: boolean;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();

	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setIsLoading] = useState(true);
	const [notifications, setNotifications] = useState<any[]>([]);
	const [isProcessing, setIsProcessing] = useState<boolean>(false);

	const addNotification = (code: number, content: string) => {
		setNotifications([
			...notifications,
			{ id: uuidv4(), status: code, content: content },
		]);
	};

	const removeNotification = (id: string) => {
		setNotifications((prev) => prev.filter((n) => n.id !== id));
	};

	const updateQueryParams = (paramsToUpdate: Record<string, string | null>) => {
		const newParams = new URLSearchParams(searchParams);

		Object.entries(paramsToUpdate).forEach(([key, value]) => {
			if (value === null) {
				newParams.delete(key);
			} else {
				newParams.set(key, value);
			}
		});
		setSearchParams(newParams, { replace: true });
	};

	const setDefaultParams = () => {
		const currentTable = searchParams.get('activeTable');

		const validTables = Object.keys(Routes);
		if (!currentTable || !validTables.includes(currentTable)) {
			updateQueryParams({ activeTable: 'Users' });
		}
	};
	const activeTable = (searchParams.get('activeTable') as TableType) || 'Users';
	const setActiveTable = (newTable: TableType) =>
		updateQueryParams({ activeTable: newTable });

	const expandedWindowIdParam = searchParams.get('expandedWindowId');
	const expandedWindowId = expandedWindowIdParam
		? parseInt(expandedWindowIdParam)
		: null;
	const setExpandedWindowId = (newId: number | null) =>
		updateQueryParams({ expandedWindowId: newId?.toString() ?? null });

	const API_BASE =
		import.meta.env.VITE_APP_API_USE_SAME_BASE_URL === 'true'
			? window.location.protocol +
				'//' +
				window.location.hostname +
				':' +
				import.meta.env.VITE_APP_API_PORT
			: import.meta.env.VITE_APP_API_BASE_URL +
				':' +
				import.meta.env.VITE_APP_API_PORT;

	const api = axios.create({
		baseURL: API_BASE,
	});
	api.interceptors.request.use((config) => {
		const token = Cookies.get('token');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	api.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;

			if (error.response?.status === 401 && !originalRequest._retry) {
				originalRequest._retry = true;
				const refreshToken = Cookies.get('refresh_token');

				if (!refreshToken) {
					logout();
				}

				try {
					const response = await axios.post(
						`${API_BASE}/token/refresh?refresh_token=${refreshToken}`,
					);

					setAuthCookies(
						response.data.access_token,
						response.data.access_token_duration_minutes,
						response.data.refresh_token,
						response.data.refresh_token_duration_days,
					);
					originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
					return api(originalRequest);
				} catch (refreshError) {
					console.log(refreshError);
					logout();
					return Promise.reject(refreshError);
				}
			}
			return Promise.reject(error);
		},
	);

	const [currentUser, setCurrentUser] = useState<any>(null);

	const setAuthCookies = (
		access_token: string,
		access_token_duration_minutes: number,
		refresh_token: string,
		refresh_token_duration_days: number,
	) => {
		const accessExpires = new Date(
			new Date().getTime() + access_token_duration_minutes * 60 * 1000,
		);

		const refreshExpires = new Date(
			new Date().getTime() + refresh_token_duration_days * 24 * 60 * 60 * 1000,
		);

		Cookies.set('token', access_token, {
			expires: accessExpires,
		});

		Cookies.set('refresh_token', refresh_token, {
			expires: refreshExpires,
			secure: true,
		});
	};

	const login = async (username: string, password: string) => {
		setIsProcessing(true);
		const formData = new URLSearchParams();
		formData.append('username', username);
		formData.append('password', password);
		try {
			const response = await axios.post(`${API_BASE}/token`, formData, {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			if (response) {
				setAuthCookies(
					response.data.access_token,
					response.data.access_token_duration_minutes,
					response.data.refresh_token,
					response.data.refresh_token_duration_days,
				);
				navigate('/panel');
			}
		} catch (error: any) {
			const status = error.response?.status;
			addNotification(
				status || 500,
				error.response?.data.detail || 'Oops, server had an issue with that',
			);
		}
		setIsProcessing(false);
	};

	const logout = async () => {
		setIsProcessing(true);
		const refreshToken = Cookies.get('refresh_token');

		if (refreshToken) {
			try {
				await axios.post(
					`${API_BASE}/token/logout?refresh_token=${refreshToken}`,
				);
			} catch (e) {
				console.error('Token already revoked or expired');
			}
		}

		Cookies.set('token', null);
		Cookies.set('refresh_token', null);
		setCurrentUser(null);
		navigate('/login');
		setIsProcessing(false);
	};

	const [items, setItems] = useState<any>([]);
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	const getAuthHeaders = () => ({
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	});

	const getItems = async (
		table: TableType,
		limit: number = 5,
		offset: number = 0,
		descending: boolean = true,
		searchQuery: string = '',
	) => {
		setIsProcessing(true);
		try {
			const params = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString(),
				descending: descending.toString(),
				searchQuery: searchQuery,
			}).toString();
			const response = await api.get(
				`${API_BASE}/${Routes[table]}?${params}`,
				getAuthHeaders(),
			);
			setIsLoading(false);
			setIsProcessing(false);
			return response.data;
		} catch (error: any) {
			const status = error.response?.status;
			if (status != 401) {
				addNotification(status, error.response?.data.detail);
			}
			setIsProcessing(false);
		}
	};

	const getItemDetailsById = async (table: TableType, id: number | null) => {
		setIsProcessing(true);
		try {
			const path = id
				? `${API_BASE}/${Routes[table]}/${id}`
				: `${API_BASE}/${Routes[table]}`;
			const response = await api.get(path, getAuthHeaders());
			setIsProcessing(false);
			return response.data;
		} catch (error: any) {
			const status = error.response?.status;

			addNotification(status, error.response?.data.detail);
			setIsProcessing(false);
		}
	};

	const createItem = async (table: TableType, data: object) => {
		setIsProcessing(true);
		try {
			const response = await api.post(
				`${API_BASE}/${Routes[table]}`,
				data,
				getAuthHeaders(),
			);
			addNotification(response.status, 'Create successful!');
			setIsProcessing(false);
			return response.data;
		} catch (error: any) {
			const status = error.response?.status;

			addNotification(
				status || 500,
				error.response?.data.detail || 'Oops, server had an issue with that',
			);
			setIsProcessing(false);
		}
	};

	const updateItemById = async (
		table: TableType,
		id: number | null,
		data: object,
	) => {
		setIsProcessing(true);
		try {
			const path = id
				? `${API_BASE}/${Routes[table]}/${id}`
				: `${API_BASE}/${Routes[table]}`;
			const response = await api.put(path, data, getAuthHeaders());
			addNotification(response.status, 'Update successful');
			setIsProcessing(false);
			return response.data;
		} catch (error: any) {
			const status = error.response?.status;
			addNotification(status, error.response?.data.detail);
			setIsProcessing(false);
		}
	};

	const deleteItemById = async (table: TableType, id: number | null) => {
		setIsProcessing(true);
		try {
			const path = id
				? `${API_BASE}/${Routes[table]}/${id}`
				: `${API_BASE}/${Routes[table]}`;
			const response = await api.delete(path, getAuthHeaders());
			addNotification(response.status, 'Delete successful');
			setIsProcessing(false);
			return true;
		} catch (error: any) {
			const status = error.response?.status;
			addNotification(status, error.response?.data.detail);
			setIsProcessing(false);
		}
	};
	const getScript = async (commandId: number) => {
		setIsProcessing(true);
		try {
			const file = await api.get(
				`${API_BASE}/${Routes['Commands']}/${commandId}/script`,
				{
					...getAuthHeaders(),
					responseType: 'blob',
				},
			);
			setIsProcessing(false);
			return file.data;
		} catch (error: any) {
			const status = error.response?.status;

			addNotification(status, error.response?.data.detail);
			setIsProcessing(false);
		}
	};
	const createScript = async (commandId: number, script: File) => {
		setIsProcessing(true);
		try {
			const formData = new FormData();
			formData.append('file', script);
			const file = await api.put(
				`${API_BASE}/${Routes['Commands']}/${commandId}/script`,
				formData,
			);
			addNotification(file.status, 'Upload succesful');
			setIsProcessing(false);
			return file;
		} catch (error: any) {
			const status = error.response?.status;
			addNotification(status, error.response?.data.detail);
			setIsProcessing(false);
		}
	};
	const valuesToExport = {
		activeTable,
		setActiveTable,
		items,
		setItems,
		getItems,
		getItemDetailsById,
		createItem,
		updateItemById,
		deleteItemById,
		expandedWindowId,
		setExpandedWindowId,
		sleep,
		setDefaultParams,
		updateQueryParams,
		getScript,
		createScript,
		currentUser,
		setCurrentUser,
		login,
		logout,
		isLoading,
		notifications,
		removeNotification,
		setAuthCookies,
		setIsLoading,
		isProcessing,
	};
	return (
		<TableContext.Provider value={valuesToExport}>
			{children}
		</TableContext.Provider>
	);
};

export const useTable = () => {
	const context = useContext(TableContext);
	if (!context) throw new Error('useTable must be used within TableProvider');
	return context;
};
