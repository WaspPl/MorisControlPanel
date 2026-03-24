import axios from 'axios';
import Cookies from 'cookies-js';
import { createContext, useContext, useState, type ReactNode } from 'react';

export type TableType = 'Users' | 'Roles' | 'Commands' | 'Sprites';
const Routes = {
	Users: 'users',
	Roles: 'roles',
	Commands: 'commands',
	Sprites: 'sprites',
};

interface TableContextType {
	activeTable: TableType;
	setActiveTable: (table: TableType) => void;
	items: any[];
	setItems: (items: any[]) => void;
	getItems: (table: TableType) => Promise<any>;
	getItemDetailsById: (table: TableType, id: number) => Promise<any>;
	createItem: (table: TableType, data: object) => Promise<any>;
	updateItemById: (table: TableType, id: number, data: object) => Promise<any>;
	deleteItemById: (table: TableType, id: number) => Promise<any>;
	expandedWindowId: number | null;
	setExpandedWindowId: (id: number | null) => void;
	sleep: (ms: number) => Promise<any>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const TableProvider = ({ children }: { children: ReactNode }) => {
	const [activeTable, setActiveTable] = useState<TableType>('Users');
	const [items, setItems] = useState<any>([]);
	const [expandedWindowId, setExpandedWindowId] = useState<number | null>(null);
	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
	const API_BASE = 'http://localhost:8080';

	const getAuthHeaders = () => ({
		headers: { Authorization: `Bearer ${Cookies.get('token')}` },
	});

	const getItems = async (table: TableType) => {
		try {
			const response = await axios.get(
				`${API_BASE}/${Routes[table]}`,
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
			const response = await axios.delete(
				`${API_BASE}/${Routes[table]}/${id}`,
				getAuthHeaders(),
			);
			if (response.status == 204) {
				return 'success';
			}
		} catch (error) {
			// showErrorNotification("Failed to delete item");
			console.error(error);
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
