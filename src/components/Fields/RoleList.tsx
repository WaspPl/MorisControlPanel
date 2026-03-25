import { useEffect, useState } from 'react';
import { useTable } from '../../context/TableContext';
import Pill from './Pill';
import { useAuth } from '../../features/auth/AuthContext';

type Role = { id: number; name: string };
type Assignment = { id: number; role: Role };

type Props = {
	roleList?: Assignment[];
	commandId?: number | null;
	canEdit?: boolean;
};

function RoleList({ roleList, commandId = null, canEdit = false }: Props) {
	const {
		createRoleAssignment,
		deleteRoleAssignmentById,
		getItems,
	} = useTable();
	const { isAdmin } = useAuth();
	const canModify = isAdmin && canEdit;
	const [allRoles, setAllRoles] = useState<Role[]>([]);
	const [selectedRoleId, setSelectedRoleId] = useState<number | ''>('');
	const [assignments, setAssignments] = useState<Assignment[]>(roleList || []);

	useEffect(() => {
		setAssignments(roleList || []);
	}, [roleList]);

	useEffect(() => {
		const loadRoles = async () => {
			const roles = await getItems('Roles');
			setAllRoles(roles || []);
		};
		if (canModify) {
			loadRoles();
		}
	}, [getItems, canModify]);

	const assignedRoleIds = new Set(
		assignments.map((assignment) => assignment.role?.id).filter(Boolean),
	);
	const availableRoles = allRoles.filter(
		(role) => !assignedRoleIds.has(role.id),
	);

	useEffect(() => {
		if (
			selectedRoleId &&
			!availableRoles.some((role) => role.id === selectedRoleId)
		) {
			setSelectedRoleId('');
		}
	}, [availableRoles, selectedRoleId]);

	const handleCreate = async () => {
		if (!canModify) return;
		if (!commandId || !selectedRoleId) return;

		const createdAssignment = await createRoleAssignment({
			commandId,
			roleId: selectedRoleId,
		});

		if (!createdAssignment) return;

		const roles = await getItems('Roles');
		const selectedRole = roles?.find(
			(role: Role) => role.id === selectedRoleId,
		);
		const assignmentWithRole = {
			...createdAssignment,
			role: selectedRole || createdAssignment.role,
		};

		setAssignments((prev) => [...prev, assignmentWithRole]);
		setSelectedRoleId('');
	};

	const handleDelete = async (id: number) => {
		if (!canModify) return;
		const deleted = await deleteRoleAssignmentById(id);
		if (!deleted) return;
		setAssignments((prev) => prev.filter((item) => item.id !== id));
	};

	return (
		<div className='RoleList'>
			{canModify && (
				<div
					onKeyDown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							handleCreate();
						}
					}}
				>
					<div className='Dropdown'>
						<select
							name='role'
							id='role'
							value={selectedRoleId}
							onChange={(event) => {
								const value = Number(event.target.value);
								setSelectedRoleId(Number.isNaN(value) ? '' : value);
							}}
						>
							<option value='' disabled>
								{availableRoles.length ? '-- Select Role --' : 'No available roles'}
							</option>
							{availableRoles.map((role) => (
								<option key={role.id} value={role.id}>
									{role.name}
								</option>
							))}
						</select>
					</div>
					<button type='button' onClick={handleCreate}>
						Add
					</button>
				</div>
			)}
			<div className='List'>
				{assignments.map((assignment) => (
					<Pill
						key={assignment.id}
						id={assignment.id}
						text={assignment.role?.name || `Role #${assignment.role?.id ?? ''}`}
						onDelete={handleDelete}
						canDelete={canModify}
					/>
				))}
			</div>
		</div>
	);
}

export default RoleList;
