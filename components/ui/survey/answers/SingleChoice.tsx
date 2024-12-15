import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import { AnswerProps } from '@/types/componentTypes';
import ThemedDropdown from '@/components/themed/dropdowns/ThemedDropdown';

const SingleChoice = ({ answers, response, isDropdown, setResponse }: AnswerProps) => {
	const handleChangeIndex = (index: number) => {
		if(index !== response as number) {
			setResponse(index);
		}
	}

	return (
		<>
			{
				isDropdown ?
				<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
					<ThemedDropdown 
						placeholder='Izaberi jedan odgovor'
						searchPlaceholder='Pretraži odgovore...'
						value={response}
						data={answers?.map((label, value) => ({ label, value }))}
						setValue={handleChangeIndex}
					/>
				</ThemedView>
				:
				answers?.map((answer, index) => (
					<TouchableOpacity key={index} onPress={() => handleChangeIndex(index)}>
						<ThemedView backgroundKey='backgroundSecondary' style={styles.answer}>
							<View style={styles.radio}>
								<ThemedView backgroundKey='backgroundSecondary' style={[styles.dot, response === index && { display: 'flex' }]}></ThemedView>
							</View>
							<ThemedText textColor={response === index  ? 'text' : 'muted'}>{ answer }</ThemedText>
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
	answer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		minHeight: 50,
		paddingHorizontal: 10,
		borderRadius: 10,
		marginBottom: 10
	},
	radio: {
		width: 20, 
		height: 20,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	},
	dot: {
		display: 'none',
		width: 15,
		height: 15,
		borderRadius: 100,
	}
});

export default SingleChoice;