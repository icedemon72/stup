export const faculties = [
	'Ekonomski fakultet', 'Medicinski fakultet', 'Poljoprivredni fakultet', 'Pravni fakultet',
	'Prirodno-matematički fakultet', 'Učiteljski fakultet', 'Fakultet za sport i fizičko vaspitanje',
	'Fakultet tehničkih nauka', 'Filozofski fakultet'
].map((faculty, index) => {
	return {
		name: faculty,
		value: index,
	}
});
