import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed/ThemedText';
import { Feather } from '@expo/vector-icons';

interface NavigationArrowsProps {
	isFirst?: boolean;
	isLast?: boolean;
	handlePrevious?: () => void;
	handleNext?: () => void;
	nextDisabled?: boolean;
}

const NavigationArrows = ({ isFirst = false, isLast = false, handleNext, handlePrevious, nextDisabled = false }: NavigationArrowsProps) => {
	return (
		<View style={styles.container}>
			{ 
				!isFirst &&
				<TouchableOpacity style={{ ...styles.button, ...styles.backButton }} onPress={handlePrevious}>
					<ThemedText style={{ textAlign: 'center' }}>
						<Feather name="arrow-left" size={24}  />
					</ThemedText>
				</TouchableOpacity>
			}
			{
				!isLast &&
				<TouchableOpacity disabled={nextDisabled} style={{ ...styles.button }} onPress={handleNext}>
					<ThemedText style={{ textAlign: 'center' }}>
						<Feather name="arrow-right" size={24}  />
					</ThemedText>
				</TouchableOpacity>
			}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { 
		height: 100,
		flexDirection: 'row', 
		gap: 10, 
		alignSelf: 'center'
	},
	button: {
		width: 100, 
		height: 100,
		borderRadius: 1000,
		backgroundColor: 'orange', // change this 
		justifyContent: 'center', 
	},
	backButton: {
		backgroundColor: 'gray'
	}
});

export default NavigationArrows;