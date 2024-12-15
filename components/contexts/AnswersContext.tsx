import { AnswerResponse, SurveyData } from "@/types";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AnswerContextType {
	surveyData: SurveyData | null;
	setSurveyData: React.Dispatch<React.SetStateAction<SurveyData | null>>;
	questionId: string;
	setQuestionId: React.Dispatch<React.SetStateAction<string>>;
	currentQuestion: number;
	setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
	responses: AnswerResponse[];
	setResponses: React.Dispatch<React.SetStateAction<AnswerResponse[]>>;

}

interface AnswersProviderProps {
	children: ReactNode;
}

export const AnswersContext = createContext<AnswerContextType>({
	surveyData: null,
	setSurveyData: () => {},
	questionId: '',
	setQuestionId: () => {},
	currentQuestion: 0,
	setCurrentQuestion: () => {},
	responses: [],
	setResponses: () => {}
});

export const useAnswersContext = () => {
	const context = useContext(AnswersContext);
	if (context == null) {
		throw new Error("useAnswersContext called outside of provider");
	}
	return context;
}

export const AnswersProvider = ({ children }: AnswersProviderProps) => {
	const [ surveyData, setSurveyData ] = useState<SurveyData | null>(null);
	const [ questionId, setQuestionId ] = useState<string>('');
	const [ currentQuestion, setCurrentQuestion ] = useState<number>(0);
	const [ responses, setResponses ] = useState<AnswerResponse[]>([]);

	return (
		<AnswersContext.Provider value={{ 
			currentQuestion, responses, questionId, surveyData,
			setCurrentQuestion, setResponses, setQuestionId, setSurveyData
		 }}>
			{ children }
		</AnswersContext.Provider>
	);
}