import { User, UserInfo } from "firebase/auth";

type FirebaseDateType = {
	seconds: number;
	nanoseconds: number;
}

interface LoggedInUser extends User {
	gender?: string;
	name?: string;
	dateOfBirth?: FirebaseDateType;
	faculty?: {
		key: number;
		value: string;
	}
}

type DataType = {
	label: string;
	value: any;
}

type QuestionOptions = 'single' | 'multiple' | 'text' /* | 'slider'?? */;

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
	faculties: any[];
	ageLimit: number[];
}

interface Survey {
	id: string;
	title: string;
	description: string;
	rules: SurveyRules;
	questionCount: number | string;
	questions: Question[]; 
	currentQuestion: number;
	createdBy: {
		id: string;
		faculty: {
			name: string;
			value: number;
		};
		name: string;
	};
	answeredBy?: string[]
}

interface SurveyData {
	id: string;
	title: string;
	description: string;
	rules: SurveyRules;
	questions: Question[];
}

interface AnswerResponse {
	questionIndex: number;
	type: QuestionOptions;
	answers: string | string[] | number | null;
}