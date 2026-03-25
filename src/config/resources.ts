export const RESOURCE_MANIFEST = {
	commands: {
		hasList: true,
		primaryFields: [
			{ name: 'name', type: 'text', label: 'Command Name' },
			{ name: 'sprite_id', type: 'select-sprite', label: 'Sprite' },
		],
		detailsFields: [
			{ name: 'description', type: 'text', label: 'Description' },
			{ name: 'is_output_llm', type: 'boolean', label: 'LLM Enabled' },
		],
		subResources: [
			{ name: 'prompts', type: 'prompt-list', label: 'Manage Prompts' },
			{ name: 'assignments', type: 'multi-role', label: 'Roles' },
		],
	},
	roles: {
		hasList: true,
		primaryFields: [{ name: 'name', type: 'text', label: 'Role Name' }],
		detailsFields: [],
		subResources: [],
	},
};
