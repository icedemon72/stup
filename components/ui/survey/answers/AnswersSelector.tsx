import React from 'react';
import { QuestionOptions } from '@/types';
import { AnswerProps } from '@/types/componentTypes';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';
import TextInputAnswer from './TextInputAnswer';

type AnswerSelectorProps = AnswerProps & {
	type: QuestionOptions;
}

const AnswersSelector = ({
	type,
	answers,
	isDropdown,
	response,
	setResponse
}: AnswerSelectorProps) => {
	const mappedObject = {
		'single': <SingleChoice response={response} setResponse={setResponse} answers={answers} isDropdown={isDropdown} />,
		'multiple': <MultipleChoice response={response} setResponse={setResponse} answers={answers} isDropdown={isDropdown} />,
		'text': <TextInputAnswer response={response} setResponse={setResponse} />
	}

	return mappedObject[type];
}

export default AnswersSelector;