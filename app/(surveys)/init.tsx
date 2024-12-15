import React, { useEffect, useState } from 'react'
import { useSurveyContext } from '@/components/contexts/SurveyContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { defaultQuestion } from '@/constants/Data';
import { RelativePathString, useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { SurveyInitValidator } from '@/constants/Validators';
import InputContainer from '@/components/ui/InputContainer';
import InputField from '@/components/ui/InputField';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeLogo from '@/components/ui/RelativeLogo';

const SurveyInit = () => {
	const router = useRouter();
	const { 
		questions, title, setTitle, description, setDescription, questionCount, setQuestionCount, setQuestions
	} = useSurveyContext();

	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);
	
	const handleNext = () => {
		setQuestions(new Array(parseInt(questionCount as string)).fill(defaultQuestion));
		router.navigate('/(surveys)/rules' as RelativePathString);
	}

	const validateForm = () => {
		const success: boolean = SurveyInitValidator.safeParse({ title, description, questionCount: parseInt(questionCount as string) }).success;
		setNextDisabled(!success);
	}

	useEffect(() => {
		validateForm();
	}, [ title, description, questionCount ]);

	return (
		<InputContainer absolute={<RelativeLogo />}>
			<View>
				<ThemedText type='subtitle' style={{ textAlign: 'center' }}>Kreiraj STUPitnik</ThemedText>
				<ThemedText textColor='muted' style={{ paddingVertical: 20 }}>Na početku, potrebno je uneti naziv STUPitnika, njegov opis i broj pitanja.</ThemedText>
			
				<InputField 
					placeholder='Naslov STUPitnika'
					onChangeText={setTitle}
					value={title}
				/>

				<InputField 
					placeholder='Opis STUPitnika'
					onChangeText={setDescription}
					value={description}
					multiline={true}
				/>

				<InputField 
					placeholder='Broj pitanja'
					inputMode='numeric'
					onChangeText={(text) => setQuestionCount(text.replace(/[^0-9]+$/, ''))}
					value={questionCount as string}
					maxLength={2}
				/>
			</View>

			<View>
				<NavigationArrows nextDisabled={nextDisabled} handleNext={handleNext} isFirst  />
			</View>
		</InputContainer>
	);
}

const styles = StyleSheet.create({});

export default SurveyInit;