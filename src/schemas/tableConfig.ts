import { type TableType } from '../context/TableContext';

export type FieldType =
	| 'text'
	| 'number'
	| 'checkbox'
	| 'foreign'
	| 'image'
	| 'password'
	| 'dropdownList'
	| 'inputList';

export interface FieldConfig {
	name: string;
	apiKey: string;
	label: string;
	type: FieldType;
	lookupTable?: TableType;
}

export interface TableSchema {
	summary: string[];
	create: string[];
	fields: FieldConfig[];
}

export const Table_Schemas: Record<TableType, TableSchema> = {
	Users: {
		summary: ['username', 'role'],
		create: ['username', 'password', 'role', 'llm_prefix'],
		fields: [
			{ name: 'username', label: 'Username', type: 'text', apiKey: 'username' },
			{
				name: 'password',
				label: 'Password',
				type: 'password',
				apiKey: 'password',
			},
			{
				name: 'role',
				label: 'Role',
				type: 'foreign',
				apiKey: 'role_id',
				lookupTable: 'Roles',
			},
			{
				name: 'llm_prefix',
				label: 'LLM Prefix',
				type: 'text',
				apiKey: 'llm_prefix',
			},
		],
	},
	Roles: {
		summary: ['name'],
		create: ['name'],
		fields: [{ name: 'name', label: 'Name', type: 'text', apiKey: 'name' }],
	},
	Commands: {
		summary: ['name', 'description', 'sprite', 'is_output_llm'],
		create: [
			'name',
			'description',
			'sprite',
			'sprite_repeat_times',
			'is_output_llm',
			'llm_prefix',
		],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', apiKey: 'name' },
			{
				name: 'description',
				label: 'Description',
				type: 'text',
				apiKey: 'description',
			},
			{
				name: 'sprite',
				label: 'Sprite',
				type: 'foreign',
				lookupTable: 'Sprites',
				apiKey: 'sprite_id',
			},
			{
				name: 'sprite_repeat_times',
				label: 'Repeat',
				type: 'number',
				apiKey: 'sprite_repeat_times',
			},
			{
				name: 'is_output_llm',
				label: 'LLM Output?',
				type: 'checkbox',
				apiKey: 'is_output_llm',
			},
			{
				name: 'llm_prefix',
				label: 'LLM Prefix',
				type: 'text',
				apiKey: 'llm_prefix',
			},
			{
				name: 'assignments',
				label: 'Assigned Roles',
				type: 'dropdownList',
				apiKey: 'assignments',
			},
			{
				name: 'prompts',
				label: 'Assigned Prompts',
				type: 'inputList',
				apiKey: 'assignments',
			},
		],
	},
	Sprites: {
		summary: ['name'],
		create: ['name', 'content'],
		fields: [
			{ name: 'name', label: 'Name', type: 'text', apiKey: 'name' },
			{ name: 'content', label: 'Image', type: 'image', apiKey: 'content' },
		],
	},
};
