import React, { useEffect } from 'react';
import { useSession } from '@/components/contexts/AuthContext';
import { Survey, AnswerResponse, SurveyData } from '@/types';
import { useFetchDocument } from '@/hooks/useFetchCollection';
import { ThemedText } from '@/components/themed/ThemedText';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import InputContainer from '@/components/ui/InputContainer';
import { useAnswersContext } from '@/components/contexts/AnswersContext';
import { getResponses } from '@/scripts/getResponses';
import RelativeLogo from '@/components/ui/RelativeLogo';

type RouteParams = {
	surveyId: string;
}

const SurveyShow = () => {
	const route = useRoute();
	const router = useRouter();
	const { surveyId } = route.params as RouteParams;

	const { session } = useSession();
	const { responses, setResponses, surveyData, setSurveyData } = useAnswersContext(); 
	const { data: survey, isLoading, error } = useFetchDocument<Survey>('surveys', surveyId);

	// TODO
	useEffect(() => {
		const fetchInvoiceUrls = async () => {
			if (survey) {
				const { id, title, description, rules, questions } = survey;
				setSurveyData({ id, title, description, rules, questions });
				if(surveyData?.id !== id || !responses.length) { 
					setResponses(getResponses(survey));
				}
			}
		};
		
		fetchInvoiceUrls();
	}, [ survey ]);

	if(isLoading) {
		return <ThemedText>Loading...</ThemedText>
	}

	return (
		<InputContainer absolute={<RelativeLogo name="bars" size={48} iconPack='FontAwesome' />}>
		{/* TODO: add logic to test whether the user has already submitted the survey! */}
			<View>
				<ThemedText type='subtitle'>{ survey!.title }</ThemedText>
				{ 
					survey!.createdBy.id === session?.uid ?
					<TouchableOpacity onPress={() => router.navigate({
						pathname: '/(surveys)/survey-info',
						params: { surveyId: survey!.id }
					})}>
						<ThemedText>Statistika</ThemedText>
					</TouchableOpacity>
					:
					<>
						
						<TouchableOpacity style={styles.button} onPress={() => router.navigate({
							pathname: '/(surveys)/survey-answers',
							params: { surveyId: survey!.id }
						})}>
							<Text style={{ textAlign: 'center' }}>Odradi STUPitnik!</Text>
						</TouchableOpacity>
					</>
				}

			</View>
			
			<ThemedText>{ survey!.createdBy.id === session!.uid && 'JA SAM KREIRAO OVO!'}</ThemedText>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	button: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	}
});

export default SurveyShow;