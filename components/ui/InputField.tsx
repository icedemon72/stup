import React from 'react';
import { StyleSheet, type TextInputProps } from 'react-native';
import { ThemedView } from '../themed/ThemedView';
import { ThemedTextInput } from '../themed/ThemedTextInput';
import { Colors } from '@/constants/Colors';

type InputFieldProps = TextInputProps & {
	backgroundKey?:  keyof typeof Colors.light & keyof typeof Colors.dark;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

const InputField = ({ 
	style = { flex: 1 },
	autoCapitalize = 'sentences',
	inputMode = 'text',
	backgroundKey = 'backgroundSecondary' as keyof typeof Colors.light & keyof typeof Colors.dark,
	leftIcon,
	rightIcon,
	...props 
}: InputFieldProps) => {	
	return (
		<ThemedView style={[styles.inputField, props.multiline && { borderBottomRightRadius: 0, borderTopLeftRadius: 0 }]} backgroundKey={backgroundKey}>
			{ leftIcon && <>{ leftIcon }</>}
			{/* @ts-ignore */}
			<ThemedTextInput
				inputMode={inputMode}
				autoCapitalize={autoCapitalize}
				style={style}
				backgroundKey={backgroundKey}
				{ ...props }
			/>
			{ rightIcon && <>{ rightIcon }</>}
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

export default InputField;