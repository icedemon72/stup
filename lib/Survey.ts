import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/constants/Firebase';

export const fetchAnswersForSurvey = async (surveyId: string) => {
	const q = query(collection(db, 'answers'), where('survey', '==', surveyId));
	const snapshot = await getDocs(q);

	const allAnswers = snapshot.docs.map(doc => doc.data());
	return allAnswers;
};


type AggregatedStats = {
  [questionIndex: number]: {
    [answerValue: string]: number;
  };
};

export const aggregateStats = (answers: any[]): AggregatedStats => {
	const stats: AggregatedStats = {};

	answers.forEach(answer => {
		answer.responses.forEach((resp: any) => {
			const qIndex = resp.questionIndex;
			const values = Array.isArray(resp.answers) ? resp.answers : [resp.answers];

			if (!stats[qIndex]) {
				stats[qIndex] = {};
			}

			values.forEach((val: string | number) => {
				stats[qIndex][val] = (stats[qIndex][val] || 0) + 1;
			});
		});
	});

	return stats;
};
