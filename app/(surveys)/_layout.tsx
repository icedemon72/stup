import { useSession } from '@/components/contexts/AuthContext';
import { SurveyProvider } from '@/components/contexts/SurveyContext';
import { Redirect, Stack } from 'expo-router';
import React from 'react'

const SurveysLayout = () => {
	const { session } = useSession();
	
	if(!session) {
		return <Redirect href="/home" />
	}
	
	return (
		<SurveyProvider>
			<Stack screenOptions={{ 
				headerShown: false
			}}>
				<Stack.Screen name='init' />
				<Stack.Screen name='rules' />
				<Stack.Screen name='question-add' />
			</Stack>
		</SurveyProvider>
	)
}

export default SurveysLayout;