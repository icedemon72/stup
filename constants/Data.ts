import { DataType, Question } from "@/types";

export const faculties: DataType[] = [
	'Ekonomski fakultet', 'Medicinski fakultet', 'Poljoprivredni fakultet', 'Pravni fakultet',
	'Prirodno-matematički fakultet', 'Učiteljski fakultet', 'Fakultet za sport i fizičko vaspitanje',
	'Fakultet tehničkih nauka', 'Filozofski fakultet'
].map((label, value) => {
	return { label, value }
});

export const defaultQuestion: Question = {
	title: '',
	type: 'single',
	required: true,
	isDropdown: false,
	answers: [],
	description: '',
};

export const questionTypes: DataType[] = [
	{ label: 'Jedan odgovor', value: 'single' },
	{ label: 'Više odgovora', value: 'multiple' },
	{ label: 'Tekstualni unos', value: 'text' },
];

export const genderRules: DataType[] = [
	{ label: 'Oba pola', value: 'ANY' },
	{ label: 'Samo muški pol', value: 'M' },
	{ label: 'Samo ženski pol', value: 'F' }
];