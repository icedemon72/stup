import { Question, SurveyRules } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface SurveyContextType {
	title: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	description: string;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	rules: SurveyRules;
	setRules: React.Dispatch<React.SetStateAction<SurveyRules>>;
	questionCount: number | string;
	setQuestionCount: React.Dispatch<React.SetStateAction<string | number>>;
	questions: Question[]; 
	setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
	currentQuestion: number;
	setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

interface SurveyProviderProps {
	children: ReactNode;
}

const rulesInit: SurveyRules = { 
	gender: 'ANY',
	faculties: 'ANY',
	ageLimit: [-1, -1]
};

export const SurveyContext = createContext<SurveyContextType>({
	title: '',
	setTitle: () => {},
	description: '',
	setDescription: () => {},
	questionCount: 1,
	setQuestionCount: () => {},
	rules: rulesInit,
	setRules: () => {},
	questions: [],
	setQuestions: () => {},
	currentQuestion: 0,
	setCurrentQuestion: () => {},
});

export const useSurveyContext = () => {
  const context = useContext(SurveyContext);
  if (context == null) {
    throw new Error("useSurveyContext called outside of provider");
  }
  return context;
}


export const SurveyProvider = ({ children }: SurveyProviderProps) => {
	const [ title, setTitle ] = useState<string>('');
	const [ description, setDescription ] = useState<string>('');
	const [ questionCount, setQuestionCount ] = useState<string | number>(0);
	const [ rules, setRules ] = useState<SurveyRules>(rulesInit);
	const [ questions, setQuestions ] = useState<Question[]>([]);
	const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);

	return (
		<SurveyContext.Provider value= {{ 
			title, description, questionCount, rules, questions, currentQuestion,
			setTitle, setDescription, setQuestionCount, setRules, setQuestions, setCurrentQuestion
		 }}>
			{ children }
		</SurveyContext.Provider>
	);
}
