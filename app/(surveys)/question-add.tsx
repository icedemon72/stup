import { useSurveyContext } from '@/components/contexts/SurveyContext';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';
import { ThemedView } from '@/components/themed/ThemedView';
import InputContainer from '@/components/ui/InputContainer';
import NavigationArrows from '@/components/ui/NavigationArrows';
import RelativeQuestionText from '@/components/ui/RelativeQuestionText';
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Question } from '@/types';
import { Feather } from '@expo/vector-icons';

// IMPLEMENT DRAGGABLE FLATLIST INSTEAD OF .map!!!

const QuestionAdd = () => {
	const { questions, setQuestions, questionCount, setCurrentQuestion, currentQuestion } = useSurveyContext();
	const [ currentQuestionObj, setCurrentQuestionObj ] = useState<Question>(questions[currentQuestion]);
	
	const [ currentAnswer, setCurrentAnswer ] = useState<string>('');
	const [ currentAnswers, setCurrentAnswers ] = useState<string[]>([]);

	const handleAddQuestion = () => {
		if(currentAnswer.length && currentAnswers.indexOf(currentAnswer) === -1) {
			currentAnswers.push(currentAnswer);
			setCurrentAnswer('');
		}
	}

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
						// onChangeText={setTitle}
						// value={title}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Kratak opis pitanja'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						// onChangeText={setTitle}
						// value={title}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Tip pitanja'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						// onChangeText={setTitle}
						value={currentQuestionObj.type}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>

				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedTextInput
						placeholder='Tip pitanja'
						inputMode='text'
						autoCapitalize='sentences'
						style={{ flex: 1 }}
						// onChangeText={setTitle}
						value={currentQuestionObj.isDropdown ? 'Dropdown' : 'Not dropdown'}
						backgroundKey='backgroundSecondary'
					/>
				</ThemedView>
				{ 
					currentQuestionObj.type !== 'text' &&
					<>
					<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
						<ThemedTextInput
							placeholder='Odgovor'
							inputMode='text'
							autoCapitalize='sentences'
							style={{ flex: 1 }}
							value={currentAnswer}
							onChangeText={setCurrentAnswer}
							backgroundKey='backgroundSecondary'
						/>
						<TouchableOpacity onPress={handleAddQuestion}>
							<ThemedText>
								<Feather name="plus" size={24} />
							</ThemedText>
						</TouchableOpacity>
					</ThemedView>
						{ 
							currentAnswers?.map((answer: string, i: number) => {
								return(<ThemedText key={i}>{i + 1}. {answer}</ThemedText>);
							}) 
						}
					</>			
				}
			</View>

			<View>
				<NavigationArrows isLast  />
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

export default QuestionAdd;