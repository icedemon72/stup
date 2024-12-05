import { Question } from "@/types";

export type FacultyType = {
	name: string;
	value: number;
}

export const faculties: FacultyType[] = [
	'Ekonomski fakultet', 'Medicinski fakultet', 'Poljoprivredni fakultet', 'Pravni fakultet',
	'Prirodno-matematički fakultet', 'Učiteljski fakultet', 'Fakultet za sport i fizičko vaspitanje',
	'Fakultet tehničkih nauka', 'Filozofski fakultet'
].map((faculty, index) => {
	return {
		name: faculty,
		value: index,
	}
});


export const defaultQuestion: Question = {
	title: '',
	type: 'single',
	required: true,
	isDropdown: false,
	answers: [],
	description: '',
}