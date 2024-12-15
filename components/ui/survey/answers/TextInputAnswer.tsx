import React from 'react';
import { StyleSheet } from 'react-native';
import { AnswerProps } from '@/types/componentTypes';
import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedTextInput } from '@/components/themed/ThemedTextInput';

const TextInputAnswer = ({ response, setResponse }: AnswerProps) => {
	return (
		<ThemedView style={styles.inputField} backgroundKey='backgroundSecondary'>
			<ThemedTextInput
				placeholder='Unesite odgovor...'
				inputMode='text'
				autoCapitalize='sentences'
				style={{ flex: 1 }}
				value={response}
				onChangeText={setResponse}
				backgroundKey='backgroundSecondary'
			/>
		</ThemedView>
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

export default TextInputAnswer;