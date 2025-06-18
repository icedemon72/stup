import React, { useEffect, useState } from 'react';
import { useSession } from '@/components/contexts/AuthContext';
import { Survey } from '@/types';
import { useFetchDocument } from '@/hooks/useFetchCollection';
import { ThemedText } from '@/components/themed/ThemedText';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import InputContainer from '@/components/ui/InputContainer';
import { useAnswersContext } from '@/components/contexts/AnswersContext';
import { getResponses } from '@/scripts/getResponses';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { aggregateStats, fetchAnswersForSurvey } from '@/lib/Survey';
import SurveyStats from './survey-stats';

type RouteParams = {
	surveyId: string;
};

type AggregatedStats = {
	[questionIndex: number]: {
		[answerValue: string]: number;
	};
};

const SurveyShow = () => {
	const route = useRoute();
	const router = useRouter();
	const { surveyId } = route.params as RouteParams;

	const { session } = useSession();
	const { responses, setResponses, surveyData, setSurveyData } = useAnswersContext(); 
	const { data: survey, isLoading, error } = useFetchDocument<Survey>('surveys', surveyId);

	const [stats, setStats] = useState<AggregatedStats | null>(null);

	useEffect(() => {
		const loadSurveyData = async () => {
			if (survey) {
				const { id, title, description, rules, questions } = survey;
				setSurveyData({ id, title, description, rules, questions });
				if (surveyData?.id !== id || !responses.length) {
					setResponses(getResponses(survey));
				}
				if (survey.createdBy.id === session?.uid) {
					const answers = await fetchAnswersForSurvey(id);
					setStats(aggregateStats(answers));
				}
			}
		};

		loadSurveyData();
	}, [survey]);

	if (isLoading) return <ThemedText>Loading...</ThemedText>;

	const screenWidth = Dimensions.get('window').width;

	return (
		<InputContainer absolute={<RelativeLogo name="bars" size={48} iconPack="FontAwesome" />}>
			<ScrollView>
				<ThemedText type="subtitle">{survey!.title}</ThemedText>

				{survey!.createdBy.id === session?.uid ? 
					(
						<>
							<ThemedText style={{ marginTop: 16 }}>Statistika ankete:</ThemedText>
							<SurveyStats stats={stats!} questions={survey!.questions} />
						</>
					) : (
						<TouchableOpacity
							style={styles.button}
							onPress={() => router.navigate({
								pathname: '/(surveys)/survey-answers',
								params: { surveyId: survey!.id }
							})}
						>
							<Text style={{ textAlign: 'center' }}>Odradi STUPitnik!</Text>
						</TouchableOpacity>
					)
				}
			</ScrollView>
		</InputContainer>
	);
};

const styles = StyleSheet.create({
	button: {
		marginVertical: 20,
		padding: 15,
		backgroundColor: '#ff9f00',
		borderRadius: 10
	},
	questionTitle: {
		fontWeight: 'bold',
		marginBottom: 10,
		fontSize: 16
	}
});

export default SurveyShow;
