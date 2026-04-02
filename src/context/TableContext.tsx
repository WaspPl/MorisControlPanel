import axios from 'axios';
import Cookies from 'cookies-js';
import { createContext, useContext, useState, type ReactNode } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

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
	getItemDetailsById: (table: TableType, id: number) => Promise<any>;
	createItem: (table: TableType, data: object) => Promise<any>;
	updateItemById: (table: TableType, id: number, data: object) => Promise<any>;
	deleteItemById: (table: TableType, id: number) => Promise<any>;
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
		role: { id: number; name: string };
		llm_prefix: string;
	} | null;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();

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
	const API_BASE = 'http://localhost:8080';

	const [currentUser, setCurrentUser] = useState<any>(null);

	const login = async (username: string, password: string) => {
		const formData = new URLSearchParams();
		formData.append('username', username);
		formData.append('password', password);
		const response = await axios.post(`${API_BASE}/token`, formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});
		if (response) {
			Cookies.set('token', response.data.access_token);
			setCurrentUser(await getItems('Me'));
			navigate('/panel');
		}
	};

	const logout = () => {
		Cookies.set('token', null);
		setCurrentUser(null);
		navigate('/login');
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
	) => {
		try {
			const params = new URLSearchParams({
				limit: limit.toString(),
				offset: offset.toString(),
				descending: descending.toString(),
			}).toString();
			const response = await axios.get(
				`${API_BASE}/${Routes[table]}?${params}`,
				getAuthHeaders(),
			);
			return response.data;
		} catch (error) {
			// showErrorNotification("Failed to fetch items");
			console.error(error);
		}
	};

	const getItemDetailsById = async (table: TableType, id: number) => {
		try {
			const response = await axios.get(
				`${API_BASE}/${Routes[table]}/${id}`,
				getAuthHeaders(),
			);
			return response.data;
		} catch (error) {
			// showErrorNotification("Failed to fetch details");
			console.error(error);
		}
	};

	const createItem = async (table: TableType, data: object) => {
		try {
			const response = await axios.post(
				`${API_BASE}/${Routes[table]}`,
				data,
				getAuthHeaders(),
			);
			return response.data;
		} catch (error) {
			// showErrorNotification("Failed to create item");
			console.error(error);
		}
	};

	const updateItemById = async (table: TableType, id: number, data: object) => {
		try {
			const response = await axios.put(
				`${API_BASE}/${Routes[table]}/${id}`,
				data,
				getAuthHeaders(),
			);
			return response.data;
		} catch (error) {
			// showErrorNotification("Failed to update item");
			console.error(error);
		}
	};

	const deleteItemById = async (table: TableType, id: number) => {
		try {
			await axios.delete(
				`${API_BASE}/${Routes[table]}/${id}`,
				getAuthHeaders(),
			);
			return { status: 'ok' };
		} catch (error) {
			// showErrorNotification("Failed to delete item");
			console.error(error);
		}
	};
	const getScript = async (commandId: number) => {
		try {
			const file = await axios.get(
				`${API_BASE}/${Routes['Commands']}/${commandId}/script`,
				{
					...getAuthHeaders(),
					responseType: 'blob',
				},
			);
			return file.data;
		} catch (error) {
			console.log(error);
		}
	};
	const createScript = async (commandId: number, script: File) => {
		try {
			const formData = new FormData();
			formData.append('file', script);
			const file = await axios.put(
				`${API_BASE}/${Routes['Commands']}/${commandId}/script`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${Cookies.get('token')}`,
					},
				},
			);
			return file;
		} catch (error) {
			console.log(error);
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
		login,
		logout,
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
