import React from 'react'
import { useSurveyContext } from '@/components/contexts/SurveyContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { defaultQuestion } from '@/constants/Data';
import { RelativePathString, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import InputContainer from '@/components/ui/InputContainer';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';
import { Question } from '@/types';

const SurveyInit = () => {
	const router = useRouter();
	const { 
		title, setTitle, description, setDescription, questionCount, setQuestionCount, setQuestions
	} = useSurveyContext();

	const handleNext = () => {
		setQuestions(new Array(questionCount as number).fill(defaultQuestion));
		router.navigate('/(surveys)/rules' as RelativePathString);
	}

	return (
		<InputContainer absolute={<RelativeLogo />}>
			<View>
				<ThemedText type='subtitle' style={{ textAlign: 'center' }}>Kreiraj STUPitnik</ThemedText>
				<ThemedText textColor='muted' style={{ paddingVertical: 20 }}>Na početku, potrebno je uneti naziv STUPitnika, njegov opis i broj pitanja.</ThemedText>
			
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Naslov STUPitnika'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						onChangeText={setTitle}
						value={title}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={[styles.inputField, { borderBottomRightRadius: 0, borderTopLeftRadius: 0 }]} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Opis STUPitnika'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						onChangeText={setDescription}
						value={description}
						multiline = {true}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Broj pitanja'
						inputMode='numeric'
						style={{ flex: 1 }}
						onChangeText={(text) => setQuestionCount(text.replace(/[^0-9]+$/, ''))}
						value={questionCount as string}
						backgroundKey='backgroundSecondary'
						maxLength={2}
					/>
				</ThemedView>
			</View>

			<View>
				<NavigationArrows nextDisabled={false} handleNext={handleNext} isFirst  />
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
});

export default SurveyInit;