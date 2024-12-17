import React, { useState } from 'react';
import { useSurveyContext } from '@/components/contexts/SurveyContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedView } from '@/components/themed/ThemedView';
import { faculties } from '@/constants/Data';
import { db } from '@/constants/Firebase';
import { collection, doc, arrayUnion, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useSession } from '@/components/contexts/AuthContext';
import { useRouter } from 'expo-router';
import InputContainer from '@/components/ui/InputContainer';
import RelativeLogo from '@/components/ui/RelativeLogo';

const QuestionFinal = () => {
	const router = useRouter();
	const { session } = useSession();
	const { questions, title, description, rules } = useSurveyContext();
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const handleSaveSurvey = async () => {
		setIsLoading(true);

		try {
			const batch = writeBatch(db);

			const surveyDocRef = doc(collection(db, 'surveys'));
			batch.set(surveyDocRef, {
				title,
				description,
				rules,
				questions,
				createdBy: {
					id: session?.uid,
					name: session?.name || '',
					faculty: session?.faculty,
				},
				answeredBy: [],
				timestamp: serverTimestamp()
			});

			const userDocRef = doc(db, 'users', session!.uid);
			batch.set(userDocRef, { createdSurveys: arrayUnion(surveyDocRef.id) }, { merge: true });
			
			await batch.commit();

			router.navigate({ pathname: '/(surveys)/survey-info', params: { surveyId: surveyDocRef.id }});
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<InputContainer absolute={<RelativeLogo name='filter' size={54} />}>
			<View>
				<ThemedText style={styles.text} type='subtitle' textColor='muted'>Informacije o STUPitniku</ThemedText>
				
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText>{ title }</ThemedText>
				</ThemedView>
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText textColor={description ? 'text' : 'muted'}>{ description || 'Nema opisa...' }</ThemedText>
				</ThemedView>
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText textColor={rules.gender === 'ANY' ? 'muted' : 'text'}>
						{ rules.gender === 'ANY' ? 'Svi polovi' : rules.gender === 'F' ? 'Samo ženski' : 'Samo muški' }
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText textColor={rules.ageLimit.every(val => val !== -1) ? 'text' : 'muted'}>
						{ 
							rules.ageLimit.every(val => val !== -1) 
							? <> 
										{ rules.ageLimit[0] === -1 ? '' : `Od ${rules.ageLimit[0]}` }
										{ rules.ageLimit[1] === -1 ? '' : `Do ${rules.ageLimit[1]}`}
								</>
							: 'Nema limita po starosti'
						}
						
					</ThemedText>
				</ThemedView>
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedText textColor={!rules.faculties.length ? 'muted' : 'text'}>
						{ !rules.faculties.length ? 'Svi fakulteti' : rules.faculties.map(fac => faculties[fac].label).join(', ') }
					</ThemedText>
				</ThemedView>

				{
					questions.map((question, i) => (
						<ThemedText key={i}>{ question.title }</ThemedText>
					))
				}

				<TouchableOpacity onPress={handleSaveSurvey} disabled={isLoading}>
					<ThemedText>Unesi</ThemedText>
				</TouchableOpacity>

			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({
	inputField: {
		flexDirection: 'row',
		alignItems: 'center',
		minHeight: 50,
		marginBottom: 10,
		gap: 5,
		paddingHorizontal: 10,
		borderRadius: 10
	},
	text: {
		textAlign: 'center',
		paddingVertical: 20,
	}
});

export default QuestionFinal;