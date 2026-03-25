import axios from 'axios';
import Cookies from 'cookies-js';
import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';

const API_BASE = 'http://localhost:8080';
const TOKEN_COOKIE_NAME = 'token';

type RoleMin = {
	id: number;
	name: string;
};

export type MeResponse = {
	id: number;
	username: string;
	role: RoleMin;
	llm_prefix: string;
};

type AuthContextType = {
	isAuthenticated: boolean;
	isAdmin: boolean;
	me: MeResponse | null;
	roleId: number | null;
	isLoadingMe: boolean;
	signIn: (username: string, password: string) => Promise<void>;
	logout: () => void;
	refreshMe: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getAuthHeaders() {
	const token = Cookies.get(TOKEN_COOKIE_NAME);
	return token
		? { headers: { Authorization: `Bearer ${token}` } }
		: { headers: {} };
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [me, setMe] = useState<MeResponse | null>(null);
	const [roleId, setRoleId] = useState<number | null>(null);
	const [isLoadingMe, setIsLoadingMe] = useState(false);

	const isAdmin = roleId === 1;

	const refreshMe = useCallback(async () => {
		const token = Cookies.get(TOKEN_COOKIE_NAME);
		if (!token) {
			setIsAuthenticated(false);
			setMe(null);
			setRoleId(null);
			return;
		}

		setIsLoadingMe(true);
		try {
			const resp = await axios.get(`${API_BASE}/me`, getAuthHeaders());
			const nextMe = resp.data as MeResponse;
			setMe(nextMe);
			setRoleId(nextMe.role?.id ?? null);
			setIsAuthenticated(true);
		} catch (err: any) {
			// If token is invalid/expired, clear local auth state.
			Cookies.set(TOKEN_COOKIE_NAME, '');
			setIsAuthenticated(false);
			setMe(null);
			setRoleId(null);
			if (err?.response?.status !== 401) {
				// Keep quiet for 401; other errors may indicate backend issues.
				console.error('Failed to refresh /me', err);
			}
		} finally {
			setIsLoadingMe(false);
		}
	}, []);

	useEffect(() => {
		// Auto-load session if cookie already exists.
		refreshMe();
	}, [refreshMe]);

	const signIn = useCallback(
		async (username: string, password: string) => {
			const payload = new URLSearchParams();
			// FastAPI OAuth2PasswordRequestForm expects these fields.
			payload.append('username', username);
			payload.append('password', password);

			const resp = await axios.post(`${API_BASE}/token`, payload, {
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			});

			// Backend response shape: { access_token, token_type }
			const accessToken = resp.data?.access_token as string | undefined;
			if (!accessToken)
				throw new Error('Missing access_token in login response');

			Cookies.set(TOKEN_COOKIE_NAME, accessToken);
			await refreshMe();
		},
		[refreshMe],
	);

	const logout = useCallback(() => {
		Cookies.set(TOKEN_COOKIE_NAME, '');
		setIsAuthenticated(false);
		setMe(null);
		setRoleId(null);
	}, []);

	const value = useMemo<AuthContextType>(
		() => ({
			isAuthenticated,
			isAdmin,
			me,
			roleId,
			isLoadingMe,
			signIn,
			logout,
			refreshMe,
		}),
		[
			isAdmin,
			isAuthenticated,
			isLoadingMe,
			me,
			refreshMe,
			roleId,
			signIn,
			logout,
		],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}
