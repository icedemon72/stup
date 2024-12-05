import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '../themed/ThemedText';

type RelativeQuestionTextProps = {
	currentQuestion: number;
	total?: number;
}

const screenWidth = Dimensions.get('window').width;

const RelativeQuestionText = ({ currentQuestion, total }: RelativeQuestionTextProps) => {
	const { colors } = useTheme();
	const outerBackgroundColor = useThemeColor({ light: undefined, dark: undefined }, 'globalBackground');
	const innerBackgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');

	return (
		<View style={{ ...styles.circleContainer, backgroundColor: outerBackgroundColor }}>
			<View style={{ ...styles.logoContainer, backgroundColor: innerBackgroundColor }}>
				<ThemedText type='title'>{ currentQuestion }</ThemedText>
				<ThemedText style={styles.total} textColor='muted'>/{ total }</ThemedText>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	circleContainer: {
		width: 120,
		height: 120,
		borderRadius: 100,
		position: 'absolute',
		top: -60,
		right: (screenWidth / 2) - 60,
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10
	},
	logoContainer: {
		position: 'relative',
		width: 100, 
		height: 100, 
		borderRadius: 100,
		flexDirection: 'row', 
		gap: 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	total: {
		fontSize: 12	
	}
});

export default RelativeQuestionText;