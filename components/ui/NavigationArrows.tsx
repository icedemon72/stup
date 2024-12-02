import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../themed/ThemedText';
import { Feather } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from '@/constants/Colors';

interface NavigationArrowsProps {
	isFirst?: boolean;
	isLast?: boolean;
	handlePrevious?: () => void;
	handleNext?: () => void;
	nextDisabled?: boolean;
}

const NavigationArrows = ({ isFirst = false, isLast = false, handleNext, handlePrevious, nextDisabled = false }: NavigationArrowsProps) => {
	const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
	
	return (
		<View style={[styles.container, isFirst && { justifyContent: 'center' }]}>
			{ 
				!isFirst &&
				<TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={handlePrevious}>
					<ThemedText style={{ textAlign: 'center' }}>
						<Feather name="arrow-left" size={24}  />
					</ThemedText>
				</TouchableOpacity>
			}
			{
				!isLast &&
				<TouchableOpacity disabled={nextDisabled} style={[styles.button, nextDisabled && { backgroundColor: 'gray' }]} onPress={handleNext}>
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
		flexDirection: 'row', 
		gap: 10, 
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	button: {
		width: 70, 
		height: 70,
		borderRadius: 1000,
		backgroundColor: 'orange', // change this 
		justifyContent: 'center', 
	},
	backButton: {
		backgroundColor: 'gray'
	}
});

export default NavigationArrows;