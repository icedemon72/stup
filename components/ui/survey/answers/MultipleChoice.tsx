import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { AnswerProps } from '@/types/componentTypes';
import ThemedMultiDropdown from '@/components/themed/dropdowns/ThemedMultiDropdown';
import Checkbox from 'expo-checkbox';

const MultipleChoice = ({ answers, response, isDropdown, setResponse }: AnswerProps) => {

	const handleChangeSelected = (index: number) => {
		let responseArray = response;

		(responseArray.indexOf(index) === -1) 
			? responseArray.push(index)
			: responseArray.splice(responseArray.indexOf(index), 1);

		setResponse(responseArray.sort());
	}

	return (
		<>
			{ 
				isDropdown ? 
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedMultiDropdown
						placeholder='Izaberi odgovore'
						searchPlaceholder='Pretraži odgovore...'
						value={response}
						data={answers?.map((label, value) => ({ label, value }))}
						setValue={(values: any) => setResponse(values.sort())}

					/>
				</ThemedView>
				: answers!.map((answer, index) => (
					<TouchableOpacity key={index} onPress={() => handleChangeSelected(index)}>
						<ThemedView backgroundKey='backgroundSecondary' style={[ styles.checkboxContainer, { flex: 1 }]}>
							<Checkbox value={response.indexOf(index) !== -1} />
							<ThemedText textColor={response.indexOf(index) !== -1 ? 'text' : 'muted'}>{answer}</ThemedText>
						</ThemedView>
					</TouchableOpacity>
				))
			}
		</>
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
		minHeight: 50,
		marginBottom: 10,
		paddingHorizontal: 10,
		borderRadius: 10,
		gap: 5,
	}
});

export default MultipleChoice;