import React, { useEffect, useState } from 'react';
import { ThemedText } from '@/components/themed/ThemedText';
import { useRoute } from '@react-navigation/native';
import { useAnswersContext } from '@/components/contexts/AnswersContext';
import { AnswerResponse } from '@/types';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import InputContainer from '@/components/ui/InputContainer';
import RelativeQuestionText from '@/components/ui/RelativeQuestionText';
import NavigationArrows from '@/components/ui/NavigationArrows';
import AnswersSelector from '@/components/ui/survey/answers/AnswersSelector';
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { db } from '@/constants/Firebase';
import { useSession } from '@/components/contexts/AuthContext';
import Toast from 'react-native-toast-message';

type RouteParams = {
	surveyId: string;
}

// TODO: create a new question in an array with said questionIndex if needs be
const SurveyAnswers = () => {
	const route = useRoute();
	const router = useRouter();

	const { surveyId } = route.params as RouteParams;
	const { session } = useSession();
	const { responses, setResponses, currentQuestion, setCurrentQuestion, surveyData } = useAnswersContext();
	const [ currentAnswersObj, setCurrentAnswersObj ] = useState<AnswerResponse>(responses[currentQuestion])
	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);

	const setResponse = (answers: any) => {
		setCurrentAnswersObj(prev => ({ ...prev, answers }));
	}

	const handleFinishSurvey = async () => {
		// validate HERE!
		try {
			const result = responses.map(response => ({ questionIndex: response.questionIndex, answers: response.answers }));
	
			const batch = writeBatch(db);		
			const userDocRef = doc(db, 'users', session!.uid);
			const surveyDocRef = doc(db, 'surveys', surveyId);
			const answersRef = doc(collection(db, 'answers'));

			const q = query(collection(db, 'answers'), 
				where('survey', '==', surveyId),
				where('user', '==', session!.uid)
			);

			const querySnapshot = await getDocs(q);
			if(!querySnapshot.empty) {
				throw new Error('Odgovor na ovoj anketi već postoji!');
			}

						
			batch.set(answersRef, {
				responses: result,
				user: session!.uid,
				survey: surveyId,
				timestamp: serverTimestamp()
			});

			batch.update(userDocRef, {
				completedSurveys: arrayUnion(surveyId)
			});
	
			batch.update(surveyDocRef, {
				answeredBy: arrayUnion(session!.uid)
			});

			await batch.commit();
		} catch (err) {
			Toast.show({
				type: 'error',
				text1: 'Odgovor na ovoj anketi već postoji!',
			})
		} finally {
			// setIsLoading(false);
		}
				
	}

	const handleNext = () => {
		if(currentQuestion + 1 < surveyData!.questions.length) {
			setCurrentQuestion(prev => prev + 1);
		} else {
			handleFinishSurvey();
		}
	}

	const handlePrevious = () => {
		if(currentQuestion > 0) {
			setCurrentQuestion(prev => prev - 1);
		} else {
			router.navigate({
				pathname: '/(surveys)/survey-info',
				params: { surveyId }
			});
		}
	}

	useEffect(() => {
		setCurrentAnswersObj(prev => prev = responses[currentQuestion]);
		setNextDisabled(surveyData?.questions[currentQuestion].required as boolean);
	}, [ currentQuestion ]);

	useEffect(() => {
		setResponses(prev => {
			prev[currentQuestion] = currentAnswersObj;
			return prev;
		});

		setNextDisabled(false);

	}, [ currentAnswersObj ])

	if(surveyData === null) {
		(surveyId) 
		?	router.navigate({
				pathname: '/(surveys)/survey-info',
				params: { surveyId }
			})
		: router.navigate('/(tabs)');
	}

	return (
		<InputContainer absolute={<RelativeQuestionText currentQuestion={ currentQuestion + 1} total={surveyData?.questions.length}/>}>
			<View>
				<ThemedText type='subtitle' style={styles.title}>
					{ surveyData?.questions[currentQuestion].title }
					<ThemedText type='subtitle' textColor='primary'>{ surveyData?.questions[currentQuestion].required && '*'}</ThemedText>
					
				</ThemedText>
				{ surveyData?.description && <ThemedText textColor='muted' style={styles.description}>{ surveyData.description }</ThemedText> }
				
				<AnswersSelector 
					type={surveyData!.questions[currentQuestion].type} 
					answers={surveyData!.questions[currentQuestion].answers}
					isDropdown={surveyData!.questions[currentQuestion].isDropdown}
					response={currentAnswersObj.answers}
					setResponse={setResponse}
				/>
			</View>

			<View>
				<NavigationArrows handlePrevious={handlePrevious} handleNext={handleNext} nextDisabled={nextDisabled} />
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	title: {
		flexDirection: 'row',
		paddingVertical: 10,
		gap: 10
	},
	description: {
		paddingBottom: 10,
	}
});

export default SurveyAnswers;