import React, { ReactNode } from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { ThemedView } from '../themed/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

type InputContainerProps = {
	children: ReactNode;
	absolute?: ReactNode;
}

const InputContainer = ({ children, absolute }: InputContainerProps) => {
	const backgroundColor = useThemeColor({ light: undefined, dark: undefined }, 'globalBackground')

	return (
		<SafeAreaView style={[ styles.container, { backgroundColor } ]}>
			<ThemedView style={ styles.inputContainer }>
				{ absolute ?? absolute }
					<ScrollView 
						style={ styles.scrollContainer } 
						contentContainerStyle={{ justifyContent: 'space-between', flexGrow: 1 }} 
						keyboardShouldPersistTaps='handled'
					>
						{ children }
					</ScrollView>
			</ThemedView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
		alignContent: 'center',
	},
	inputContainer: {
		position: 'relative',
		borderTopLeftRadius: 50,
		borderTopRightRadius: 50,
		height: '75%'
	},
	scrollContainer: {
		padding: 15,
		marginTop: 60,
	}
})

export default InputContainer;