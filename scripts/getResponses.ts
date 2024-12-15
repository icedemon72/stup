import { Question, QuestionOptions, Survey } from "@/types";

type MappedType = {
	[key in QuestionOptions]: any;
}

const typesMapped: MappedType = {
	'single': null,
	'multiple': [] as string[],
	'text': '',
	// 'slider': 1
}

const getResponses = (survey: Survey) => {
	return survey.questions.map((elem, i) => ({
		questionIndex: i,
		type: elem.type,
		answers: typesMapped[elem.type as QuestionOptions]
	}));
}

export { getResponses };