import { User } from "firebase/auth";

interface LoggedInUser extends User {
	gender?: string;
	name?: string;
	faculty?: {
		key: number;
		value: string;
	}
}

type QuestionOptions = 'single' | 'multiple' | 'text';

interface Question {
	title: string;
	description?: string;
	type: QuestionOptions;
	isDropdown: boolean;
	required: boolean;
	answers?: string[];
}

interface SurveyRules {
	gender: 'ANY' | 'M' | 'F';
	faculties: 'ANY' | any[];
	ageLimit: number[];
}