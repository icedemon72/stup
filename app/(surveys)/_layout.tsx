import React from 'react'
import { useSession } from '@/components/contexts/AuthContext';
import { SurveyProvider } from '@/components/contexts/SurveyContext';
import { Redirect, Stack } from 'expo-router';
import { AnswersProvider } from '@/components/contexts/AnswersContext';

const SurveysLayout = () => {
	const { session } = useSession();
	
	if(!session) {
		return <Redirect href="/home" />
	}
	
	return (
		<SurveyProvider>
			<AnswersProvider>
				<Stack screenOptions={{ 
					headerShown: false
				}}>
					<Stack.Screen name='init' />
					<Stack.Screen name='rules' />
					<Stack.Screen name='question-add' />
					<Stack.Screen name='question-final' />
					<Stack.Screen name='survey-info' />			
					<Stack.Screen name='survey-answers' />
				</Stack>
			</AnswersProvider>
		</SurveyProvider>
	);
}

export default SurveysLayout;