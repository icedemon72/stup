import React, { useEffect, useState } from 'react'
import { useSurveyContext } from '@/components/contexts/SurveyContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Question } from '@/types';
import { Feather } from '@expo/vector-icons';
import { questionTypes } from '@/constants/Data';
import InputContainer from '@/components/ui/InputContainer';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeQuestionText from '@/components/ui/RelativeQuestionText';
import ThemedDropdown from '@/components/themed/dropdowns/ThemedDropdown';
import QuestionAnswer from '@/components/ui/survey/QuestionAnswer';
import { AddQuestionValidator } from '@/constants/Validators';
import { useRouter } from 'expo-router';
import Checkbox from 'expo-checkbox';

const QuestionAdd = () => {	
	const router = useRouter();
	const { questions, setQuestions, questionCount, setCurrentQuestion, currentQuestion } = useSurveyContext();
	
	const [ currentQuestionObj, setCurrentQuestionObj ] = useState<Question>(questions[currentQuestion]);
	const [ currentAnswer, setCurrentAnswer ] = useState<string>('');
	const [ nextDisabled, setNextDisabled ] = useState<boolean>(true);


	const handleAddAnswer = () => {
		if(currentAnswer.trim().length && currentQuestionObj.answers?.indexOf(currentAnswer) === -1) {
			const { answers } = currentQuestionObj;
			setCurrentQuestionObj(prev => ({ ...prev, answers: [...answers, currentAnswer.trim()] }));
			setCurrentAnswer('');		
		}
	}

	const handleEditAnswer = (value: string, index: number) => {
		let { answers } = currentQuestionObj;
		answers![index] = value.trim();
		setCurrentQuestionObj(prev => ({ ...prev, answers }));
	}

	const handleDeleteAnswer = (index: number) => {
		let { answers } = currentQuestionObj;
		answers!.splice(index, 1);
		setCurrentQuestionObj(prev => ({ ...prev, answers }));
	}
	
	const handleChangeType = (type: { label: string; value: any }) => {
		setCurrentQuestionObj(prev => ({ ...prev, type: type.value }));
	}

	const handleChangeTitle = (title: string) => {
		setCurrentQuestionObj(prev => ({ ...prev, title: title }));
	}

	const handleChangeDesc = (description: string) => {
		setCurrentQuestionObj(prev => ({ ...prev, description: description }));
	}

	const handleChangeDropdown = (isDropdown: boolean) => {
		setCurrentQuestionObj(prev => ({ ...prev, isDropdown }));
	}

	const handleChangeRequired = (required: boolean) => {
		setCurrentQuestionObj(prev => ({ ...prev, required }));
	}

	const handleNext = () => {
		if(currentQuestion + 1 < parseInt(questionCount as string)) {
			setCurrentQuestion(prev => prev + 1);
		} else {
			router.navigate('/(surveys)/question-final');
		}
	}

	const handlePrevious = () => {
		if(currentQuestion > 0) {
			setCurrentQuestion(prev => prev - 1);
		} else {
			router.navigate('/(surveys)/rules');
		}
	}

	const validateForm = () => {
		const success: boolean = AddQuestionValidator.safeParse(currentQuestionObj).success;
		setNextDisabled(!success);
	}

	useEffect(() => {
		setQuestions(prev => {
			prev[currentQuestion] = currentQuestionObj;
			return prev;
		});
		validateForm();
	}, [ currentQuestionObj ]);

	useEffect(() => {
		setCurrentAnswer('');
		setCurrentQuestionObj(prev => prev = questions[currentQuestion]);
	}, [ currentQuestion ]);

	return (
		<InputContainer absolute={<RelativeQuestionText currentQuestion={ currentQuestion + 1} total={questionCount as number}/>}>
			<View>
				{ 
					currentQuestion === 0 && 
					<>
						<ThemedText type='subtitle' style={{ textAlign: 'center' }}>Unesi pitanja</ThemedText>
						<ThemedText textColor='muted' style={{ paddingVertical: 20 }}>Unesi naslov pitanja, opis (ukoliko je potreban), tip pitanja, kao i odgovore.</ThemedText>
					</> 
				}

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Naslov pitanja'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						onChangeText={handleChangeTitle}
						value={currentQuestionObj.title}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Kratak opis pitanja'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						onChangeText={handleChangeDesc}
						value={currentQuestionObj.description}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedDropdown 
						placeholder='Izaberi tip pitanja'
						data={questionTypes} 
						value={currentQuestionObj.type}
						search={false}
						
						setValue={handleChangeType}
					/>
				</ThemedView>
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<Pressable style={[ styles.checkboxContainer, { flex: 1 }]} onPress={() => handleChangeRequired(!currentQuestionObj.required)}>
						<Checkbox value={currentQuestionObj.required} onValueChange={handleChangeRequired}/>
						<ThemedText>Obavezno pitanje</ThemedText>
					</Pressable>
				</ThemedView>
				{ 
					currentQuestionObj.type !== 'text' &&
					<>
						<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
							<Pressable style={[ styles.checkboxContainer, { flex: 1 }]} onPress={() => handleChangeDropdown(!currentQuestionObj.isDropdown)}>
								<Checkbox value={currentQuestionObj.isDropdown} onValueChange={handleChangeDropdown}/>
								<ThemedText>Odgovor iz padajućeg menija</ThemedText>
							</Pressable>
						</ThemedView>
						

						<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
							<ThemedTextInput
								placeholder='Odgovor'
								inputMode='text'
								autoCapitalize='sentences'
								style={{ flex: 1 }}
								value={currentAnswer}
								onChangeText={setCurrentAnswer}
								onSubmitEditing={handleAddAnswer}
								backgroundKey='backgroundSecondary'
							/>
							<TouchableOpacity onPress={handleAddAnswer}>
								<ThemedText>
									<Feather name="plus" size={24} />
								</ThemedText>
							</TouchableOpacity>
						</ThemedView>

						{ 
							currentQuestionObj.answers?.map((answer: string, i: number) => (
								<QuestionAnswer 
									index={i} 
									key={i} 
									text={answer} 
									edit={handleEditAnswer}
									editable 
									onDelete={() => handleDeleteAnswer(i)}
								/>
							)) 
						}
					</>			
				}
			</View>

			<View>
				<NavigationArrows handlePrevious={handlePrevious} handleNext={handleNext} nextDisabled={nextDisabled} />
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
	checkboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
	}
});

export default QuestionAdd;