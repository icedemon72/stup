// componentTypes.ts

export interface InfoModalProps {
	title?: string;
	subtitle?: string;
	text?: string;
}

export type AnswerProps = {
	answers?: string[];
	isDropdown?: boolean;
	response: any;
	setResponse: (...args: any) => void; // change this perhaps...
}