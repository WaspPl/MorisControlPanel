import { useSearchParams, useParams } from 'react-router-dom';

export function useResourceParams() {
	const [searchParams, setSearchParams] = useSearchParams();
	const { resourceType } = useParams(); // from /dashboard/:resourceType

	const expandedId = searchParams.get('id');
	const isCreateMode = searchParams.get('mode') === 'create';

	const openItem = (id: number) => setSearchParams({ id: id.toString() });
	const openCreate = () => setSearchParams({ mode: 'create' });
	const close = () => setSearchParams({});

	return {
		resourceType,
		expandedId,
		isCreateMode,
		openItem,
		openCreate,
		close,
	};
}
